import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const VisitList = () => {
  const [visits, setVisits] = useState([]);

  useEffect(() => {
    fetchVisits();
  }, []);

  const fetchVisits = async () => {
    try {
      const response = await axios.get('http://localhost:5001/visits');
      setVisits(response.data);
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/visits/${id}`);
      alert('Visit has been deleted.');
      fetchVisits();
    } catch (err) {
      console.error(err.message);
      alert('Failed to delete visit.');
    }
  };

  return (
    <div>
      <h2>Visits List</h2>
      <Link to="/visits/add"><button>Add New Visit</button></Link>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Visit No</th>
            <th>Date & Time</th>
            <th>Reason</th>
            <th>Procedure</th>
            <th>Note</th>
            <th>Appointment ID</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {visits.map((visit) => (
            <tr key={visit.visit_id}>
              <td>{visit.visit_id}</td>
              <td>{visit.visit_no}</td>
              <td>{visit.visit_datetime}</td>
              <td>{visit.reason}</td>
              <td>{visit.procedure}</td>
              <td>{visit.note}</td>
              <td>{visit.appointment_id}</td>
              <td>
                <Link to={`/visits/${visit.visit_id}`}><button>View</button></Link>
                <Link to={`/visits/edit/${visit.visit_id}`}><button>Edit</button></Link>
                <button onClick={() => handleDelete(visit.visit_id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VisitList;
