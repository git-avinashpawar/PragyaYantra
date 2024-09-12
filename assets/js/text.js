//Import @google/generative-ai.
import { GoogleGenerativeAI } from "https://esm.run/@google/generative-ai";

// Import  API_KEY
import { AI_API_KEY } from "../config/config.js";

async function getResponse() {
  // Form Inputs
  document.getElementById("chatbox").style.removeProperty("border");
  const userInput = document.getElementById("userInput").value;
  const responseContainer = document.getElementById("responseContainer");
  const botResponse1 = document.getElementById("botResponse1");
  const botResponse = document.getElementById("botResponse");

  // Fetch your API_KEY
  const API_KEY = AI_API_KEY;
  // Make sure to include these imports:
  // import { GoogleGenerativeAI } from "@google/generative-ai";
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  var prompt = "Write a story about a magic backpack and a magic book.";

  if (userInput === "") {
    document.getElementById("userInput").placeholder = "Prompt Can't blank.";
    document.getElementById("chatbox").style.border = "2px solid #e00";
    return; // Exit the function if the input is blank
  } else {
    prompt = userInput;
  }
  document.getElementById("chatbox").classList.add("think");
  const result = await model.generateContent(prompt);

  //console.log(result.response.text());

  botResponse1.textContent = `Prompt: ${userInput}`;

  // Simulate bot response based on user input
  botResponse.innerHTML = result.response.text().replace(/\n/g, "<br>");

  document.getElementById("chatbox").classList.remove("think");
  // Show the response container
  responseContainer.style.display = "block";
}

document.getElementById("chat").onclick = function () {
  getResponse();
};
