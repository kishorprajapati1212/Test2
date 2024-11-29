const mongoose = require("mongoose");

const shortcommentSchema = new mongoose.Schema({
    shortcommentId:{
        type: mongoose.Schema.Types.ObjectId,
        default: () => new mongoose.Type.ObjectId(),
    },
    userId:String,
    videoId: String,
    text: String,
    createdAt: { type: Date, default: Date.now },
})

const shortcommentmodel = mongoose.model("shortcommentmodel",shortcommentSchema);
module.export = shortcommentmodel;