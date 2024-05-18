import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddAppointment = () => {
  const [formData, setFormData] = useState({
    app_datetime: '',
    app_type: '',
    app_status: '',
    note: '',
    patient_id: '',
    hospital_id: '',
    clinic_id: '',
    doctor_id: ''

  });
  const [patients, setPatients] = useState([]);
  const [hospitals, setHospitals] = useState([]);
  const [clinics, setClinics] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPatients();
    fetchHospitals();
  }, []);

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

  const fetchClinics = async (hospitalId) => {
    try {
      const response = await axios.get(`http://localhost:5001/hospitals/${hospitalId}/clinics`);
      setClinics(response.data);
    } catch (err) {
      console.error(err.message);
    }
  };

  const fetchDoctors = async (clinicId) => {
    try {
      const response = await axios.get(`http://localhost:5001/clinics/${clinicId}/doctors`);
      setDoctors(response.data);
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    if (name === 'hospital_id') {
      fetchClinics(value);
    } else if (name === 'clinic_id') {
      fetchDoctors(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5001/appointments', formData);
      if (response.status === 200) {
        alert('Appointment added successfully!');
        navigate('/appointments');
      } else {
        alert('Failed to add appointment. Please try again.');
      }
    } catch (err) {
      console.error(err.message);
      alert('Failed to add appointment. Please try again.');
    }
  };

  return (
    <div>
      <h2>Add Appointment</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="datetime-local"
          name="app_datetime"
          placeholder="Date and Time"
          value={formData.app_datetime}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="app_type"
          placeholder="Type"
          value={formData.app_type}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="app_status"
          placeholder="Status"
          value={formData.app_status}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="note"
          placeholder="Note"
          value={formData.note}
          onChange={handleChange}
        />
        <select name="hospital_id" value={formData.hospital_id} onChange={handleChange} required>
          <option value="">Select Hospital</option>
          {hospitals.map((hospital) => (
            <option key={hospital.hospital_id} value={hospital.hospital_id}>
              {hospital.hospital_name}
            </option>
          ))}
        </select>
        <select name="clinic_id" value={formData.clinic_id} onChange={handleChange} required>
          <option value="">Select Clinic</option>
          {clinics.map((clinic) => (
            <option key={clinic.clinic_id} value={clinic.clinic_id}>
              {clinic.clinic_name}
            </option>
          ))}
        </select>
        <select name="doctor_id" value={formData.doctor_id} onChange={handleChange} required>
          <option value="">Select Doctor</option>
          {doctors.map((doctor) => (
            <option key={doctor.doctor_id} value={doctor.doctor_id}>
              {doctor.first_name} {doctor.last_name}
            </option>
          ))}
        </select>
        <select name="patient_id" value={formData.patient_id} onChange={handleChange} required>
          <option value="">Select Patient</option>
          {patients.map((patient) => (
            <option key={patient.patient_id} value={patient.patient_id}>
              {patient.full_name}
            </option>
          ))}
        </select>
        <button type="submit">Add Appointment</button>
      </form>
    </div>
  );
};

export default AddAppointment;

