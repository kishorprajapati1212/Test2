import React, { useState } from 'react';
import axios from 'axios';
import Theme, { GlobleVariable } from "../../Theme"

const VideoGenerator = () => {
    let apiKey = GlobleVariable.React_api;
    let Backend = GlobleVariable.Backend_url;
    console.log(apiKey)
    const [prompt, setPrompt] = useState('');
    const [resolution, setResolution] = useState('768p');
    const [videoUrl, setVideoUrl] = useState(null);

    const handleGenerateVideo = async () => {
        try {
            const response = await axios.post(`${Backend}/videogen`, {
                prompt,
                resolution
            });

            // Get the video path from the response
            const { videoPath } = response.data;
            // setVideoUrl(`${Backend}/video/${videoPath}`);
        } catch (error) {
            console.error('Error generating video:', error);
        }
    };

    return (
        <div>
            <h1>Generate Video</h1>
            <input 
                type="text" 
                value={prompt} 
                onChange={(e) => setPrompt(e.target.value)} 
                placeholder="Enter prompt" 
            />
            <select value={resolution} onChange={(e) => setResolution(e.target.value)}>
                <option value="768p">768p</option>
                <option value="384p">384p</option>
            </select>
            <button onClick={handleGenerateVideo}>Generate Video</button>

            {videoUrl && (
                <div>
                    <h3>Your Generated Video:</h3>
                    <video src={videoUrl} controls width="500" />
                </div>
            )}
        </div>
    );
};

export default VideoGenerator;
