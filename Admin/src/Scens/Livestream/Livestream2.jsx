// import { StreamVideoClient, StreamVideo, StreamCall, useCall } from "@stream-io/video-react-sdk";
// import { ParticipantView, useCallStateHooks } from "@stream-io/video-react-sdk";

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

// export default function Livestream2() {
//     return (
//         <StreamVideo client={client}>
//             <StreamCall call={call}>
//                 <LivestreamView2 />
//             </StreamCall>
//         </StreamVideo>
//     );
// }

// const LivestreamView2 = () => {
//     const call = useCall();
//     const { useIsCallLive, useLocalParticipant, useParticipantCount } = useCallStateHooks();

//     // Correct hooks usage
//     const totalParticipants = useParticipantCount();
//     const localParticipant = useLocalParticipant();
//     const isCallLive = useIsCallLive?.() || false; // Safely handle undefined useIsCallLive

//     return (
//         <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
//             <div
//                 style={{
//                     alignSelf: "flex-start",
//                     color: "white",
//                     backgroundColor: "blue",
//                     padding: "4px 6px",
//                 }}
//             >
//                 Live: {totalParticipants}
//             </div>
//             <div style={{ flex: 1 }}>
//                 {localParticipant ? (
//                     <ParticipantView participant={localParticipant} ParticipantViewUI={null} />
//                 ) : (
//                     <div>No participant data available</div>
//                 )}
//             </div>
//             <div style={{ alignSelf: "center" }}>
//                 {isCallLive ? (
//                     <button onClick={() => call?.stopLive()}>Stop Live</button>
//                 ) : (
//                     <button onClick={() => call?.goLive()}>Go Live</button>
//                 )}
//             </div>
//         </div>
//     );
// };

const Livestream2 = () =>{
    return(
        <>
        </>
    )
}

export default Livestream2;