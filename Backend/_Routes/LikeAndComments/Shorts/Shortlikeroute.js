const express = require("express");
const Shortlikemodel = require("../../../_Model/LikeAndComments/Shorts/Shortlike");
const shortVideomodel = require("../../../_Model/Video_features/Shorts")

const router = express.Router();

// Toggle like status
router.post("/likes/toggle", async (req, res) => {
    const { userId, videoId } = req.body;

    try {
        // Find existing like
        const existingLike = await Shortlikemodel.findOne({ userId, videoId });

        if (existingLike) {
            // If like exists, remove it
            await Shortlikemodel.deleteOne({ userId, videoId });
            await shortVideomodel.findOneAndUpdate(
                { videoId },
                { $inc: { short_like: -1 } },
                { new: true }
            );
            // console.log("Like removed successfully");
            return res.status(200).json({ liked: false });
        } else {
            // Otherwise, add a new like
            const newLike = await Shortlikemodel.create({ userId, videoId });
            await shortVideomodel.findOneAndUpdate(
                { videoId: videoId },
                { $inc: { short_like: +1 } },
                { new: true }
            );
            console.log("Like added successfully:", newLike);
            return res.status(201).json({ liked: true });
        }
    } catch (error) {
        console.error("Error toggling like:", error);
        res.status(500).json({ message: "Error toggling like", error });
    }
});

router.post("/dislikes/toggle", async (req, res) => {
    const { userId, videoId } = req.body;

    try {
        // Find existing like
        const existingLike = await Shortlikemodel.findOne({ userId, videoId });

        if (existingLike) {
            // If like exists, remove it
            await shortVideomodel.findOneAndUpdate(
                { videoId },
                { $inc: { short_dilike: -1 } },
                { new: true }
            );
            // console.log("Like removed successfully");
            return res.status(200).json({ liked: false });
        } else {
            // Otherwise, add a new like
            await shortVideomodel.findOneAndUpdate(
                { videoId: videoId },
                { $inc: { short_dilike: 1 } },
                { new: true }
            );
            console.log("Like added successfully:", newLike);
            return res.status(201).json({ liked: true });
        }
    } catch (error) {
        console.error("Error toggling like:", error);
        res.status(500).json({ message: "Error toggling like", error });
    }
})

// Fetch like status
router.get("/likes/status", async (req, res) => {
    const { userId, videoId } = req.query;

    try {
        // console.log("Fetching like status for user:", userId, "and video:", videoId);

        const like = await Shortlikemodel.findOne({ userId, videoId });
        // console.log("Like data found:", like);

        if (!like) {
            // console.log("No like data found for the specified user and video.");
            return res.status(200).json({ liked: false });
        }

        res.status(200).json({ liked: true });
    } catch (error) {
        // console.error("Error fetching like status:", error);
        res.status(500).json({ message: "Error fetching like status", error });
    }
});

module.exports = router;
