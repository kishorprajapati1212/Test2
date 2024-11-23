// import { useEffect, useState } from "react";
// import { StreamVideoClient, StreamVideo, StreamCall } from "@stream-io/video-react-sdk";
// import { ParticipantView, useCallStateHooks, useStreamVideoClient } from "@stream-io/video-react-sdk";

// // API and user credentials
// const apiKey = "mmhfdzb5evj2";
// const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL3Byb250by5nZXRzdHJlYW0uaW8iLCJzdWIiOiJ1c2VyL0NhcHRhaW5fUmV4IiwidXNlcl9pZCI6IkNhcHRhaW5fUmV4IiwidmFsaWRpdHlfaW5fc2Vjb25kcyI6NjA0ODAwLCJpYXQiOjE3MzIxMTYzMTcsImV4cCI6MTczMjcyMTExN30.Pmadd5ojDJQmOSAlsYnGIOX-14SwBd3MbIoZr7TYGtM";
// const userId = "Captain_Rex";
// const callId = "ZWztmv9sCnmC";

// // Create user and client
// const user = { id: userId, name: "Tutorial" };
// const client = new StreamVideoClient({ apiKey, user, token });
// const call = client.call("livestream", callId);
// call.join({ create: true });

// export default function Livestream() {
//   return (
//     <StreamVideo client={client}>
//       <StreamCall call={call}>
//         <LivestreamView />
//       </StreamCall>
//     </StreamVideo>
//   );
// }

// const LivestreamView = () => {
//   const {
//     useCameraState,
//     useMicrophoneState,
//     useParticipantCount,
//     useIsCallLive,
//     useParticipants,
//   } = useCallStateHooks();

//   const { camera: cam, isEnabled: isCamEnabled } = useCameraState();
//   const { microphone: mic, isEnabled: isMicEnabled } = useMicrophoneState();
//   const participantCount = useParticipantCount();
//   const isLive = useIsCallLive();
//   const [firstParticipant] = useParticipants();

//   return (
//     <div style={{ display: "flex", flexDirection: 'column', gap: '4px' }}>
//       <div>{isLive ? `Live: ${participantCount}` : `In Backstage`}</div>
//       {firstParticipant ? (
//         <ParticipantView
//         participant={firstParticipant}
//         style={{ width: '100%', height: 'auto', maxWidth: '100%', maxHeight: '500px', border:"1px solid black" }}
//       />
      
//       ) : (
//         <div>The host hasn't joined yet</div>
//       )}
      
//       {/* Control buttons for camera and microphone */}
//       <div style={{ display: 'flex', gap: '4px' }}>
//         <button onClick={() => (isLive ? call.stopLive() : call.goLive())}>
//           {isLive ? "Stop Live" : "Go Live"}
//         </button>
//         <button onClick={() => cam.toggle()}>
//           {isCamEnabled ? "Disable Camera" : "Enable Camera"}
//         </button>
//         <button onClick={() => mic.toggle()}>
//           {isMicEnabled ? "Mute Mic" : "Unmute Mic"}
//         </button>
//       </div>
//     </div>
//   );
// };


const Livestream = () =>{
  return(
    <>
    </>
  )
}

export default Livestream;