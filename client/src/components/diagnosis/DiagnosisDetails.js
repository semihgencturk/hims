import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const DiagnosisDetails = () => {
  const [diagnosis, setDiagnosis] = useState({});
  const { code } = useParams();

  useEffect(() => {
    fetchDiagnosis();
  }, []);

  const fetchDiagnosis = async () => {
    try {
      const response = await axios.get(`http://localhost:5001/diagnoses/${code}`);
      setDiagnosis(response.data);
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div>
      <h2>Diagnosis Details</h2>
      <p><strong>Code:</strong> {diagnosis.diagnosis_code}</p>
      <p><strong>Name:</strong> {diagnosis.diagnosis_name}</p>
      <p><strong>Description:</strong> {diagnosis.description}</p>
    </div>
  );
};

export default DiagnosisDetails;
