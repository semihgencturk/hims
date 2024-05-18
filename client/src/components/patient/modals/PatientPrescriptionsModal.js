import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    height: '80%',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
};

const Header = styled.h2`
  margin-bottom: 20px;
  text-align: center;
  font-size: 1.5em;
  color: #333;
`;

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  max-height: 400px;
  overflow-y: auto;
`;

const ListItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #ccc;

  &:last-child {
    border-bottom: none;
  }
`;

const CloseButton = styled(Button)`
  background-color: #dc3545;

  &:hover {
    background-color: #c82333;
  }
`;

const PatientPrescriptionsModal = ({ isOpen, onRequestClose, patientId }) => {
  const [prescriptions, setPrescriptions] = useState([]);

  useEffect(() => {
    if (patientId) {
      fetchPrescriptions();
    }
  }, [patientId]);

  const fetchPrescriptions = async () => {
    try {
      const response = await axios.get(`http://localhost:5001/patients/${patientId}/prescriptions`);
      setPrescriptions(response.data);
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={customStyles}
      contentLabel="Manage Prescriptions"
    >
      <Header>Manage Prescriptions for Patient {patientId}</Header>
      <List>
        {prescriptions.map((prescription) => (
          <ListItem key={prescription.prescription_id}>
            <div>
              <strong>Prescription ID:</strong> {prescription.prescription_id} <br />
              <strong>Doctor ID:</strong> {prescription.doctor_id} <br />
              <strong>Date:</strong> {new Date(prescription.prescription_time).toLocaleString()} <br />
              <strong>Note:</strong> {prescription.note}
            </div>
            <Link to={`/prescriptions/${prescription.prescription_id}`}><Button>Details</Button></Link>
          </ListItem>
        ))}
      </List>
      <CloseButton onClick={onRequestClose}>Close</CloseButton>
    </Modal>
  );
};

export default PatientPrescriptionsModal;
