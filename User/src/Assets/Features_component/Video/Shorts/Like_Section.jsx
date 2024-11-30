import React, { useEffect, useState } from "react";
import { Box, Typography, IconButton, TextField, Button } from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import CommentIcon from "@mui/icons-material/Comment";
import { Fetchuser } from "../../../../Approute";
import axios from "axios";

const Like_Section = ({ videoId, Likes }) => {
    const Backend_url = import.meta.env.VITE_BACKEND_URL;
    const user = Fetchuser();
    const userId = user?.userId;
    const [liked, setLiked] = useState(false);
    const [disliked, setDisliked] = useState(false);
    const [likeCount, setLikeCount] = useState(Likes);
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState([]);
    const [showCommentInput, setShowCommentInput] = useState(false);

    // Fetch the like status when the component is mounted
    useEffect(() => {
        const fetchLikeStatus = async () => {
            try {
                const response = await axios.get(`${Backend_url}/likes/status`, {
                    params: { userId, videoId },
                });
                const { liked } = response.data;
                setLiked(liked);
                setDisliked(!liked); // Reset disliked if liked is true
            } catch (error) {
                console.error("Error fetching like status:", error);
            }
        };
        fetchLikeStatus();
    }, [videoId, userId, Backend_url]); // Fetch when videoId or userId changes

    // Fetch comments when the component is mounted or videoId changes
    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await axios.get(`${Backend_url}/comments/${videoId}`);
                setComments(response.data);
            } catch (error) {
                console.error("Error fetching comments:", error);
            }
        };
        fetchComments();
    }, [videoId]); // Depend on videoId to refetch comments when the video changes

    // Update the likeCount when Likes prop changes
    useEffect(() => {
        setLikeCount(Likes);
    }, [Likes]); // Trigger whenever Likes prop changes

    const handleToggleLike = async () => {
        if (liked) {
            setLikeCount((prevCount) => (prevCount > 0 ? prevCount - 1 : 0));
            setLiked(false);
            await axios.post(`${Backend_url}/likes/toggle`, { userId, videoId });
        } else {
            setLikeCount((prevCount) => prevCount + 1);
            setLiked(true);
            if (disliked) {
                setDisliked(false);
                await axios.post(`${Backend_url}/dislikes/toggle`, { userId, videoId });
            }
            await axios.post(`${Backend_url}/likes/toggle`, { userId, videoId });
        }
    };

    const handleDislike = async () => {
        if (liked) {
            setLikeCount((prevCount) => (prevCount > 0 ? prevCount - 1 : 0));
            setLiked(false);
        }
        setDisliked(true);
        await axios.post(`${Backend_url}/dislikes/toggle`, { userId, videoId });
    };

    const handleCommentChange = (e) => {
        setComment(e.target.value);
    };

    const handleAddComment = async () => {
        if (comment.trim()) {
            try {
                const response = await axios.post(`${Backend_url}/comments/add`, {
                    userId,
                    videoId,
                    text: comment.trim(),
                });
                setComments((prevComments) => [
                    ...prevComments,
                    response.data.newComment,
                ]);
                setComment(""); // Clear the input
            } catch (error) {
                console.error("Error adding comment:", error);
            }
        }
    };

    const toggleCommentInput = () => {
        setShowCommentInput((prevState) => !prevState);
    };

    return (
        <Box
            sx={{
                position: "fixed",
                top: "50%",
                right: 16,
                transform: "translateY(-50%)",
                zIndex: 2,
                color: "#fff",
                backgroundColor: "rgba(0, 0, 0, 0.7)",
                borderRadius: "16px",
                padding: 2,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "auto",
                boxShadow: "0px 2px 10px rgba(0,0,0,0.2)",
            }}
        >
            {/* Like Button */}
            <IconButton onClick={handleToggleLike} sx={{ color: liked ? "blue" : "#fff", marginBottom: 2 }}>
                <ThumbUpIcon />
                <Typography variant="caption" sx={{ marginLeft: 1 }}>
                    {Math.abs(likeCount)}
                </Typography>
            </IconButton>

            {/* Dislike Button */}
            <IconButton onClick={handleDislike} sx={{ color: disliked ? "red" : "#fff", marginBottom: 2 }}>
                <ThumbDownIcon />
            </IconButton>

            {/* Comment Button */}
            <IconButton onClick={toggleCommentInput} sx={{ color: "#fff", marginBottom: 2 }}>
                <CommentIcon />
            </IconButton>

            {/* Comment Input */}
            {showCommentInput && (
                <Box sx={{ marginTop: 2, width: "100%" }}>
                    <TextField
                        label="Add a comment"
                        variant="outlined"
                        fullWidth
                        multiline
                        rows={3}
                        value={comment}
                        onChange={handleCommentChange}
                        sx={{ marginBottom: 1 }}
                    />
                    <Button variant="contained" fullWidth onClick={handleAddComment}>
                        Add Comment
                    </Button>
                    <Box sx={{ marginTop: 2, width: "100%" }}>
                        {comments.map((comment) => (
                            <Typography variant="body2" sx={{ marginBottom: 1 }} key={comment.id}>
                                {comment.text}
                            </Typography>
                        ))}
                    </Box>
                </Box>
            )}
        </Box>
    );
};

export default Like_Section;
