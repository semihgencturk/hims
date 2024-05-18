import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const DiplomaList = () => {
  const [diplomas, setDiplomas] = useState([]);

  useEffect(() => {
    fetchDiplomas();
  }, []);

  const fetchDiplomas = async () => {
    try {
      const response = await axios.get('http://localhost:5001/diplomas');
      setDiplomas(response.data);
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/diplomas/${id}`);
      alert('Diploma has been deleted.');
      fetchDiplomas();
    } catch (err) {
      console.error(err.message);
      alert('Failed to delete diploma.');
    }
  };

  return (
    <div>
      <h2>Diplomas List</h2>
      <Link to="/diplomas/add"><button>Add New Diploma</button></Link>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Graduation Date</th>
            <th>Institution</th>
            <th>Doctor ID</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {diplomas.map((diploma) => (
            <tr key={diploma.diploma_id}>
              <td>{diploma.diploma_id}</td>
              <td>{diploma.diploma_title}</td>
              <td>{diploma.graduation_date}</td>
              <td>{diploma.institution}</td>
              <td>{diploma.doctor_id}</td>
              <td>
                <Link to={`/diplomas/${diploma.diploma_id}`}><button>View</button></Link>
                <Link to={`/diplomas/edit/${diploma.diploma_id}`}><button>Edit</button></Link>
                <button onClick={() => handleDelete(diploma.diploma_id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DiplomaList;
