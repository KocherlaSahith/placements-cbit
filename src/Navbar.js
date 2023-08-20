import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Placements
        </Typography>
        <Button color="inherit" component={Link} to="/">
          Home
        </Button>
        <Button color="inherit" component={Link} to="/placements">
          Placements
        </Button>
        <Button color="inherit" component={Link} to="/addCompany">
          Add Company
        </Button>
        <Button color="inherit" component={Link} to="/sdata">
          Check Data
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
