import { useState } from "react";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  Typography,
  Input,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import StateDropdown from "../../../component/StateDropdown";
import axios from "axios";
import UpdateDisabledOutlined from "@mui/icons-material/UpdateDisabledOutlined";

const ProductAdd = () => {
  const Backend_url = import.meta.env.VITE_BACKEND_URL;

  const [productData, setproductData] = useState({
    stateId: "",
    state_name: "",
    product_name: "",
    product_description: "",
    contact: [],
    product_images: [],
    product_category: "",
    product_model: "",
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
      contact: [...prev.contact, { email: "", name: "", phone: "", preference: "" }],
    }));
  };

  const handleContactChange = (e, index, field) => {
    const value = field === "preference" ? e.target.checked : e.target.value;
    setproductData((prev) => {
      const updatedContacts = [...prev.contact];
      updatedContacts[index][field] = value;
      return { ...prev, contact: updatedContacts }
    })
  }

  const handleImageChange = (e) => {
    const files = e.target.files;
    // console.log(files)
    const images = [];

    Array.from(files).forEach((file) => {
      const render = new FileReader();
      render.onloadend = () => {
        images.push(render.result);
        if (images.length === files.length) {
          setproductData((prev) => ({ ...prev, product_images: images, }));
        }
      };
      render.readAsDataURL(file)
    })

  }

  const handleSubmit = () => {
    console.log(productData);
  }

  return (
    <Box sx={{ maxWidth: 600, margin: "auto", p: 3, boxShadow: 3 }}>
      <Typography variant="h5" gutterBottom>
        Add New Place
      </Typography>

      <StateDropdown selectedState={productData} onStateChange={handleStateChange} />

      <TextField
        label="Product Name"
        name="product_name"
        onChange={handleInputChange}
        placeholder="Enter product Name"
        value={productData.product_name}
        fullWidth
        margin="normal"
        variant="outlined"
      />

      <TextField
        label="Product Description"
        name="product_description"
        onChange={handleInputChange}
        placeholder="Enter product Description"
        value={productData.product_description}
        fullWidth
        margin="normal"
        variant="outlined"
      />
      <input type="file" multiple accept="image/*" onChange={handleImageChange} />


      <Button onClick={handleAddNewContact}>
        Add New Contact
      </Button>
      {productData.contact.map((contact, index) => (
        <div key={index} style={{padding: "10px", marginBottom: "15px", border: "1px solid #ddd", borderRadius: "8px"}}>
          <TextField
            label="Email"
            value={contact.email}
            onChange={(e) => handleContactChange(e, index, "email")}
            sx={{ marginBottom: "10px" }}
          />
          <TextField
            label="Name"
            value={contact.name}
            onChange={(e) => handleContactChange(e, index, "name")}
          />
          <TextField
            label="Contact No"
            value={contact.phone}
            onChange={(e) => handleContactChange(e, index, "phone")}
          />
          <FormControlLabel
            control={
              <Checkbox
                name="contact"
                value={contact.preference}
                checked={contact.preference}
                onChange={(e) => handleContactChange(e, index, "preference")}
                label="Preference"
              />
            }
            label="Preference"
          />

        </div>
      ))}



      <Button variant="contained" color="primary" fullWidth onClick={handleSubmit}>
        Submit
      </Button>
    </Box>
  );
};

export default ProductAdd;
