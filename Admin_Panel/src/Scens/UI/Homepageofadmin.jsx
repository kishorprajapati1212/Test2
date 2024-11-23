import React from "react";
import {
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
} from "@mui/material";

const Homepageofadmin = () => {
    const sampleData = [
        {
            id: 1,
            column1: "Data 1",
            column2: "Data 2",
            column3: "Data 3",
            column4: "Data 4",
        },
        {
            id: 2,
            column1: "Data A",
            column2: "Data B",
            column3: "Data C",
            column4: "Data D",
        },
    ];

    const handleUpdate = (id) => {
        console.log(`Update clicked for ID: ${id}`);
    };

    const handleDelete = (id) => {
        console.log(`Delete clicked for ID: ${id}`);
    };

    return (
        <div
            style={{
                padding: "20px",
                width: "100%", // Full width after sidebar
                boxSizing: "border-box", // Ensure padding doesn't affect layout
            }}
        >
            {/* Header Section */}
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "20px",
                }}
            >
                <Typography variant="h4">Admin Homepage</Typography>
                <Button
                    variant="contained"
                    color="primary"
                    style={{ backgroundColor: "#007BFF" }}
                >
                    + Add Status
                </Button>
            </div>

            {/* Table Section */}
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell><strong>Column 1</strong></TableCell>
                            <TableCell><strong>Column 2</strong></TableCell>
                            <TableCell><strong>Column 3</strong></TableCell>
                            <TableCell><strong>Column 4</strong></TableCell>
                            <TableCell><strong>Actions</strong></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sampleData.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell>{row.column1}</TableCell>
                                <TableCell>{row.column2}</TableCell>
                                <TableCell>{row.column3}</TableCell>
                                <TableCell>{row.column4}</TableCell>
                                <TableCell>
                                    <Button
                                        variant="contained"
                                        style={{
                                            backgroundColor: "green",
                                            color: "white",
                                            marginRight: "10px",
                                        }}
                                        onClick={() => handleUpdate(row.id)}
                                    >
                                        Update
                                    </Button>
                                    <Button
                                        variant="contained"
                                        style={{
                                            backgroundColor: "red",
                                            color: "white",
                                        }}
                                        onClick={() => handleDelete(row.id)}
                                    >
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default Homepageofadmin;
