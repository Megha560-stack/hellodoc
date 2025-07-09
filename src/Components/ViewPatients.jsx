import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ViewPatients = () => {
  const [patients, setPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [genderFilter, setGenderFilter] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState(''); // ✅ New state for department
  const [doctorSearchTerm, setDoctorSearchTerm] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/patients')
      .then((response) => setPatients(response.data))
      .catch((error) => console.error('Error fetching patients:', error));
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this patient?')) return;
    try {
      await axios.delete('http://localhost:5000/patients/' + id);
      setPatients(patients.filter((p) => p._id !== id));
    } catch (error) {
      console.error('Error deleting patient:', error);
      alert('Failed to delete patient.');
    }
  };

  const filteredPatients = patients.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (genderFilter === '' || p.gender.toLowerCase() === genderFilter.toLowerCase()) &&
    (departmentFilter === '' || (p.department || '').toLowerCase() === departmentFilter.toLowerCase()) && // ✅ Department filter
    (p.doctor || '').toLowerCase().includes(doctorSearchTerm.toLowerCase())
  );

  const styles = {
    container: { padding: '40px 20px', fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", minHeight: '100vh' },
    heading: { textAlign: 'center', color: '#0d47a1', fontSize: '2.5rem', marginBottom: '30px' },
    filters: { display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '30px', flexWrap: 'wrap' },
    input: { padding: '12px 16px', borderRadius: '8px', border: '1px solid #ccc', fontSize: '16px', width: '250px', backgroundColor: '#fff' },
    select: { padding: '12px 16px', borderRadius: '8px', border: '1px solid #ccc', fontSize: '16px', width: '180px', backgroundColor: '#fff' },
    tableWrapper: { overflowX: 'auto', borderRadius: '12px', boxShadow: '0 8px 16px rgba(0,0,0,0.1)', backgroundColor: 'white' },
    table: { width: '100%', borderCollapse: 'collapse', minWidth: '900px' },
    th: { padding: '15px', backgroundColor: '#1976d2', color: 'white', fontWeight: '600', textAlign: 'center', borderBottom: '2px solid #1565c0' },
    td: { padding: '14px', fontSize: '15px', textAlign: 'center', color: '#333' },
    row: { borderBottom: '1px solid #eee' },
    noData: { padding: '30px', textAlign: 'center', color: '#888', fontStyle: 'italic', fontSize: '16px' },
    deleteBtn: { backgroundColor: '#e53935', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer' },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>👩‍⚕️ Patient Directory</h2>

      <div style={styles.filters}>
        <input
          type="text"
          placeholder="🔍 Search by patient name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={styles.input}
        />
        <input
          type="text"
          placeholder="🔍 Search by doctor name"
          value={doctorSearchTerm}
          onChange={(e) => setDoctorSearchTerm(e.target.value)}
          style={styles.input}
        />
        <select
          value={genderFilter}
          onChange={(e) => setGenderFilter(e.target.value)}
          style={styles.select}
        >
          <option value="">All Genders</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>

        {/* ✅ Department Dropdown */}
        <select
          value={departmentFilter}
          onChange={(e) => setDepartmentFilter(e.target.value)}
          style={styles.select}
        >
          <option value="">All Departments</option>
          <option value="Cardiology">Cardiology</option>
          <option value="Dermatology">Dermatology</option>
          <option value="Neurology">Neurology</option>
          <option value="Pediatrics">Pediatrics</option>
          <option value="Psychiatry">Psychiatry</option>
        </select>
      </div>

      <div style={styles.tableWrapper}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Name</th>
              <th style={styles.th}>Age</th>
              <th style={styles.th}>Gender</th>
              <th style={styles.th}>Contact</th>
              <th style={styles.th}>Department</th>
              <th style={styles.th}>Disease</th>
              <th style={styles.th}>Doctor</th>
              <th style={styles.th}>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredPatients.length === 0 ? (
              <tr>
                <td colSpan="8" style={styles.noData}>No patients found.</td>
              </tr>
            ) : (
              filteredPatients.map((p, index) => (
                <tr key={index} style={styles.row}>
                  <td style={styles.td}>{p.name}</td>
                  <td style={styles.td}>{p.age}</td>
                  <td style={styles.td}>{p.gender}</td>
                  <td style={styles.td}>{p.contact}</td>
                  <td style={styles.td}>{p.department}</td>
                  <td style={styles.td}>{p.disease}</td>
                  <td style={styles.td}>{p.doctor}</td>
                  <td style={styles.td}>
                    <button onClick={() => handleDelete(p._id)} style={styles.deleteBtn}>Delete</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewPatients;