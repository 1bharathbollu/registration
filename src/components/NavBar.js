// src/components/NavBar.js
import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Drawer, List, ListItem, ListItemText, Box, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useNavigate } from 'react-router-dom';

function NavBar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer}
            sx={{ display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            User Registration
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'flex' }, justifyContent: 'flex-end' }}>
            <Button component={Link} to="/" color="inherit" sx={{ ml: 2 }}>
              Home
            </Button>
            <Button component={Link} to="/register" color="inherit" sx={{ ml: 2 }}>
              Register
            </Button>
            <Button component={Link} to="/about" color="inherit" sx={{ ml: 2 }}>
              About
            </Button>
            {!token ? (
              <Button component={Link} to="/login" color="inherit" sx={{ ml: 2 }}>
                Login
              </Button>
            ) : (
              <Button onClick={handleLogout} color="inherit" sx={{ ml: 2 }}>
                Logout
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer}>
        <List sx={{ width: 250 }}>
          <ListItem button component={Link} to="/" onClick={toggleDrawer}>
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem button component={Link} to="/register" onClick={toggleDrawer}>
            <ListItemText primary="Register" />
          </ListItem>
          <ListItem button component={Link} to="/about" onClick={toggleDrawer}>
            <ListItemText primary="About" />
          </ListItem>
          {!token ? (
            <ListItem button component={Link} to="/login" onClick={toggleDrawer}>
              <ListItemText primary="Login" />
            </ListItem>
          ) : (
            <ListItem button onClick={() => { handleLogout(); toggleDrawer(); }}>
              <ListItemText primary="Logout" />
            </ListItem>
          )}
        </List>
      </Drawer>
    </Box>
  );
}

export default NavBar;
