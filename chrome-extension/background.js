// StudySnitch Background Service Worker (Manifest V3)
// Enhanced version with subject-based monitoring and Pomodoro integration

// Your secure backend URL (can be localhost for development, deployed for production)
const STUDYSNITCH_API_URL = 'http://localhost:5001';

// Global state
let currentStudySubject = '';
let studyDetails = '';
let isMonitoringEnabled = true;
let settings = {
  enableTabBlocking: true,
  enableNotifications: true,
  enableAudio: true,
  enableCamera: true,
  enableAlerts: true,
};

// Function to check if tab is study-related using your secure backend
async function checkTabContent(tab) {
  // Skip monitoring if disabled or no subject set
  if (!isMonitoringEnabled || !currentStudySubject) {
    return true;
  }

  try {
    console.log(
      `StudySnitch: Analyzing tab "${tab.title}" for subject "${currentStudySubject}"`
    );

    const response = await fetch(`${STUDYSNITCH_API_URL}/check-tab`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: tab.title,
        subject: currentStudySubject,
        details: studyDetails,
      }),
    });

    if (response.ok) {
      const result = await response.json();
      const isStudyRelated = result.is_study_related;

      console.log(
        `StudySnitch: Tab "${tab.title}" is ${
          isStudyRelated ? 'study-related' : 'not study-related'
        }`
      );

      // If not study-related, close the tab
      if (!isStudyRelated) {
        console.log(`StudySnitch: Closing non-study tab: ${tab.title}`);
        chrome.tabs.remove(tab.id);
      }

      return isStudyRelated;
    } else {
      console.log(
        'StudySnitch: Backend server not available, keeping tab open'
      );
      return true; // Keep tab open if backend is unavailable
    }
  } catch (error) {
    console.error('StudySnitch: Error connecting to backend:', error);
    return true; // Default to keeping tab if there's an error
  }
}

// Listen for tab updates
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  // Only check when the tab is completely loaded and monitoring is enabled
  if (
    changeInfo.status === 'complete' &&
    tab.url &&
    !tab.url.startsWith('chrome://') &&
    settings.enableTabBlocking
  ) {
    console.log('StudySnitch: Checking tab:', tab.title);
    checkTabContent(tab);
  }
});

// Listen for new tabs being activated
chrome.tabs.onActivated.addListener(async (activeInfo) => {
  if (!settings.enableTabBlocking) return;

  const tab = await chrome.tabs.get(activeInfo.tabId);
  if (tab.url && !tab.url.startsWith('chrome://')) {
    console.log('StudySnitch: Activated tab:', tab.title);
    checkTabContent(tab);
  }
});

// Listen for messages from popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('StudySnitch: Received message:', message);

  switch (message.action) {
    case 'setStudySubject':
      currentStudySubject = message.subject;
      studyDetails = message.details || '';
      isMonitoringEnabled = true;
      console.log(
        `StudySnitch: Now monitoring for subject: ${currentStudySubject}`
      );
      break;

    case 'clearStudySubject':
      currentStudySubject = '';
      studyDetails = '';
      isMonitoringEnabled = false;
      console.log('StudySnitch: Cleared study subject, monitoring disabled');
      break;

    case 'updateSettings':
      settings = { ...settings, ...message.settings };
      console.log('StudySnitch: Settings updated:', settings);
      break;

    case 'openCameraMonitor':
      // Open the ML camera system
      chrome.tabs.create({
        url: chrome.runtime.getURL('monitor.html'),
      });
      break;

    case 'startMLCamera':
      // Try to start the ML camera system
      try {
        // Open in new window with specific size
        chrome.windows.create({
          url: 'http://localhost:8501',
          type: 'popup',
          width: 800,
          height: 600,
        });
      } catch (error) {
        console.log('StudySnitch: Could not start ML camera:', error);
      }
      break;

    case 'getAttentionStatus':
      // Return current attention status (mock for now)
      sendResponse({
        success: true,
        status: {
          paying_attention: true,
          session_time: 0,
          distraction_count: 0,
        },
      });
      return true; // Keep channel open for async response

    default:
      console.log('StudySnitch: Unknown message action:', message.action);
  }

  sendResponse({ success: true });
});

console.log('StudySnitch: Enhanced background service worker loaded');
