import React from 'react';
import { AppBar, Button, Toolbar } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem('isAuthenticated');

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userRole');
    alert('You have been logged out.');
    navigate('/l');
  };

  return (
    <div>
      <AppBar sx={{ backgroundColor: 'grey' }}>
        <Toolbar style={{ justifyContent: 'space-between' }}>
          <h3 style={{ marginLeft: '15px' }}>HELLODOC</h3>

          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            {!isAuthenticated && (
              <>
                <Link to="/s">
                  <Button variant="contained" style={{ backgroundColor: 'black', color: 'white' }}>Signup</Button>
                </Link>
                <Link to="/l">
                  <Button variant="contained" style={{ backgroundColor: 'black', color: 'white' }}>Login</Button>
                </Link>
              </>
            )}

            <Link to="/about">
              <Button variant="contained" style={{ backgroundColor: 'black', color: 'white' }}>AboutUs</Button>
            </Link>
            <Link to="/c">
              <Button variant="contained" style={{ backgroundColor: 'black', color: 'white' }}>Contact</Button>
            </Link>
          </div>

          {isAuthenticated && (
            <Button
              variant="contained"
              style={{ backgroundColor: 'black', color: 'white', marginRight: '15px' }}
              onClick={handleLogout}
            >
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
