import React, { useState } from 'react';
import { Button, TextField, CircularProgress, Typography } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    setError('');

    if (!username.trim() || !password.trim()) {
      setError("Please enter both username and password.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/login', {
        username: username.trim(),
        password,
      });

      if (response.data.success) {
        const { role } = response.data;

        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userRole', role);

        if (role === 'admin') {
          navigate('/n');
        } else if (role === 'doctor') {
          navigate('/');
        } else {
          setError('Unknown role. Contact support.');
        }
      } else {
        setError('Login failed. Please try again.');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('❌ Login failed. Invalid username or password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      backgroundImage: "url('/megha.jpeg')", // ✅ Adjust path if needed
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      height: '100vh',
      width: '100vw',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      padding: 20,
    }}>
      <Typography variant="h3" style={{ color: '#fff', marginBottom: 10 }}>LOGIN</Typography>
      <Typography variant="h6" style={{ color: '#eee', marginBottom: 30 }}>
        Please enter your credentials
      </Typography>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 20, width: 300 }}>
        <TextField
          label="Username"
          variant="outlined"
          fullWidth
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          label="Password"
          variant="outlined"
          type="password"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <Typography color="error" style={{ fontSize: 14 }}>{error}</Typography>}

        <Button
          variant="contained"
          onClick={handleLogin}
          style={{ backgroundColor: 'black', color: 'white' }}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} style={{ color: 'white' }} /> : 'Login'}
        </Button>

        <Typography style={{ textAlign: 'center', color: '#fff', fontSize: 14 }}>
          Don’t have an account?{' '}
          <Link to="/s" style={{ color: '#90caf9' }}>Signup here</Link>
        </Typography>
      </div>
    </div>
  );
};

export default Login;