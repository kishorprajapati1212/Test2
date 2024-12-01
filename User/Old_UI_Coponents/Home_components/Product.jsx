import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import { Suspense } from "react";
import { motion } from "framer-motion";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import { useFrame } from "@react-three/fiber";  // Import useFrame for animation

export const Model = ({ modelPath, keyProp }) => {
  const [fbx, setFbx] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadModel = async () => {
      try {
        const loader = new FBXLoader();
        const loadedFbx = await loader.loadAsync(modelPath);
        loadedFbx.traverse((child) => {
          if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
            child.material = child.material.clone();
            child.material.roughness = 0.5;
            child.material.metalness = 0.3;
          }
        });
        setFbx(loadedFbx);
      } catch (error) {
        console.error("Error loading FBX model:", error);
        setError(error);
      }
    };

    if (modelPath) {
      loadModel();
    }
  }, [modelPath]);

  // Rotate the model continuously
  useFrame(() => {
    if (fbx) {
      fbx.rotation.y += 0.01;  // Rotate around the Y axis
    }
  });

  if (error) {
    return <Typography sx={{ color: "#ff0000" }}>Failed to load the model. Please try again later.</Typography>;
  }

  if (!fbx) {
    return null;
  }

  return (
    <Suspense fallback={null}>
      <primitive object={fbx} scale={5} key={keyProp} />
    </Suspense>
  );
};

const ProductDisplay = () => {
  const model = {
    modelPath: "/test3.fbx", // Single model path
    title: "Nataraj",
    description: "Nataraj, the cosmic dancer representing the cycle of creation, preservation, and destruction."
  };

  return (
    <Box sx={{ height: "100vh", display: "flex", position: "relative", background: "linear-gradient(to bottom, #121212, #000)", overflow: "hidden" }}>
      {/* 2D Content - Title and Description */}
      <Box sx={{
        width: "40%", padding: "40px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "flex-start",
        color: "#FFD700", background: "rgba(0, 0, 0, 0.7)", boxShadow: "0 4px 10px rgba(0,0,0,0.5)", borderRadius: "10px", zIndex: 2
      }}>
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <Typography variant="h2" sx={{
            fontFamily: "'Roboto Slab', serif", marginBottom: "20px", fontWeight: "700", fontSize: "3.5rem", letterSpacing: "2px",
            textShadow: "2px 2px 5px rgba(0, 0, 0, 0.7)", lineHeight: 1.2, color: "#FFD700"
          }}>
            {model.title}
          </Typography>
        </motion.div>

        {/* Description */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
        >
          <Typography variant="body1" sx={{
            lineHeight: 1.8, fontSize: "1.2rem", fontFamily: "'Playfair Display SC', serif", color: "#E5E5E5", letterSpacing: "0.5px",
            textShadow: "1px 1px 3px rgba(0,0,0,0.5)"
          }}>
            {model.description}
          </Typography>
        </motion.div>
      </Box>

      {/* 3D Model */}
      <Box sx={{ width: "60%", display: "flex", justifyContent: "center", alignItems: "center", position: "relative", zIndex: 1 }}>
        <Canvas shadows camera={{ position: [3, 2, 8], fov: 50 }} gl={{ antialias: true }}>
          <ambientLight intensity={5} color="#FFFACD" />
          <spotLight position={[0, 10, 0]} angle={0.8} penumbra={1} intensity={300} color={"#FFD700"} castShadow shadow-mapSize-width={2048} shadow-mapSize-height={2048} />
          <spotLight position={[-3, 8, 5]} angle={0.5} penumbra={1} intensity={30} color={"#FF4500"} castShadow />
          <Suspense fallback={null}>
            <Model modelPath={model.modelPath} keyProp={model.title} />
          </Suspense>
          <Environment preset="sunset" />
          <OrbitControls enableZoom={true} />
        </Canvas>
      </Box>
    </Box>
  );
};

export default ProductDisplay;
