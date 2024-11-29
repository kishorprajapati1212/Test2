const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        default: () => new mongoose.Types.ObjectId(),
    },
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["Admin", "Artist", "RegularUser"], required: true },
    createdAt: { type: Date, default: Date.now },

    adminData: {
        // accessLevel: { type: String, enum: ["superadmin", "moderator"], default: "moderator" },
    },

    artistData: {
        address: String,
        city: String,
        state: String,
        homeAddress: String,
        contact: Number,
        profile_image: String,
        socialMediaHandles: [{ platform: String, link: String }], // Array of social links
        verified: { type: Boolean, default: false },
    },

    regularData: {
        
    },
});

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;