import axios from "axios";
import { useEffect, useState } from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const Backend_url = import.meta.env.VITE_BACKEND_URL;
import { placeTypes } from "../Famous_thing/Place/PlaceHome";

const MapFilter = ({ setFilteredPlaces }) => {
    const [places, setplaces] = useState([]);
    const [selecttype, setselecttype] = useState(placeTypes[0]); // Default to first place type

    const fetchPlace = async () => {
        const res = await axios.get(`${Backend_url}/Get_only_Limited_Place`);
        setplaces(res.data);
        setFilteredPlaces(res.data.filter((place) => place.place_type === placeTypes[0])); // Set default filter
    };

    useEffect(() => {
        fetchPlace();
    }, []);

    const handleInputChange = async (e) => {
        const selectedType = e.target.value;
        setselecttype(selectedType);
        const filtered = places.filter((place) => place.place_type === selectedType);
        setFilteredPlaces(filtered);
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
                    value={selecttype}
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
