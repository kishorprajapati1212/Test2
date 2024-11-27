// VideoGenerator.js
import React, { useState } from 'react';
import { Box, Button, Skeleton, Typography } from '@mui/material';
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
// import { handleSubmit } from '../Component/Functions/Videoexternal_Fun';
// import { fetchVideo } from '../Component/Functions/Videoexternal_Fun';
// import { handleFileUpload } from '../Component/Functions/Videoexternal_Fun';
import { getuser } from '../Component/Navbar';
import Theme, { GlobleVariable } from "../../Theme"
import axios from 'axios';


const Videogen = () => {
    let currentindex = 0;
    let apiKey = GlobleVariable.React_api;
    let Backend_url = GlobleVariable.Backend_url;
    const [inputFile, setInputFile] = useState(null);
    const [videoUrl, setVideoUrl] = useState(null);
    const [generatedId, setGeneratedId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [fileName, setFileName] = useState('') // State to store file name
    const userdata = getuser()
    // console.log(userdata.newuser._id)
    console.log(apiKey)

 
    const handleChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const fileType = file.type;
            const acceptedFileTypes = ['image/jpeg', 'image/png'];

            // Validate file format
            if (!acceptedFileTypes.includes(fileType)) {
                setErrorMessage('Only JPEG and PNG formats are allowed.');
                e.target.value = ''; // Reset file input
                return;
            }

            // Validate image dimensions
            const img = new Image();
            img.onload = () => {
                const { width, height } = img;
                const acceptedSizes = [
                    { width: 1024, height: 576 },
                    { width: 576, height: 1024 },
                    { width: 768, height: 768 },
                ];

                const isValidSize = acceptedSizes.some(
                    (size) => width === size.width && height === size.height
                );

                if (!isValidSize) {
                    setErrorMessage(
                        'Invalid image size. Only 1024x576, 576x1024, or 768x768 are allowed.'
                    );
                    e.target.value = ''; // Reset file input
                } else {
                    setInputFile(file);
                    setFileName(file.name); // Set the file name when the file is selected
                    setErrorMessage(''); // Reset error message if the file is valid
                }
            };

            img.onerror = () => {
                setErrorMessage('Unable to read image file.');
                e.target.value = ''; // Reset file input
            };

            img.src = URL.createObjectURL(file);
        }
    };

    const handleSubmit = async (e) => {
        if (e) {
            e.preventDefault();
        }

        setLoading(true);
        setErrorMessage('');
        setVideoUrl('');

        const checkcredit = await axios.post(`${Backend_url}/checkcredit`, userdata)
            if (checkcredit.data.mtype === "warning") {
                console.log("error")
                setError("Insficiant Credits")
                setLoading(false)
                return 0
            } else if (checkcredit.data.mtype === "fail") {
                setError("Please Login First")
                return 0
            }
        
        const data = new FormData();
        data.append('image', inputFile);
        data.append('seed', 0);
        data.append('cfg_scale', 1.8);
        data.append('motion_bucket_id', 127);

        try {
           console.log(apiKey)
            const response = await axios.post(
                'https://api.stability.ai/v2beta/image-to-video',
                data,
                {
                    headers: {
                        Authorization: `Bearer ${apiKey}`,
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );

            // Check the response status for errors
            if (response.data && response.data.errors) {
                const error = response.data.errors[0];
                setErrorMessage(error); // Display the error message from the response
                return;
            }

            // If everything is successful, set the generated ID
            setGeneratedId(response.data.id);
        } catch (error) {
            console.error('Error submitting form:', error);

            // Check if error has a response object (from Axios)
            if (error.response && error.response.data) {    
                const { name, errors } = error.response.data;
                if (errors && errors.length > 0) {
                    const errorMessage = errors[0]; // Take the first error message
                    const truncatedErrorMessage = errorMessage.length > 50 ? errorMessage.slice(0, 50) + '...' : errorMessage;
                    // currentindex += 1;
                    // apiKey = apiget(currentindex);
                    // handleSubmit()
                    setErrorMessage(truncatedErrorMessage);
                    setLoading(false);

                    return;
                } else {
                    setErrorMessage(`Error: ${name}`);
                }
            } else {
                setErrorMessage(`  ${error.message || 'Unknown error occurred.'}`);
            }
        }


    };

    // Function to fetch the video once the ID is generated
    const fetchVideo = async (generatedId) => {
        try {
            const response = await axios.get(
                `https://api.stability.ai/v2beta/image-to-video/result/${generatedId}`,
                {
                    headers: {
                        Authorization: `Bearer ${apiKey}`,
                        Accept: 'video/*',
                    },
                    responseType: 'blob',
                }
            );

            if (response.status === 202) {
                setTimeout(() => fetchVideo(generatedId), 10000);
            } else if (response.status === 200) {
                console.log(userdata)
                console.log(generatedId)
                const savethedata = await axios.post(`${Backend_url}/genrateduserdata`, { userdata, generatedId });
                const videoBlob = response.data;
                const url = URL.createObjectURL(videoBlob);
                setVideoUrl(url);
                setLoading(false);
            } else {
                setLoading(false);
                throw new Error(`Response ${response.status}: ${response.data.toString()}`);
            }
        } catch (error) {
            setErrorMessage(`Error fetching video: ${error.message}`);
            setLoading(false);

        }
    };

    // Use effect to fetch video once the ID is generated
    React.useEffect(() => {
        if (generatedId) {
            fetchVideo(generatedId);
        }
    }, [generatedId]);

    return (
        <Box sx={{
            background: `linear-gradient(135deg, ${Theme.primary[10]} 0%, ${Theme.primary[100]} 100%)`,
            // width: "100%", 
            padding: '30px',
            borderRadius: '12px',
            boxShadow: '0px 10px 20px rgba(0,0,0,0.3)',
            overflow: 'hidden',
            position: 'relative',
            color: Theme.white[100],
        }}>
            <Box sx={{ maxWidth: '700px', margin: '0 auto' }}>
                <Typography variant="h4" sx={{
                    color: Theme.secondary[100], 
                    fontWeight: 'bold',
                    textShadow: '0px 4px 10px rgba(113, 163, 193, 0.5)',
                    textAlign: 'center'
                }}>
                    Video Generator
                </Typography>
                {errorMessage && (
                    <Typography color="error" sx={{ marginTop: '10px', textAlign: 'center' }}>
                        {errorMessage}
                    </Typography>
                )}
                <form onSubmit={handleSubmit} style={{ textAlign: 'center', marginTop: '30px' }}>
                    <input
                        type="file"
                        id="file-upload"
                        style={{ display: 'none' }}
                        accept="image/jpeg, image/png"
                        onChange={handleChange}
                    />
                    <label htmlFor="file-upload">
                        <Box sx={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '10px',
                            backgroundColor: Theme.primary[100],
                            border: `2px dashed ${Theme.secondary[100]}`,
                            padding: '20px 30px',
                            borderRadius: '10px',
                            color: Theme.white[100],
                            fontSize: '18px',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            transition: 'all 0.4s ease',
                            "&:hover": {
                                transform: 'scale(1.1)',
                                background: `linear-gradient(135deg, ${Theme.secondary[100]} 0%, ${Theme.primary[10]} 100%)`,
                                color: Theme.white[100]
                            },
                        }}>
                            <AddPhotoAlternateOutlinedIcon sx={{ fontSize: "40px", color: Theme.secondary[100] }} />
                            {fileName || "Upload Image"}
                        </Box>
                    </label>
                    <Button
                        type="submit"
                        disabled={loading}
                        sx={{
                            display: 'block',
                            width: '100%',
                            marginTop: '20px',
                            padding: '12px',
                            borderRadius: '8px',
                            background: `linear-gradient(45deg, ${Theme.secondary[100]}, ${Theme.primary[10]})`,
                            color: Theme.white[100],
                            fontWeight: 'bold',
                            boxShadow: '0px 6px 15px rgba(113, 163, 193, 0.4)',
                            cursor: loading ? 'not-allowed' : 'pointer',
                            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                            "&:hover": {
                                transform: loading ? 'none' : 'scale(1.05)',
                                boxShadow: loading ? 'none' : '0px 8px 20px rgba(113, 163, 193, 0.6)',
                            }
                        }}
                    >
                        {loading ? 'Generating...' : 'Generate'}
                    </Button>
                </form>
                <Box sx={{ height: videoUrl ? "auto" : "300px", marginTop: '30px' }}>
                    {loading && !errorMessage && (
                        <Skeleton variant="rectangular" width="100%" height={300} animation="wave" sx={{ backgroundColor: Theme.grey[100] }} />
                    )}
                    {videoUrl && (
                        <Box sx={{ marginTop: '20px', textAlign: 'center' }}>
                            <video controls width="100%" style={{ borderRadius: '10px', boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.2)' }}>
                                <source src={videoUrl} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                            <Button
                                sx={{
                                    marginTop: '15px',
                                    padding: '10px 20px',
                                    borderRadius: '8px',
                                    backgroundColor: Theme.secondary[100],
                                    color: Theme.white[100],
                                    fontWeight: 'bold',
                                    "&:hover": { backgroundColor: Theme.primary[10] },
                                }}
                                onClick={() => {
                                    const a = document.createElement('a');
                                    a.href = videoUrl;
                                    a.download = 'video.mp4';
                                    a.click();
                                }}
                            >
                                Download Video
                            </Button>
                        </Box>
                    )}
                </Box>
            </Box>
        </Box>
    );
};

export default Videogen;
