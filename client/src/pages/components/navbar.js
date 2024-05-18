import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import DoctorIdModal from './DoctorIdModal';
import PatientIdModal from './PatientIdModal';
import YtuTextLogo from '../../assets/logos/YtuTextLogo.png';

const NavbarContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #A9946D;
  padding: 10px 30px;
  color: white;
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  margin: 0 10px;

  &:hover {
    text-decoration: underline;
  }
`;

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #9AC8CD;
  color: #001348;
  cursor: pointer;
  margin-left: 10px;

  &:hover {
    background-color: #FF9047;
  }
`;

const Logo = styled.img`
  width: 200px;
  height: auto;
`;

const FlexDiv = styled.div`
  width: 33%;
  display: flex;
  justify-content: center;
`;

const Navbar = () => {
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
    <NavbarContainer>
      <FlexDiv>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/admin">Admin</NavLink>
      </FlexDiv>
      <FlexDiv>
        <Logo src={YtuTextLogo} alt="Ytu-Logo" />
      </FlexDiv>
      <FlexDiv>
        <Button onClick={openDoctorModal}>Doctor Page</Button>
        <Button onClick={openPatientModal}>Patient Page</Button>
      </FlexDiv>
      <DoctorIdModal isOpen={doctorModalIsOpen} onRequestClose={closeDoctorModal} />
      <PatientIdModal isOpen={patientModalIsOpen} onRequestClose={closePatientModal} />
    </NavbarContainer>
  );
};

export default Navbar;
