import { Button, Checkbox, FormControlLabel, Typography, Box, Card, CardContent } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ShortUpdate = () => {
    const Backend_url = import.meta.env.VITE_BACKEND_URL;

    const { videoId } = useParams();
    const [video, setVideo] = useState(null);
    const [approve, setApprove] = useState(false);
    const [active, setActive] = useState(false);
    const navigation = useNavigate();

    const fetchVideo = async () => {
        try {
            const res = await axios.get(`${Backend_url}/Get_Video/${videoId}`);
            setVideo(res.data);
            setApprove(res.data.approve);
            setActive(res.data.active);
        } catch (error) {
            console.error("Error fetching video:", error);
        }
    };

    const updateVideo = async () => {
        try {
            const res = await axios.post(`${Backend_url}/Update_Video/${videoId}`, {
                approve,
                active,
            });
            navigation("/Short_home");
        } catch (error) {
            console.error("Error updating video:", error);
        }
    };

    useEffect(() => {
        fetchVideo();
    }, [videoId]);

    if (!video) {
        return (
            <Typography sx={{ textAlign: "center", mt: 3 }} variant="h5">
                Loading...
            </Typography>
        );
    }

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                mt: 4,
                px: 2,
            }}
        >
            <Card sx={{ maxWidth: 600, width: "100%", boxShadow: 3, borderRadius: 2 }}>
                <CardContent>
                    <Box sx={{ textAlign: "center", mb: 2 }}>
                        <video
                            src={video.short_url}
                            controls
                            style={{ width: "100%", borderRadius: "8px" }}
                        />
                    </Box>
                    <Typography
                        variant="h6"
                        sx={{ fontWeight: "bold", mb: 1, textAlign: "center" }}
                    >
                        {video.short_title}
                    </Typography>
                    <Typography
                        variant="body1"
                        sx={{ color: "text.secondary", mb: 3, textAlign: "center" }}
                    >
                        {video.short_description} + {video.create_time}
                    </Typography>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            mb: 2,
                        }}
                    >
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={approve}
                                    onChange={(e) => setApprove(e.target.checked)}
                                    color="primary"
                                />
                            }
                            label="Approve"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={active}
                                    onChange={(e) => setActive(e.target.checked)}
                                    color="primary"
                                />
                            }
                            label="Active"
                        />
                    </Box>
                    <Box sx={{ textAlign: "center" }}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={updateVideo}
                            sx={{
                                px: 4,
                                py: 1,
                                textTransform: "none",
                                boxShadow: 2,
                                borderRadius: 2,
                            }}
                        >
                            Update
                        </Button>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
};

export default ShortUpdate;
