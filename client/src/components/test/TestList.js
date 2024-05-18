import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const TestList = () => {
  const [tests, setTests] = useState([]);

  useEffect(() => {
    fetchTests();
  }, []);

  const fetchTests = async () => {
    try {
      const response = await axios.get('http://localhost:5001/tests');
      setTests(response.data);
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleDelete = async (code) => {
    try {
      await axios.delete(`http://localhost:5001/tests/${code}`);
      alert('Deleted!');
      fetchTests();
    } catch (err) {
      console.error(err.message);
      alert('Error!');
    }
  };

  return (
    <div>
      <h2>Tests List</h2>
      <Link to="/tests/add"><button className="add-button">Add New Test</button></Link>
      <table>
        <thead>
          <tr>
            <th>Code</th>
            <th>Name</th>
            <th>Description</th>
            <th>Reference Low</th>
            <th>Reference High</th>
            <th>Reference Unit</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tests.map((test) => (
            <tr key={test.test_code}>
              <td>{test.test_code}</td>
              <td>{test.test_name}</td>
              <td>{test.description}</td>
              <td>{test.reference_low}</td>
              <td>{test.reference_high}</td>
              <td>{test.reference_unit}</td>
              <td>
                <Link to={`/tests/${test.test_code}`}><button>View</button></Link>
                <Link to={`/tests/edit/${test.test_code}`}><button>Edit</button></Link>
                <button onClick={() => handleDelete(test.test_code)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TestList;
