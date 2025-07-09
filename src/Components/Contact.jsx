import React from 'react';

const ContactPage = () => {
  const containerStyle = {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '40px 20px',
    backgroundImage: 'url(https://www.svgrepo.com/show/331673/medical-background.svg)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backdropFilter: 'blur(3px)',
    fontFamily: "'Segoe UI', sans-serif"
  };

  const cardStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: '40px',
    borderRadius: '16px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
    maxWidth: '600px',
    textAlign: 'center'
  };

  const headingStyle = {
    fontSize: '2.5rem',
    marginBottom: '20px',
    color: '#1976d2'
  };

  const contactItemStyle = {
    fontSize: '18px',
    marginBottom: '12px',
    color: '#333'
  };

  const iconStyle = {
    marginRight: '8px'
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h1 style={headingStyle}>📞 Contact HelloDoc Clinic</h1>

        <p style={contactItemStyle}><span style={iconStyle}>🏥</span> HelloDoc Hospital, Main Street, Kochi, Kerala</p>
        <p style={contactItemStyle}><span style={iconStyle}>📞</span> Office Number: +91 98765 43210</p>
        <p style={contactItemStyle}><span style={iconStyle}>✉️</span> Email: contact@hellodocclinic.com</p>
        <p style={contactItemStyle}><span style={iconStyle}>⏰</span> Working Hours: Mon - Sat, 9 AM - 6 PM</p>
      </div>
    </div>
  );
};

export default ContactPage;