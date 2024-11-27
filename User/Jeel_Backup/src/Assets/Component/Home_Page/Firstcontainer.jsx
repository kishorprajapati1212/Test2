import React from 'react';
import { Box, Grid, Typography } from '@mui/material';

const Firstcontainer = ({ Heightsize }) => {
  return (
    <Box sx={{ mt: 2, color: "white", position: "relative", height: Heightsize, overflow: 'hidden' }}>
      <Grid container>
        <Grid item xs={12}>
          <video autoPlay loop muted style={{ height: Heightsize, width: "100%", objectFit: "cover", zIndex: 0 }}>
            <source src="/react41.mp4" type="video/mp4" />
          </video>

          <Typography sx={{
            position: 'absolute',
            top: '50%',
            left: '5%',
            transform: 'translateY(-50%)',
            color: 'white',
            zIndex: 2,
            width: "40%",
          }}
            variant="h2"
            objectFit="cover"
          >
            Welcome to the 
            VisionVerse
            <Typography variant='body2' objectFit="cover">
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde aliquid praesentium nostrum nemo harum dolorum doloribus sint maxime natus
                officiis dolore ipsum ut quam soluta aspernatur distinctio, sed quidem facilis magnam eaque, voluptate magni error nobis. Pariatur quas ut quaerat,
                exercitationem odio cupiditate autem a sint, minus soluta sed vitae.
              </p>
            </Typography>
          </Typography>
        </Grid>
      </Grid>

      
    </Box>
  );
}

export default Firstcontainer;
