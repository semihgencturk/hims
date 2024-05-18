import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
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

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
`;

const Textarea = styled.textarea`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 300px;
  height: 100px;
`;

const Select = styled.select`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 320px;
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

const PatientDiagnosesModal = ({ isOpen, onRequestClose, patientId }) => {
  const [diagnoses, setDiagnoses] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [diagnosisCodes, setDiagnosisCodes] = useState([]);
  const [newDiagnosis, setNewDiagnosis] = useState({
    diagnosis_code: '',
    doctor_id: '',
    description: '',
  });

  useEffect(() => {
    if (patientId) {
      fetchPatientDiagnoses();
      fetchDoctors();
      fetchDiagnosisCodes();
    }
  }, [patientId]);

  const fetchPatientDiagnoses = async () => {
    try {
      const response = await axios.get(`http://localhost:5001/patients/${patientId}/diagnoses`);
      setDiagnoses(response.data);
    } catch (err) {
      console.error(err.message);
    }
  };

  const fetchDoctors = async () => {
    try {
      const response = await axios.get('http://localhost:5001/doctors');
      setDoctors(response.data);
    } catch (err) {
      console.error(err.message);
    }
  };

  const fetchDiagnosisCodes = async () => {
    try {
      const response = await axios.get('http://localhost:5001/diagnoses');
      setDiagnosisCodes(response.data);
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleAddDiagnosis = async () => {
    try {
      const response = await axios.post('http://localhost:5001/patients/diagnoses', {
        ...newDiagnosis,
        patient_id: patientId,
      });
      if (response.status === 200) {
        setNewDiagnosis({
          diagnosis_code: '',
          doctor_id: '',
          description: '',
        });
        fetchPatientDiagnoses();
      } else {
        alert('Failed to add diagnosis. Please try again.');
      }
    } catch (err) {
      console.error(err.message);
      alert('Failed to add diagnosis. Please try again.');
    }
  };

  const handleDeleteDiagnosis = async (diagnosis_code, doctor_id) => {
    try {
      await axios.delete(`http://localhost:5001/patients/diagnoses`, {
        data: { patient_id: patientId, diagnosis_code, doctor_id }
      });
      fetchPatientDiagnoses();
    } catch (err) {
      console.error(err.message);
      alert('Failed to delete diagnosis. Please try again.');
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={customStyles}
      contentLabel="Manage Diagnoses"
    >
      <Header>Manage Diagnoses for Patient {patientId}</Header>
      <InputContainer>
        <Select
          value={newDiagnosis.diagnosis_code}
          onChange={(e) => setNewDiagnosis({ ...newDiagnosis, diagnosis_code: e.target.value })}
        >
          <option value="">Select Diagnosis Code</option>
          {diagnosisCodes.map((diagnosis) => (
            <option key={diagnosis.diagnosis_code} value={diagnosis.diagnosis_code}>
              {diagnosis.diagnosis_code} - {diagnosis.diagnosis_name}
            </option>
          ))}
        </Select>
        <Select
          value={newDiagnosis.doctor_id}
          onChange={(e) => setNewDiagnosis({ ...newDiagnosis, doctor_id: e.target.value })}
        >
          <option value="">Select Doctor</option>
          {doctors.map((doctor) => (
            <option key={doctor.doctor_id} value={doctor.doctor_id}>
              {doctor.first_name} {doctor.last_name}
            </option>
          ))}
        </Select>
        <Textarea
          placeholder="Description"
          value={newDiagnosis.description}
          onChange={(e) => setNewDiagnosis({ ...newDiagnosis, description: e.target.value })}
        />
        <Button onClick={handleAddDiagnosis}>Add Diagnosis</Button>
      </InputContainer>
      <List>
        {diagnoses.map((diagnosis) => (
          <ListItem key={`${diagnosis.diagnosis_code}-${diagnosis.doctor_id}`}>
            <div>
              <strong>Diagnosis Code:</strong> {diagnosis.diagnosis_code} <br />
              <strong>Doctor ID:</strong> {diagnosis.doctor_id} <br />
              <strong>Diagnosis Time:</strong> {new Date(diagnosis.diagnosis_time).toLocaleString()} <br />
              <strong>Description:</strong> {diagnosis.description}
            </div>
            <Button onClick={() => handleDeleteDiagnosis(diagnosis.diagnosis_code, diagnosis.doctor_id)}>Delete</Button>
          </ListItem>
        ))}
      </List>
      <CloseButton onClick={onRequestClose}>Close</CloseButton>
    </Modal>
  );
};

export default PatientDiagnosesModal;
