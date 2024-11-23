const mongoose = require("mongoose");

const DanceSchema = new mongoose.Schema({
    DanceId: {
        type: mongoose.Schema.Types.ObjectId,
        default: () => new mongoose.Types.ObjectId(),
    },
    stateId: String,
    state_name: String,
    dance_name: String,
    dance_description: String,
    dance_image: [String],
    cloths: [
        {
            cloth_image: String,
            cloth_name: String,
            cloth_description: String,
        }
    ],
    origin_story: String,
});

const Dancemodel = mongoose.model("Dance", DanceSchema);
module.exports = Dancemodel;