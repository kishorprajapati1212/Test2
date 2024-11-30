import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { Card, CardContent, CardMedia, Typography, Grid, Box } from "@mui/material";
import { styled } from "@mui/system";

const All_state_detail = () => {
  const { section } = useParams(); // Get section from the URL
  const Backend_url = import.meta.env.VITE_BACKEND_URL;
  const [states, setStates] = useState([]);

  // Fetch the state data from the backend
  const fetchState = async () => {
    try {
      const res = await axios.get(`${Backend_url}/All_state_with_one_image`);
      setStates(res.data); // Assuming the response is an array of states
    } catch (error) {
      console.error("Error fetching state data:", error);
    }
  };

  useEffect(() => {
    fetchState();
  }, []);

  return (
    <>
      <Typography variant="h3" align="center" gutterBottom sx={{ fontWeight: 'bold', color: '#333', padding: '20px' }}>
        {section}
      </Typography>

      {/* MUI Grid with responsive columns */}
      <Grid
        container
        spacing={4}
        justifyContent="center"
        sx={{
          maxWidth: '1200px', // Control the max width of the grid container
          margin: '0 auto',  // Center the container horizontally
          padding: { xs: '0 10px', sm: '0 20px' }, // Padding to prevent content from touching screen edges
          marginTop: 4,
        }}
      >
        {states.map((state) => (
          <Grid item key={state.stateId} xs={12} sm={6} md={4}>
            <StyledCard>
              <Link to={`/state/${state.stateId}/${section}`} style={{ textDecoration: 'none' }}>
                <Box sx={{ position: 'relative', overflow: 'hidden', borderRadius: '16px' }}>
                  <CardMedia
                    component="img"
                    image={state.state_images[0]}
                    alt={state.state_name}
                    sx={{
                      objectFit: 'cover',
                      height: '200px',
                      transition: 'transform 0.3s ease-in-out',
                      borderRadius: '16px',
                    }}
                  />
                </Box>

                <CardContent
                  sx={{
                    padding: '16px',
                    background: 'rgba(0, 0, 0, 0.5)',  // Semi-transparent background
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    color: '#fff',
                    borderBottomLeftRadius: '16px',
                    borderBottomRightRadius: '16px',
                    textAlign: 'center',
                  }}
                >
                  <Typography variant="h6" sx={{ color:"white",fontWeight: 'bold', fontSize: '1.25rem', letterSpacing: '1px' }}>
                    {state.state_name}
                  </Typography>
                </CardContent>
              </Link>
            </StyledCard>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

// Styled Card component with hover effect
const StyledCard = styled(Card)(({ theme }) => ({
  position: 'relative',
  borderRadius: '16px',
  boxShadow: '0 6px 15px rgba(0, 0, 0, 0.1)',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: '0 12px 25px rgba(0, 0, 0, 0.2)',
  },
}));

export default All_state_detail;
