import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditTest = () => {
  const [formData, setFormData] = useState({
    test_name: '',
    description: '',
    reference_low: '',
    reference_high: '',
    reference_unit: ''
  });
  const { code } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchTest();
  }, []);

  const fetchTest = async () => {
    try {
      const response = await axios.get(`http://localhost:5001/tests/${code}`);
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
      const response = await axios.put(`http://localhost:5001/tests/${code}`, formData);
      if (response.status === 200) {
        alert('Test updated successfully!');
        navigate('/tests');
      } else {
        alert('Failed to update test. Please try again.');
      }
    } catch (err) {
      console.error(err.message);
      alert('Failed to update test. Please try again.');
    }
  };

  return (
    <div>
      <h2>Edit Test</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="test_name" placeholder="Test Name" value={formData.test_name} onChange={handleChange} required />
        <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} required />
        <input type="number" step="0.01" name="reference_low" placeholder="Reference Low" value={formData.reference_low} onChange={handleChange} required />
        <input type="number" step="0.01" name="reference_high" placeholder="Reference High" value={formData.reference_high} onChange={handleChange} required />
        <input type="text" name="reference_unit" placeholder="Reference Unit" value={formData.reference_unit} onChange={handleChange} required />
        <button type="submit">Update Test</button>
      </form>
    </div>
  );
};

export default EditTest;
