
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        default: () => new mongoose.Types.ObjectId(),
    },
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["Admin", "Artist", "Regular"], required: true },
    createdAt: { type: Date, default: Date.now },

    adminData: {
        accessLevel: { type: String, enum: ["superadmin", "moderator"], default: "moderator" },
    },

    artistData: {
        bio: { type: String },
        portfolioLink: { type: String },
        socialMediaHandles: [{ platform: String, link: String }], // Array of social links
        verified: { type: Boolean, default: false },
    },

    regularData: {
        preferences: { type: [String], default: [] }, // Array of user preferences
        subscriptions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Subscription" }],
    },
});

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;