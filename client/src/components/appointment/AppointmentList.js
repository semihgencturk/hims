import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AppointmentList = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await axios.get('http://localhost:5001/appointments');
      setAppointments(response.data);
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/appointments/${id}`);
      alert('Appointment has been deleted.');
      fetchAppointments();
    } catch (err) {
      console.error(err.message);
      alert('Failed to delete appointment.');
    }
  };

  return (
    <div>
      <h2>Appointments List</h2>
      <Link to="/appointments/add"><button>Add New Appointment</button></Link>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Date & Time</th>
            <th>Type</th>
            <th>Status</th>
            <th>Note</th>
            <th>Patient ID</th>
            <th>Hospital ID</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment) => (
            <tr key={appointment.appointment_id}>
              <td>{appointment.appointment_id}</td>
              <td>{appointment.app_datetime}</td>
              <td>{appointment.app_type}</td>
              <td>{appointment.app_status}</td>
              <td>{appointment.note}</td>
              <td>{appointment.patient_id}</td>
              <td>{appointment.hospital_id}</td>
              <td>
                <Link to={`/appointments/${appointment.appointment_id}`}><button>View</button></Link>
                <Link to={`/appointments/edit/${appointment.appointment_id}`}><button>Edit</button></Link>
                <button onClick={() => handleDelete(appointment.appointment_id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AppointmentList;
