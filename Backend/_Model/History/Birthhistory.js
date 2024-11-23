
const mongooes = require("mongoose");

const originhistorySchema = new mongooes.Schema({
    originhistoryId: {
        type: mongooes.Schema.Types.ObjectId,
        default: () => new mongooes.Types.ObjectId(),
    },
    stateId: String,
    state_name: String,
    origin_state_name: String,
    origin_description: String,
    origin_image: [String],
    origin_time: String,
    today_Status: String,
});

const originhistorymodel = mongooes.model("originhistory", originhistorySchema);
module.exports = originhistorymodel;