import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const HospitalDetails = () => {
  const [hospital, setHospital] = useState({});
  const { id } = useParams();

  useEffect(() => {
    fetchHospital();
  }, []);

  const fetchHospital = async () => {
    try {
      const response = await axios.get(`http://localhost:5001/hospitals/${id}`);
      setHospital(response.data);
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div>
      <h2>Hospital Details</h2>
      <p><strong>Name:</strong> {hospital.hospital_name}</p>
      <p><strong>Country:</strong> {hospital.country}</p>
      <p><strong>City:</strong> {hospital.city}</p>
      <p><strong>District:</strong> {hospital.district}</p>
      <p><strong>Street:</strong> {hospital.street}</p>
      <p><strong>Block:</strong> {hospital.block}</p>
    </div>
  );
};

export default HospitalDetails;
