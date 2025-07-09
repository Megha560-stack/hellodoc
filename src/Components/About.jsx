
import React from 'react';

const About = () => {
  return (
    <div style={styles.container}>
      <h2 style={styles.title}>About Us</h2>
      <p style={styles.paragraph}>
        Welcome to our healthcare platform — a smart way to manage appointments, patient records, and prescriptions.
      </p>
      <p style={styles.paragraph}>
        Our mission is to make healthcare easier for both providers and patients through clean, efficient digital tools.
      </p>
      <p style={styles.paragraph}>
        Built for clinics and hospitals, our system helps streamline workflows, reduce paperwork, and improve care.
      </p>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '700px',
    margin: '60px auto',
    padding: '30px',
    backgroundColor: '#f0f8ff',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    fontFamily: 'Arial, sans-serif',
    color: '#333',
  },
  title: {
    fontSize: '28px',
    marginBottom: '25px',
    color: '#005a9c',
  },
  paragraph: {
    fontSize: '17px',
    marginBottom: '20px',
    lineHeight: '1.8',
  },
};

export default About;