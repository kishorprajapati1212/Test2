const mongoose = require("mongoose");

const FestivalSchema = new mongoose.Schema({
    FestivalId: {
        type: mongoose.Schema.Types.ObjectId, 
        default: () => new mongoose.Types.ObjectId(),
    },
    stateId: String,
    state_name: String,
    festival_name: String,
    Festival_image: [String],
    festival_startDate: Date,
    festival_endDate: Date,
    celebrationReason: String,
    celebrationMethods: String,
    festivalSignificance: String,
    originLocation: String,
});

const Festivalmodel = mongoose.model("Festival", FestivalSchema);
module.exports = Festivalmodel;