import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useFBX } from "@react-three/drei";
import { Box, Grid, Paper, Typography, Divider, Button } from "@mui/material";
import { ArrowForward, ArrowBack } from "@mui/icons-material";

const ProductDetail = ({ data }) => {
  const [selectedImage, setSelectedImage] = useState(0);

  // Destructure the data prop
  const { product_name, product_description, product_images, product_url, product_model, price, contact } = data;

  // If no data is passed, display a message
  if (!data) return <div>No product data available.</div>;

  // Render the product model or images depending on availability
  const renderProductModel = () => {
    if (product_url || product_model) {
      return (
        <Canvas
          style={{
            height: "100%",
            width: "100%",
            backgroundColor: "#f0f0f0",
            border: "1px solid #ccc",
          }}
          camera={{ position: [0, 0, 3], fov: 50 }} // Adjust the camera position and field of view
        >
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} />
          <OrbitControls />
          <ProductModel url={product_url || product_model} />
        </Canvas>
      );
    } else {
      return (
        <Box sx={{ width: "100%", height: "400px", display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "#ddd" }}>
          No 3D model available.
        </Box>
      );
    }
  };

  return (
    <Box sx={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
      <Grid container spacing={4}>
        {/* Left: Product Model Canvas */}
        <Grid item xs={12} md={6}>
          <Paper
            sx={{
              padding: "10px",
              backgroundColor: "#ffffff",
              borderRadius: "12px",
              boxShadow: "0 6px 18px rgba(0, 0, 0, 0.1)",
              minHeight: "400px",
              aspectRatio: "1 / 1", // Square canvas
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {renderProductModel()}
          </Paper>
        </Grid>

        {/* Right: Product Information */}
        <Grid item xs={12} md={6}>
          <Paper
            sx={{
              padding: "30px",
              backgroundColor: "#ffffff",
              borderRadius: "12px",
              boxShadow: "0 6px 18px rgba(0, 0, 0, 0.1)",
            }}
          >
            {/* Product Name */}
            <Typography variant="h3" gutterBottom sx={{ fontWeight: "600", color: "#2c3e50" }}>
              {product_name}
            </Typography>
            <Divider sx={{ marginBottom: "20px" }} />

            {/* Product Description */}
            <Typography variant="body1" sx={{ fontSize: "1.1rem", lineHeight: "1.6", color: "#666" }}>
              {product_description}
            </Typography>

            <Divider sx={{ margin: "20px 0" }} />

            {/* Product Image Carousel */}
            <Box sx={{ display: "flex", gap: "10px", overflowX: "auto", paddingBottom: "15px" }}>
              {product_images && product_images.length > 0 ? (
                product_images.map((image, index) => (
                  <Box
                    key={index}
                    sx={{
                      width: "120px",
                      height: "120px",
                      borderRadius: "10px",
                      overflow: "hidden",
                      cursor: "pointer",
                      border: "1px solid #ddd",
                      transition: "transform 0.3s ease-in-out",
                      boxShadow: selectedImage === index ? "0 0 10px rgba(0, 0, 0, 0.3)" : "none",
                    }}
                    // onClick={() => setSelectedImage(index)}
                    onMouseEnter={(e) => (e.target.style.transform = "scale(1.05)")}
                      onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
                  >
                    <img
                      src={image}
                      alt={`product-${index}`}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        transition: "transform 0.3s ease-in-out",
                      }}
                    />
                  </Box>
                ))
              ) : (
                <div>No images available</div>
              )}
            </Box>

            {/* Product Contact Information */}
            <Typography variant="h6" sx={{ fontWeight: "600", marginBottom: "10px" }}>
              Contact Information
            </Typography>
            <Divider sx={{ marginBottom: "15px" }} />
            {contact && contact.length > 0 ? (
              contact.map((contactInfo, index) => (
                <Typography key={index} variant="body2" sx={{ fontSize: "1rem", color: "#555" }}>
                  - {contactInfo}
                </Typography>
              ))
            ) : (
              <Typography>No contact information available.</Typography>
            )}

            {/* Button */}
            {/* <Box sx={{ marginTop: "20px", textAlign: "center" }}>
              <Button variant="contained" color="primary">
                Add to Cart
              </Button>
            </Box> */}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

// Component to load the .fbx model
const ProductModel = ({ url }) => {
  const fbx = useFBX(url); // Load the FBX model

  return fbx ? (
    <primitive object={fbx} scale={0.02} position={[0, 0, 0]} />
  ) : (
    <div>Loading 3D model...</div>
  );
};

export default ProductDetail;
