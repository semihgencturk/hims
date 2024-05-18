import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ExpertiseList = () => {
  const [expertises, setExpertises] = useState([]);

  useEffect(() => {
    fetchExpertises();
  }, []);

  const fetchExpertises = async () => {
    try {
      const response = await axios.get('http://localhost:5001/expertises');
      setExpertises(response.data);
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/expertises/${id}`);
      alert('Expertise has been deleted.');
      fetchExpertises();
    } catch (err) {
      console.error(err.message);
      alert('Failed to delete expertise.');
    }
  };

  return (
    <div>
      <h2>Expertises List</h2>
      <Link to="/expertises/add"><button>Add New Expertise</button></Link>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Field</th>
            <th>Given Date</th>
            <th>Institution</th>
            <th>Doctor ID</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {expertises.map((expertise) => (
            <tr key={expertise.expertise_id}>
              <td>{expertise.expertise_id}</td>
              <td>{expertise.expertise_field}</td>
              <td>{expertise.given_date}</td>
              <td>{expertise.institution}</td>
              <td>{expertise.doctor_id}</td>
              <td>
                <Link to={`/expertises/${expertise.expertise_id}`}><button>View</button></Link>
                <Link to={`/expertises/edit/${expertise.expertise_id}`}><button>Edit</button></Link>
                <button onClick={() => handleDelete(expertise.expertise_id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExpertiseList;
