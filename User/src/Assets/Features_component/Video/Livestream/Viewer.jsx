import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";

const Viewer = () => {
  const videoRef = useRef(null);
  const [isStreamAvailable, setIsStreamAvailable] = useState(false);
  const socket = useRef(null);
  const peerConnection = useRef(null);
  const ROOM_ID = "room123"; // Example room ID

  useEffect(() => {
    socket.current = io("https://livestreamonlyone.onrender.com", {
      transports: ["websocket", "polling"],
    });

    peerConnection.current = new RTCPeerConnection({
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    });

    socket.current.emit("join-room", ROOM_ID);

    socket.current.on("offer", async (offer) => {
      await peerConnection.current.setRemoteDescription(new RTCSessionDescription(offer));
      const answer = await peerConnection.current.createAnswer();
      await peerConnection.current.setLocalDescription(answer);
      socket.current.emit("answer", answer, ROOM_ID);
    });

    peerConnection.current.ontrack = (event) => {
      if (event.streams[0]) {
        videoRef.current.srcObject = event.streams[0];
        videoRef.current.play().catch((err) => console.error("Play error:", err));
        setIsStreamAvailable(true);
      }
    };

    socket.current.on("ice-candidate", async (candidate) => {
      if (candidate) {
        try {
          await peerConnection.current.addIceCandidate(candidate);
        } catch (error) {
          console.error("Error adding ICE candidate:", error);
        }
      }
    });

    return () => {
      socket.current.disconnect();
      peerConnection.current.close();
    };
  }, []);

  return (
    <div>
      <h1>Viewer</h1>
      <video ref={videoRef} autoPlay playsInline style={{ width: "100%", height: "400px", objectFit: "contain" }} />
      <div>{isStreamAvailable ? "Stream is live!" : "Waiting for stream..."}</div>
    </div>
  );
};

export default Viewer;