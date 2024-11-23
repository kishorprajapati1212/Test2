// Import necessary modules
const express = require("express");
const cloudinary = require('cloudinary').v2;
const multer = require("multer");
const shortVideoModel = require("../../_Model/Video_features/Shorts")
const router = express.Router();

// Cloudinary configuration
cloudinary.config({
    cloud_name: 'dsjex8xtn',
    api_key: '662524432854229',
    api_secret: 'Yc1S2RjPVrxMDETQrXpGaSKby4E'
});
// router.get("/testCloudinary", async (req, res) => {
//     try {
//         // Test Cloudinary configuration by calling its 'ping' API
//         const accountInfo = await cloudinary.api.ping(); // This checks if Cloudinary is configured correctly
//         console.log(accountInfo);  // Log the account info for debugging

//         // If successful, return the account name or any information you'd like
//         res.status(200).json({
//             message: "Cloudinary is working!",
//             accountName: accountInfo.cloud_name
//         });
//     } catch (error) {
//         // If an error occurs, log and return the error
//         console.error("Cloudinary test failed:", error);
//         res.status(500).json({
//             error: "Cloudinary setup failed",
//             message: error.message
//         });
//     }
// });

// POST route for adding "Shorts" (you can add your logic here)



// Multer configuration

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "/tmp"); // Temporary storage
    },
    filename: (req, file, cb) => {
        const randomSuffix = Math.random().toString(36).substring(2, 10); // Generate a random 10-character string
        const fileExtension = file.originalname.split(".").pop(); // Extract the file extension
        cb(null, `${file.originalname.split(".")[0]}-${randomSuffix}.${fileExtension}`); // Append random suffix
    },
});

const upload = multer({ storage });

// Route to upload and save video
router.post("/uploadShort", upload.single("video"), async (req, res) => {
    try {
        const { createrId, creater_name, short_title, short_description, short_image } = req.body;
        // console.log("Uploaded File Info:", req.file);

        // Validate required fields
        if (!req.file || !createrId || !creater_name || !short_title) {
            return res.status(400).json({ error: "Missing required fields or video file" });
        }

        // Upload video to Cloudinary
        const uploadResponse = await cloudinary.uploader.upload(req.file.path, {
            resource_type: "auto", // Specify the file type
            folder: "short_videos", // Optional: Cloudinary folder
        });

        // Save the public URL and details in MongoDB
        const newShort = new shortVideoModel({
            createrId,
            creater_name,
            short_title,
            short_description,
            short_like: 0,
            short_url: uploadResponse.secure_url, // Save Cloudinary URL
        });

        const savedShort = await newShort.save();

        res.status(201).json({
            message: "Short uploaded and saved successfully!",
            short: savedShort,
        });
    } catch (error) {
        console.error("Error uploading short:", error);
        res.status(500).json({ error: "Failed to upload and save short", details: error.message });
    }
});

router.get("/Get_all_Shorts", async (req, res) => {
    try {
        const shorthistory = await shortVideoModel.find();
        res.status(200).json(shorthistory);
    } catch (error) {
        res.status(500).json({ error: "Failed to upload and save short", details: error.message });
    }
})

router.get("/deleteShort/:videoId", async (req, res) => {
    try {
        const short = await shortVideoModel.findOne({ videoId: req.params.videoId });

        if (!short) {
            return res.status(404).json({ error: "Video not found" });
        }

        // console.log("Found Short:", short);

        // Extract public ID from secure_url
        const secureUrl = short.short_url;

        const publicId = secureUrl
            .split('/upload/')[1] // Take everything after '/upload/'
            .replace(/v\d+\//, '') // Remove the version prefix (e.g., v123456789/)
            .split('.')[0]; // Remove the file extension

        // console.log("Corrected Public ID:", publicId);

        const deleteResponse = await cloudinary.uploader.destroy(publicId, {
            resource_type: "video", 
        });

        console.log("Cloudinary Delete Response:", deleteResponse);

        if (deleteResponse.result === "ok") {
            const short = await shortVideoModel.findOneAndDelete({videoId:req.params.videoId});
            res.status(200).json(short);
        }
    } catch (error) {
        res.status(500).json({ error: "Failed to upload and save short", details: error.message });
    }
})

router.get("/Get_Video/:videoId", async (req, res) => {
    try {
        const video = await shortVideoModel.findOne({ videoId: req.params.videoId });
        res.status(200).json(video);
    } catch (error) {
        res.status(500).json({ error: "Failed to upload and save short", details: error.message });
    }
})

router.post("/Update_Video/:videoId", async (req, res) => {
    try {
        const video = await shortVideoModel.findOneAndUpdate({ videoId: req.params.videoId }, req.body);
        res.status(200).json(video);
    } catch (error) {
        res.status(500).json({ error: "Failed to upload and save short", details: error.message });
    }
})

module.exports = router;
