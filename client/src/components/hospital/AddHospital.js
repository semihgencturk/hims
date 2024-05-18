import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddHospital = () => {
  const [formData, setFormData] = useState({
    hospital_name: '',
    country: '',
    city: '',
    district: '',
    street: '',
    block: ''
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
      const body = {
        hospital_name: formData.hospital_name,
        country: formData.country,
        city: formData.city,
        district: formData.district,
        street: formData.street,
        block: formData.block
      };

      const response = await fetch("http://localhost:5001/hospitals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });

      if (!response.ok) {
        throw new Error('Failed to create hospital');
      }

      alert('Hospital added successfully!');
      navigate('/hospitals');
    } catch (err) {
      console.error(err.message);
      alert('Failed to add hospital. Please try again.');
    }
  };

  return (
    <div>
      <h2>Add Hospital</h2>
      <form>
        <input type="text" name="hospital_name" placeholder="Hospital Name" value={formData.hospital_name} onChange={handleChange} required />
        <input type="text" name="country" placeholder="Country" value={formData.country} onChange={handleChange} required />
        <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleChange} required />
        <input type="text" name="district" placeholder="District" value={formData.district} onChange={handleChange} required />
        <input type="text" name="street" placeholder="Street" value={formData.street} onChange={handleChange} required />
        <input type="text" name="block" placeholder="Block" value={formData.block} onChange={handleChange} required />
        <button type="submit" onClick={handleSubmit}>Add Hospital</button>
      </form>
    </div>
  );
};

export default AddHospital;
