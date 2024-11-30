const express = require("express");
const Placemodel = require("../../_Model/Famous_things/Place");
const router = express.Router();

// POST route to add place data
router.post("/Add_place", async (req, res) => {
  try {
    // Create a new place using the data sent in the request body
    const place = await Placemodel.create(req.body);
    
    // Log the place to ensure it's being created
    // console.log(place);

    // Send a success response if the place is created
    if (place) {
      res.status(200).json({ message: "Successfully inserted" });
    }
  } catch (error) {
    // Send an error response if something goes wrong
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
});

router.post("/Update_place/:HeritageId", async(req,res) =>{
    try{
       const updateplace = await Placemodel.findOneAndUpdate({HeritageId:req.params.HeritageId}, req.body);
    //    console.log(updateplace)
       res.status(200).json(updateplace);
    }catch(error){
        res.status[500].json({message:"internal error", error:error})
    }
})

router.get("/Get_all_place", async(req,res) =>{
    try{
        const place = await Placemodel.find();
        res.status(200).json(place);
    }catch(error){
        res.status[500].json({message:"Internal error", error:error})
    }
})

router.get("/Delete_place/:HeritageId" , async(req,res) => {
    try{
        const place = await Placemodel.findOneAndDelete({HeritageId:req.params.HeritageId});
        res.status(200).json(place);
    }catch(error){
        res.status(500).json({message:"Internal error", error:error})
    }
})

router.get("/Get_place_by_id/:HeritageId", async(req,res) => {
    try{
        const place = await Placemodel.findOne({HeritageId:req.params.HeritageId});
        res.status(200).json(place);
    }catch(error){
        res.status(500).json({message:"internal error", error:error})
    }
})

router.get("/Get_only_Limited_Place", async (req, res) => {
    try {
        const places = await Placemodel.find().select('place_name location place_type description google_map_url');
        res.json(places);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get("/Get_place_by_state_name", async(req,res) =>{
    try{
        const place = await Placemodel.find({state_name:req.query.selectedState});
        res.status(200).json(place);
    }catch(error){
        res.status(500).json({message:"internal error", error:error})
    }
})

module.exports = router;
