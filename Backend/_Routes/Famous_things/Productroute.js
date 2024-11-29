const express = require("express");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const productmodel = require("../../_Model/Famous_things/Product");
const path = require("path");
const fs = require("fs");

const router = express.Router();

// Configure Cloudinary
cloudinary.config({
    cloud_name: "dsjex8xtn",
    api_key: "662524432854229",
    api_secret: "Yc1S2RjPVrxMDETQrXpGaSKby4E",
});

// Use disk storage for Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "/tmp"); // Local directory to temporarily store files
    },
    filename: (req, file, cb) => {
        const randomSuffix = Math.random().toString(36).substring(2, 10);
        const fileExtension = path.extname(file.originalname); // Extract file extension
        cb(null, `${path.basename(file.originalname, fileExtension)}-${randomSuffix}${fileExtension}`);
    },
});

const upload = multer({
    storage,
    limits: { fileSize: 100 * 1024 * 1024 }, // 100 MB limit
});

// Route to handle product uploads
router.post("/Add_product", upload.single("product_model"), async (req, res) => {
    try {
        const { stateId, state_name, product_name, product_description, product_category, product_images } = req.body;
        const product_model = req.file; // Uploaded file

        if (!product_model) {
            return res.status(400).json({ message: "No file uploaded" });
        }
        console.log("File details:", product_model);

        // Upload the file to Cloudinary using the file path
        const uploadResult = await cloudinary.uploader.upload(product_model.path, {
            allowed_formats: ["fbx", "obj", "glb"],
            resource_type: "raw",
            folder: "model", // Cloudinary folder
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
            product_model: product_model.filename,
            product_url: productModelUrl,
            product_public_url: productPublicUrl,
            product_images: product_images,
        });
        // console.log(newProduct);
        await newProduct.save();

        // Clean up the temporary file
        fs.unlinkSync(product_model.path);

        res.status(200).json("Product added successfully!");
    } catch (error) {
        console.error("Error in file upload:", error);

        // Clean up the temporary file if an error occurs
        if (req.file) {
            fs.unlinkSync(req.file.path);
        }

        res.status(500).json({ message: "Internal error", error: error.message });
    }
});

router.post("/Update_product/:productId", async (req, res) => {
    try {
        // console.log("Hello");
        const updatedProduct = await productmodel.findOneAndUpdate(
            { productId: req.params.productId },  // Find by productId
            req.body,                              // Update with request body
            { new: true }                          // Return the updated document
        );
        // console.log("Hello2");

        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        // Send the updated product back
        res.status(200).json(updatedProduct);

    } catch (error) {
        res.status(500).json({ message: "Internal error", error: error });
    }
});

router.get("/Get_all_products", async (req, res) => {
    try {
        const products = await productmodel.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: "Internal error", error: error });
    }
})

router.get("/Get_Product_by_id/:productId", async (req, res) => {
    try {
        const product = await productmodel.findOne({ productId: req.params.productId });
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: "Internal error", error: error });
    }
})

router.get("/Delete_product/:productId", async (req, res) => {
    try {
        // console.log(req.params.productId)
        const product = await productmodel.findOne({ productId: req.params.productId })
        if (!product) {
            return res.status(404).json({ message: "Product not found" })
        }

        const publicId = product.product_public_url
        // console.log(publicId)

        const deleteResponse = await cloudinary.uploader.destroy(publicId, {
            resource_type: "raw",
        })
        console.log("Cloudinary Delete Response:", deleteResponse);

        if (deleteResponse.result === "ok") {
            await productmodel.findOneAndDelete({ productId: req.params.productId });
            res.status(200).json("product deleted successfully");
        }
        // res.status(200).json({ message: "Product deleted successfully" })
    } catch (error) {
        res.status(500).json({ message: "Internal error", error: error });
    }
})

module.exports = router;
