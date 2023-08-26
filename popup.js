document.addEventListener("DOMContentLoaded", function () {
  // Add the event listener to the button after the DOM has loaded.
  document.getElementById("filterButton").addEventListener("click", filterPosts);
});

// Function to send a message to the content script to apply the AI filter.
function filterPosts() {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { action: "filterAI" });
  });
}
