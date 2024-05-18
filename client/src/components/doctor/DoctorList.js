import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import AvailabilityModal from './availability/AvailabilityModal';

const DoctorList = () => {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctorId, setSelectedDoctorId] = useState(null);
  const [selectedDoctorFirstName, setSelectedDoctorFirstName] = useState(null);
  const [selectedDoctorLastName, setSelectedDoctorLastName] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const response = await axios.get('http://localhost:5001/doctors');
      setDoctors(response.data);
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/doctors/${id}`);
      alert('Deleted!', 'Doctor has been deleted.', 'success');
      fetchDoctors();
    } catch (err) {
      console.error(err.message);
      alert('Error!', 'Failed to delete doctor.', 'error');
    }
  };

  const openModal = (doctorId, doctorFirstName, doctorLastName) => {
    setSelectedDoctorFirstName(doctorFirstName);
    setSelectedDoctorLastName(doctorLastName);
    setSelectedDoctorId(doctorId);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedDoctorId(null);
  };

  return (
    <div>
      <h2>Doctors List</h2>
      <Link to="/doctors/add"><button>Add New Doctor</button></Link>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {doctors.map((doctor) => (
            <tr key={doctor.doctor_id}>
              <td>{doctor.doctor_id}</td>
              <td>{doctor.first_name}</td>
              <td>{doctor.last_name}</td>
              <td>
                <Link to={`/doctors/${doctor.doctor_id}`}><button>View</button></Link>
                <Link to={`/doctors/edit/${doctor.doctor_id}`}><button>Edit</button></Link>
                <button onClick={() => handleDelete(doctor.doctor_id)}>Delete</button>
                <button onClick={() => openModal(doctor.doctor_id, doctor.first_name, doctor.last_name)}>Availabilities</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedDoctorId && (
        <AvailabilityModal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          doctorFirstName={selectedDoctorFirstName}
          doctorLastName={selectedDoctorLastName}
          doctorId={selectedDoctorId}
        />
      )}
    </div>
  );
};

export default DoctorList;
