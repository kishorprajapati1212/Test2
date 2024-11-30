// translateText.jsx
import axios from 'axios';

const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent";
const API_KEY = "AIzaSyD587UAk2HSTexIcW6PrMlgZL60VbpfPTM"; // Your API key

export const translateText = async (content, language) => {
  try {
    // console.log("Trnaslation Language:", language);
    // console.log("Trnaslation content:", content);

    const prompt = `Translate the following text into ${language}: "${content}"`;

    const response = await axios.post(
      `${API_URL}?key=${API_KEY}`,
      {
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    // console.log("Response from Gemini API:", response.data);
    const translatedText = response.data;  // Modify based on API response structure
    return translatedText;
  } catch (error) {
    console.error("Error:", error);
    return text;
  }
};
 