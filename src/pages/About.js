// src/pages/About.js
import React from 'react';
import { Typography, Box, Container } from '@mui/material';

function About() {
  return (
    <Container>
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          About Us
        </Typography>
        <Typography variant="body1">
          This application is designed to demonstrate a user registration and authentication flow using React and Material-UI.
        </Typography>
      </Box>
    </Container>
  );
}

export default About;
