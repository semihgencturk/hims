import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ClinicList = () => {
  const [clinics, setClinics] = useState([]);

  useEffect(() => {
    fetchClinics();
  }, []);

  const fetchClinics = async () => {
    try {
      const response = await axios.get('http://localhost:5001/clinics');
      setClinics(response.data);
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/clinics/${id}`);
      alert('Deleted!');
      fetchClinics();
    } catch (err) {
      console.error(err.message);
      alert('Error!');
    }
  };

  return (
    <div>
      <h2>Clinics List</h2>
      <Link to="/clinics/add"><button className="add-button">Add New Clinic</button></Link>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Clinic No</th>
            <th>Name</th>
            <th>Country</th>
            <th>City</th>
            <th>District</th>
            <th>Street</th>
            <th>Block</th>
            <th>Hospital ID</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {clinics.map((clinic) => (
            <tr key={clinic.clinic_id}>
              <td>{clinic.clinic_id}</td>
              <td>{clinic.clinic_no}</td>
              <td>{clinic.clinic_name}</td>
              <td>{clinic.country}</td>
              <td>{clinic.city}</td>
              <td>{clinic.district}</td>
              <td>{clinic.street}</td>
              <td>{clinic.block}</td>
              <td>{clinic.hospital_id}</td>
              <td>
                <Link to={`/clinics/${clinic.clinic_id}`}><button>View</button></Link>
                <Link to={`/clinics/edit/${clinic.clinic_id}`}><button>Edit</button></Link>
                <button onClick={() => handleDelete(clinic.clinic_id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClinicList;
