import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const TestDetails = () => {
  const [test, setTest] = useState({});
  const { code } = useParams();

  useEffect(() => {
    fetchTest();
  }, []);

  const fetchTest = async () => {
    try {
      const response = await axios.get(`http://localhost:5001/tests/${code}`);
      setTest(response.data);
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div>
      <h2>Test Details</h2>
      <p><strong>Code:</strong> {test.test_code}</p>
      <p><strong>Name:</strong> {test.test_name}</p>
      <p><strong>Description:</strong> {test.description}</p>
      <p><strong>Reference Low:</strong> {test.reference_low}</p>
      <p><strong>Reference High:</strong> {test.reference_high}</p>
      <p><strong>Reference Unit:</strong> {test.reference_unit}</p>
    </div>
  );
};

export default TestDetails;
