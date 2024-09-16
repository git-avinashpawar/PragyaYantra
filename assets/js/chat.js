// Important note Gemini tracks the history itself no need to push messages in history on your own

//Import @google/generative-ai.
import { GoogleGenerativeAI } from "https://esm.run/@google/generative-ai";

// Import Marked
import { marked } from "https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js";

// Import  AI_ABCD
import { ABCD } from "../config/config.js";

let history = [
  {
    role: "user",
    parts: [{ text: "Hello" }],
  },
  {
    role: "model",
    parts: [{ text: "Great to meet you. What would you like to know?" }],
  },
];

async function getResponse(message) {
  // Fetch your AI_ABCD
  const AI_ABCD = ABCD;
  // Make sure to include these imports:
  // import { GoogleGenerativeAI } from "@google/generative-ai";
  const genAI = new GoogleGenerativeAI(AI_ABCD);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const chat = model.startChat({
    history: history,
  });
  let result = await chat.sendMessage(message);
  var aiMessage = result.response.text();
  console.log(aiMessage);
  return aiMessage;
}

async function sendMessage() {
  const input = document.getElementById("userInput");
  const message = input.value.trim();

  if (message === "") return;
  document.getElementById("chatbox").classList.add("think");
  document.getElementById("info").style.display = "none";
  // Add user message with profile picture
  addChatBubble(
    message,
    "user-bubble",
    "user-container",
    "./assets/img/user.png"
  );

  //Write function to get ai resonse
  var aiMessage = await getResponse(message);
  // var aiMessage = "To give you the best suggestions, I need to know more";
  // Simulate AI response (replace with actual AI integration)

  addChatBubble(
    aiMessage,
    "ai-bubble",
    "ai-container",
    "./assets/img/artificial-intelligence.png"
  );
  document.getElementById("chatbox").classList.remove("think");
  input.value = ""; // Clear input after sending message
  input.focus();
  console.log(history);
}

function addChatBubble(text, bubbleClass, containerClass, profilePic) {
  const chatContainer = document.getElementById("chat");
  const bubbleContainer = document.createElement("div");
  bubbleContainer.classList.add("chat-bubble-container", containerClass);

  // Profile Picture
  const img = document.createElement("img");
  img.src = profilePic;
  img.alt = "Profile";
  img.classList.add("profile-pic");

  // Chat Bubble
  const bubble = document.createElement("div");
  bubble.classList.add("chat-bubble", bubbleClass);
  bubble.innerHTML = marked.parse(text);

  // Append image and bubble to the container
  if (containerClass === "user-container") {
    bubbleContainer.appendChild(bubble);
    bubbleContainer.appendChild(img); // User picture on the right
  } else {
    bubbleContainer.appendChild(img); // AI picture on the left
    bubbleContainer.appendChild(bubble);
  }

  chatContainer.appendChild(bubbleContainer);

  // Scroll to bottom of chat
  chatContainer.scrollTop = chatContainer.scrollHeight;
}

document.getElementById("send").onclick = function () {
  sendMessage();
};
