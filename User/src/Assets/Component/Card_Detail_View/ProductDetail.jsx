import React from "react";
import { Canvas } from "@react-three/fiber";
import { useFBX, OrbitControls } from "@react-three/drei"; // Import OrbitControls from drei

const ProductDetail = ({ data }) => {
  // Destructure the data prop
  const { product_name, product_description, product_images, product_url } = data;

  // If no data is passed, display a message
  if (!data) return <div>No product data available.</div>;

  // Render the product model or images depending on availability
  const renderProductModel = () => {
    if (product_url) {
      return (
        <Canvas
          style={{
            height: "500px",
            width: "100%",
            backgroundColor: "#f0f0f0",
            border: "1px solid #ccc",
          }}
        >
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} />
          <OrbitControls />
          <ProductModel url={product_url} />
        </Canvas>
      );
    } else {
      return (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
          {product_images && product_images.length > 0 ? (
            product_images.map((image, index) => (
              <img
                src={image}
                alt={`product-${index}`}
                key={index}
                style={{
                  width: "200px",
                  height: "auto",
                  borderRadius: "8px",
                  border: "1px solid #ddd",
                }}
              />
            ))
          ) : (
            <div>No images available</div>
          )}
        </div>
      );
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "2rem", color: "#333" }}>{product_name}</h1>
      <div style={{ margin: "20px 0" }}>
        {product_description && product_description.length > 0 ? (
          product_description.map((desc, index) => (
            <p key={index} style={{ fontSize: "1rem", lineHeight: "1.6", color: "#666" }}>
              {desc}
            </p>
          ))
        ) : (
          <p>No description available.</p>
        )}
      </div>
      <div>{renderProductModel()}</div>
    </div>
  );
};

// Component to load the .fbx model
const ProductModel = ({ url }) => {
  const fbx = useFBX(url); // Load the FBX model

  return fbx ? (
    <primitive object={fbx} scale={0.5} position={[0, 0, 10]} />
  ) : (
    <div>Loading 3D model...</div>
  );
};

export default ProductDetail;
