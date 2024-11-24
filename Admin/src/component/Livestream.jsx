import React, { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:1414"); // Replace with your backend URL

const Livestream = () => {
  const localVideoRef = useRef(null); // For broadcaster's video
  const remoteVideoRef = useRef(null); // For viewer's video
  const [isBroadcaster, setIsBroadcaster] = useState(false);
  const [broadcasterId, setBroadcasterId] = useState(null);
  const peerConnectionRef = useRef(null); // WebRTC peer connection

  useEffect(() => {
    // Handle signaling
    socket.on("broadcaster", (id) => {
      setBroadcasterId(id); // Set the broadcaster ID
    });

    socket.on("signal", ({ from, signalData }) => {
      if (peerConnectionRef.current) {
        peerConnectionRef.current.setRemoteDescription(new RTCSessionDescription(signalData));
        if (signalData.type === "offer") {
          // Respond with an answer if it's an offer
          peerConnectionRef.current
            .createAnswer()
            .then((answer) => peerConnectionRef.current.setLocalDescription(answer))
            .then(() => {
              socket.emit("signal", { to: from, signalData: peerConnectionRef.current.localDescription });
            });
        }
      }
    });

    socket.on("user-disconnected", (id) => {
      if (id === broadcasterId) {
        setBroadcasterId(null); // Clear the broadcaster if they disconnect
      }
    });

    return () => {
      socket.disconnect(); // Clean up socket on unmount
    };
  }, [broadcasterId]);

  const startBroadcast = () => {
    setIsBroadcaster(true);

    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream; // Show broadcaster's video
        }

        socket.emit("broadcaster"); // Notify the server this user is the broadcaster

        // Setup WebRTC for viewers
        peerConnectionRef.current = new RTCPeerConnection();
        stream.getTracks().forEach((track) => peerConnectionRef.current.addTrack(track, stream));

        peerConnectionRef.current.onicecandidate = (event) => {
          if (event.candidate) {
            socket.emit("signal", { to: broadcasterId, signalData: event.candidate });
          }
        };

        peerConnectionRef.current
          .createOffer()
          .then((offer) => peerConnectionRef.current.setLocalDescription(offer))
          .then(() => {
            socket.emit("signal", { to: broadcasterId, signalData: peerConnectionRef.current.localDescription });
          });
      });
  };

  const joinBroadcast = () => {
    if (!broadcasterId) {
      alert("No livestream is currently available.");
      return;
    }

    // Setup WebRTC to receive stream
    peerConnectionRef.current = new RTCPeerConnection();
    peerConnectionRef.current.ontrack = (event) => {
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = event.streams[0]; // Show viewer's video
      }
    };

    peerConnectionRef.current.onicecandidate = (event) => {
      if (event.candidate) {
        socket.emit("signal", { to: broadcasterId, signalData: event.candidate });
      }
    };

    socket.emit("signal", { to: broadcasterId, signalData: peerConnectionRef.current.localDescription });
  };

  return (
    <div>
      <h1>Livestream</h1>
      {isBroadcaster ? (
        <video ref={localVideoRef} autoPlay muted style={{ width: "400px", border: "2px solid black" }} />
      ) : (
        <video ref={remoteVideoRef} autoPlay style={{ width: "400px", border: "2px solid black" }} />
      )}
      <div style={{ marginTop: "20px" }}>
        {broadcasterId ? (
          !isBroadcaster && (
            <button onClick={joinBroadcast} style={{ padding: "10px" }}>
              Join Livestream
            </button>
          )
        ) : (
          <button onClick={startBroadcast} style={{ padding: "10px" }}>
            Start Livestream
          </button>
        )}
      </div>
    </div>
  );
};

export default Livestream;
