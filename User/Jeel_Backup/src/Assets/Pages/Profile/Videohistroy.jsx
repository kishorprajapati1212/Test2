import React, { useEffect, useState } from 'react';
import { Grid, Typography, Skeleton, Button } from '@mui/material';
import { getuser } from '../../Component/Navbar';
import axios from 'axios';
import Sidebar from '../../Component/Profilesidebar';
import Theme, { GlobleVariable } from '../../../Theme';

const Videohistroy = () => {
    const [userhistory, setUserHistory] = useState([]);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState(''); // For custom error messages
    const user = getuser();
    const apiKey = GlobleVariable.React_api;
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch user history
    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const userid = user.user._id;
                const response = await axios.get(`${GlobleVariable.Backend_url}/gethistroy/${userid}`);
                if (response.data.mtype !== 'success') {
                    setError(true);
                    setErrorMessage('Failed to load user history.');
                } else {
                    setUserHistory(response.data.history);
                }
            } catch (error) {
                console.error('Error fetching user history:', error);
                setError(true);
                setErrorMessage('Error fetching user history.');
            }
        };

        fetchHistory();
    }, [user.user._id]);

    // Fetch videos based on history
    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const sortedHistory = [...userhistory].sort((a, b) => new Date(b.time) - new Date(a.time));
                const recentVideos = sortedHistory.slice(0, 6); // Get the most recent 6 videos

                const fetchedVideos = [];

                for (let i = 0; i < recentVideos.length; i++) {
                    const item = recentVideos[i];

                    try {
                        const response = await axios.get(
                            `https://api.stability.ai/v2beta/image-to-video/result/${item.generatedid}`,
                            {
                                headers: {
                                    Authorization: `Bearer ${apiKey}`,
                                    Accept: 'video/*',
                                },
                                responseType: 'blob',
                            }
                        );

                        if (response.status === 200) {
                            const videoBlob = response.data;
                            const url = URL.createObjectURL(videoBlob);
                            fetchedVideos.push({ url, time: item.time });
                        }
                    } catch (err) {
                        if (err.response?.status === 404) {
                            console.warn(`Video with ID ${item.generatedid} has expired.`);
                        } else {
                            console.error(`Failed to fetch video with ID ${item.generatedid}`, err);
                        }
                    }
                }

                setVideos(fetchedVideos);
                setLoading(false); // Stop loading once videos are fetched
            } catch (error) {
                console.error('Error fetching videos:', error);
                setError(true);
                setErrorMessage('Error fetching videos.');
                setLoading(false);
            }
        };

        if (userhistory.length > 0) {
            fetchVideos();
        }
    }, [userhistory, apiKey]);

    return (
        <>
            <div style={{ margin: '20px' }}>
                <Grid container spacing={2}>
                    <Sidebar /> {/* Use the Sidebar component here */}
                    <Grid item xs={12} md={9} sx={{ color: Theme.white[100] }}>
                        <Typography variant='h4' style={{ fontFamily: 'Georgia, serif', textAlign: 'center' }}>
                            History
                        </Typography>
                        <Typography variant='body1' style={{ fontFamily: 'Georgia, serif', textAlign: 'center' }}>
                            Video Will Be automatically removed in 1 day
                        </Typography>
                        {error && (
                            <Typography variant='h4' style={{ fontFamily: 'Georgia, serif', textAlign: 'center', marginTop: 10 }}>
                                {errorMessage || 'An error occurred'}
                            </Typography>
                        )}
                        <Grid container spacing={2} justifyContent="center" style={{ overflowY: 'auto', maxHeight: 'calc(100vh - 200px)' }}>
                            {loading ? (
                                <>
                                    {[...Array(2)].map((_, index) => (
                                        <Grid item xs={12} md={6} key={index}>
                                            <Skeleton variant="rectangular" width="100%" height={200} animation="wave" style={{ backgroundColor: 'darkgrey' }} />
                                            <Skeleton variant="text" width="50%" height={40} animation="wave" style={{ backgroundColor: 'lightgrey' }} />
                                            <Skeleton variant="rectangular" width="40%" height={40} animation="wave" style={{ backgroundColor: 'grey' }} />
                                        </Grid>
                                    ))}
                                </>
                            ) : (
                                <>
                                    {videos.length > 0 ? (
                                        videos.map((video, index) => (
                                            <Grid item xs={12} md={6} key={index} marginTop={3}>
                                                <video controls style={{ maxWidth: '100%', height: 'auto' }}>
                                                    <source src={video.url} type="video/mp4" />
                                                    Your browser does not support the video tag.
                                                </video>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                    <Typography variant="subtitle1" style={{ marginTop: 10 }}>
                                                        {new Date(video.time).toLocaleString('en-US', {
                                                            year: 'numeric',
                                                            month: '2-digit',
                                                            day: '2-digit',
                                                            hour: '2-digit',
                                                            minute: '2-digit',
                                                            second: '2-digit',
                                                        })}
                                                    </Typography>
                                                    <Button
                                                        variant="contained"
                                                        color="primary"
                                                        onClick={() => {
                                                            const a = document.createElement('a');
                                                            a.href = video.url;
                                                            a.download = 'video.mp4';
                                                            a.click();
                                                        }}
                                                        style={{ marginLeft: 10 }}
                                                    >
                                                        Download
                                                    </Button>
                                                </div>
                                            </Grid>
                                        ))
                                    ) : (
                                        <Typography variant="body1" style={{ textAlign: 'center' }}>
                                            No available videos to display.
                                        </Typography>
                                    )}
                                </>
                            )}
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        </>
    );
};

export default Videohistroy;
