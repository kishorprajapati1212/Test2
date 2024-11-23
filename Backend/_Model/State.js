const mongoose = require("mongoose");

const stateSchema = new mongoose.Schema({
    stateId: {
        type: mongoose.Schema.Types.ObjectId, 
        default: () => new mongoose.Types.ObjectId(),
    },

    state_name:{
        type: String,
        required: true,
    },
    state_description: {
        type: String,
        required: true,
    },
    state_images:[String],
    state_nickname: String,
    state_direction: String,
});

const statemodel = mongoose.model("state", stateSchema);
module.exports = statemodel;