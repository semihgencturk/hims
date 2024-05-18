import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddTest = () => {
  const [formData, setFormData] = useState({
    test_code: '',
    test_name: '',
    description: '',
    reference_low: '',
    reference_high: '',
    reference_unit: ''
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
      const response = await axios.post('http://localhost:5001/tests', formData);
      if (response.status === 200) {
        alert('Test added successfully!');
        navigate('/tests');
      } else {
        alert('Failed to add test. Please try again.');
      }
    } catch (err) {
      console.error(err.message);
      alert('Failed to add test. Please try again.');
    }
  };

  return (
    <div>
      <h2>Add Test</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="test_code" placeholder="Test Code" value={formData.test_code} onChange={handleChange} required />
        <input type="text" name="test_name" placeholder="Test Name" value={formData.test_name} onChange={handleChange} required />
        <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} required />
        <input type="number" step="0.01" name="reference_low" placeholder="Reference Low" value={formData.reference_low} onChange={handleChange} required />
        <input type="number" step="0.01" name="reference_high" placeholder="Reference High" value={formData.reference_high} onChange={handleChange} required />
        <input type="text" name="reference_unit" placeholder="Reference Unit" value={formData.reference_unit} onChange={handleChange} required />
        <button type="submit">Add Test</button>
      </form>
    </div>
  );
};

export default AddTest;
