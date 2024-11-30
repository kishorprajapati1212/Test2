import React from "react";
import { Box, Grid, Typography, CardMedia, Paper, List, ListItem, ListItemText, Divider } from "@mui/material";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Carousel styles

const DanceDetail = ({ data }) => {
  const {
    dance_name,
    dance_description,
    origin_story,
    cloths,
    dance_image,
  } = data;

  return (
    <Box sx={{ padding: "20px", backgroundColor: "#f4f6f8", minHeight: "100vh" }}>
      <Grid container spacing={4}>
        {/* Left Section: Dance Images */}
        <Grid item xs={12} md={6}>
          <Carousel>
            {dance_image.map((image, index) => (
              <div key={index}>
                <CardMedia
                  component="img"
                  height="300"
                  image={image}
                  alt={`Dance Image ${index + 1}`}
                  sx={{ borderRadius: "8px", boxShadow: 3 }}
                />
              </div>
            ))}
          </Carousel>
        </Grid>

        {/* Right Section: Dance Details */}
        <Grid item xs={12} md={6}>
          <Paper
            sx={{
              padding: "20px",
              backgroundColor: "#ffffff",
              borderRadius: "8px",
              boxShadow: 3,
            }}
          >
            <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold" }}>
              {dance_name}
            </Typography>
            <Divider sx={{ marginBottom: "20px" }} />

            {/* Dance Description */}
            <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: "10px" }}>
              Dance Description
            </Typography>
            <Typography variant="body1" paragraph>
              {dance_description}
            </Typography>

            {/* Origin Story */}
            <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: "10px" }}>
              Origin Story
            </Typography>
            <Typography variant="body1" paragraph>
              {origin_story}
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      <Grid container spacing={4} sx={{ marginTop: "40px" }}>
        {/* Left Section: Cloths */}
        <Grid item xs={12}>
          <Typography variant="h5" sx={{ fontWeight: "bold", marginBottom: "10px" }}>
            Traditional Clothing for {dance_name}
          </Typography>

          {/* Dynamic Women’s Clothing */}
          {cloths?.filter(item => item.cloth_type === "women").length > 0 && (
            <Paper sx={{ padding: "15px", backgroundColor: "#ffffff", borderRadius: "8px", boxShadow: 3, marginBottom: "30px" }}>
              <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: "10px" }}>
                Women’s Clothing
              </Typography>
              <List>
                {cloths
                  .filter(item => item.cloth_type === "Women")
                  .map((cloth, index) => (
                    <ListItem key={index}>
                      <CardMedia
                        component="img"
                        sx={{ width: 60, height: 60, marginRight: "20px", borderRadius: "4px" }}
                        image={cloth.image}
                        alt={cloth.cloth_name}
                      />
                      <ListItemText
                        primary={cloth.cloth_name}
                        secondary={cloth.cloth_description}
                      />
                    </ListItem>
                  ))}
              </List>
            </Paper>
          )}

          {/* Dynamic Men’s Clothing */}
          {cloths?.filter(item => item.cloth_type === "men").length > 0 && (
            <Paper sx={{ padding: "15px", backgroundColor: "#ffffff", borderRadius: "8px", boxShadow: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: "10px" }}>
                Men’s Clothing
              </Typography>
              <List>
                {cloths
                  .filter(item => item.cloth_type === "men")
                  .map((cloth, index) => (
                    <ListItem key={index}>
                      <CardMedia
                        component="img"
                        sx={{ width: 60, height: 60, marginRight: "20px", borderRadius: "4px" }}
                        image={cloth.image}
                        alt={cloth.cloth_name}
                      />
                      <ListItemText
                        primary={cloth.cloth_name}
                        secondary={cloth.cloth_description}
                      />
                    </ListItem>
                  ))}
              </List>
            </Paper>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default DanceDetail;
