const mongoose = require("mongoose");

const FoodSchema = new mongoose.Schema({
    foodId: {
        type: mongoose.Schema.Types.ObjectId, 
        default: () => new mongoose.Types.ObjectId(),
    },
    stateId: String,
    state_name: String,
    food_name: String,
    food_image: [String],
    famous_for: String,
    recipes: String,
    famous_location: String,
    origi_story: String,


});

const Foodmodel = mongoose.model("Food", FoodSchema);
module.exports = Foodmodel;