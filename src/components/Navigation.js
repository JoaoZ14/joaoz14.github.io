import React from "react";
import styled from "styled-components";

const NavBar = styled.div`
  text-align: center;
  margin-bottom: auto;
  align-items: center;
  justify-content: space-around;
  position: fixed;
  height: 80px;
  width: 100%;
  display: flex;
  flex-direction: row;
  background-color:rgba(33, 33, 33, 0.65);
  z-index: 20;

  @media (max-width: 768px) {
max-width:  100vw;
}
`;
const Logo = styled.h1`
  font-family: Georgia, serif;
  font-size: 40px;


  img{
    width: 60px;
  }
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
      <Logo>
        <a href="#home">
        <img src="J (1)-Photoroom.png"/>
        </a>
      </Logo>
      <NavLinks>
        <a href="#about">Sobre</a>
        <a href="#projects">Projetos</a>
        <a href="#contact">Contato</a>
      </NavLinks>
    </NavBar>
  );
};

export default Navigation;
