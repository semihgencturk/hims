import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import PrescriptionMedicinesModal from './modals/PrescriptionMedicinesModal';

const AddPrescription = () => {
  const [formData, setFormData] = useState({
    note: '',
    patient_id: '',
    doctor_id: ''
  });
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [prescriptionId, setPrescriptionId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPatients();
    fetchDoctors();
  }, []);

  const fetchPatients = async () => {
    try {
      const response = await axios.get('http://localhost:5001/patients');
      setPatients(response.data);
    } catch (err) {
      console.error(err.message);
    }
  };

  const fetchDoctors = async () => {
    try {
      const response = await axios.get('http://localhost:5001/doctors');
      setDoctors(response.data);
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
      const response = await axios.post('http://localhost:5001/prescriptions', formData);
      if (response.status === 200) {
        setPrescriptionId(response.data.prescription_id);
        setModalIsOpen(true);
      } else {
        alert('Failed to add prescription. Please try again.');
      }
    } catch (err) {
      console.error(err.message);
      alert('Failed to add prescription. Please try again.');
    }
  };

  const closeModal = () => {
    setModalIsOpen(false);
    navigate('/prescriptions');
  };

  return (
    <div>
      <h2>Add Prescription</h2>
      <form onSubmit={handleSubmit}>
        <textarea name="note" placeholder="Note" value={formData.note} onChange={handleChange} required />
        <select name="patient_id" value={formData.patient_id} onChange={handleChange} required>
          <option value="">Select Patient</option>
          {patients.map((patient) => (
            <option key={patient.patient_id} value={patient.patient_id}>
              {patient.first_name} {patient.last_name}
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
        <button type="submit">Add Prescription</button>
      </form>
      {prescriptionId && (
        <PrescriptionMedicinesModal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          prescriptionId={prescriptionId}
        />
      )}
    </div>
  );
};

export default AddPrescription;
