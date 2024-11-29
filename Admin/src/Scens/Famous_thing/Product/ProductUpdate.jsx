import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
    Button,
    TextField,
    Box,
    Input,
    Typography,
} from "@mui/material";
import StateDropdown from "../../../component/StateDropdown";

const Backend_url = import.meta.env.VITE_BACKEND_URL;

const ProductUpdate = () => {
    const { productId } = useParams(); // Retrieve productId from the URL
    const [productData, setProductData] = useState({
        product_name: "",
        state_name: "",
        product_category: "",
        product_images: [],
        product_description: [], // Add description field as array
        contact: [], // Add contact field as array
    });
    const [existingImages, setExistingImages] = useState([]);
    const [newImages, setNewImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // Fetch product data by productId
    useEffect(() => {
        const fetchProductData = async () => {
            try {
                const res = await axios.get(`${Backend_url}/Get_product_by_id/${productId}`);
                setProductData(res.data); // Populate the form with the fetched data
                setExistingImages(res.data.product_images || []);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching product data", error);
            }
        };

        fetchProductData();
    }, [productId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProductData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleStateChange = (selectedState) => {
        setProductData((prevData) => ({
            ...prevData,
            state_name: selectedState.state_name,
            stateId: selectedState.stateId,
        }));
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        const base64Promises = files.map((file) => {
            return new Promise((resolve) => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result);
                reader.readAsDataURL(file);
            });
        });

        Promise.all(base64Promises).then((base64Images) => {
            setNewImages((prev) => [...prev, ...base64Images]);
        });
    };

    const removeExistingImage = (index) => {
        setExistingImages((prev) => prev.filter((_, i) => i !== index));
    };

    const removeNewImage = (index) => {
        setNewImages((prev) => prev.filter((_, i) => i !== index));
    };

    const handleUpdateProduct = async () => {
        const updatedProduct = {
            ...productData,
            product_images: [...existingImages, ...newImages],
        };

        try {
            console.log(updatedProduct);
            const response = await axios.post(`${Backend_url}/Update_product/${productId}`, updatedProduct);
            if (response.status === 200) {
                console.log("Product updated successfully", response);
                navigate("/product_home"); // Redirect after update
            }
        } catch (error) {
            console.error("Error updating product", error);
        }
    };

    const handleContactInfoChange = (index, field, value) => {
        const updatedContact = [...productData.contact];
        updatedContact[index][field] = value;
        setProductData((prevData) => ({
            ...prevData,
            contact: updatedContact,
        }));
    };

    const addContactInfo = () => {
        setProductData((prevData) => ({
            ...prevData,
            contact: [...prevData.contact, { name: "", email: "", phone: "", preference: false }],
        }));
    };

    if (loading) {
        return <Typography>Loading...</Typography>;
    }

    return (
        <>
            <Typography variant="h4" gutterBottom>
                Update Product Details
            </Typography>

            <Box component="form" sx={{ mt: 2, display: "flex", flexDirection: "column" }}>
                <TextField
                    label="Product Name"
                    name="product_name"
                    value={productData.product_name}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                />

                <TextField
                    label="Product Description"
                    name="product_description"
                    value={productData.product_description.join(", ")} // Joining the array for display
                    onChange={(e) => {
                        // Update product description array with words separated by commas
                        const updatedDescription = e.target.value.split(",").map(item => item.trim());
                        setProductData((prevData) => ({
                            ...prevData,
                            product_description: updatedDescription,
                        }));
                    }}
                    fullWidth
                    margin="normal"
                    multiline
                />

                <StateDropdown
                    selectedState={productData}
                    onStateChange={handleStateChange}
                />

                <TextField
                    label="Product Category"
                    name="product_category"
                    value={productData.product_category}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                />

                {/* Image Upload */}
                <Typography variant="body1" sx={{ marginBottom: 1 }}>Upload Images</Typography>
                <Input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageChange}
                    style={{ marginBottom: "20px" }}
                />

                {/* Display Existing Images */}
                {existingImages.length > 0 && (
                    <div style={{ display: "flex", gap: "10px", marginBottom: "20px", flexWrap: "wrap" }}>
                        {existingImages.map((image, index) => (
                            <div key={index} style={{ position: "relative" }}>
                                <img
                                    src={image}
                                    alt={`Existing ${index}`}
                                    style={{ width: "100px", height: "100px", objectFit: "cover", border: "1px solid #ddd" }}
                                />
                                <Button
                                    onClick={() => removeExistingImage(index)}
                                    style={{ position: "absolute", top: 0, right: 0 }}
                                >
                                    X
                                </Button>
                            </div>
                        ))}
                    </div>
                )}

                {/* Display New Images */}
                {newImages.length > 0 && (
                    <div style={{ display: "flex", gap: "10px", marginBottom: "20px", flexWrap: "wrap" }}>
                        {newImages.map((image, index) => (
                            <div key={index} style={{ position: "relative" }}>
                                <img
                                    src={image}
                                    alt={`New ${index}`}
                                    style={{ width: "100px", height: "100px", objectFit: "cover", border: "1px solid #ddd" }}
                                />
                                <Button
                                    onClick={() => removeNewImage(index)}
                                    style={{ position: "absolute", top: 0, right: 0 }}
                                >
                                    X
                                </Button>
                            </div>
                        ))}
                    </div>
                )}

                {/* Contact Information */}
                {productData.contact.map((contact, index) => (
                    <div key={index} style={{ marginBottom: "10px" }}>
                        <TextField
                            label="Name"
                            value={contact.name}
                            onChange={(e) => handleContactInfoChange(index, "name", e.target.value)}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Email"
                            value={contact.email}
                            onChange={(e) => handleContactInfoChange(index, "email", e.target.value)}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Phone"
                            value={contact.phone}
                            onChange={(e) => handleContactInfoChange(index, "phone", e.target.value)}
                            fullWidth
                            margin="normal"
                        />
                        <Button
                            variant="outlined"
                            onClick={() => handleContactInfoChange(index, "preference", !contact.preference)}
                        >
                            {contact.preference ? "Preferred" : "Not Preferred"}
                        </Button>
                    </div>
                ))}
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={addContactInfo}
                    sx={{ mt: 2 }}
                >
                    Add Contact Info
                </Button>

                

                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleUpdateProduct}
                    sx={{ mt: 3 }}
                >
                    Update Product
                </Button>
            </Box>
        </>
    );
};

export default ProductUpdate;
