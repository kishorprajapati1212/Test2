import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { TextField, Button, Typography, CircularProgress } from "@mui/material";
import StateDropdown from "../../component/StateDropdown";

const WarUpdate = () => {
    const Backend_url = import.meta.env.VITE_BACKEND_URL; // Backend URL
    const { historyId } = useParams(); // Get historyId from URL params

    const [warHistory, setWarHistory] = useState(null); // State for fetched data
    const [loading, setLoading] = useState(true); // Loading state
    const [imagePreview, setImagePreview] = useState(""); // State for image preview

    const navigation = useNavigate();

    // Fetch data based on historyId
    const fetchWarHistory = async () => {
        try {
            const response = await axios.get(`${Backend_url}/get_One_War_History/${historyId}`);
            setWarHistory(response.data);
            setImagePreview(response.data.war_image || "");
        } catch (error) {
            console.error("Error fetching war history:", error);
        } finally {
            setLoading(false);
        }
    };

    // Fetch data when the component mounts
    useEffect(() => {
        fetchWarHistory();
    }, [historyId]);

    // Update the selected state in the war history
    const handleStateChange = (selectedState) => {
        setWarHistory((prev) => ({
            ...prev,
            stateId: selectedState?.stateId,
            state_name: selectedState?.state_name,
        }));
    };

    // Handle image file selection and conversion to Base64
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result); // Update preview
                setWarHistory((prev) => ({
                    ...prev,
                    war_image: reader.result, // Update war_image field
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    // Handle form submission to update the war history
    const handleUpdate = async () => {
        try {
            const res = await axios.post(`${Backend_url}/update_war_history/${historyId}`, warHistory);
            console.log(res.data)
            if(res.data.message == "Updated Successfully"){
                navigation("/War_home")
            }
            
        } catch (error) {
            console.error("Error updating war history:", error);
            alert("Failed to update war history.");
        }
    };

    if (loading) return <CircularProgress />;
    if (!warHistory) return <p>No war history found for the given ID.</p>;

    return (
        <div>
            <Typography variant="h4" gutterBottom>
                Update War History
            </Typography>
            <form>
                <TextField
                    fullWidth
                    label="War Name"
                    value={warHistory.war_name || ""}
                    onChange={(e) => setWarHistory({ ...warHistory, war_name: e.target.value })}
                    margin="normal"
                />
                <TextField
                    fullWidth
                    label="War Between"
                    value={warHistory.war_between || ""}
                    onChange={(e) => setWarHistory({ ...warHistory, war_between: e.target.value })}
                    margin="normal"
                />
                <TextField
                    fullWidth
                    label="War Reason"
                    value={warHistory.war_reason || ""}
                    onChange={(e) => setWarHistory({ ...warHistory, war_reason: e.target.value })}
                    margin="normal"
                />
                <TextField
                    fullWidth
                    label="War Description"
                    value={warHistory.war_description || ""}
                    onChange={(e) =>
                        setWarHistory({ ...warHistory, war_description: e.target.value })
                    }
                    multiline
                    rows={4}
                    margin="normal"
                />
                <TextField
                    fullWidth
                    label="War Winner"
                    value={warHistory.war_winner || ""}
                    onChange={(e) => setWarHistory({ ...warHistory, war_winner: e.target.value })}
                    margin="normal"
                />
                <TextField
                    fullWidth
                    label="War Place"
                    value={warHistory.war_place || ""}
                    onChange={(e) => setWarHistory({ ...warHistory, war_place: e.target.value })}
                    margin="normal"
                />
                <TextField
                    fullWidth
                    label="Start Year"
                    type="number"
                    value={warHistory.start_war || ""}
                    onChange={(e) => setWarHistory({ ...warHistory, start_war: e.target.value })}
                    margin="normal"
                />
                <TextField
                    fullWidth
                    label="End Year"
                    type="number"
                    value={warHistory.end_war || ""}
                    onChange={(e) => setWarHistory({ ...warHistory, end_war: e.target.value })}
                    margin="normal"
                />
                <TextField
                    fullWidth
                    label="war Losse "
                    value={warHistory.war_losses || ""}
                    onChange={(e) => setWarHistory({ ...warHistory, war_losses: e.target.value })}
                    margin="normal"
                />
                <StateDropdown
                    selectedState={{
                        stateId: warHistory.stateId,
                        state_name: warHistory.state_name,
                    }}
                    onStateChange={handleStateChange}
                />
                <div>
                    <Typography>Current Image:</Typography>
                    {imagePreview ? (
                        <img src={imagePreview} alt="War" style={{ width: "200px", marginTop: "10px" }} />
                    ) : (
                        <p>No image available</p>
                    )}
                    <Button variant="outlined" component="label">
                        Update Image
                        <input
                            type="file"
                            accept="image/*"
                            hidden
                            onChange={handleImageChange}
                        />
                    </Button>
                </div>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleUpdate}
                    style={{ marginTop: "20px" }}
                >
                    Update War History
                </Button>
            </form>
        </div>
    );
};

export default WarUpdate;
