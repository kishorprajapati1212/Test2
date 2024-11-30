const mongoose = require("mongoose");

const shortlikeSchema = new mongoose.Schema({
    shortlikeId: {
        type: mongoose.Schema.Types.ObjectId,
        default: () => new mongoose.Types.ObjectId(), // Corrected `Types.ObjectId()`
    },
    userId: { type: String, required: true }, // Ensure `userId` is always provided
    videoId: { type: String, required: true }, // Ensure `videoId` is always provided
    createdAt: { type: Date, default: Date.now },
});

const Shortlikemodel = mongoose.model("Shortlikemodel", shortlikeSchema);

module.exports = Shortlikemodel;
