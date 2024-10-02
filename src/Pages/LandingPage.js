import React from "react";
import styled from "styled-components";
import { IoIosArrowDown } from "react-icons/io";
import { FaWhatsapp } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

const FaWhatsappIcon = styled(FaWhatsapp)`
  color: white;
  font-size: 30px;
`;
const FaGithubIcon = styled(FaGithub)`
  color: white;
  font-size: 30px;
`;
const FaLinkedinIcon = styled(FaLinkedin)`
  color: white;
  font-size: 30px;
`;

const DivIcons = styled.div`
  margin-top: 100px;
  display: flex;
  gap: 5px;

  a {
    transition: 0.3s;
    &:hover {
      transform: scale(1.1);
    }
  }
`;

const Wraper = styled.div`
  background-color: #212121;
  display: flex; // usa flexbox para criar um layout flexível
  justify-content: center; // centraliza o conteúdo horizontalmente
  align-items: center; // centraliza o conteúdo verticalmente
`;

const DivPrincipal = styled.div`
  margin-top: 100px;
  text-align: center;
  align-items: center;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const DivText = styled.div`
  width: 1200px;
  text-align: center;
  flex-direction: column;
`;

const TextFirst = styled.h1`
  font-family: Garamond, serif;
  font-size: 100px; // define o tamanho da fonte como 10% do viewport
  font-weight: 100;
  margin: 0;
`;

const TextSecond = styled.h2`
  margin-top: 0;
  font-family: Garamond, serif;
  font-size: 50px; // define o tamanho da fonte como 5% do viewport
  font-weight: 100;
`;
const TextSecondDigit = styled.h2`
  margin-top: -40px;
  font-family: Garamond, serif;
  font-size: 30px; // define o tamanho da fonte como 5% do viewport
  font-weight: 100;
  letter-spacing: 5px;
  text-transform: uppercase;
  display: flex;
  text-align: center;
  justify-content: center;
`;
const ButtonCV = styled.a`
  background-color: transparent;
  padding: 5px;
  border: 3px solid white;
  text-decoration: none;
  color: white;
  border-radius: 5px;
  font-weight: 300;
`;

const LineLateral = styled.div`
  width: 100px;
  height: 2px;
  background-color: silver;
`;

const Line = styled.div`
  margin-top: 100px;
  width: 90%;
  height: 2px;
  background-color: silver;
`;

const AboutDiv = styled.div`
  position: relative;
  width: 1000px;
  height: 200px;
`;

const AboutText = styled.p`
  text-align: center; /* Centraliza o texto */
  font-size: 25px;
  z-index: 11;
  margin-top: -100px;
`;

const AboutTitle = styled.h1`
  margin-top: -20px;
  text-align: center; /* Centraliza o texto */
  font-family: "Playfair Display", serif;
  font-optical-sizing: auto;
  font-size: 300px;
  color: rgba(100, 100, 100, 0.5);
  font-style: normal;
  font-weight: 200;
  position: relative;
  width: 100%;
  height: 0px;
`;

const LandingPage = () => {
  return (
    <Wraper>
      <DivPrincipal>
        <DivText>
          <TextFirst>Hello World,</TextFirst>
          <TextSecond>Meu nome é João Guilherme,</TextSecond>
          <TextSecondDigit>desenvolvedor frontend</TextSecondDigit>
          <ButtonCV href="">Baixar CV</ButtonCV>
        </DivText>
        <DivIcons>
          <a href="https://wa.me/5524988685043">
            <FaWhatsappIcon />
          </a>

          <a href="https://github.com/JoaoZ14" target="_blank">
            <FaGithubIcon />
          </a>

          <a href="http://www.linkedin.com/in/joao-possidonio" target="_blank">
            <FaLinkedinIcon />
          </a>
        </DivIcons>
        <Line />
        <AboutDiv id="Sobre">
          <AboutTitle>SOBRE</AboutTitle>
          <AboutText>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
            sit amet nisl rhoncus, commodo est ut, lobortis lectus. Cras
            porttitor tempor urna, sit amet convallis nisl eleifend eu. Integer
            consectetur lacus sed nibh maximus, in condimentum lorem cursus.
            Phasellus vel vestibulum tortor. Pellentesque non arcu volutpat,
            placerat metus sed, commodo purus.
          </AboutText>
        </AboutDiv>
        <Line />

        <Line />
      </DivPrincipal>
    </Wraper>
  );
};

export default LandingPage;
