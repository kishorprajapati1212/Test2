const express = require("express");
const Dancemodel = require("../../_Model/Famous_things/Dance")

const router = express.Router();

router.post("/Add_Dance", async (req, res) => {
    try {
        // console.log(req.body);
        const newDance = await Dancemodel.create(req.body);

        // console.log("saving"+newDance)
        res.status(200).json(newDance);

    } catch (error) {
        res.status(500).json({ message: "Internal error", error: error })
    }
})

router.post("/Update_dance/:DanceId", async (req, res) => {
    try {
        console.log(req.params.DanceId)
        const Dance = await Dancemodel.findOneAndUpdate({ DanceId: req.params.DanceId },
            { $set: req.body },
            { new: true }
        );

        if(Dance){
            res.status(200).json(Dance)

        }

    } catch (error) {
        res.status(500).json({ message: "Internal error", error: error })
    }
})

router.get("/Get_all_Dances", async (req, res) => {
    try {
        const Dances = await Dancemodel.find();
        res.status(200).json(Dances);
    } catch (error) {
        res.status(500).json({ message: "Internal error", error: error })
    }
})

router.get("/Delete_dance/:DanceId", async (req, res) => {
    try {
        // console.log(req.params.DanceId)
        const Dance = await Dancemodel.findOneAndDelete({ DanceId: req.params.DanceId });
        res.status(200).json(Dance)

    } catch (error) {
        res.status(500).json({ message: "Internal error", error: error })
    }
})

router.get("/Get_Dance_by_id/:DanceId", async (req, res) => {
    try {
        const Dance = await Dancemodel.findOne({ DanceId: req.params.DanceId });

        res.status(200).json(Dance)

    } catch (error) {
        res.status(500).json({ message: "Internal error", error: error })
    }
})

module.exports = router; 