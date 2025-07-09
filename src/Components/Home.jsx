import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const cardStyle = {
    backgroundColor: '#fff',
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '30px',
    width: '200px',
    textAlign: 'center',
  };

  const buttonStyle = {
    backgroundColor: '#1976d2',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    margin: '10px',
    borderRadius: '15px',
    cursor: 'pointer'
  };

  const pageStyle = {
    backgroundImage: 'url("https://img.freepik.com/free-photo/health-still-life-with-copy-space_23-2148854031.jpg?semt=ais_hybrid&w=740")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '100vh',
    width: '100vw'
  };

  return (
    <div style={pageStyle}>
      <div style={{ backgroundColor: '#e3f2fd', padding: '30px', textAlign: 'center' }}>
        <h1>Welcome to hellodoc</h1>
        <p style={{ fontSize: '18px', maxWidth: '600px', margin: '0 auto' }}>
          Manage doctor records, appointments, and consultations from one place.
        </p>
        <img src="hello.jpeg" alt="" style={{ width: '200px', marginTop: '-100cap', marginLeft: '79%' }} />
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '10px', padding: '20px' }}>
        <div style={cardStyle}> Manage Doctors</div>
        <div style={cardStyle}>View Appointments</div>
        <div style={cardStyle}>Approve Consultations</div>
        <div style={cardStyle}>Manage Specialties</div>
      </div>

      <div style={{ textAlign: 'center', marginTop: '30px' }}>
        <button
          style={buttonStyle}
          onClick={() => navigate('/a')}
        >
          Add New Patient
        </button>
        <button
          style={buttonStyle}
          onClick={() => navigate('/v')}
        >
          View Patient List
        </button>
      </div>
    </div>
  );
};

export default Home;
