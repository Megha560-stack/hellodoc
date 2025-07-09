import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import axios from 'axios';

const Signup = () => {
  const [form, setForm] = useState({ username: '', password: '', role: 'doctor' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/signup', form);
      alert(res.data.message);
    } catch (err) {
      alert(err.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <div style={{
      backgroundImage: "url('megha.jpeg')",
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      height: '100vh',
      width: '100vw',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column'
    }}>
      <h2>SIGNUP</h2>
      <TextField name="username" label="Username" variant="outlined" onChange={handleChange} /> <br />
      <TextField name="password" label="Password" variant="outlined" type="password" onChange={handleChange} /> <br />
      
      <Button variant="contained" style={{ backgroundColor: 'black', color: 'white' }} onClick={handleSignup}>
        SIGNUP
      </Button>
    </div>
  );
};

export default Signup;
