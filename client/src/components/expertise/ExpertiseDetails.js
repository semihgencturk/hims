import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ExpertiseDetails = () => {
  const [expertise, setExpertise] = useState({});
  const { id } = useParams();

  useEffect(() => {
    fetchExpertise();
  }, []);

  const fetchExpertise = async () => {
    try {
      const response = await axios.get(`http://localhost:5001/expertises/${id}`);
      setExpertise(response.data);
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div>
      <h2>Expertise Details</h2>
      <p><strong>ID:</strong> {expertise.expertise_id}</p>
      <p><strong>Field:</strong> {expertise.expertise_field}</p>
      <p><strong>Given Date:</strong> {expertise.given_date}</p>
      <p><strong>Institution:</strong> {expertise.institution}</p>
      <p><strong>Doctor ID:</strong> {expertise.doctor_id}</p>
    </div>
  );
};

export default ExpertiseDetails;
