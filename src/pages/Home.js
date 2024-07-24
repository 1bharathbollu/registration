// src/pages/Home.js
import React from 'react';
import { Typography, Box, Container } from '@mui/material';

function Home() {
  return (
    <Container>
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Welcome to the User Registration App
        </Typography>
        <Typography variant="body1">
          This is the home page of our application. You can register, login, and learn more about us.
        </Typography>
      </Box>
    </Container>
  );
}

export default Home;
