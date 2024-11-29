import axios from "axios";
import React, { useState } from "react";

function TranslationApp() {
  const [translatedText, setTranslatedText] = useState("");
  const [originalState, setOriginalState] = useState(null);
  const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent";
  const API_KEY = "AIzaSyD587UAk2HSTexIcW6PrMlgZL60VbpfPTM"; // Your provided API key

  // JSON data you want to translate
  const jsonData = [
    {
      "stateId": "673ec56935823835327d243a",
      "state_name": "HIMACHAL PRADESH",
      "state_description": "The predominantly mountainous region comprising the present-day Himachal Pradesh has been inhabited since pre-historic times, having witnessed multiple waves of human migrations from other areas. Through its history, the region was mostly ruled by local kingdoms, some of which accepted the suzerainty of larger empires. Prior to India's independence from the British, Himachal comprised the hilly regions of the Punjab Province of British India. After independence, many of the hilly territories were organised as the Chief Commissioner's province of Himachal Pradesh, which later became a Union Territory. In 1966, hilly areas of the neighbouring Punjab state were merged into Himachal and it was ultimately granted full statehood in 1971.",
      "state_nickname": "DEV BHOOMI",
      "state_images": [
        "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD..."
      ]
    }
  ];

  const translateText = async () => {
    try {
      console.log("Sending request to Gemini API...");

      // Extract the description text from the JSON data
      const descriptionText = jsonData[0].state_description;
      const state_name = jsonData[0].state_name;
      const targetLanguage = "es"; // Example language code for Hindi

      // Generate a prompt to translate the text to the desired language
      const prompt = `Translate the following text into ${targetLanguage}: "${descriptionText}", "${state_name}"`;

      // Send the request using Axios to the Gemini API
      const response = await axios.post(
        `${API_URL}?key=${API_KEY}`,  // API URL with the API key in the query string
        {
          contents: [
            {
              parts: [
                {
                  text: prompt, // Send the translation prompt
                },
              ],
            },
          ],
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Response from Gemini API:", response.data);

      // Check if the response contains translated content and only get the translated text
      if (response.data.candidates && response.data.candidates.length > 0) {
        // Extract only the translated content and ignore any additional explanation
        setTranslatedText(response.data.candidates[0].content.parts[0].text.trim());
        setOriginalState(jsonData[0]); // Store the original data
      } else {
        setTranslatedText("No translation available");
        setOriginalState(jsonData[0]);
      }

    } catch (error) {
      console.error("Translation Error:", error);
      setTranslatedText("Error occurred during translation.");
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      {/* Header Section */}
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Gemini AI Translation Test</h1>

      {/* Button Section */}
      <button
        onClick={translateText}
        style={{
          padding: "10px 20px",
          backgroundColor: "blue",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Translate State Description
      </button>

      {/* Original State Name Section */}
      {originalState && (
        <div style={{ marginTop: "20px" }}>
          <h3>Original State: {originalState.state_name}</h3>
        </div>
      )}

      {/* Original State Description Section */}
      {originalState && (
        <div style={{ marginTop: "10px", padding: "10px", border: "1px solid #ccc" }}>
          <h4>Original Description:</h4>
          <p>{originalState.state_description}</p>
        </div>
      )}

      {/* Translated Description Section */}
      {translatedText && (
        <div style={{ marginTop: "20px", padding: "10px", border: "1px solid #ccc" }}>
          <h4>Translated Description:</h4>
          <p>{translatedText}</p>
        </div>
      )}
    </div>
  );
}

export default TranslationApp;
