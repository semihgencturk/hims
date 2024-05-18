import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const DiplomaDetails = () => {
  const [diploma, setDiploma] = useState({});
  const { id } = useParams();

  useEffect(() => {
    fetchDiploma();
  }, []);

  const fetchDiploma = async () => {
    try {
      const response = await axios.get(`http://localhost:5001/diplomas/${id}`);
      setDiploma(response.data);
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div>
      <h2>Diploma Details</h2>
      <p><strong>ID:</strong> {diploma.diploma_id}</p>
      <p><strong>Title:</strong> {diploma.diploma_title}</p>
      <p><strong>Graduation Date:</strong> {diploma.graduation_date}</p>
      <p><strong>Institution:</strong> {diploma.institution}</p>
      <p><strong>Doctor ID:</strong> {diploma.doctor_id}</p>
    </div>
  );
};

export default DiplomaDetails;
