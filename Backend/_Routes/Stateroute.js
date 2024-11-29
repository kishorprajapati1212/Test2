const express = require("express");
const Statemodel = require("../_Model/State");

const router = express.Router();

router.get('/Get_all_State_names', async(req,res) =>{
    try{
        const states = await Statemodel.find({}, 'stateId state_name');
        res.status(200).json(states);

    }catch(error){
        res.status(500).json({ message: "Internal Server Error", error });
    }
})
// Corrected the route path by removing the dot
router.post('/Add_state', async (req, res) => { // Corrected route path
    try {
        const { state_name, state_description, state_images, state_nickname, state_direction } = req.body;

        // Validation: Ensure required fields are provided
        if (!state_name || !state_description) {
            return res.status(400).json({ message: "State name and description are required." });
        }

        // Create a new state document
        const newState = new Statemodel({
            state_name,
            state_description,
            state_images: state_images || [], // Default to an empty array if no images
            state_nickname: state_nickname || "", // Default to an empty string if not provided
            state_direction: state_direction || "",
        });

        // Save the state to the database
        await newState.save();

        res.status(200).json({ message: "State added successfully", state: newState });
    } catch (error) {
        console.error("Error adding state:", error);
        res.status(500).json({ message: "Internal Server Error", error });
    }
});

// router.get('/All_state_with_one_image', async (req, res) => {
//     try {
//         const { page = 1, limit = 10 } = req.query;  // Default to page 1, limit 10
//         const skip = (page - 1) * limit;
        
//         const all_state = await Statemodel.find()
//             .skip(skip)
//             .limit(limit);
        
//         res.status(200).json(all_state);
//     } catch (error) {
//         res.status(500).json({ message: "Internal Server Error", error });
//     }
// });

router.get('/All_state_with_one_image', async (req, res) => {
    try {
        const states = await Statemodel.find({}, 'stateId state_name state_nickname state_description state_images state_direction') // Fetch only relevant fields
            .exec();

        // Modify the state data to only include the first image
        const statesWithOneImage = states.map(state => ({
            stateId: state.stateId,
            state_name: state.state_name,
            state_description: state.state_description,
            state_nickname: state.state_nickname,
            state_images: state.state_images.length > 0 ? [state.state_images[0]] : [], // Only first image
            state_direction : state.state_direction,
        }));

        res.status(200).json(statesWithOneImage);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error });
    }
});

router.get('/One_state_with_all_image/:id', async (req, res) => {
    try {
        const stateId = req.params.id;

        const states = await Statemodel.find({stateId:stateId}, 'stateId state_name state_nickname state_description state_images state_direction') // Fetch only relevant fields
            .exec();

        // Modify the state data to only include the first image
        const statesWithOneImage = states.map(state => ({
            stateId: state.stateId,
            state_name: state.state_name,
            state_description: state.state_description,
            state_nickname: state.state_nickname,
            state_images: state.state_images.length > 0 ? [state.state_images[0]] : [], // Only first image
            state_direction : state.state_direction,
        }));

        res.status(200).json(statesWithOneImage);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error });
    }
});

router.post('/Update_state/:id', async (req, res) => {
    const { id } = req.params;
    const { state_name, state_description, state_nickname, state_direction, state_images } = req.body;

    console.log('Received data:', req.body);

    try {
        const existingState = await Statemodel.findOne({ stateId: id });

        if (!existingState) {
            return res.status(404).json({ message: 'State not found' });
        }

        // Completely replace the old images with the new ones
        const updatedState = await Statemodel.findOneAndUpdate(
            { stateId: id },
            {
                state_name,
                state_description,
                state_nickname,
                state_direction,
                state_images, // Directly set new images array
            },
            { new: true }
        );

        res.status(200).json(updatedState);
    } catch (error) {
        console.error('Error updating state:', error.message);
        res.status(500).json({ message: 'Failed to update state', error: error.message });
    }
});


router.post('/Delete_state/:id', async(req,res) =>{
    try{
        const { id } = req.params;
        console.log(id)

        const deletestate = await Statemodel.findOneAndDelete({stateId: id});

        if(!deletestate){
            return res.status(404).json({ message: "State not found"});
        }

        res.status(200).json({ message: "State deleted successfully", state: deletestate})
    }catch(error){
        res.status(500).json({ message: "Internal Server Error", error});
    }
})
 

module.exports = router;
