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
`;

const DivPrincipal = styled.div`
  margin-top: 10%;
  text-align: center;
  align-items: center;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const DivText = styled.div`
  width: 1100px;
  text-align: center;
  flex-direction: column;
`;

const TextFirst = styled.h1`
  font-family: Garamond, serif;
  font-size: 100px;
  font-weight: 100;
  margin: 0;
`;
const TextSecond = styled.h2`
  margin-top: 0;
  font-family: Garamond, serif;
  font-size: 50px;
  font-weight: 100;
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

const LandingPage = () => {
  return (
    <Wraper>
      <DivPrincipal>
        <DivText>
          <TextFirst>Hello World,</TextFirst>
          <TextSecond>
            Meu nome é João Guilherme, e sou desenvolvedor front-end - React
          </TextSecond>
          <ButtonCV href="">Baixar CV</ButtonCV>
        </DivText>
        <DivIcons>
          <a href="">
            <FaWhatsappIcon />
          </a>

          <a href="">
            <FaGithubIcon />
          </a>

          <a href="">
            <FaLinkedinIcon />
          </a>
        </DivIcons>
        <Line />
        <Line />
      </DivPrincipal>
    </Wraper>
  );
};

export default LandingPage;
