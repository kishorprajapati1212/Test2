import axios from 'axios';

const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent";
const API_KEY = "AIzaSyD587UAk2HSTexIcW6PrMlgZL60VbpfPTM"; // Your API key

export const Chatboat = async({state, places, selectedBudget}) =>{
    console.log(places)
    console.log(state)
    console.log(selectedBudget)

  // Check if places are provided and have the correct structure
  if (!places || places.length === 0) {
    console.log("No places provided");
    return;  // Exit if no places are provided
  }

  // Constructing the list of places to be included in the prompt   
  const placesList = await places.map(place => place.place_name).join(", ");
//   console.log("placeList",placesList)
  // Ensure there is a valid list of places to display in the prompt
  if (!placesList) {
    console.log("Places list is empty");
    return;  // Exit if the list is still empty
  }

  const prompt = `
  You are a travel assistant helping a user plan a trip to Himachal Pradesh with a budget of ₹${selectedBudget}.
  Suggest a single destination from the following list of places: ${placesList}.
  Provide the following details:
  1. Destination name
  2. Estimated cost to reach (only the number)
  3. Estimated food expenses (only the number)
  4. Estimated rent for stay (only the number)
  Ensure the total costs do not exceed ₹${selectedBudget}, focusing on utilizing the full budget.
`;

  

//   console.log("Prompt:", prompt);

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

    console.log("Response from Gemini API:", response.data);
    const chatbotreply = response.data;  // Modify based on API response structure
    return chatbotreply;
}