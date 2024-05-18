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

const Textarea = styled.textarea`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 300px;
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

const Select = styled.select`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 320px;
`;

const PrescriptionMedicinesModal = ({ isOpen, onRequestClose, prescriptionId }) => {
  const [medicines, setMedicines] = useState([]);
  const [prescriptionMedicines, setPrescriptionMedicines] = useState([]);
  const [newPrescriptionMedicine, setNewPrescriptionMedicine] = useState({
    medicine_code: '',
    box_count: '',
    period_value: '',
    period_unit: '',
    frequency_value: '',
    frequency_unit: '',
    note: ''
  });

  useEffect(() => {
    fetchMedicines();
    fetchPrescriptionMedicines();
  }, [prescriptionId]);

  const fetchMedicines = async () => {
    try {
      const response = await axios.get('http://localhost:5001/medicines');
      setMedicines(response.data);
    } catch (err) {
      console.error(err.message);
    }
  };

  const fetchPrescriptionMedicines = async () => {
    try {
      const response = await axios.get(`http://localhost:5001/prescriptions/${prescriptionId}/medicines`);
      setPrescriptionMedicines(response.data);
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleChange = (e) => {
    setNewPrescriptionMedicine({
      ...newPrescriptionMedicine,
      [e.target.name]: e.target.value
    });
  };

  const handleAddPrescriptionMedicine = async () => {
    try {
      const response = await axios.post(`http://localhost:5001/prescriptions/${prescriptionId}/medicines`, newPrescriptionMedicine);
      if (response.status === 200) {
        setNewPrescriptionMedicine({
          medicine_code: '',
          box_count: '',
          period_value: '',
          period_unit: '',
          frequency_value: '',
          frequency_unit: '',
          note: ''
        });
        fetchPrescriptionMedicines();
      } else {
        alert('Failed to add medicine. Please try again.');
      }
    } catch (err) {
      console.error(err.message);
      alert('Failed to add medicine. Please try again.');
    }
  };

  const handleDeletePrescriptionMedicine = async (medicine_code) => {
    try {
      await axios.delete(`http://localhost:5001/prescriptions/${prescriptionId}/medicines/${medicine_code}`);
      fetchPrescriptionMedicines();
    } catch (err) {
      console.error(err.message);
      alert('Failed to delete medicine. Please try again.');
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={customStyles}
      contentLabel="Manage Prescription Medicines"
    >
      <Header>Manage Medicines for Prescription {prescriptionId}</Header>
      <InputContainer>
        <Select name="medicine_code" value={newPrescriptionMedicine.medicine_code} onChange={handleChange} required>
          <option value="">Select Medicine</option>
          {medicines.map((medicine) => (
            <option key={medicine.medicine_code} value={medicine.medicine_code}>
              {medicine.medicine_name}
            </option>
          ))}
        </Select>
        <Input type="number" name="box_count" placeholder="Box Count" value={newPrescriptionMedicine.box_count} onChange={handleChange} required />
        <Input type="number" name="period_value" placeholder="Period Value" value={newPrescriptionMedicine.period_value} onChange={handleChange} required />
        <Input type="text" name="period_unit" placeholder="Period Unit" value={newPrescriptionMedicine.period_unit} onChange={handleChange} required />
        <Input type="number" name="frequency_value" placeholder="Frequency Value" value={newPrescriptionMedicine.frequency_value} onChange={handleChange} required />
        <Input type="text" name="frequency_unit" placeholder="Frequency Unit" value={newPrescriptionMedicine.frequency_unit} onChange={handleChange} required />
        <Textarea name="note" placeholder="Note" value={newPrescriptionMedicine.note} onChange={handleChange} />
        <Button onClick={handleAddPrescriptionMedicine}>Add Medicine</Button>
      </InputContainer>
      <List>
        {prescriptionMedicines.map((prescription) => (
          <ListItem key={prescription.medicine_code}>
            <div>
              <strong>Medicine Code:</strong> {prescription.medicine_code} <br />
              <strong>Box Count:</strong> {prescription.box_count} <br />
              <strong>Period:</strong> {prescription.period_value} {prescription.period_unit} <br />
              <strong>Frequency:</strong> {prescription.frequency_value} {prescription.frequency_unit} <br />
              <strong>Note:</strong> {prescription.note}
            </div>
            <Button onClick={() => handleDeletePrescriptionMedicine(prescription.medicine_code)}>Delete</Button>
          </ListItem>
        ))}
      </List>
      <CloseButton onClick={onRequestClose}>Close</CloseButton>
    </Modal>
  );
};

export default PrescriptionMedicinesModal;
