import React, { useEffect, useState } from "react";
import {
  StreamVideoClient,
  StreamVideo,
  StreamCall,
} from "@stream-io/video-react-sdk";

const Livestream3 = () => {
  const apiKey = "mmhfdzb5evj2"; // Your API Key
  const userId = "bold-wood-2"; // Matches user_id in the token
  const userToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiYm9sZC13b29kLTIiLCJpYXQiOjE2ODkzMjIwMDAsImV4cCI6MTY4OTkxNzgwMH0.XXXXX"; // Replace with a valid token
  const callId = "livestream_e8509f91-7c12-4a8a-ab8a-d7012b4c5b1f"; // Livestream ID

  const [client, setClient] = useState(null);
  const [call, setCall] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeLivestream = async () => {
      try {
        const videoClient = new StreamVideoClient({
          apiKey,
          user: { id: userId },
          token: userToken,
          options: { logLevel: "warn" },
        });

        const livestreamCall = videoClient.call("livestream", callId);

        // Attempt to join the call
        await livestreamCall.join();

        setClient(videoClient);
        setCall(livestreamCall);
        setLoading(false);
      } catch (err) {
        console.error("Error initializing livestream:", err);
        setError("Failed to load livestream. Please check your settings.");
        setLoading(false);
      }
    };

    initializeLivestream();

    // Cleanup on component unmount
    return () => {
      if (client) {
        client.disconnectUser().catch((err) => console.error("Error disconnecting user:", err));
      }
      if (call) {
        call.leave().catch((err) => console.error("Error leaving call:", err));
      }
    };
  }, [apiKey, userId, userToken, callId, client, call]);

  if (loading) {
    return <p>Loading livestream...</p>;
  }

  if (error) {
    return <p style={{ color: "red", textAlign: "center" }}>{error}</p>;
  }

  return client && call ? (
    <StreamVideo client={client}>
      <StreamCall call={call}>
        <div style={{ textAlign: "center", padding: "20px" }}>
          <h2>Livestream Viewer</h2>
          <p>Enjoy the stream!</p>
          <div
            style={{
              width: "100%",
              height: "500px",
              border: "1px solid #ccc",
              borderRadius: "8px",
              backgroundColor: "#f9f9f9",
            }}
          >
            {/* Placeholder for livestream */}
            <p style={{ lineHeight: "500px", color: "#666" }}>Live video will appear here.</p>
          </div>
        </div>
      </StreamCall>
    </StreamVideo>
  ) : (
    <p>Unable to join the livestream. Please try again later.</p>
  );
};

export default Livestream3;
