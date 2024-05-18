import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditDiploma = () => {
  const [formData, setFormData] = useState({
    diploma_title: '',
    graduation_date: '',
    institution: '',
    doctor_id: ''
  });
  const [doctors, setDoctors] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchDiploma();
    fetchDoctors();
  }, []);

  const fetchDiploma = async () => {
    try {
      const response = await axios.get(`http://localhost:5001/diplomas/${id}`);
      setFormData(response.data);
    } catch (err) {
      console.error(err.message);
    }
  };

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
      const response = await axios.put(`http://localhost:5001/diplomas/${id}`, formData);
      if (response.status === 200) {
        alert('Diploma updated successfully!');
        navigate('/diplomas');
      } else {
        alert('Failed to update diploma. Please try again.');
      }
    } catch (err) {
      console.error(err.message);
      alert('Failed to update diploma. Please try again.');
    }
  };

  return (
    <div>
      <h2>Edit Diploma</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="diploma_title" placeholder="Diploma Title" value={formData.diploma_title} onChange={handleChange} required />
        <input type="date" name="graduation_date" placeholder="Graduation Date" value={formData.graduation_date} onChange={handleChange} required />
        <input type="text" name="institution" placeholder="Institution" value={formData.institution} onChange={handleChange} required />
        <select name="doctor_id" value={formData.doctor_id} onChange={handleChange} required>
          <option value="">Select Doctor</option>
          {doctors.map((doctor) => (
            <option key={doctor.doctor_id} value={doctor.doctor_id}>{doctor.first_name} {doctor.last_name}</option>
          ))}
        </select>
        <button type="submit">Update Diploma</button>
      </form>
    </div>
  );
};

export default EditDiploma;
