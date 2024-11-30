import axios from "axios";
import { useEffect, useState } from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const Backend_url = import.meta.env.VITE_BACKEND_URL;
const placeTypes = ["Heritage", "Fort", "Temple", "Museum"];

const MapFilter = ({ setFilteredPlaces }) => {
    const [places, setPlaces] = useState([]);
    const [selectType, setSelectType] = useState(placeTypes[0]); // Default to first place type

    // Fetch places data from the backend
    const fetchPlace = async () => {
        try {
            const res = await axios.get(`${Backend_url}/Get_only_Limited_Place`);
            setPlaces(res.data);
            // Set filtered places to the default place type after data is fetched
            setFilteredPlaces(res.data.filter((place) => place.place_type === placeTypes[0]));
        } catch (error) {
            console.error("Error fetching places:", error);
        }
    };

    useEffect(() => {
        fetchPlace();
    }, []);

    // Handle input change for place type selection
    const handleInputChange = async (e) => {
        const selectedType = e.target.value;
        setSelectType(selectedType);
        const filtered = places.filter((place) => place.place_type === selectedType);
        setFilteredPlaces(filtered); // Update filtered places
    };

    return (
        <div
            style={{
                position: "sticky",
                top: 0,
                zIndex: 10,
                backgroundColor: "white",
                padding: "16px",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            }}
        >
            <FormControl
                fullWidth
                margin="normal"
                sx={{
                    minWidth: 200,
                    '& .MuiInputLabel-root': { color: "black" }, // Adjust input label styles
                    '& .MuiOutlinedInput-root': { borderColor: "gray" }, // Adjust input box styles
                }}
            >
                <InputLabel>Place Type</InputLabel>
                <Select
                    name="place_type"
                    value={selectType}
                    onChange={handleInputChange}
                    label="Place Type"
                >
                    {placeTypes.map((type, index) => (
                        <MenuItem key={index} value={type}>
                            {type}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
};

export default MapFilter;
