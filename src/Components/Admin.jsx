import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // ✅ Import navigation

function AdminPage() {
  const [doctors, setDoctors] = useState([]);
  const [doctorName, setDoctorName] = useState('');
  const [specialization, setSpecialization] = useState('');
  const navigate = useNavigate(); // ✅ Initialize navigation

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const res = await axios.get('http://localhost:5000/doctors');
      setDoctors(res.data);
    } catch (err) {
      console.error('Error fetching doctors', err);
    }
  };

  const handleAddDoctor = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/doctors', {
        name: doctorName,
        specialization,
      });
      setDoctors([...doctors, res.data]);
      setDoctorName('');
      setSpecialization('');
    } catch (err) {
      console.error('Error adding doctor', err);
    }
  };

  const handleDeleteDoctor = async (id) => {
    try {
      await axios.delete('http://localhost:5000/doctors/' + id);
      setDoctors(doctors.filter((doc) => doc._id !== id));
    } catch (err) {
      console.error('Error deleting doctor', err);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>🩺 Admin Dashboard</h1>

      {/* ✅ Home Button */}
      <button onClick={() => navigate('/')} style={styles.homeButton}>
        🏠 Home
      </button>

      <p style={styles.subheading}>Welcome, Admin. Manage doctors here.</p>

      <div style={styles.formContainer}>
        <h2 style={styles.sectionTitle}>Add Doctor</h2>
        <form onSubmit={handleAddDoctor} style={styles.form}>
          <input
            type="text"
            placeholder="Doctor Name"
            value={doctorName}
            onChange={(e) => setDoctorName(e.target.value)}
            style={styles.input}
            required
          />

          {/* ✅ Specialization Dropdown */}
          <select
            value={specialization}
            onChange={(e) => setSpecialization(e.target.value)}
            style={{ ...styles.input, cursor: 'pointer' }}
            required
          >
            <option value="">Select Specialization</option>
            <option value="Cardiologist">Cardiologist</option>
            <option value="Dermatologist">Dermatologist</option>
            <option value="Neurologist">Neurologist</option>
            <option value="Pediatrician">Pediatrician</option>
            <option value="Psychiatrist">Psychiatrist</option>
          </select>

          <button type="submit" style={styles.addButton}>Add Doctor</button>
        </form>
      </div>

      <h3 style={styles.sectionTitle}>Doctor List</h3>
      <div style={styles.cardList}>
        {doctors.map((doc) => (
          <div key={doc._id} style={styles.card}>
            <p style={styles.cardText}><strong>Name:</strong> {doc.name}</p>
            <p style={styles.cardText}><strong>Specialization:</strong> {doc.specialization}</p>
            <button onClick={() => handleDeleteDoctor(doc._id)} style={styles.deleteButton}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    padding: '40px',
    maxWidth: '800px',
    margin: 'auto',
    backgroundColor: '#f9f9f9',
    borderRadius: '10px',
  },
  heading: {
    textAlign: 'center',
    fontSize: '32px',
    color: '#2c3e50',
  },
  homeButton: {
    backgroundColor: '#3498db',
    color: '#fff',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
    margin: '20px auto',
    display: 'block',
  },
  subheading: {
    textAlign: 'center',
    fontSize: '16px',
    color: '#666',
    marginBottom: '30px',
  },
  formContainer: {
    backgroundColor: '#ffffff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
    marginBottom: '40px',
  },
  sectionTitle: {
    fontSize: '22px',
    color: '#34495e',
    marginBottom: '15px',
  },
  form: {
    display: 'flex',
    gap: '10px',
    flexWrap: 'wrap',
  },
  input: {
    flex: '1 1 45%',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  addButton: {
    backgroundColor: '#27ae60',
    color: '#fff',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: '10px',
  },
  cardList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  card: {
    backgroundColor: '#ffffff',
    padding: '15px',
    borderRadius: '8px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
  },
  cardText: {
    margin: '5px 0',
    color: '#2c3e50',
  },
  deleteButton: {
    backgroundColor: '#e74c3c',
    color: '#fff',
    border: 'none',
    padding: '8px 15px',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: '10px',
  },
};

export default AdminPage;