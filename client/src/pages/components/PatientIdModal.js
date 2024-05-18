import React, { useState } from 'react';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '30%',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
};

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: white;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const PatientIdModal = ({ isOpen, onRequestClose }) => {
  const [patientId, setPatientId] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (patientId) {
      try {
        const response = await axios.get(`http://localhost:5001/patients/${patientId}`);
        if (response.data) {
          navigate(`/patients/${patientId}`);
        } else {
          alert('Patient ID not found. Please enter a valid Patient ID.');
        }
      } catch (err) {
        alert('Patient ID not found. Please enter a valid Patient ID.');
        console.error(err.message);
      }
    } else {
      alert('Please enter a valid Patient ID');
    }
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} style={customStyles} contentLabel="Enter Patient ID">
      <h2>Enter Patient ID</h2>
      <Input type="text" value={patientId} onChange={(e) => setPatientId(e.target.value)} placeholder="Patient ID" />
      <Button onClick={handleSubmit}>Submit</Button>
    </Modal>
  );
};

export default PatientIdModal;
