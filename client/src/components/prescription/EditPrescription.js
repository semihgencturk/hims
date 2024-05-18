import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditPrescription = () => {
  const [prescription, setPrescription] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchPrescription();
  }, []);

  const fetchPrescription = async () => {
    try {
      const response = await axios.get(`http://localhost:5001/prescriptions/${id}`);
      setPrescription(response.data.prescription);
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleChange = (e) => {
    setPrescription({
      ...prescription,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5001/prescriptions/${id}`, {
        note: prescription.note,
      });
      alert('Prescription updated successfully!');
      navigate('/prescriptions');
    } catch (err) {
      console.error(err.message);
      alert('Failed to update prescription. Please try again.');
    }
  };

  return (
    <div>
      <h2>Edit Prescription</h2>
      <form onSubmit={handleSubmit}>
        <textarea name="note" placeholder="Note" value={prescription.note || ''} onChange={handleChange} required />
        <button type="submit">Update Prescription</button>
      </form>
    </div>
  );
};

export default EditPrescription;
