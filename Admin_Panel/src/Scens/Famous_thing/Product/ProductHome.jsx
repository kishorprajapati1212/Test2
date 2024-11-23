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
    const [selectedplace, setselectedplace] = useState(null);
    const [isPopupOpen, setPopupOpen] = useState(false);
    const [place, setplace] = useState([]);

    const fetchPlace = async () => {
        const res = await axios.get(`${Backend_url}/Get_all_place`);
        setplace(res.data); // Ensure the correct property (e.g., res.data) is used
    }

    useEffect(() => {
        fetchPlace();
    }, []);

    // console.log(place);

    const handleDelete = async () => {
        if(selectedplace){
            const res = await axios.get(`${Backend_url}/Delete_place/${selectedplace.HeritageId}`);
            if(res.status == 200){
                setPopupOpen(false);
                setselectedplace((prev) => 
                    prev.filter((place) => place.HeritageId !== selectedplace.HeritageId)
                );
                
            }
        }
    }

    return (
        <>
            <div style={{ padding: "20px", width: "auto" }}>
                <Typography variant="h4" gutterBottom>
                    Place Management
                </Typography>

                {/* Add State Button */}
                <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "20px" }}>
                    <Button
                        variant="contained"
                        color="primary"
                        style={{ marginBottom: "20px" }}
                        component={Link}
                        to="/Add_product"
                    >
                        + Add Place
                    </Button>
                </div>

                <TableContainer component={Paper}>
                    <Table>
                        
                    </Table>
                </TableContainer>

                {/* Delete Confirmation Popup */}
                <Deletepopup
                    open={isPopupOpen}
                    onClose={() => setPopupOpen(false)}
                    title="Confirm Delete"
                    onConfirm={handleDelete}
                >
                    <Typography>Are you sure you want to delete this place?</Typography>
                </Deletepopup>
            </div>
        </>
    )
}

export default ProductHome;
