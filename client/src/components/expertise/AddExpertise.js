import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddExpertise = () => {
  const [formData, setFormData] = useState({
    expertise_field: '',
    given_date: '',
    institution: '',
    doctor_id: ''
  });
  const [doctors, setDoctors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const response = await axios.get('http://localhost:5001/doctors');
      setDoctors(response.data);
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5001/expertises', formData);
      if (response.status === 200) {
        alert('Expertise added successfully!');
        navigate('/expertises');
      } else {
        alert('Failed to add expertise. Please try again.');
      }
    } catch (err) {
      console.error(err.message);
      alert('Failed to add expertise. Please try again.');
    }
  };

  return (
    <div>
      <h2>Add Expertise</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="expertise_field" placeholder="Expertise Field" value={formData.expertise_field} onChange={handleChange} required />
        <input type="date" name="given_date" placeholder="Given Date" value={formData.given_date} onChange={handleChange} required />
        <input type="text" name="institution" placeholder="Institution" value={formData.institution} onChange={handleChange} required />
        <select name="doctor_id" value={formData.doctor_id} onChange={handleChange} required>
          <option value="">Select Doctor</option>
          {doctors.map((doctor) => (
            <option key={doctor.doctor_id} value={doctor.doctor_id}>{doctor.first_name} {doctor.last_name}</option>
          ))}
        </select>
        <button type="submit">Add Expertise</button>
      </form>
    </div>
  );
};

export default AddExpertise;
