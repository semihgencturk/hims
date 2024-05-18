import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditDoctor = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    passport_no: '',
    nationality: '',
    date_of_birth: '',
    gender: '',
    native_language: '',
    cell_phone: '',
    landline_phone: '',
    emergency_phone: '',
    email: '',
    country: '',
    city: '',
    district: '',
    street: '',
    blood_group: ''
  });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchDoctor();
  }, []);

  const fetchDoctor = async () => {
    try {
      const response = await axios.get(`http://localhost:5001/doctors/${id}`);
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
      const response = await axios.put(`http://localhost:5001/doctors/${id}`, formData);
      if (response.status === 200) {
        alert('Success!');
        navigate('/doctors');
      } else {
        alert('Error!');
      }
    } catch (err) {
      console.error(err.message);
      alert('Error!');
    }
  };

  return (
    <div>
      <h2>Edit Doctor</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="first_name" placeholder="First Name" value={formData.first_name} onChange={handleChange} required />
        <input type="text" name="first_name" placeholder="First Name" value={formData.first_name} onChange={handleChange} required />
        <input type="text" name="last_name" placeholder="Last Name" value={formData.last_name} onChange={handleChange} required />
        <input type="text" name="passport_no" placeholder="Passport No" value={formData.passport_no} onChange={handleChange} required />
        <input type="text" name="nationality" placeholder="Nationality" value={formData.nationality} onChange={handleChange} required />
        <input type="date" name="date_of_birth" placeholder="Date of Birth" value={formData.date_of_birth} onChange={handleChange} required />
        <input type="text" name="gender" placeholder="Gender" value={formData.gender} onChange={handleChange} required />
        <input type="text" name="native_language" placeholder="Native Language" value={formData.native_language} onChange={handleChange} required />
        <input type="text" name="cell_phone" placeholder="Cell Phone" value={formData.cell_phone} onChange={handleChange} required />
        <input type="text" name="landline_phone" placeholder="Landline Phone" value={formData.landline_phone} onChange={handleChange} />
        <input type="text" name="emergency_phone" placeholder="Emergency Phone" value={formData.emergency_phone} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        <input type="text" name="country" placeholder="Country" value={formData.country} onChange={handleChange} required />
        <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleChange} required />
        <input type="text" name="district" placeholder="District" value={formData.district} onChange={handleChange} required />
        <input type="text" name="street" placeholder="Street" value={formData.street} onChange={handleChange} required />
        <input type="text" name="blood_group" placeholder="Blood Group" value={formData.blood_group} onChange={handleChange} required />
        <button type="submit">Update Doctor</button>
      </form>
    </div>
  );
};

export default EditDoctor;
