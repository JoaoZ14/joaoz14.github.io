import React from "react";
import styled from "styled-components";

const NavBar = styled.div`
  margin: 0;
  text-align: center;
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
`;
const Logo = styled.h1`
  font-family: Georgia, serif;
  font-size: 40px;
`;
const NavLinks = styled.li`
  font-family: Times, Times New Roman, serif;
  list-style: none;
  display: flex;
  gap: 50px;
  text-align: center;
  font-size: 20px;
  font-weight: 100; /* adicionado */

  a {
    text-decoration: none;
    color: white;
  }
`;

const Navigation = () => {
  return (
    <NavBar>
      <Logo>QUARTZ</Logo>
      <NavLinks>
        <a href="">Sobre</a>
        <a href="">Projetos</a>
        <a href="">Contato</a>
      </NavLinks>
    </NavBar>
  );
};

export default Navigation;
