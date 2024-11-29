import { useState } from "react";
import {
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
  Box,
  Typography,
  Grid,
  Paper,
  CircularProgress 
} from "@mui/material";
import StateDropdown from "../../../component/StateDropdown";
import axios from "axios";

const ProductAdd = () => {
  const Backend_url = import.meta.env.VITE_BACKEND_URL;
  const [loading, setLoading] = useState(false); // Loading state

  const [productData, setproductData] = useState({
    stateId: "",
    state_name: "",
    product_name: "",
    product_description: "",
    product_category: "",
    product_model: null,
    product_images: [],
    contact: [],
  });

  const handleStateChange = (state) => {
    setproductData((prev) => ({
      ...prev,
      stateId: state.stateId,
      state_name: state.state_name,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setproductData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddNewContact = () => {
    setproductData((prev) => ({
      ...prev,
      contact: [...prev.contact, { email: "", name: "", phone: "", preference: false }],
    }));
  };

  const handleContactChange = (e, index, field) => {
    const value = field === "preference" ? e.target.checked : e.target.value;
    setproductData((prev) => {
      const updatedContacts = [...prev.contact];
      updatedContacts[index][field] = value;
      return { ...prev, contact: updatedContacts };
    });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const images = [];

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        images.push(reader.result);
        if (images.length === files.length) {
          setproductData((prev) => ({ ...prev, product_images: images }));
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleModelChange = (e) => {
    const file = e.target.files[0];

    // Check if file exists and its size
    if (file && file.size > 9.9 * 1024 * 1024) {
      alert("The 3D model file size should not exceed 9.9 MB.");
      e.target.value = ""; // Clear the file input
      return; // Stop further processing
    }

    // Update state only if the file is valid
    setproductData((prev) => ({ ...prev, product_model: file }));
  };

  const handleSubmit = async () => {
    setLoading(true); // Set loading to true

    try {
      const formData = new FormData();
      formData.append("stateId", productData.stateId);
      formData.append("state_name", productData.state_name);
      formData.append("product_name", productData.product_name);
      formData.append("product_description", productData.product_description);
      formData.append("product_category", productData.product_category);

      if (productData.product_model) {
        formData.append("product_model", productData.product_model);
      }
      console.log(productData)

      const response = await axios.post(`${Backend_url}/Add_product`, productData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      // Handle response properly
      if (response.status === 200) {
        console.log("Product submitted successfully!");
      } else {
        console.error("Failed to submit product.");
      }
    } catch (error) {
      console.error("Error submitting product:", error);
    } finally {
      setLoading(false); // Set loading to false
    }
  };


  return (
    <Box
      component={Paper}
      elevation={3}
      sx={{
        maxWidth: 700,
        margin: "auto",
        p: 4,
        mt: 4,
        borderRadius: 2,
        backgroundColor: "transparent"
      }}
    >
      <Typography variant="h4" gutterBottom textAlign="center">
        Add New Product
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <StateDropdown selectedState={productData} onStateChange={handleStateChange} />
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Product Name"
            name="product_name"
            onChange={handleInputChange}
            placeholder="Enter product name"
            value={productData.product_name}
            fullWidth
            variant="outlined"
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Product Description"
            name="product_description"
            onChange={handleInputChange}
            placeholder="Enter product description"
            value={productData.product_description}
            fullWidth
            multiline
            rows={3}
            variant="outlined"
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Product Category"
            name="product_category"
            onChange={handleInputChange}
            placeholder="Enter product category"
            value={productData.product_category}
            fullWidth
            variant="outlined"
          />
        </Grid>

        <Grid item xs={12}>
          <Typography variant="subtitle1" sx={{ mb: 1 }}>
            3D Model:
          </Typography>
          <input type="file" accept=".fbx" onChange={handleModelChange} />
        </Grid>

        <Grid item xs={12}>
          <Typography variant="subtitle1" sx={{ mb: 1 }}>
            Product Images:
          </Typography>
          <input type="file" multiple accept="image/*" onChange={handleImageChange} />
        </Grid>

        <Grid item xs={12}>
          <Button
            onClick={handleAddNewContact}
            variant="outlined"
            fullWidth
            sx={{ mt: 1 }}
          >
            Add New Contact
          </Button>
        </Grid>

        {productData.contact.map((contact, index) => (
          <Grid
            item
            xs={12}
            key={index}
            sx={{
              border: "1px solid #ddd",
              borderRadius: 2,
              p: 2,
              my: 1,
            }}
          >
            <TextField
              label="Email"
              value={contact.email}
              onChange={(e) => handleContactChange(e, index, "email")}
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              label="Name"
              value={contact.name}
              onChange={(e) => handleContactChange(e, index, "name")}
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              label="Contact No"
              value={contact.phone}
              onChange={(e) => handleContactChange(e, index, "phone")}
              fullWidth
              sx={{ mb: 2 }}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={contact.preference}
                  onChange={(e) => handleContactChange(e, index, "preference")}
                />
              }
              label="Preference"
            />
          </Grid>
        ))}

        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
            onClick={handleSubmit}
            disabled={loading} // Disable button when loading
        startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
          >
        {loading ? "Submitting..." : "Submit"}
            
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProductAdd;
