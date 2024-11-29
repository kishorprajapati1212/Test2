const express = require("express");
const Statemodel = require("../../_Model/State");
const Festivalmodel = require("../../_Model/Famous_things/Festival");
const Productmodel = require("../../_Model/Famous_things/Product");
const Foodmodel = require("../../_Model/Famous_things/Food");
const Placemodel = require("../../_Model/Famous_things/Place");
const WarHistorymodel = require("../../_Model/History/Warhistory")
const originHistory = require("../../_Model/History/Birthhistory")
const danceModel = require("../../_Model/Famous_things/Dance");

const router = express.Router();

// Get home slider content based on stateId
router.get("/State_Home_Slider_Content/:stateId", async (req, res) => {
    const { stateId } = req.params; // Extract stateId from URL parameter
    //   console.log(stateId)

    try {
        // Fetch data related to the stateId
        const [food] = await Promise.all([

            Foodmodel.find({ stateId }).limit(3), // Get 3 places related to the stateId
        ]);

        // Combine the data into a single JSON response
        const result = {
            food, // 3 places
        };

        // Send the response with combined data
        res.status(200).json(result);
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).json({ error: "Failed to fetch data" });
    }
});


router.get("/state/:stateId/:section", async (req, res) => {
    const { stateId, section } = req.params; // Capture stateId and section

    try {
        let data;
        switch (section) {
            case "food":
                data = await Foodmodel.find({ stateId });
                break;
            case "war_history":
                data = await WarHistorymodel.find({ stateId });
                break;
            case "origin_history":
                data = await originHistory.find({ stateId });
                break;
            case "place":
                data = await Placemodel.find({ stateId });
                break;
            case "product":
                data = await Productmodel.find({ stateId });
                break;
            case "festival":
                data = await Festivalmodel.find({ stateId });
                break;
            case "dance":
                data = await danceModel.find({ stateId });
                break;
            default:
                return res.status(404).json({ message: "Section not found" });
        }

        // Send the fetched data as a response
        res.status(200).json(data);
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).json({ error: "Failed to fetch data" });
    }
});


router.get("/state_detail/:stateId/:section/:itemId", async (req, res) => {
    const { stateId, section, itemId } = req.params;
    console.log(itemId)
    let model;

    // Dynamically choose the correct model based on the section
    switch (section) {
        case "food":
            model = Foodmodel;
            break;
        case "festival":
            model = Festivalmodel;
            break;
        case "war_history":
            model = WarHistorymodel;
            break;
        case "origin_history":
            model = originHistory;
            break;
        case "product":
            model = Productmodel;
            break;
        case "place":
            model = Placemodel;
            break;
        case "dance":
            model = danceModel;
            break;
        // Add other sections as needed
        default:
            return res.status(404).json({ message: "Section not found" });
    }

    try {
        // Fetch data from the corresponding model using `findById`
        const detail = await model.findById({_id:itemId});
        if (!detail) {
            return res.status(404).json({ message: "Detail not found" });
        }
        res.json(detail);  // Send the data as a JSON response
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});


module.exports = router;
