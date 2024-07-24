// src/pages/Register.js
import React, { useState } from 'react';
import { TextField, Button, Typography, Box, Grid, Container, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import authService from '../authService';

function Register() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!fullName) newErrors.fullName = 'Full Name is required';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) newErrors.email = 'Invalid email address';
    if (!password || password.length < 8 || !/\d/.test(password) || !/[!@#$%^&*]/.test(password)) {
      newErrors.password = 'Password must be at least 8 characters long and contain at least one number and one special character';
    }
    if (password !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validate()) {
      try {
        const { token } = await authService.register(fullName, email, password);
        localStorage.setItem('token', token);
        navigate('/');
      } catch (error) {
        setServerError(error.message);
      }
    }
  };

  return (
    <Container>
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Register
        </Typography>
        {serverError && <Typography color="error">{serverError}</Typography>}
        <Paper sx={{ p: 3, mt: 3, width: { sm: 400, xs: '100%' }, mx: 'auto' }}>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Full Name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  error={!!errors.fullName}
                  helperText={errors.fullName}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  error={!!errors.email}
                  helperText={errors.email}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  error={!!errors.password}
                  helperText={errors.password}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Confirm Password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  error={!!errors.confirmPassword}
                  helperText={errors.confirmPassword}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                  Register
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Box>
    </Container>
  );
}

export default Register;
