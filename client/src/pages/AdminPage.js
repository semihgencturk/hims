import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const AdminContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f8f9fa;
`;

const Title = styled.h2`
  margin-bottom: 20px;
  color: #343a40;
`;

const Description = styled.p`
  margin-bottom: 20px;
  color: #495057;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
`;

const StyledButton = styled(Link)`
  display: inline-block;
  padding: 10px 20px;
  margin: 5px;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  text-decoration: none;
  text-align: center;
  font-size: 16px;

  &:hover {
    background-color: #0056b3;
  }
`;

const AdminPage = () => {
  return (
    <AdminContainer>
      <Title>Admin Page</Title>
      <Description>Welcome to the Admin Page!</Description>
      <ButtonContainer>
        <StyledButton to="/patients">Manage Patients</StyledButton>
        <StyledButton to="/hospitals">Manage Hospitals</StyledButton>
        <StyledButton to="/clinics">Manage Clinics</StyledButton>
        <StyledButton to="/doctors">Manage Doctors</StyledButton>
        <StyledButton to="/diplomas">Manage Diplomas</StyledButton>
        <StyledButton to="/expertises">Manage Expertises</StyledButton>
        <StyledButton to="/medicines">Manage Medicines</StyledButton>
        <StyledButton to="/appointments">Manage Appointments</StyledButton>
        <StyledButton to="/visits">Manage Visits</StyledButton>
        <StyledButton to="/prescriptions">Manage Prescriptions</StyledButton>
        <StyledButton to="/tests">Manage Tests</StyledButton>
        <StyledButton to="/diagnoses">Manage Diagnosises</StyledButton>
      </ButtonContainer>
    </AdminContainer>
  );
};

export default AdminPage;
