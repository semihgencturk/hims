import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditHospital = () => {
  const [formData, setFormData] = useState({
    hospital_name: '',
    country: '',
    city: '',
    district: '',
    street: '',
    block: ''
  });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchHospital();
  }, []);

  const fetchHospital = async () => {
    try {
      const response = await axios.get(`http://localhost:5001/hospitals/${id}`);
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
      await axios.put(`http://localhost:5001/hospitals/${id}`, formData);
      navigate('/hospitals');
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div>
      <h2>Edit Hospital</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="hospital_name" placeholder="Hospital Name" value={formData.hospital_name} onChange={handleChange} required />
        <input type="text" name="country" placeholder="Country" value={formData.country} onChange={handleChange} required />
        <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleChange} required />
        <input type="text" name="district" placeholder="District" value={formData.district} onChange={handleChange} required />
        <input type="text" name="street" placeholder="Street" value={formData.street} onChange={handleChange} required />
        <input type="text" name="block" placeholder="Block" value={formData.block} onChange={handleChange} required />
        <button type="submit">Update Hospital</button>
      </form>
    </div>
  );
};

export default EditHospital;
