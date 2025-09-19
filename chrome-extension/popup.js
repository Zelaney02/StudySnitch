// StudySnitch Enhanced Popup Script with Pomodoro Timer

// Global state
let currentPage = 'mainPage';
let timerState = {
  isRunning: false,
  isPaused: false,
  isBreak: false,
  timeLeft: 25 * 60, // 25 minutes in seconds
  studyDuration: 25 * 60,
  breakDuration: 5 * 60,
  currentSubject: '',
  currentDetails: '',
  timerInterval: null,
};

// Navigation Functions
function showPage(pageId) {
  // Hide all pages
  document.querySelectorAll('.page').forEach((page) => {
    page.classList.remove('active');
  });

  // Show target page
  document.getElementById(pageId).classList.add('active');
  currentPage = pageId;
}

// Timer Functions
function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds
    .toString()
    .padStart(2, '0')}`;
}

function updateTimerDisplay() {
  const display = document.getElementById('timerDisplay');
  const status = document.getElementById('sessionStatus');

  display.textContent = formatTime(timerState.timeLeft);

  if (timerState.isRunning && !timerState.isPaused) {
    if (timerState.isBreak) {
      status.textContent = `Break time - ${formatTime(
        timerState.timeLeft
      )} remaining`;
      display.style.color = '#4CAF50';
    } else {
      status.textContent = `Focus session - ${formatTime(
        timerState.timeLeft
      )} remaining`;
      display.style.color = '#ff6b6b';
    }
  } else if (timerState.isPaused) {
    status.textContent = 'Timer paused';
    display.style.color = '#ffa726';
  } else {
    status.textContent = 'Ready to start a focus session';
    display.style.color = 'white';
  }
}

function startTimer() {
  if (!timerState.isRunning) {
    // First time starting - check if subject is set
    if (!timerState.currentSubject) {
      alert('Please set up your study session first!');
      showPage('setupPage');
      return;
    }

    timerState.isRunning = true;
    timerState.isBreak = false;
    timerState.timeLeft = timerState.studyDuration;

    // Show current subject
    document.getElementById('currentSubject').style.display = 'block';
    document.getElementById('subjectText').textContent =
      timerState.currentSubject;

    // Update backend with current subject for tab monitoring
    chrome.runtime.sendMessage({
      action: 'setStudySubject',
      subject: timerState.currentSubject,
      details: timerState.currentDetails,
    });
  }

  timerState.isPaused = false;

  // Update UI
  document.getElementById('startBtn').style.display = 'none';
  document.getElementById('pauseBtn').style.display = 'inline-block';
  document.getElementById('stopBtn').style.display = 'inline-block';

  // Start countdown
  timerState.timerInterval = setInterval(() => {
    timerState.timeLeft--;
    updateTimerDisplay();

    if (timerState.timeLeft <= 0) {
      // Timer finished
      if (timerState.isBreak) {
        // Break finished, start new focus session
        timerState.isBreak = false;
        timerState.timeLeft = timerState.studyDuration;
        playNotificationSound();
        showNotification(
          'Break time over!',
          'Ready for another focus session?'
        );
      } else {
        // Focus session finished, start break
        timerState.isBreak = true;
        timerState.timeLeft = timerState.breakDuration;
        playNotificationSound();
        showNotification(
          'Focus session complete!',
          'Time for a well-deserved break.'
        );
      }
    }
  }, 1000);

  updateTimerDisplay();
}

function pauseTimer() {
  timerState.isPaused = true;
  clearInterval(timerState.timerInterval);

  // Update UI
  document.getElementById('startBtn').style.display = 'inline-block';
  document.getElementById('startBtn').textContent = 'Resume';
  document.getElementById('pauseBtn').style.display = 'none';

  updateTimerDisplay();
}

function stopTimer() {
  timerState.isRunning = false;
  timerState.isPaused = false;
  timerState.isBreak = false;
  timerState.timeLeft = timerState.studyDuration;

  clearInterval(timerState.timerInterval);

  // Update UI
  document.getElementById('startBtn').style.display = 'inline-block';
  document.getElementById('startBtn').textContent = 'Start Focus';
  document.getElementById('pauseBtn').style.display = 'none';
  document.getElementById('stopBtn').style.display = 'none';
  document.getElementById('currentSubject').style.display = 'none';

  // Clear subject from backend
  chrome.runtime.sendMessage({
    action: 'clearStudySubject',
  });

  updateTimerDisplay();
}

// Session setup functions
function setupSession() {
  const subject = document.getElementById('studySubject').value.trim();
  const details = document.getElementById('studyDetails').value.trim();
  const sessionType = document.getElementById('sessionType').value;

  if (!subject) {
    alert("Please enter what you're studying!");
    return;
  }

  timerState.currentSubject = subject;
  timerState.currentDetails = details;

  // Set timer durations based on session type
  switch (sessionType) {
    case '25-5':
      timerState.studyDuration = 25 * 60;
      timerState.breakDuration = 5 * 60;
      break;
    case '50-10':
      timerState.studyDuration = 50 * 60;
      timerState.breakDuration = 10 * 60;
      break;
    case '15-5':
      timerState.studyDuration = 15 * 60;
      timerState.breakDuration = 5 * 60;
      break;
    case 'custom':
      const customStudy = parseInt(
        document.getElementById('customStudy').value
      );
      const customBreak = parseInt(
        document.getElementById('customBreak').value
      );
      timerState.studyDuration = customStudy * 60;
      timerState.breakDuration = customBreak * 60;
      break;
  }

  timerState.timeLeft = timerState.studyDuration;
  updateTimerDisplay();

  // Save to storage for persistence
  chrome.storage.local.set({
    studySubject: subject,
    studyDetails: details,
    studyDuration: timerState.studyDuration,
    breakDuration: timerState.breakDuration,
  });

  showPage('mainPage');
  alert(`Session setup complete! Ready to study ${subject}`);
}

// Utility functions
function playNotificationSound() {
  // Create a simple beep sound
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);

  oscillator.frequency.value = 800;
  oscillator.type = 'sine';

  gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(
    0.01,
    audioContext.currentTime + 0.5
  );

  oscillator.start(audioContext.currentTime);
  oscillator.stop(audioContext.currentTime + 0.5);
}

function showNotification(title, message) {
  if (Notification.permission === 'granted') {
    new Notification(title, {
      body: message,
      icon: 'icon.png',
    });
  }
}

// Monitor page functions
function openCameraMonitor() {
  // Send message to background script to open camera system
  chrome.runtime.sendMessage({
    action: 'openCameraMonitor',
  });
}

function openAnalyticsDashboard() {
  // Open the Streamlit dashboard
  chrome.tabs.create({
    url: 'http://localhost:8502',
  });
}

// Settings functions
function saveSettings() {
  const settings = {
    enableTabBlocking: document.getElementById('enableTabBlocking').checked,
    enableNotifications: document.getElementById('enableNotifications').checked,
    enableAudio: document.getElementById('enableAudio').checked,
    audioVolume: document.getElementById('audioVolume').value,
    enableCamera: document.getElementById('enableCamera').checked,
    enableAlerts: document.getElementById('enableAlerts').checked,
  };

  chrome.storage.local.set(settings);

  // Send settings to background script
  chrome.runtime.sendMessage({
    action: 'updateSettings',
    settings: settings,
  });

  alert('Settings saved!');
}

function loadSettings() {
  chrome.storage.local.get(
    [
      'enableTabBlocking',
      'enableNotifications',
      'enableAudio',
      'audioVolume',
      'enableCamera',
      'enableAlerts',
    ],
    (result) => {
      document.getElementById('enableTabBlocking').checked =
        result.enableTabBlocking !== false;
      document.getElementById('enableNotifications').checked =
        result.enableNotifications !== false;
      document.getElementById('enableAudio').checked =
        result.enableAudio !== false;
      document.getElementById('audioVolume').value =
        result.audioVolume || '0.7';
      document.getElementById('enableCamera').checked =
        result.enableCamera !== false;
      document.getElementById('enableAlerts').checked =
        result.enableAlerts !== false;
    }
  );
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
  // Navigation buttons
  document.querySelectorAll('.nav-btn').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const targetPage = e.target.getAttribute('data-page');
      showPage(targetPage);
    });
  });

  // Timer controls
  document.getElementById('startBtn').addEventListener('click', startTimer);
  document.getElementById('pauseBtn').addEventListener('click', pauseTimer);
  document.getElementById('stopBtn').addEventListener('click', stopTimer);

  // Session setup
  document
    .getElementById('saveSession')
    .addEventListener('click', setupSession);
  document.getElementById('sessionType').addEventListener('change', (e) => {
    const customSection = document.getElementById('customSection');
    customSection.style.display =
      e.target.value === 'custom' ? 'block' : 'none';
  });

  // Monitor functions
  document
    .getElementById('openCameraBtn')
    .addEventListener('click', openCameraMonitor);
  document
    .getElementById('openDashboardBtn')
    .addEventListener('click', openAnalyticsDashboard);

  // Settings
  document
    .getElementById('saveSettings')
    .addEventListener('click', saveSettings);

  // Load saved data
  loadSettings();

  // Load saved session data
  chrome.storage.local.get(
    ['studySubject', 'studyDetails', 'studyDuration', 'breakDuration'],
    (result) => {
      if (result.studySubject) {
        timerState.currentSubject = result.studySubject;
        timerState.currentDetails = result.studyDetails || '';
        timerState.studyDuration = result.studyDuration || 25 * 60;
        timerState.breakDuration = result.breakDuration || 5 * 60;
        timerState.timeLeft = timerState.studyDuration;

        document.getElementById('studySubject').value = result.studySubject;
        document.getElementById('studyDetails').value =
          result.studyDetails || '';
      }

      updateTimerDisplay();
    }
  );

  // Request notification permission
  if (Notification.permission === 'default') {
    Notification.requestPermission();
  }

  console.log('StudySnitch: Enhanced popup loaded with Pomodoro timer');
});

// Listen for messages from background script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'timerFinished') {
    playNotificationSound();
    showNotification(message.title, message.body);
  }
});
