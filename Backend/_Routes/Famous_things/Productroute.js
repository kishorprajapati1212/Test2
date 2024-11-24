const express = require("express");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const productmodel = require("../../_Model/Famous_things/Product");
const path = require("path");

const router = express.Router();

// Configure Cloudinary
cloudinary.config({
    cloud_name: 'dsjex8xtn',
    api_key: '662524432854229',
    api_secret: 'Yc1S2RjPVrxMDETQrXpGaSKby4E',
});

// Use memory storage to avoid disk space issues
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "/tmp"); // Temporary storage
    },
    filename: (req, file, cb) => {
        const randomSuffix = Math.random().toString(36).substring(2, 10); // Generate a random 10-character string
        const fileExtension = file.originalname.split(".").pop(); // Extract the file extension
        cb(null, `${file.originalname.split(".")[0]}-${randomSuffix}.${fileExtension}`); // Append random suffix
    },
});

const upload = multer({
    storage,
    limits: { fileSize: 100 * 1024 * 1024 }, // 100 MB limit
});

// Route to handle product uploads
router.post("/Add_product", upload.single("product_model"), async (req, res) => {
    try {
        const { stateId, state_name, product_name, product_description, product_category } = req.body;
        const product_model = req.file; // Uploaded file

        if (!product_model || product_model.size === 0) {
            return res.status(400).json({ message: "No file uploaded or file is empty" });
        }
        console.log("File details:", product_model);
        

        // Generate a random 4-7 digit number
        const randomSuffix = Math.floor(1000 + Math.random() * 900000); // Generates a number between 1000 and 9999999
        const fileExtension = path.extname(product_model.originalname); // Get original file extension
        const uniqueFileName = `${path.basename(product_model.originalname, fileExtension)}-${randomSuffix}${fileExtension}`;

        // Upload the file to Cloudinary with a unique public_id
        const uploadResult = await new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
                {
                    allowed_formats: ["fbx", "obj", "glb"],
                    resource_type: "raw",
                    folder: "model", // Cloudinary folder
                    public_id: path.basename(uniqueFileName, fileExtension), // Set unique public_id
                    
                },
                (error, result) => {
                    if (error) reject(error);
                    resolve(result);
                }
            );
            stream.end(product_model.buffer); // Send the buffer data to Cloudinary
        });

        if (!uploadResult || !uploadResult.secure_url) {
            return res.status(400).json({ message: "File upload to Cloudinary failed" });
        }

        // Construct URLs
        const productModelUrl = uploadResult.secure_url;
        const productPublicUrl = uploadResult.public_id;

        // Save the product in the database
        const newProduct = new productmodel({
            stateId,
            State_name: state_name,
            product_name,
            product_description: [product_description],
            product_category,
            product_model: productModelUrl,
            product_url: productModelUrl,
            product_public_url: productPublicUrl,
        });

        await newProduct.save();

        res.status(200).json("Product added successfully!");
    } catch (error) {
        console.error("Error in file upload:", error);
        res.status(500).json({ message: "Internal error", error: error.message });
    }
});

router.get("/Get_all_products", async(req,res)=>{
    try{
        const products = await productmodel.find();
        res.status(200).json(products);
    }catch(error){
        res.status(500).json({message:"Internal error", error:error});
    }
})

module.exports = router;
