import React, { useState } from "react";
import styled from "styled-components";
import { IoIosArrowDown } from "react-icons/io";
import {
  FaCssIcon,
  FaGithubIcon,
  FaHtmlIcon,
  FaJavaIcon,
  FaJsIcon,
  FaLinkedinIcon,
  FaNodeJsIcon,
  FaPythonIcon,
  FaReactIcon,
  FaWhatsappIcon,
  SiGitIcon,
  SiSpringbootIcon,
} from "../components/Icons";

const AboutSection = styled.section`
   height: 100vh; /* Ocupa a tela inteira */
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background-color: #2c2c2c;
  color: white;

  @media (max-width: 600px) {
      max-width: 100vw; /* Ajuste para telas menores */
display: flex;
flex-direction: column;

      text-align: center;
    }
  #one {
    display: flex;

    @media (max-width: 600px) {
      max-width: 100vw; /* Ajuste para telas menores */
display: flex;
flex-direction: column;
align-items: center;

      text-align: center;
    }
  }
  #text {
    text-align: left;
    width: 40%;

    @media (max-width: 600px) {
      max-width: 100vw; /* Ajuste para telas menores */
      width: 90%;


      text-align: center;
    }
  }
  #image {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50%;

    #background {
      width: 300px;
      height: 300px;
      background-color: rgb(255, 252, 223);
      position: absolute;
      border-radius: 50%;
      z-index: 10;
      @media (max-width: 768px) {
        width: 200px; /* Reduz tamanho para celulares */
        height: 200px;
      }
    }
  }

  img {
    width: 300px;
    height: 300px;
    border-radius: 50%;
    z-index: 11;

     @media (max-width: 768px) {
        width: 200px; /* Reduz tamanho para celulares */
        height: 200px;
      }
  }
  h2 {
    font-size: 30px;
    margin-bottom: 20px;
    font-family: Garamond, serif;
  }

  p {
    font-size: 18px;
    line-height: 1.6;
    color: silver;
    font-family: "Titillium Web", sans-serif;

    @media (max-width: 768px) {
      font-size: 16px; /* Ajusta fonte para telas menores */
       }
  }
`;

const ProjectCard = styled.a`
  display: block;
  width: 300px;
  background-color: #2c2c2c;
  border-radius: 24px;
  text-decoration: none;
  color: white;
  overflow: hidden;
  transition: transform 0.3s, box-shadow 0.3s;

  &:hover {
    transform: scale(1.01);
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }

  img {
    width: 100%;
    height: 200px;
    object-fit: cover;
  }

  div {
    padding: 15px;

    h3 {
      margin: 0;
      font-size: 18px;
    }

    p {
      margin-top: 10px;
      font-size: 14px;
      color: silver;
    }
  }
`;

const DivIcons = styled.div`
  margin-top: 100px;
  margin-bottom: 0px;

  display: flex;
  gap: 10px;

  a {
    transition: 0.3s;
    &:hover {
      transform: scale(1.1);
    }
  }
`;

const DivIconsTec = styled.div`
  margin-top: 30px;
  display: flex;
  gap: 20px; 
  justify-content: center;
  flex-wrap: wrap;
`;

const IconWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  svg {
    font-size: 48px;
    transition: transform 0.3s;
    &:hover {
      transform: scale(1.1);
    }
  }
`;

const DescriptionBox = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;

  height: 20px;
  text-align: center;
  color: silver;
  font-size: 16px;
`;

const Description = styled.p`
  margin-top: 10px;
  font-size: 14px;
  color: silver;
  text-align: center;
  position: absolute;
  bottom: -40px; /* Ajusta a posição abaixo do ícone */
  left: 50%;
  transform: translateX(-50%) translateY(10px); /* Inicia com deslocamento */
  opacity: 0;
  transition: opacity 0.3s, transform 0.3s;
  pointer-events: none; /* Impede interação com o texto */
`;
const Wraper = styled.div`
  background-color: #212121;
  display: flex; // usa flexbox para criar um layout flexível
  justify-content: center; // centraliza o conteúdo horizontalmente
  align-items: center; // centraliza o conteúdo verticalmente
`;

const DivPrincipal = styled.div`
  text-align: center;
  align-items: center;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const DivMargin = styled.div`
  height: 1px;
`;

const DivText = styled.div`
  width: 1200px;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
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

  p {
    margin-top: 10px;
    font-size: 20px;
    letter-spacing: 6px;
    font-family: "Titillium Web", sans-serif;
  }
`;

const Popup = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #333;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
  display: ${({ show }) => (show ? "block" : "none")};

  button {
    margin: 10px;
    padding: 10px;
    border: none;
    border-radius: 4px;
    background-color: silver;
    cursor: pointer;

    &:hover {
      background-color: gray;
    }
  }
`;

const Section = styled.section`
  margin: 50px 0;
  text-align: center;
  

  h2 {
    font-size: 30px;
    margin-bottom: 20px;
    font-family: Garamond, serif;
  }

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const ProjectsGrid = styled.div`
  display: flex;
  gap: 20px;
  justify-content: center;

  div {
    text-align: center;

    img {
      width: 300px;
      height: 200px;
      object-fit: cover;
      border-radius: 8px;
    }

    a {
      display: block;
      margin-top: 10px;
      text-decoration: none;
      color: white;

      &:hover {
        text-decoration: underline;
      }
    }
  }
