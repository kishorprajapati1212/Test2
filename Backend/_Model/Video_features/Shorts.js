const mongooes = require("mongoose");

const shortVideoSchema = new mongooes.Schema({
   videoId: { type: mongooes.Schema.Types.ObjectId, default: () => new mongooes.Types.ObjectId(), },
   createrId: String,
   creater_name: String,
   short_title : String,
   short_description: String,
   short_like: Number,
   short_url : String,
   short_image: String,
   create_time:{ type: Date, default: Date.now,},
   approve: { type: Boolean, default: false,},
   active: { type: Boolean, default: false,},
   create_time: { type: Date, default: Date.now },
});

const shortVideomodel = mongooes.model("shortVideo", shortVideoSchema);
module.exports = shortVideomodel;