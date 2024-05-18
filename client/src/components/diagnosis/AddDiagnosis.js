import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddDiagnosis = () => {
  const [formData, setFormData] = useState({
    diagnosis_code: '',
    diagnosis_name: '',
    description: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5001/diagnoses', formData);
      if (response.status === 200) {
        alert('Diagnosis added successfully!');
        navigate('/diagnoses');
      } else {
        alert('Failed to add diagnosis. Please try again.');
      }
    } catch (err) {
      console.error(err.message);
      alert('Failed to add diagnosis. Please try again.');
    }
  };

  return (
    <div>
      <h2>Add Diagnosis</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="diagnosis_code" placeholder="Diagnosis Code" value={formData.diagnosis_code} onChange={handleChange} required />
        <input type="text" name="diagnosis_name" placeholder="Diagnosis Name" value={formData.diagnosis_name} onChange={handleChange} required />
        <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} required />
        <button type="submit">Add Diagnosis</button>
      </form>
    </div>
  );
};

export default AddDiagnosis;
