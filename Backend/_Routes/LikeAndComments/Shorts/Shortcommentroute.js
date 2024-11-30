const express = require("express");
const shortcommentmodel = require("../../../_Model/LikeAndComments/Shorts/Shortcomment");

const router = express.Router();

// Add a new comment
router.post('/comments/add', async (req, res) => {
    const { userId, videoId, text } = req.body;
  
    try {
      const newComment = new shortcommentmodel({
        userId,
        videoId,
        text,
      });
      console.log(newComment)
      await newComment.save();
      res.status(200).json({ message: 'Comment added successfully', newComment });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error adding comment', error });
    }
  });
  
  // Fetch comments for a specific video
  router.get('/comments/:videoId', async (req, res) => {
    const { videoId } = req.params;
  
    try {
      const comments = await shortcommentmodel.find({ videoId }).sort({ createdAt: -1 }); // Sort by newest first
      res.status(200).json(comments);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching comments', error });
    }
  });
  


module.exports = router;