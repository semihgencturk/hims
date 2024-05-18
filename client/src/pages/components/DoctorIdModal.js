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
    width: '400px',
    padding: '20px',
    borderRadius: '10px',
  },
};

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  width: 100%;

  &:hover {
    background-color: #0056b3;
  }
`;

const DoctorIdModal = ({ isOpen, onRequestClose }) => {
  const [doctorId, setDoctorId] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (doctorId) {
      try {
        const response = await axios.get(`http://localhost:5001/doctors/${doctorId}`);
        if (response.data) {
          navigate(`/doctors/${doctorId}`);
        } else {
          alert('Doctor ID not found. Please enter a valid Doctor ID.');
        }
      } catch (err) {
        alert('Doctor ID not found. Please enter a valid Doctor ID.');
        console.error(err.message);
      }
    } else {
      alert('Please enter a valid Doctor ID');
    }
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} style={customStyles} contentLabel="Enter Doctor ID">
      <h2>Enter Doctor ID</h2>
      <Input type="text" value={doctorId} onChange={(e) => setDoctorId(e.target.value)} placeholder="Doctor ID" />
      <Button onClick={handleSubmit}>Submit</Button>
    </Modal>
  );
};

export default DoctorIdModal;