`;

const ContactList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;

  p {
    font-size: 18px;
    margin: 0;
  }

  svg {
    margin-right: 8px;
    vertical-align: middle;
  }

  a {
    text-decoration: none;
    color: rgb(121, 121, 121);
  }
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

  cursor: pointer;
`;

const LineLateral = styled.div`
  width: 100px;
  height: 2px;
  background-color: silver;
`;

const Line = styled.div`
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
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedTechnology, setSelectedTechnology] = useState("");


  const descriptions = {
    react:
      "React é uma biblioteca JavaScript para criar interfaces de usuário.",
    js: "JavaScript é uma linguagem de programação versátil e essencial para o desenvolvimento web.",
    html: "HTML é a linguagem de marcação padrão para criar páginas da web.",
    css: "CSS é usado para estilizar páginas web e melhorar sua aparência.",
    node: "Node.js é um ambiente para executar JavaScript no lado do servidor.",
    python:
      "Python é uma linguagem de programação popular para diversas aplicações.",
    java: "Java é uma linguagem de programação amplamente usada para criar aplicativos robustos.",
    springboot:
      "Spring Boot é um framework Java para construir aplicativos web.",
    git: "Git é um sistema de controle de versão usado para rastrear alterações no código.",
  };

  const icons = {
    react: <FaReactIcon />,
    js: <FaJsIcon />,
    html: <FaHtmlIcon />,
    css: <FaCssIcon />,
    node: <FaNodeJsIcon />,
    python: <FaPythonIcon />,
    java: <FaJavaIcon />,
    springboot: <SiSpringbootIcon />,
    git: <SiGitIcon />,
  };

  const projects = [
    {
      name: "Calculadora",
      image: "calculadora.png",
      github: "https://github.com/JoaoZ14/Calculator",
    },
  ];

  const handleDownloadCV = (language) => {
    if (language === "pt") {
      window.open("/files/cv_portugues.pdf", "_blank");
    } else {
      window.open("/files/cv_ingles.pdf", "_blank");
    }
    setShowPopup(false);
  };

  return (
    <Wraper>
      <DivPrincipal>
      <DivMargin id="home" />

        <DivText>
          <TextFirst>Hello World,</TextFirst>
          <TextSecond>
            Meu nome é João Guilherme,
            <br /> <p>DESENVOLVEDOR FRONTEND</p>
          </TextSecond>
          <ButtonCV onClick={() => setShowPopup(true)}>Baixar CV</ButtonCV>

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
        </DivText>

        <Popup show={showPopup}>
          <h3>Selecione o idioma do CV</h3>
          <button onClick={() => handleDownloadCV("pt")}>Português</button>
          <button onClick={() => handleDownloadCV("en")}>Inglês</button>
          <button onClick={() => setShowPopup(false)}>Fechar</button>
        </Popup>

       
        <Line id="about" />
        <AboutSection>
          <div id="one">
            <div id="image">
              <img src="me2.png" />
              <div id="background" />
            </div>
            <div id="text">
              <h2>Sobre Mim</h2>

              <p>
                Olá! Meu nome é João Guilherme, sou um desenvolvedor frontend
                apaixonado por criar interfaces intuitivas e designs funcionais.
                Adoro transformar ideias em experiências digitais, com foco em
                detalhes e desempenho. Tenho experiência com React, JavaScript,
                HTML, CSS, e sempre estou explorando novas tecnologias para
                expandir minhas habilidades.
              </p>
              <p>
                Além de programação, gosto de resolver problemas complexos,
                colaborar com equipes criativas, e me manter atualizado com as
                últimas tendências em desenvolvimento web.
              </p>
            </div>
          </div>
        </AboutSection>
        <Line />
        <h2>Tecnologias</h2>

         <DivIconsTec>
        {Object.keys(descriptions).map((key) => (
          <IconWrapper
            key={key}
            onMouseEnter={() => setSelectedTechnology(key)}
            onMouseLeave={() => setSelectedTechnology("")}
          >
            {icons[key]}
          </IconWrapper>
        ))}
      </DivIconsTec>

      <DescriptionBox>
        {selectedTechnology && descriptions[selectedTechnology]}
      </DescriptionBox>
        {selectedIcon && (
          <Description>{descriptions[selectedIcon]}</Description>
        )}
        <Line id="projects" />
        <h2>Projetos</h2>

        <Section>
          <ProjectsGrid>
            {projects.map((project, index) => (
              <ProjectCard
                key={index}
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={project.image} alt={project.name} />
                <div>
                  <h3>{project.name}</h3>
                  <p>Clique para acessar o repositório no GitHub</p>
                </div>
              </ProjectCard>
            ))}
          </ProjectsGrid>
        </Section>
        <Line />

        <Section id="contact">
          <h2>Contato</h2>
          <ContactList>
            <p>
              <FaWhatsappIcon /> WhatsApp: (24) 98868-5043{" "}
            </p>
            <p>
              <FaGithubIcon /> GitHub:{" "}
              <a
                href="https://github.com/JoaoZ14"
                target="_blank"
                rel="noopener noreferrer"
              >
                github.com/JoaoZ14
              </a>
            </p>
            <p>
              <FaLinkedinIcon /> LinkedIn:{" "}
              <a
                href="https://www.linkedin.com/in/joao-possidonio/"
                target="_blank"
                rel="noopener noreferrer"
              >
                www.linkedin.com/in/joao-possidonio/{" "}
              </a>
            </p>
            <p>Email: seuemail@email.com</p>
          </ContactList>
        </Section>

        <Line />
      </DivPrincipal>
    </Wraper>
  );
};

export default LandingPage;
