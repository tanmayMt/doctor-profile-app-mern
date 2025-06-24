import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './DoctorList.css';

const DoctorList = () => {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/doctors')
      .then(res => setDoctors(res.data))
      .catch(err => console.error("API error:", err));
  }, []);

  return (
    <div className="glass-bg">
      <h2 className="neon-heading">✨ Our Top Doctors ✨</h2>
      <div className="doctor-grid">
        {doctors.map(doc => (
          <div className="glass-card" key={doc._id}>
            <h4>{doc.name}</h4>
            <p>{doc.specialization}</p>
            <button className="book-btn">Book Now</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorList;
