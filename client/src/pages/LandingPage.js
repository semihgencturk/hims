import React from "react";
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const LandingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f8f9fa;
  text-align: center;
`;

const Title = styled.h1`
  margin-bottom: 30px;
  color: #343a40;
`;

const StyledButton = styled(Link)`
  margin: 10px;
  width: 200px;
`;

const LandingPage = () => {
  return (
    <LandingContainer>
      <Title>Welcome to the Hospital Information Management System</Title>
      <StyledButton to="/admin" className="btn btn-primary">Admin Page</StyledButton>
      <StyledButton to="/doctor" className="btn btn-success">Doctor Page</StyledButton>
      <StyledButton to="/patient" className="btn btn-info">Patient Page</StyledButton>
    </LandingContainer>
  );
}

export default LandingPage;
