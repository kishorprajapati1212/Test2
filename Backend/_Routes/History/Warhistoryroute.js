const express = require("express");
const warhistorymodel = require("../../_Model/History/Warhistory");

const router = express.Router();

router.post("/addWarHistory", async(req,res) =>{
    try{
        const warhistorydata = req.body;
        // console.log(warhistorydata);

        const historysave = new warhistorymodel(warhistorydata);
        await historysave.save();
        // console.log("savehistory" + historysave)
        res.json(historysave);
    }catch(error){
        res.json("Internal error", error)
    }
})

router.get("/getWarHistory", async(req,res) =>{
    try{
        const warhistorydata = await warhistorymodel.find();
        res.json(warhistorydata);
    }catch(error){
        res.json("Internal error", error);
    }
})

router.get("/deleteWarHistory/:id", async (req, res) => {
    try {
        const historyId = req.params.id;
        console.log(historyId);

        // Attempt to find and delete the history by its ID
        const deletedHistory = await warhistorymodel.findOneAndDelete({ historyId: historyId });

        if (!deletedHistory) {
            return res.status(404).json({ message: "War history not found" });
        }

        // Return the deleted document
        res.json({ message: "War history deleted successfully", data: deletedHistory });

    } catch (error) {
        // Handle the error properly
        console.error("Error during deletion:", error);
        res.status(500).json({ message: "Internal error occurred", error: error.message });
    }
});

router.get("/get_One_War_History/:historyId", async(req,res) =>{
    try{
        const historyId = req.params.historyId;
        console.log(historyId)
        const warhistorydata = await warhistorymodel.findOne({ historyId: historyId });
        res.json(warhistorydata);
    }catch(error){
        res.status(500).json({ message: "Internal error occurred", error: error.message });
    }
})

router.post("/update_war_history/:historyId", async(req,res) => {
    try{
        const historyId = req.params.historyId;
        const warHistory  = req.body;
        // console.log(historyId);
        // console.log(warHistory);

        const updatedHistory = await warhistorymodel.findOneAndUpdate(
            { historyId: historyId },
            warHistory,
            { new: true }
        );

        if(updatedHistory){
        res.status(200).json({ message: "Updated Successfully" });
        }

        
    }catch(error){
        res.status(500).json({ message: "Internal error occurred", error: error.message });
    }
})



module.exports = router; 