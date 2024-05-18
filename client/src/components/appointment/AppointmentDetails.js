import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const AppointmentDetails = () => {
  const [appointment, setAppointment] = useState({});
  const { id } = useParams();

  useEffect(() => {
    fetchAppointment();
  }, []);

  const fetchAppointment = async () => {
    try {
      const response = await axios.get(`http://localhost:5001/appointments/${id}`);
      setAppointment(response.data);
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div>
      <h2>Appointment Details</h2>
      <p><strong>ID:</strong> {appointment.appointment_id}</p>
      <p><strong>Date & Time:</strong> {appointment.app_datetime}</p>
      <p><strong>Type:</strong> {appointment.app_type}</p>
      <p><strong>Status:</strong> {appointment.app_status}</p>
      <p><strong>Note:</strong> {appointment.note}</p>
      <p><strong>Patient ID:</strong> {appointment.patient_id}</p>
      <p><strong>Hospital ID:</strong> {appointment.hospital_id}</p>
    </div>
  );
};

export default AppointmentDetails;
