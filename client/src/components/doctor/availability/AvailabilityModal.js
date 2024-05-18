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
  justify-content: center;
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

const AvailabilityModal = ({ isOpen, onRequestClose, doctorId, doctorFirstName, doctorLastName }) => {
  const [availabilities, setAvailabilities] = useState([]);
  const [newAvailability, setNewAvailability] = useState('');

  useEffect(() => {
    if (doctorId) {
      fetchAvailabilities();
    }
  }, [doctorId]);

  const fetchAvailabilities = async () => {
    try {
      const response = await axios.get(`http://localhost:5001/doctors/availabilities/${doctorId}`);
      setAvailabilities(response.data);
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleAddAvailability = async () => {
    try {
      const response = await axios.post('http://localhost:5001/doctors/availabilities', {
        doctor_id: doctorId,
        availability_datetime: newAvailability,
      });
      if (response.status === 200) {
        setNewAvailability('');
        fetchAvailabilities();
      } else {
        alert('Failed to add availability. Please try again.');
      }
    } catch (err) {
      console.error(err.message);
      alert('Failed to add availability. Please try again.');
    }
  };

  const handleDeleteAvailability = async (availability_datetime) => {
    try {
      const encodedDateTime = encodeURIComponent(availability_datetime);
      await axios.delete(`http://localhost:5001/doctors/availabilities/${doctorId}/${encodedDateTime}`);
      fetchAvailabilities();
    } catch (err) {
      console.error(err.message);
      alert('Failed to delete availability. Please try again.');
    }
  };
  

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={customStyles}
      contentLabel="Manage Availabilities"
    >
      <Header>Manage Availabilities for Dr. {doctorFirstName} {doctorLastName}</Header>
      <InputContainer>
        <Input
          type="datetime-local"
          value={newAvailability}
          onChange={(e) => setNewAvailability(e.target.value)}
        />
        <Button onClick={handleAddAvailability}>Add Availability</Button>
      </InputContainer>
      <List>
        {availabilities.map((availability) => (
          <ListItem key={availability.availability_datetime}>
            {new Date(availability.availability_datetime).toLocaleString()}
            <Button onClick={() => handleDeleteAvailability(availability.availability_datetime)}>Delete</Button>
          </ListItem>
        ))}
      </List>
      <CloseButton onClick={onRequestClose}>Close</CloseButton>
    </Modal>
  );
};

export default AvailabilityModal;
