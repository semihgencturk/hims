import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const DiagnosisList = () => {
  const [diagnoses, setDiagnoses] = useState([]);

  useEffect(() => {
    fetchDiagnoses();
  }, []);

  const fetchDiagnoses = async () => {
    try {
      const response = await axios.get('http://localhost:5001/diagnoses');
      setDiagnoses(response.data);
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleDelete = async (code) => {
    try {
      await axios.delete(`http://localhost:5001/diagnoses/${code}`);
      alert('Deleted!');
      fetchDiagnoses();
    } catch (err) {
      console.error(err.message);
      alert('Error!');
    }
  };

  return (
    <div>
      <h2>Diagnoses List</h2>
      <Link to="/diagnoses/add"><button className="add-button">Add New Diagnosis</button></Link>
      <table>
        <thead>
          <tr>
            <th>Code</th>
            <th>Name</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {diagnoses.map((diagnosis) => (
            <tr key={diagnosis.diagnosis_code}>
              <td>{diagnosis.diagnosis_code}</td>
              <td>{diagnosis.diagnosis_name}</td>
              <td>{diagnosis.description}</td>
              <td>
                <Link to={`/diagnoses/${diagnosis.diagnosis_code}`}><button>View</button></Link>
                <Link to={`/diagnoses/edit/${diagnosis.diagnosis_code}`}><button>Edit</button></Link>
                <button onClick={() => handleDelete(diagnosis.diagnosis_code)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DiagnosisList;
