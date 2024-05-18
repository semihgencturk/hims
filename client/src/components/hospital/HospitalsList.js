import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import HospitalClinicsModal from './modals/HospitalClinicsModal';


const HospitalsList = () => {
  const [hospitals, setHospitals] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedHospitalId, setSelectedHospitalId] = useState(null);
  const [selectedHospitalName, setSelectedHospitalName] = useState('');

  useEffect(() => {
    fetchHospitals();
  }, []);

  const fetchHospitals = async () => {
    try {
      const response = await axios.get('http://localhost:5001/hospitals');
      setHospitals(response.data);
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/hospitals/${id}`);
      fetchHospitals();
    } catch (err) {
      console.error(err.message);
    }
  };

  const openModal = (hospitalId, hospitalName) => {
    setSelectedHospitalId(hospitalId);
    setSelectedHospitalName(hospitalName);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div>
      <h2>Hospitals List</h2>
      <Link to="/hospitals/add"><button>Add New Hospital</button></Link>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Country</th>
            <th>City</th>
            <th>District</th>
            <th>Street</th>
            <th>Block</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {hospitals.map((hospital) => (
            <tr key={hospital.hospital_id}>
              <td>{hospital.hospital_id}</td>
              <td>{hospital.hospital_name}</td>
              <td>{hospital.country}</td>
              <td>{hospital.city}</td>
              <td>{hospital.district}</td>
              <td>{hospital.street}</td>
              <td>{hospital.block}</td>
              <td>
                <Link to={`/hospitals/${hospital.hospital_id}`}><button>View Details</button></Link>
                <Link to={`/hospitals/edit/${hospital.hospital_id}`}><button>Edit</button></Link>
                <button onClick={() => handleDelete(hospital.hospital_id)}>Delete</button>
                <button onClick={() => openModal(hospital.hospital_id, hospital.hospital_name)}>View Clinics</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <HospitalClinicsModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        hospitalId={selectedHospitalId}
        hospitalName={selectedHospitalName}
      />
    </div>
  );
};

export default HospitalsList;
