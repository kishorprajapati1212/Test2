const express = require("express");
const Festivalmodel = require("../../_Model/Famous_things/Festival")
const router = express.Router();


router.post("/Add_festival", async (req, res) => {
    try {
        // console.log(req.body);
        const newfestival = await Festivalmodel.create(req.body);

        // console.log("saving"+newfestival)
        res.status(200).json(newfestival);

    } catch (error) {
        res.status(500).json({ message: "Internal error", error: error })
    }
})

router.post("/Update_festival/:FestivalId", async (req, res) => {
    try {
        // console.log(req.params.festivalId)
        const festival = await Festivalmodel.findOneAndUpdate({ FestivalId: req.params.FestivalId },
            { $set: req.body },
            { new: true }
        );

        if(festival){
            res.status(200).json(festival)

        }

    } catch (error) {
        res.status(500).json({ message: "Internal error", error: error })
    }
})

router.get("/Get_all_festivals", async (req, res) => {
    try {
        const festivals = await Festivalmodel.find();
        res.status(200).json(festivals);
    } catch (error) {
        res.status(500).json({ message: "Internal error", error: error })
    }
})

router.get("/Delete_festival/:FestivalId", async (req, res) => {
    try {
        // console.log(req.params.festivalId)
        const festival = await Festivalmodel.findOneAndDelete({ festivalId: req.params.festivalId });
        res.status(200).json(festival)

    } catch (error) {
        res.status(500).json({ message: "Internal error", error: error })
    }
})

router.get("/Get_festival_by_id/:FestivalId", async (req, res) => {
    try {
        const festival = await Festivalmodel.findOne({ FestivalId: req.params.FestivalId });

        res.status(200).json(festival)

    } catch (error) {
        res.status(500).json({ message: "Internal error", error: error })
    }
})


module.exports = router; 