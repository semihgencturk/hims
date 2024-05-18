import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddVisit = () => {
  const [formData, setFormData] = useState({
    visit_no: '',
    visit_datetime: '',
    reason: '',
    procedure: '',
    note: '',
    appointment_id: ''
  });
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();

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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5001/visits', formData);
      if (response.status === 200) {
        alert('Visit added successfully!');
        navigate('/visits');
      } else {
        alert('Failed to add visit. Please try again.');
      }
    } catch (err) {
      console.error(err.message);
      alert('Failed to add visit. Please try again.');
    }
  };

  return (
    <div>
      <h2>Add Visit</h2>
      <form onSubmit={handleSubmit}>
        <input type="number" name="visit_no" placeholder="Visit No" value={formData.visit_no} onChange={handleChange} required />
        <input type="datetime-local" name="visit_datetime" placeholder="Date & Time" value={formData.visit_datetime} onChange={handleChange} required />
        <input type="text" name="reason" placeholder="Reason" value={formData.reason} onChange={handleChange} required />
        <input type="text" name="procedure" placeholder="Procedure" value={formData.procedure} onChange={handleChange} />
        <textarea name="note" placeholder="Note" value={formData.note} onChange={handleChange}></textarea>
        <select name="appointment_id" value={formData.appointment_id} onChange={handleChange} required>
          <option value="">Select Appointment</option>
          {appointments.map((appointment) => (
            <option key={appointment.appointment_id} value={appointment.appointment_id}>{appointment.app_datetime}</option>
          ))}
        </select>
        <button type="submit">Add Visit</button>
      </form>
    </div>
  );
};

export default AddVisit;
