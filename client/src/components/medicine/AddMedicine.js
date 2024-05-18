import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddMedicine = () => {
  const [formData, setFormData] = useState({
    medicine_code: '',
    medicine_name: ''
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
      await axios.post('http://localhost:5001/medicines', formData);
      alert('Medicine added successfully!');
      navigate('/medicines');
    } catch (err) {
      console.error(err.message);
      alert('Failed to add medicine. Please try again.');
    }
  };

  return (
    <div>
      <h2>Add Medicine</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          name="medicine_code" 
          placeholder="Medicine Code" 
          value={formData.medicine_code} 
          onChange={handleChange} 
          required 
        />
        <input 
          type="text" 
          name="medicine_name" 
          placeholder="Medicine Name" 
          value={formData.medicine_name} 
          onChange={handleChange} 
          required 
        />
        <button type="submit">Add Medicine</button>
      </form>
    </div>
  );
};

export default AddMedicine;
