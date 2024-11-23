const express = require("express");
const Foodmodel = require("../../_Model/Famous_things/Food");

const router = express.Router();

router.post("/Add_food", async (req, res) => {
    try {
        // console.log("getting" + req.body);
        const newfood = await Foodmodel.create(req.body);

        // console.log("saving"+newfood)
        res.status(200).json(newfood);

    } catch (error) {
        res.status(500).json({ message: "Internal error", error: error })
    }
})

router.post("/Update_food/:foodId", async (req, res) => {
    try {
        // console.log(req.params.foodId)
        const food = await Foodmodel.findOneAndUpdate({ foodId: req.params.foodId },
            { $set: req.body },
            { new: true }
        );

        if(food){
            res.status(200).json(food)

        }

    } catch (error) {
        res.status(500).json({ message: "Internal error", error: error })
    }
})

router.get("/Get_all_food", async (req, res) => {
    try {
        const foods = await Foodmodel.find();
        res.status(200).json(foods);
    } catch (error) {
        res.status(500).json({ message: "Internal error", error: error })
    }
})

router.get("/Delete_food/:foodId", async (req, res) => {
    try {
        // console.log(req.params.foodId)
        const food = await Foodmodel.findOneAndDelete({ foodId: req.params.foodId });
        res.status(200).json(food)

    } catch (error) {
        res.status(500).json({ message: "Internal error", error: error })
    }
})

router.get("/Get_food_by_id/:foodId", async (req, res) => {
    try {
        const food = await Foodmodel.findOne({ foodId: req.params.foodId });

        res.status(200).json(food)

    } catch (error) {
        res.status(500).json({ message: "Internal error", error: error })
    }
})

module.exports = router; 