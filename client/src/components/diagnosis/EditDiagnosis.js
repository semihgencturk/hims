import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditDiagnosis = () => {
  const [formData, setFormData] = useState({
    diagnosis_name: '',
    description: ''
  });
  const { code } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchDiagnosis();
  }, []);

  const fetchDiagnosis = async () => {
    try {
      const response = await axios.get(`http://localhost:5001/diagnoses/${code}`);
      setFormData(response.data);
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
      const response = await axios.put(`http://localhost:5001/diagnoses/${code}`, formData);
      if (response.status === 200) {
        alert('Diagnosis updated successfully!');
        navigate('/diagnoses');
      } else {
        alert('Failed to update diagnosis. Please try again.');
      }
    } catch (err) {
      console.error(err.message);
      alert('Failed to update diagnosis. Please try again.');
    }
  };

  return (
    <div>
      <h2>Edit Diagnosis</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="diagnosis_name" placeholder="Diagnosis Name" value={formData.diagnosis_name} onChange={handleChange} required />
        <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} required />
        <button type="submit">Update Diagnosis</button>
      </form>
    </div>
  );
};

export default EditDiagnosis;
