import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const VisitDetails = () => {
  const [visit, setVisit] = useState({});
  const { id } = useParams();

  useEffect(() => {
    fetchVisit();
  }, []);

  const fetchVisit = async () => {
    try {
      const response = await axios.get(`http://localhost:5001/visits/${id}`);
      setVisit(response.data);
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div>
      <h2>Visit Details</h2>
      <p><strong>ID:</strong> {visit.visit_id}</p>
      <p><strong>Visit No:</strong> {visit.visit_no}</p>
      <p><strong>Date & Time:</strong> {visit.visit_datetime}</p>
      <p><strong>Reason:</strong> {visit.reason}</p>
      <p><strong>Procedure:</strong> {visit.procedure}</p>
      <p><strong>Note:</strong> {visit.note}</p>
      <p><strong>Appointment ID:</strong> {visit.appointment_id}</p>
    </div>
  );
};

export default VisitDetails;
