const mongooes = require("mongoose");

const warhistorySchema = new mongooes.Schema({
    historyId: {
        type: mongooes.Schema.Types.ObjectId,
        default: () => new mongooes.Types.ObjectId(),
    },
    stateId: String,
    state_name: String,
    start_war: Number,
    end_war: Number,
    war_name: String,
    war_place: String,
    war_between: String,
    war_winner: String,
    war_losses: String,
    war_reason: String,
    war_description: String,
    war_image: String,
});

const warhistorymodel = mongooes.model("warhistory", warhistorySchema);
module.exports = warhistorymodel;