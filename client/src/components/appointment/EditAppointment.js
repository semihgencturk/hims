import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditAppointment = () => {
  const [formData, setFormData] = useState({
    app_datetime: '',
    app_type: '',
    app_status: '',
    note: '',
    patient_id: '',
    hospital_id: ''
  });
  const [patients, setPatients] = useState([]);
  const [hospitals, setHospitals] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchAppointment();
    fetchPatients();
    fetchHospitals();
  }, []);

  const fetchAppointment = async () => {
    try {
      const response = await axios.get(`http://localhost:5001/appointments/${id}`);
      setFormData(response.data);
    } catch (err) {
      console.error(err.message);
    }
  };

  const fetchPatients = async () => {
    try {
      const response = await axios.get('http://localhost:5001/patients');
      setPatients(response.data);
    } catch (err) {
      console.error(err.message);
    }
  };

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
      const response = await axios.put(`http://localhost:5001/appointments/${id}`, formData);
      if (response.status === 200) {
        alert('Appointment updated successfully!');
        navigate('/appointments');
      } else {
        alert('Failed to update appointment. Please try again.');
      }
    } catch (err) {
      console.error(err.message);
      alert('Failed to update appointment. Please try again.');
    }
  };

  return (
    <div>
      <h2>Edit Appointment</h2>
      <form onSubmit={handleSubmit}>
        <input type="datetime-local" name="app_datetime" placeholder="Date & Time" value={formData.app_datetime} onChange={handleChange} required />
        <input type="text" name="app_type" placeholder="Type" value={formData.app_type} onChange={handleChange} required />
        <input type="text" name="app_status" placeholder="Status" value={formData.app_status} onChange={handleChange} required />
        <textarea name="note" placeholder="Note" value={formData.note} onChange={handleChange}></textarea>
        <select name="patient_id" value={formData.patient_id} onChange={handleChange} required>
          <option value="">Select Patient</option>
          {patients.map((patient) => (
            <option key={patient.patient_id} value={patient.patient_id}>{patient.full_name}</option>
          ))}
        </select>
        <select name="hospital_id" value={formData.hospital_id} onChange={handleChange} required>
          <option value="">Select Hospital</option>
          {hospitals.map((hospital) => (
            <option key={hospital.hospital_id} value={hospital.hospital_id}>{hospital.hospital_name}</option>
          ))}
        </select>
        <button type="submit">Update Appointment</button>
      </form>
    </div>
  );
};

export default EditAppointment;
