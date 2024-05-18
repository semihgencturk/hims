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

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 300px;
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

const PatientTestsModal = ({ isOpen, onRequestClose, patientId }) => {
  const [tests, setTests] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [testCodes, setTestCodes] = useState([]);
  const [newTest, setNewTest] = useState({
    test_code: '',
    doctor_id: '',
    result_value: '',
    result_unit: '',
  });

  useEffect(() => {
    if (patientId) {
      fetchPatientTests();
      fetchDoctors();
      fetchTestCodes();
    }
  }, [patientId]);

  const fetchPatientTests = async () => {
    try {
      const response = await axios.get(`http://localhost:5001/patients/${patientId}/tests`);
      setTests(response.data);
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

  const fetchTestCodes = async () => {
    try {
      const response = await axios.get('http://localhost:5001/tests');
      setTestCodes(response.data);
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleAddTest = async () => {
    try {
      const response = await axios.post('http://localhost:5001/patients/tests', {
        ...newTest,
        patient_id: patientId,
      });
      if (response.status === 200) {
        setNewTest({
          test_code: '',
          doctor_id: '',
          result_value: '',
          result_unit: '',
        });
        fetchPatientTests();
      } else {
        alert('Failed to add test. Please try again.');
      }
    } catch (err) {
      console.error(err.message);
      alert('Failed to add test. Please try again.');
    }
  };

  const handleDeleteTest = async (test_code, doctor_id) => {
    try {
      await axios.delete(`http://localhost:5001/patients/tests`, {
        data: { patient_id: patientId, test_code, doctor_id }
      });
      fetchPatientTests();
    } catch (err) {
      console.error(err.message);
      alert('Failed to delete test. Please try again.');
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={customStyles}
      contentLabel="Manage Tests"
    >
      <Header>Manage Tests for Patient {patientId}</Header>
      <InputContainer>
        <Select
          value={newTest.test_code}
          onChange={(e) => setNewTest({ ...newTest, test_code: e.target.value })}
        >
          <option value="">Select Test Code</option>
          {testCodes.map((test) => (
            <option key={test.test_code} value={test.test_code}>
              {test.test_code} - {test.test_name}
            </option>
          ))}
        </Select>
        <Select
          value={newTest.doctor_id}
          onChange={(e) => setNewTest({ ...newTest, doctor_id: e.target.value })}
        >
          <option value="">Select Doctor</option>
          {doctors.map((doctor) => (
            <option key={doctor.doctor_id} value={doctor.doctor_id}>
              {doctor.first_name} {doctor.last_name}
            </option>
          ))}
        </Select>
        <Input
          type="text"
          placeholder="Result Value"
          value={newTest.result_value}
          onChange={(e) => setNewTest({ ...newTest, result_value: e.target.value })}
        />
        <Input
          type="text"
          placeholder="Result Unit"
          value={newTest.result_unit}
          onChange={(e) => setNewTest({ ...newTest, result_unit: e.target.value })}
        />
        <Button onClick={handleAddTest}>Add Test</Button>
      </InputContainer>
      <List>
        {tests.map((test) => (
          <ListItem key={`${test.test_code}-${test.doctor_id}`}>
            <div>
              <strong>Test Code:</strong> {test.test_code} <br />
              <strong>Doctor ID:</strong> {test.doctor_id} <br />
              <strong>Execution Time:</strong> {new Date(test.execution_time).toLocaleString()} <br />
              <strong>Result Value:</strong> {test.result_value} <br />
              <strong>Result Unit:</strong> {test.result_unit}
            </div>
            <Button onClick={() => handleDeleteTest(test.test_code, test.doctor_id)}>Delete</Button>
          </ListItem>
        ))}
      </List>
      <CloseButton onClick={onRequestClose}>Close</CloseButton>
    </Modal>
  );
};

export default PatientTestsModal;
