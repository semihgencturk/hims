import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddClinic = () => {
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
  const [hospitals, setHospitals] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchHospitals();
  }, []);

  const fetchHospitals = async () => {
    try {
      const response = await axios.get('http://localhost:5001/hospitals');
      setHospitals(response.data);
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
      const response = await axios.post('http://localhost:5001/clinics', formData);
      if (response.status === 200) {
        alert('Clinic added successfully!');
        navigate('/clinics');
      } else {
        alert('Failed to add clinic. Please try again.');
      }
    } catch (err) {
      console.error(err.message);
      alert('Failed to add clinic. Please try again.');
    }
  };

  return (
    <div>
      <h2>Add Clinic</h2>
      <form onSubmit={handleSubmit}>
        <input type="number" name="clinic_no" placeholder="Clinic No" value={formData.clinic_no} onChange={handleChange} required />
        <input type="text" name="clinic_name" placeholder="Clinic Name" value={formData.clinic_name} onChange={handleChange} required />
        <input type="text" name="country" placeholder="Country" value={formData.country} onChange={handleChange} required />
        <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleChange} required />
        <input type="text" name="district" placeholder="District" value={formData.district} onChange={handleChange} required />
        <input type="text" name="street" placeholder="Street" value={formData.street} onChange={handleChange} required />
        <input type="text" name="block" placeholder="Block" value={formData.block} onChange={handleChange} required />
        <select name="hospital_id" value={formData.hospital_id} onChange={handleChange} required>
          <option value="">Select Hospital</option>
          {hospitals.map((hospital) => (
            <option key={hospital.hospital_id} value={hospital.hospital_id}>{hospital.hospital_name}</option>
          ))}
        </select>
        <button type="submit">Add Clinic</button>
      </form>
    </div>
  );
};

export default AddClinic;
