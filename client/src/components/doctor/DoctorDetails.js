import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import AvailabilityModal from './availability/AvailabilityModal';

const DoctorDetails = () => {
  const [doctor, setDoctor] = useState({});
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    fetchDoctor();
  }, []);

  const fetchDoctor = async () => {
    try {
      const response = await axios.get(`http://localhost:5001/doctors/${id}`);
      setDoctor(response.data);
    } catch (err) {
      console.error(err.message);
    }
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div>
      <h2>Doctor Details</h2>
      <p><strong>First Name:</strong> {doctor.first_name}</p>
      <p><strong>Last Name:</strong> {doctor.last_name}</p>
      <p><strong>Passport No:</strong> {doctor.passport_no}</p>
      <p><strong>Nationality:</strong> {doctor.nationality}</p>
      <p><strong>Date of Birth:</strong> {doctor.date_of_birth}</p>
      <p><strong>Gender:</strong> {doctor.gender}</p>
      <p><strong>Native Language:</strong> {doctor.native_language}</p>
      <p><strong>Second Language:</strong> {doctor.second_language}</p>
      <p><strong>Cell Phone:</strong> {doctor.cell_phone}</p>
      <p><strong>Landline Phone:</strong> {doctor.landline_phone}</p>
      <p><strong>Emergency Phone:</strong> {doctor.emergency_phone}</p>
      <p><strong>Email:</strong> {doctor.email}</p>
      <p><strong>Country:</strong> {doctor.country}</p>
      <p><strong>City:</strong> {doctor.city}</p>
      <p><strong>District:</strong> {doctor.district}</p>
      <p><strong>Street:</strong> {doctor.street}</p>
      <p><strong>Blood Group:</strong> {doctor.blood_group}</p>
      <button onClick={openModal}>Availabilities</button>
      {doctor.doctor_id && (
        <AvailabilityModal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          doctorId={doctor.doctor_id}
        />
      )}
    </div>
  );
};

export default DoctorDetails;

