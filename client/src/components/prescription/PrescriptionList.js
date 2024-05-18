import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const PrescriptionList = () => {
  const [prescriptions, setPrescriptions] = useState([]);

  useEffect(() => {
    fetchPrescriptions();
  }, []);

  const fetchPrescriptions = async () => {
    try {
      const response = await axios.get('http://localhost:5001/prescriptions');
      setPrescriptions(response.data);
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/prescriptions/${id}`);
      alert('Deleted!');
      fetchPrescriptions();
    } catch (err) {
      console.error(err.message);
      alert('Error!');
    }
  };

  return (
    <div>
      <h2>Prescriptions List</h2>
      <Link to="/prescriptions/add"><button className="add-button">Add New Prescription</button></Link>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Note</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {prescriptions.map((prescription) => (
            <tr key={prescription.prescription_id}>
              <td>{prescription.prescription_id}</td>
              <td>{prescription.note}</td>
              <td>{new Date(prescription.prescription_date).toLocaleString()}</td>
              <td>
                <Link to={`/prescriptions/${prescription.prescription_id}`}><button>View</button></Link>
                <Link to={`/prescriptions/edit/${prescription.prescription_id}`}><button>Edit</button></Link>
                <button onClick={() => handleDelete(prescription.prescription_id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PrescriptionList;
