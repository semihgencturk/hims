import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditMedicine = () => {
  const [medicineName, setMedicineName] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchMedicine();
  }, []);

  const fetchMedicine = async () => {
    try {
      const response = await axios.get(`http://localhost:5001/medicines/${id}`);
      setMedicineName(response.data.medicine_name);
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleChange = (e) => {
    setMedicineName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:5001/medicines/${id}`, { medicine_name: medicineName });
      if (response.status === 200) {
        alert('Success!');
        navigate('/medicines');
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
      <h2>Edit Medicine</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="medicine_name" placeholder="Medicine Name" value={medicineName} onChange={handleChange} required />
        <button type="submit">Update Medicine</button>
      </form>
    </div>
  );
};

export default EditMedicine;
