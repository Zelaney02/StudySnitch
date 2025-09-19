// Save options to Chrome storage
function saveOptions() {
  const apiKey = document.getElementById('apiKey').value;

  if (!apiKey.trim()) {
    showStatus('Please enter an API key', false);
    return;
  }

  chrome.storage.sync.set(
    {
      openaiApiKey: apiKey,
    },
    function () {
      showStatus('Settings saved successfully!', true);
      // Clear the input for security
      document.getElementById('apiKey').value = '';
    }
  );
}

// Load saved options
function loadOptions() {
  chrome.storage.sync.get(['openaiApiKey'], function (result) {
    if (result.openaiApiKey) {
      // Don't show the actual key for security, just indicate it's set
      showStatus('API key is currently configured', true);
    }
  });
}

// Show status message
function showStatus(message, isSuccess) {
  const status = document.getElementById('status');
  status.textContent = message;
  status.className = isSuccess ? 'status success' : 'status error';

  setTimeout(() => {
    status.textContent = '';
    status.className = '';
  }, 3000);
}

// Event listeners
document.addEventListener('DOMContentLoaded', loadOptions);
document.getElementById('save').addEventListener('click', saveOptions);

// Allow Enter key to save
document.getElementById('apiKey').addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    saveOptions();
  }
});
