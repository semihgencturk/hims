import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ClinicDetails = () => {
  const [clinic, setClinic] = useState({});
  const { id } = useParams();

  useEffect(() => {
    fetchClinic();
  }, []);

  const fetchClinic = async () => {
    try {
      const response = await axios.get(`http://localhost:5001/clinics/${id}`);
      setClinic(response.data);
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div>
      <h2>Clinic Details</h2>
      <p><strong>ID:</strong> {clinic.clinic_id}</p>
      <p><strong>Clinic No:</strong> {clinic.clinic_no}</p>
      <p><strong>Name:</strong> {clinic.clinic_name}</p>
      <p><strong>Country:</strong> {clinic.country}</p>
      <p><strong>City:</strong> {clinic.city}</p>
      <p><strong>District:</strong> {clinic.district}</p>
      <p><strong>Street:</strong> {clinic.street}</p>
      <p><strong>Block:</strong> {clinic.block}</p>
      <p><strong>Hospital ID:</strong> {clinic.hospital_id}</p>
    </div>
  );
};

export default ClinicDetails;
