import axios from "axios";
import React, { useState } from "react";

function TranslationApp2() {
  const [translatedText, setTranslatedText] = useState("");
  const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent";
  const API_KEY = "AIzaSyD587UAk2HSTexIcW6PrMlgZL60VbpfPTM"; // Your provided API key

  // JSON data you want to translate
  const jsonData = [
    {
      "stateId": "673ec56935823835327d243a",
      "state_name": "HIMACHAL PRADESH",
      "state_description": "The predominantly mountainous region comprising the present-day Himachal Pradesh has been inhabited since pre-historic times, having witnessed multiple waves of human migrations from other areas.[12] Through its history, the region was mostly ruled by local kingdoms, some of which accepted the suzerainty of larger empires. Prior to India's independence from the British, Himachal comprised the hilly regions of the Punjab Province of British India. After independence, many of the hilly territories were organised as the Chief Commissioner's province of Himachal Pradesh, which later became a Union Territory. In 1966, hilly areas of the neighbouring Punjab state were merged into Himachal and it was ultimately granted full statehood in 1971.",
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
      const targetLanguage = "hi"; // Example language code for Hindi

      // Generate a prompt to translate the text to the desired language
      const prompt = `Translate the following text into ${targetLanguage}: "${descriptionText}"`;

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
      
      // Extract the translated text from the response
      if (response.data.candidates && response.data.candidates.length > 0) {
        setTranslatedText(response.data.candidates[0].content.parts[0].text); // Get translated text
      } else {
        setTranslatedText("No translation available");
      }

    } catch (error) {
      console.error("Translation Error:", error);
      setTranslatedText("Error occurred during translation.");
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Gemini AI Translation Test</h1>
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
      {translatedText && (
        <div style={{ marginTop: "20px", padding: "10px", border: "1px solid #ccc" }}>
          <h3>Translated Text:</h3>
          <p>{translatedText}</p> {/* Display the translated text */}
        </div>
      )}
    </div>
  );
}

export default TranslationApp2;
