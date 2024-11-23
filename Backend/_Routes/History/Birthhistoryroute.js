const express = require("express");
const Originmodel = require("../../_Model/History/Birthhistory")

const router = express.Router();

router.post("/Add_origin", async(req,res)=>{
    try{
        const { stateId, state_name, origin_description, origin_image, origin_time, today_Status, origin_state_name} = req.body;

        const newOrigin = new Originmodel({
            stateId,
            state_name,
            origin_description,
            origin_image,
            origin_time,
            today_Status,
            origin_state_name,
        });
        console.log(newOrigin)
        await newOrigin.save();
        if(newOrigin){
            res.status(200).json({message:"Origin added successfully"});
        }

    }catch(error){
        res.status[500].json({message:"Internal error", error:error});
    }
})

router.post("/Update_origin/:originhistoryId", async(req,res) =>{
    try{
        const originhistoryId = req.params.originhistoryId;
        const { stateId, state_name, origin_description, origin_image, origin_time, today_Status, origin_state_name} = req.body;
        const updatedOrigin = await Originmodel.findOneAndUpdate({originhistoryId: originhistoryId}, {
            stateId,
            state_name,
            origin_description,
            origin_image,
            origin_time,
            today_Status,
            origin_state_name,
        });
        if(updatedOrigin){
            res.status(200).json({message:"Origin updated successfully"});
        }
    }catch(error){
        res.status[500].json({message:"Internal error", error:error});
    }
})

router.get("/Get_all_origin_history", async(req,res) =>{
    try{
        const originHistory = await Originmodel.find();
        if(originHistory){
            res.status(200).json(originHistory);
        }
    }catch(error){
        res.status[500].json({message:"Internal error", error:error});
    }
})

router.get("/Delete_origin/:originhistoryId", async(req,res)=>{
    try{
        const originhistoryId = req.params.originhistoryId;
        const deletedOrigin = await Originmodel.findOneAndDelete({originhistoryId: originhistoryId});
        if(deletedOrigin){
            res.status(200).json({message:"Origin deleted successfully"});
        }
    }catch(error){
        res.status[500].json({message:"Internal error", error:error});
    }
})

router.get("/Get_origin_by_id/:originhistoryId", async(req,res)=>{
    try{
        const originhistoryId = req.params.originhistoryId;
        const origin = await Originmodel.findOne({originhistoryId: originhistoryId});
        if(origin){
            res.status(200).json(origin);
        }
    }catch(error){
        res.status[500].json({message:"Internal error", error:error});
    }
})



module.exports = router; 