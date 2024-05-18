import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Nav = styled.nav`
  background-color: #343a40;
  padding: 10px;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const NavLink = styled(Link)`
  color: #ffffff;
  text-decoration: none;
  font-size: 18px;
  margin: 0 10px;
  padding: 5px 10px;
  border-radius: 4px;

  &:hover {
    background-color: #495057;
    color: #ffffff;
  }
`;

const Navbar = () => {
  return (
    <Nav>
      <NavLink to="/">Landing Page</NavLink>
      <NavLink to="/admin">Admin Page</NavLink>
      <NavLink to="/doctor">Doctor Page</NavLink>
      <NavLink to="/patient">Patient Page</NavLink>
    </Nav>
  );
};

export default Navbar;
