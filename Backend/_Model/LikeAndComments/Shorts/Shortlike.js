const mongoose = require("mongoose");

const shortlikeSchema = new mongoose.Schema({
    shortlikeId:{
        type: mongoose.Schema.Types.ObjectId,
        default: () => new mongoose.Type.ObjectId(),
    },
    userId:String,
    videoId: String,
    createdAt: { type: Date, default: Date.now },
})

const Shortlikemodel = mongoose.model("Shortlikemodel",shortlikeSchema);
module.export = Shortlikemodel;