// Function to filter posts based on AI-related keywords (e.g., 'AI', 'artificial intelligence').
function filterAIPosts() {
    const posts = document.querySelectorAll("[data-id^='urn:li:activity:']");
    const aiKeywords = ["AI", "artificial intelligence"];
  
    for (const post of posts) {
      const postText = post.textContent.toLowerCase();
      if (aiKeywords.some(keyword => postText.includes(keyword.toLowerCase()))) {
        post.style.border = "2px solid green"; // Add a green border to visually indicate filtered posts.
        addCommentOptions(post);
      }
    }
  }
  
  // Function to add comment options to filtered posts using ChatGPT API.
  async function addCommentOptions(post) {
    const API_KEY = "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"; // Replace with your actual API key.
    const promptText = "What comment would you like to add?";
    const options = ["Option 1", "Option 2", "Option 3"]; // Replace with your comment options.
  
    // Call the ChatGPT API here to get suggestions for each post.
    // You'll need to use an HTTP library (e.g., fetch) to make the API call.
  
    // For example, using fetch:
    const response = await fetch("https://api.openai.com/v1/engines/text-davinci-002/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        prompt: promptText,
        max_tokens: 100,
        temperature: 0.7,
        n: 3 // Generate 3 suggestions for each post.
      })
    });
  
    if (response.ok) {
      const data = await response.json();
      const suggestions = data.choices.map(choice => choice.text.trim());
      const suggestionsList = document.createElement("ul");
  
      for (const suggestion of suggestions) {
        const listItem = document.createElement("li");
        listItem.textContent = suggestion;
        suggestionsList.appendChild(listItem);
      }
  
      post.appendChild(suggestionsList);
    }
  }
  
  // Listen for messages from the popup to apply the AI filter.
  chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.action === "filterAI") {
      filterAIPosts();
    }
  });
  