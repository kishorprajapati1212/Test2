const express = require("express");
const usermodel = require("../../_Model/Users/User")

const router = express.Router();

router.post("/regular_user_sigin", async (req, res) => {
    try {
        const { username, email, password, role = "RegularUser" } = req.body;

        const existingUser = await usermodel.findOne({ email })
        if (existingUser) {
            res.status(400).json({ message: "User already exists" })
        }

        const newuser = await usermodel.create({ username, email, password, role })

        if (newuser) {
            res.status(200).json({ message: "User Login Successfully" })
        }


    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.post("/artist_signin", async (req, res) => {
    const { username, email, password, role = "Artist", artistData } = req.body;

    const existingUser = await usermodel.findOne({ email })
    if (existingUser) {
        res.status(400).json({ message: "User already exists" })
    }

    try {
        // Create a new artist document
        const newArtist = new usermodel({
            username,
            email,
            password, // Note: You should hash the password before saving (e.g., using bcrypt)
            role,
            artistData,
        });

        // Save the artist to the database
        const savedArtist = await newArtist.save();

        res.status(200).json({ message: 'Artist registered successfully!', savedArtist });
    } catch (error) {
        console.error('Error saving artist:', error);
        res.status(500).json({ message: 'Failed to register artist', error });
    }
})

router.post("/login_user", async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if both email and password are provided
        if (!email || !password) {
            return res.status(400).json({ message: "Email and Password are required" });
        }

        // Find the user by email
        const Get_user = await usermodel.findOne({ email });

        // If user is not found, return error
        if (!Get_user) {
            return res.status(400).json({ message: "User Not Found" });
        }

        // Strictly compare the password
        if (Get_user.password !== password) {
            return res.status(400).json({ message: "Invalid Password" });
        }

        // If both email and password match exactly
        res.status(200).json({ message: "User Login Successfully", user: Get_user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post("/one_user_detail_by_id", async (req, res) => {
    try {
        const { userId } = req.body;  // Access userId from the request body
        console.log(userId);

        const userdetail = await usermodel.findOne({ userId });

        if (!userdetail) {
            return res.status(404).json({ error: "User not found" });
        }

        console.log(userdetail);  // Log user details to check
        res.status(200).json({ userdetail });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post("/update_artist/:userId", async (req, res) => {
    try {
        const { userId } = req.params;
        const updatedData = req.body;
        const result = await usermodel.findOneAndUpdate({ userId }, updatedData, { new: true });
        if (!result) {
            return res.status(404).json({ error: "Artist not found" });
        }
        res.status(200).json({ message: "Artist updated successfully", result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

router.get("/Get_artist", async (req, res) => {
    try {
        const artist = await usermodel.find({ role: "Artist" });
        res.status(200).json({ artist })

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})


router.get("/All_user", async (req, res) => {
    console.log("hello")
    const users = await usermodel.find();
    console.log(users)
    res.json(users)

})
module.exports = router; 