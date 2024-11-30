import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { CircularProgress, Grid, Card, CardContent, Typography, Button } from "@mui/material";
import FoodDetail from "../Component/Card_Detail_View/FoodDetail";
import FestivalDetail from "../Component/Card_Detail_View/FestivalDetail";
import PlaceDetail from "../Component/Card_Detail_View/PlaceDetail";
import ProductDetail from "../Component/Card_Detail_View/ProductDetail";
import WarHistoryDetail from "../Component/Card_Detail_View/WarHistoryDetail ";
import OriginHistoryDetail from "../Component/Card_Detail_View/OriginHistoryDetail";
import DanceDetail from "../Component/Card_Detail_View/DanceDetail";
import BackButton from "../Component/BackButton";


const Carddetail = () => {
    const Backend_url = import.meta.env.VITE_BACKEND_URL;
    const { stateId, section, itemId } = useParams();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch data based on section and itemId
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);
                const response = await axios.get(`${Backend_url}/state_detail/${stateId}/${section}/${itemId}`);
                setData(response.data);
            } catch (err) {
                setError("Failed to fetch data. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [stateId, section, itemId]);

    // Render loading state
    if (loading) {
        return (
            <Grid container justifyContent="center" alignItems="center" style={{ height: "100vh" }}>
                <CircularProgress />
            </Grid>
        );
    }

    // Render error state
    if (error) {
        return (
            <Grid container justifyContent="center" alignItems="center" style={{ height: "100vh" }}>
                <Typography variant="h6" color="error">
                    {error}
                </Typography>
            </Grid>
        );
    }

    // Render the section-specific details
    const renderDetailSection = () => {
        switch (section) {
            case "food":
                return <FoodDetail data={data} />;
            case "festival":
                return <FestivalDetail data={data} />;
            case "place":
                return <PlaceDetail data={data} />;
            case "product":
                return <ProductDetail data={data} />;
            case "war_history":
                return <WarHistoryDetail data={data} />;
            case "origin_history":
                return <OriginHistoryDetail data={data} />;
            case "dance":
                return <DanceDetail data={data} />;
            //   case "war_history":
            //     return <WarHistoryDetail data={data} />;
            //   // Add other sections as needed
            default:
                return <Typography>No details available for this section.</Typography>;
        }
    };

    return (
        <div style={{ padding: "20px" }}>
                  <BackButton />


            <Card>
                <CardContent>
                    <Typography variant="h4" gutterBottom>
                        {`${section.charAt(0).toUpperCase() + section.slice(1)} Details`}
                    </Typography>
                    {renderDetailSection()}
                </CardContent>
            </Card>
        </div>
    );
};

export default Carddetail;
