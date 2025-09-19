// StudySnitch Camera Monitor JavaScript

function startMLCamera() {
  // Try to launch the Python ML script via a task or direct command
  showStatus('Starting ML Camera System...', 'info');

  // Method 1: Try to trigger the VS Code task
  try {
    chrome.tabs.create(
      {
        url: 'http://localhost:8501',
      },
      (tab) => {
        if (chrome.runtime.lastError) {
          // If direct browser doesn't work, try running the script
          chrome.runtime.sendMessage({
            action: 'startMLCamera',
          });
        } else {
          showStatus('Camera system opened in new tab', 'success');
        }
      }
    );
  } catch (error) {
    // Fallback: send message to background script to handle
    chrome.runtime.sendMessage({
      action: 'startMLCamera',
    });
  }
}

function openDashboard() {
  showStatus('Opening Analytics Dashboard...', 'info');

  // Open the Streamlit analytics dashboard
  chrome.tabs.create(
    {
      url: 'http://localhost:8502',
    },
    (tab) => {
      if (chrome.runtime.lastError) {
        showStatus(
          'Dashboard failed to open. Ensure backend is running.',
          'error'
        );
      } else {
        showStatus('Analytics dashboard opened', 'success');
      }
    }
  );
}

function showStatus(message, type) {
  // Create or update status display
  let statusDiv = document.getElementById('statusMessage');
  if (!statusDiv) {
    statusDiv = document.createElement('div');
    statusDiv.id = 'statusMessage';
    statusDiv.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      padding: 12px 20px;
      border-radius: 8px;
      font-weight: 500;
      z-index: 1000;
      transition: all 0.3s ease;
    `;
    document.body.appendChild(statusDiv);
  }

  // Style based on type
  const styles = {
    success: 'background: rgba(76, 175, 80, 0.9); color: white;',
    error: 'background: rgba(244, 67, 54, 0.9); color: white;',
    info: 'background: rgba(33, 150, 243, 0.9); color: white;',
  };

  statusDiv.style.cssText += styles[type] || styles.info;
  statusDiv.textContent = message;

  // Auto hide after 3 seconds
  setTimeout(() => {
    if (statusDiv.parentNode) {
      statusDiv.remove();
    }
  }, 3000);
}

function updateSystemStatus() {
  // Check if backend systems are running
  const statusCard = document.querySelector('.status-card');

  // Test ML Camera system
  fetch('http://localhost:8501')
    .then(() => {
      document.getElementById('startCameraBtn').innerHTML =
        '🟢 ML Camera Ready - Click to Start';
      document.getElementById('startCameraBtn').style.background =
        'linear-gradient(45deg, #4caf50, #45a049)';
    })
    .catch(() => {
      document.getElementById('startCameraBtn').innerHTML =
        '🔴 Start ML Camera System';
      document.getElementById('startCameraBtn').style.background =
        'linear-gradient(45deg, #ff5722, #e64a19)';
    });

  // Test Analytics Dashboard
  fetch('http://localhost:8502')
    .then(() => {
      document.getElementById('openDashboardBtn').innerHTML =
        '🟢 Analytics Ready - Click to Open';
      document.getElementById('openDashboardBtn').style.background =
        'linear-gradient(45deg, #2196f3, #1976d2)';
    })
    .catch(() => {
      document.getElementById('openDashboardBtn').innerHTML =
        '🔴 Open Analytics Dashboard';
      document.getElementById('openDashboardBtn').style.background =
        'linear-gradient(45deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.3))';
    });
}

function loadStatistics() {
  // Try to get statistics from storage or API
  try {
    // Simulated statistics for now - in real app would fetch from backend
    const stats = {
      attentionTime: Math.floor(Math.random() * 120) + 30, // 30-150 minutes
      sessionCount: Math.floor(Math.random() * 10) + 1, // 1-10 sessions
      distractionCount: Math.floor(Math.random() * 15), // 0-15 distractions
      efficiencyRate: Math.floor(Math.random() * 40) + 60, // 60-100%
    };

    // Try to get real data from backend storage
    fetch('http://localhost:5001/stats')
      .then((response) => response.json())
      .then((data) => {
        if (data && data.success) {
          updateStatsDisplay(data.stats);
        } else {
          updateStatsDisplay(stats);
        }
      })
      .catch(() => {
        // Use simulated data if backend not available
        updateStatsDisplay(stats);
      });
  } catch (error) {
    console.log('Could not load statistics:', error);
    // Show placeholder values
    updateStatsDisplay({
      attentionTime: '--',
      sessionCount: '--',
      distractionCount: '--',
      efficiencyRate: '--%',
    });
  }
}

function updateStatsDisplay(stats) {
  document.getElementById('attentionTime').textContent = stats.attentionTime;
  document.getElementById('sessionCount').textContent = stats.sessionCount;
  document.getElementById('distractionCount').textContent =
    stats.distractionCount;
  document.getElementById('efficiencyRate').textContent =
    typeof stats.efficiencyRate === 'number'
      ? stats.efficiencyRate + '%'
      : stats.efficiencyRate;
}

function startRealTimeUpdates() {
  // Get real-time data from storage if available
  setInterval(() => {
    try {
      // Try to get current attention status
      chrome.runtime.sendMessage(
        {
          action: 'getAttentionStatus',
        },
        (response) => {
          if (response && response.status) {
            updateAttentionDisplay(response.status);
          }
        }
      );
    } catch (error) {
      console.log('Real-time updates not available:', error);
    }
  }, 2000);
}

function updateAttentionDisplay(status) {
  const statusCard = document.querySelector('.status-card');
  const statusText = status.paying_attention
    ? '✅ Paying Attention'
    : '⚠️ Distracted';
  const statusColor = status.paying_attention ? '#4caf50' : '#ff5722';

  statusCard.innerHTML = `
    <h2>Real-time Attention Tracking</h2>
    <div style="color: ${statusColor}; font-size: 18px; margin: 10px 0;">
      ${statusText}
    </div>
    <p>Monitor your focus and attention levels during study sessions</p>
  `;
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', () => {
  console.log('StudySnitch Camera Monitor loaded');

  // Add event listeners for buttons
  document
    .getElementById('startCameraBtn')
    .addEventListener('click', startMLCamera);
  document
    .getElementById('openDashboardBtn')
    .addEventListener('click', openDashboard);

  // Check system status
  updateSystemStatus();

  // Load statistics
  loadStatistics();

  // Start real-time updates
  startRealTimeUpdates();

  // Update stats every 30 seconds
  setInterval(loadStatistics, 30000);

  showStatus('Camera Monitor initialized', 'success');
});
