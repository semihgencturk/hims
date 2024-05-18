import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditClinic = () => {
  const [formData, setFormData] = useState({
    clinic_no: '',
    clinic_name: '',
    country: '',
    city: '',
    district: '',
    street: '',
    block: '',
    hospital_id: ''
  });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchClinic();
  }, []);

  const fetchClinic = async () => {
    try {
      const response = await axios.get(`http://localhost:5001/clinics/${id}`);
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
      const response = await axios.put(`http://localhost:5001/clinics/${id}`, formData);
      if (response.status === 200) {
        alert('Clinic updated successfully!');
        navigate('/clinics');
      } else {
        alert('Failed to update clinic. Please try again.');
      }
    } catch (err) {
      console.error(err.message);
      alert('Failed to update clinic. Please try again.');
    }
  };

  return (
    <div>
      <h2>Edit Clinic</h2>
      <form onSubmit={handleSubmit}>
        <input type="number" name="clinic_no" placeholder="Clinic No" value={formData.clinic_no} onChange={handleChange} required />
        <input type="text" name="clinic_name" placeholder="Clinic Name" value={formData.clinic_name} onChange={handleChange} required />
        <input type="text" name="country" placeholder="Country" value={formData.country} onChange={handleChange} required />
        <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleChange} required />
        <input type="text" name="district" placeholder="District" value={formData.district} onChange={handleChange} required />
        <input type="text" name="street" placeholder="Street" value={formData.street} onChange={handleChange} required />
        <input type="text" name="block" placeholder="Block" value={formData.block} onChange={handleChange} required />
        <input type="number" name="hospital_id" placeholder="Hospital ID" value={formData.hospital_id} onChange={handleChange} required />
        <button type="submit">Update Clinic</button>
      </form>
    </div>
  );
};

export default EditClinic;
