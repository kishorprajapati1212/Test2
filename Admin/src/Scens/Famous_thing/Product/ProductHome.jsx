import React, { useEffect, useState } from "react";
import {
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";
import Deletepopup from "../../../Global_Component/Deletepopup";

const ProductHome = () => {
  const Backend_url = import.meta.env.VITE_BACKEND_URL;
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const res = await axios.get(`${Backend_url}/Get_all_products`);
    setProducts(res.data); // Assuming res.data returns the products array
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async () => {
    if (selectedProduct) {
      const res = await axios.get(`${Backend_url}/Delete_product/${selectedProduct.productId}`);
      if (res.status === 200) {
        setPopupOpen(false);
        setProducts((prev) =>
          prev.filter((product) => product.productId !== selectedProduct.productId)
        );
      }
    }
  };

  return (
    <>
      <div style={{ padding: "20px", width: "auto" }}>
        <Typography variant="h4" gutterBottom>
          Product Management
        </Typography>

        {/* Add Product Button */}
        <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "20px" }}>
          <Button
            variant="contained"
            color="primary"
            style={{ marginBottom: "20px" }}
            component={Link}
            to="/Add_product"
          >
            + Add Product
          </Button>
        </div>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Product Name</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>State</TableCell>
                <TableCell>product_images</TableCell>
                <TableCell>Model</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.productId}>
                  <TableCell>{product.product_name}</TableCell>
                  <TableCell>{product.product_category}</TableCell>
                  <TableCell>{product.State_name}</TableCell>
                  <TableCell>
                    <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                      {product.product_images && product.product_images.length > 0 ? (
                        product.product_images.map((image, index) => (
                          <img
                            key={index}
                            src={image}
                            alt={`Product ${index + 1}`}
                            style={{
                              width: "50px",
                              height: "50px",
                              objectFit: "cover",
                              borderRadius: "5px",
                              border: "1px solid #ccc",
                            }}
                          />
                        ))
                      ) : (
                        <Typography variant="body2">No product_images</Typography>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <a href={product.product_url} target="_blank" rel="noopener noreferrer">
                      {product.product_model ? "View Model" : "No Model"}
                    </a>
                  </TableCell>
                  <TableCell>
                    <div style={{ display: "flex", gap: "10px" }}>
                      {/* Update Button */}
                      <Button
                        variant="contained"
                        style={{
                          backgroundColor: "green",
                          color: "white",
                          padding: "5px 10px",
                        }}
                        component={Link}
                        to={`/Update_product/${product.productId}`}
                      >
                        Update
                      </Button>

                      {/* Delete Button */}
                      <Button
                        variant="contained"
                        style={{
                          backgroundColor: "red",
                          color: "white",
                          padding: "5px 10px",
                        }}
                        onClick={() => {
                          setSelectedProduct(product);
                          setPopupOpen(true);
                        }}
                      >
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Delete Confirmation Popup */}
        <Deletepopup
          open={isPopupOpen}
          onClose={() => setPopupOpen(false)}
          title="Confirm Delete"
          onConfirm={handleDelete}
        >
          <Typography>Are you sure you want to delete this product?</Typography>
        </Deletepopup>
      </div>
    </>
  );
};

export default ProductHome;
