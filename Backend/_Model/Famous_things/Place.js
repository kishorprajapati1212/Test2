const mongoose = require("mongoose");

const PlaceSchema = new mongoose.Schema({
    HeritageId: {
        type: mongoose.Schema.Types.ObjectId, 
        default: () => new mongoose.Types.ObjectId(),
    },
    place_name: String,
    stateId: String,
    state_name: String,
    location: String,
    significance: [String],
    builder: String,
    Period: String,
    description: String,
    place_image: [String],
    place_type: {
        type: String, // Define as a string for single type
        required: true, // Optional: Make it mandatory
        enum: ["Heritage", "Fort", "Temple", "Museum"], // Optional: Restrict to specific values
    },
    google_map_url:String,

});

const Placemodel = mongoose.model("Place", PlaceSchema);
module.exports = Placemodel;