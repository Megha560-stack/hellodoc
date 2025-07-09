import React, { useState } from 'react';
import axios from 'axios';

const AddPatient = () => {
  const [formData, setFormData] = useState({
    name: '', age: '', gender: '', contact: '', department: '', disease: '', doctor: ''
  });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/patients', formData);
      alert('✅ Patient added successfully!');
      setFormData({ name: '', age: '', gender: '', contact: '', department: '', disease: '', doctor: '' });
    } catch (err) {
      alert('❌ Error adding patient');
    }
  };

  return (
    <div style={styles.background}>
      <div style={styles.overlay}></div>

      <div style={styles.card}>
        <h2 style={styles.title}>🩺 Add New Patient</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          {/* Name */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter name"
              required
              style={styles.input}
            />
          </div>

          {/* Age */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>Age</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              placeholder="Enter age"
              required
              style={styles.input}
            />
          </div>

          {/* Gender Dropdown */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
              style={styles.input}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Contact */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>Contact</label>
            <input
              type="number"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              placeholder="Enter contact number"
              required
              style={styles.input}
            />
          </div>

          {/* Department Dropdown */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>Department</label>
            <select
              name="department"
              value={formData.department}
              onChange={handleChange}
              required
              style={styles.input}
            >
              <option value="">Select Department</option>
              <option value="Cardiology">Cardiology</option>
              <option value="Dermatology">Dermatology</option>
              <option value="Neurology">Neurology</option>
              <option value="Pediatrics">Pediatrics</option>
              <option value="Psychiatry">Psychiatry</option>
            </select>
          </div>

          {/* Disease */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>Disease</label>
            <input
              type="text"
              name="disease"
              value={formData.disease}
              onChange={handleChange}
              placeholder="Enter disease"
              required
              style={styles.input}
            />
          </div>

          {/* Doctor */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>Doctor</label>
            <input
              type="text"
              name="doctor"
              value={formData.doctor}
              onChange={handleChange}
              placeholder="Enter doctor name"
              required
              style={styles.input}
            />
          </div>

          <button type="submit" style={styles.button}>➕ Add Patient</button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  background: {
    position: 'relative',
    minHeight: '100vh',
    backgroundImage: `url('https://www.svgrepo.com/show/331673/medical-background.svg')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: "'Segoe UI', sans-serif",
    padding: '20px',
  },
  overlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backdropFilter: 'blur(5px)',
    background: 'linear-gradient(120deg, rgba(255,255,255,0.6), rgba(255,255,255,0.4))',
    zIndex: 0,
  },
  card: {
    zIndex: 1,
    width: '100%',
    maxWidth: '600px',
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    padding: '40px',
    borderRadius: '16px',
    boxShadow: '0 15px 40px rgba(0, 0, 0, 0.2)',
    backdropFilter: 'blur(10px)',
  },
  title: {
    textAlign: 'center',
    marginBottom: '30px',
    color: '#2c3e50',
    fontSize: '28px',
    fontWeight: 'bold',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    marginBottom: '6px',
    color: '#2c3e50',
    fontWeight: '600',
    fontSize: '16px',
  },
  input: {
    padding: '12px 16px',
    fontSize: '15px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    outline: 'none',
    transition: 'border 0.3s ease',
  },
  button: {
    padding: '14px',
    backgroundColor: '#27ae60',
    color: 'white',
    fontSize: '16px',
    fontWeight: 'bold',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
};

export default AddPatient;