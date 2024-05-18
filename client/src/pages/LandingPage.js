// src/components/LandingPage.js
import React, { useState } from "react";
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import DoctorIdModal from './components/DoctorIdModal';
import PatientIdModal from './components/PatientIdModal';
import YtuLogo from "../assets/logos/YtuLogo.png";

const LandingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #FEFAF6;
  text-align: center;
`;

const Title = styled.h1`
  margin-bottom: 30px;
  color: #001348;
`;

const StyledButton = styled(Link)`
  margin: 10px;
  width: 200px;
`;

const Button = styled.button`
  margin: 10px;
  width: 200px;
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: white;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const Logo = styled.img`
  width: 100px; 
  height: auto;
`;


const LandingPage = () => {
  const [doctorModalIsOpen, setDoctorModalIsOpen] = useState(false);
  const [patientModalIsOpen, setPatientModalIsOpen] = useState(false);

  const openDoctorModal = () => {
    setDoctorModalIsOpen(true);
  };

  const closeDoctorModal = () => {
    setDoctorModalIsOpen(false);
  };

  const openPatientModal = () => {
    setPatientModalIsOpen(true);
  };

  const closePatientModal = () => {
    setPatientModalIsOpen(false);
  };

  return (
    <LandingContainer>
      <Logo src={YtuLogo} alt="Ytu-Logo" />
      <Title>Welcome to the Hospital Information Management System</Title>
      <StyledButton to="/admin" className="btn btn-primary">Admin Page</StyledButton>
      <Button onClick={openDoctorModal}>Doctor Page</Button>
      <Button onClick={openPatientModal}>Patient Page</Button>
      <DoctorIdModal isOpen={doctorModalIsOpen} onRequestClose={closeDoctorModal} />
      <PatientIdModal isOpen={patientModalIsOpen} onRequestClose={closePatientModal} />
    </LandingContainer>
  );
}

export default LandingPage;
