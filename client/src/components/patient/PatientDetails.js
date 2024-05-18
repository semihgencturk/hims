import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const PatientDetails = () => {
  const [patient, setPatient] = useState({});
  const { id } = useParams();

  useEffect(() => {
    fetchPatient();
  }, []);

  const fetchPatient = async () => {
    try {
      const response = await axios.get(`http://localhost:5001/patients/${id}`);
      setPatient(response.data);
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div>
      <h2>Patient Details</h2>
      <p><strong>First Name:</strong> {patient.first_name}</p>
      <p><strong>Last Name:</strong> {patient.last_name}</p>
      <p><strong>Passport No:</strong> {patient.passport_no}</p>
      <p><strong>Nationality:</strong> {patient.nationality}</p>
      <p><strong>Date of Birth:</strong> {patient.date_of_birth}</p>
      <p><strong>Gender:</strong> {patient.gender}</p>
      <p><strong>Native Language:</strong> {patient.native_language}</p>
      <p><strong>Cell Phone:</strong> {patient.cell_phone}</p>
      <p><strong>Landline Phone:</strong> {patient.landline_phone}</p>
      <p><strong>Email:</strong> {patient.email}</p>
      <p><strong>Country:</strong> {patient.country}</p>
      <p><strong>City:</strong> {patient.city}</p>
      <p><strong>District:</strong> {patient.district}</p>
      <p><strong>Street:</strong> {patient.street}</p>
      <p><strong>Block:</strong> {patient.block}</p>
      <p><strong>Blood Group:</strong> {patient.blood_group}</p>
      <p><strong>Registration Time:</strong> {patient.registration_time}</p>
    </div>
  );
};

export default PatientDetails;
