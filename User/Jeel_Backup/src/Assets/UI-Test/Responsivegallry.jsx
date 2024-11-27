import React from 'react';
import { Box } from '@mui/material';

const ResponsiveGallery = () => {
    const imagePaths = [
        '/model/Designer (7).jpeg',
        '/model/Designer (8).jpeg',
        '/model/Designer (9).jpeg',
        '/model/Designer (10).jpeg',
        '/model/Designer (11).jpeg',
        '/model/Designer (7).jpeg',
        '/model/Designer (8).jpeg',
        '/model/Designer (9).jpeg',
        '/model/Designer (10).jpeg',
        '/model/Designer (11).jpeg',
    ];

    // Helper function to divide images into columns
    const divideImagesIntoColumns = (images, numColumns) => {
        const columns = Array.from({ length: numColumns }, () => []);
        images.forEach((image, index) => {
            columns[index % numColumns].push(image);
        });
        return columns;
    };

    const columns = divideImagesIntoColumns(imagePaths, 3); // Divide images into 3 columns

    return (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',  // Center the columns in the middle of the page
            gap: 2,                    // Gap between columns
            maxWidth: '1200px',         // Limit the overall width of the gallery
            margin: '0 auto',           // Center the gallery container
            padding: '16px',
            '&:hover img:not(:hover)': {  // When hovering on any image, blur and grayscale others
              filter: 'blur(3px) grayscale(100%)',
              transition: 'filter 0.3s ease',
            },
          }}
        >
          {columns.map((column, columnIndex) => (
            <Box
              key={columnIndex}
              sx={{
                display: 'flex',
                flexDirection: 'column',   // Stack images vertically in each column
                gap: 2,                    // Gap between images in the column
                flex: 1,                   // Distribute the columns equally
              }}
            >
              {column.map((src, index) => (
                <Box
                  key={index}
                  component="img"
                  src={src}
                  alt={`Gallery image ${index + 1}`}
                  sx={{
                    width: '100%',
                    objectFit: 'cover',
                    borderRadius: '8px',
                    boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                    height: `${Math.floor(Math.random() * 200) + 200}px`,  // Random height between 200px and 400px
                    transition: 'filter 0.3s ease, box-shadow 0.3s ease, transfer 0.6s ease',  // Smooth transition for filter and shadow
                    '&:hover': {
                      filter: 'none',  // Remove blur and grayscale on hover
                      boxShadow: '0 0 80px 2px rgba(255, 0, 1000, 0.5)',  // Red glow on hover
                      transform: 'scale(1.08)',
                      gap: '10px'
                    },
                  }}
                />
              ))}
            </Box>
          ))}
        </Box>
    );
};

export default ResponsiveGallery;
