import React, { useEffect, useState } from "react";
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
  IconCloseCircle,
  SiGitIcon,
  SiSpringbootIcon,
} from "../components/Icons";
import AOS from "aos";
import "aos/dist/aos.css";

const AboutSection = styled.section`
  height: 60vh; /* Ocupa a tela inteira */
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background-color: #2c2c2c;
  color: white;
  box-shadow: 0px 0px 40px -10px rgb(0, 0, 0, 0.3);

  @media (max-width: 600px) {
    max-width: 100vw; /* Ajuste para telas menores */
    height: 100vh;
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
      box-shadow: 0px 0px 40px -10px rgb(0, 0, 0, 0.6);
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
    padding: 10px 0px ;

    h3 {
      margin: 0;
      font-size: 18px;
    }

    p {
      margin-top: 10px;
      font-size: 14px;
      color: silver;
    }

    #buttonDeploy{
      border: none;
      background-color: rgb(255, 252, 223);
      color: #2c2c2c;
      border-radius: 24px;
      height: 40px ;
      padding: 0 20px;

      &:hover {
          background-color: white;
        }

    }
    #buttonGit{
      border: none;
      background-color: rgb(255, 252, 223);
      color: #2c2c2c;
      border-radius: 50%;
      padding: 5px ;

      &:hover {
          background-color: white;
        }

    }

    .icons {
      display: flex;
      gap: 5px;
      justify-content: center;
      margin-top: -20px;

      svg {
        font-size: 20px;
        color: silver;
        transition: transform 0.3s;

        &:hover {
          transform: scale(1.2);
          color: white;
        }
      }
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
  margin-top: 0;
  display: flex;
  gap: 20px;
  justify-content: center;
  flex-wrap: wrap;
  @media (max-width: 600px) {
    padding: 0 10px;
    max-width: 100vw;
    gap: 10px;
    height: 100px;
    }
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
  margin-top: 10px;
  height: 20px;
  text-align: center;
  color: silver;
  font-size: 16px;

  @media (max-width: 728px) {
    border-bottom: 30px;
    padding: 20px;
  }
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

  @media (max-width: 600px) {
    max-width: 100vw; /* Ajuste para telas menores */
    display: flex;
    flex-direction: column;

    text-align: center;
  }
`;

const TextFirst = styled.h1`
  font-family: Garamond, serif;
  font-size: 100px; // define o tamanho da fonte como 10% do viewport
  font-weight: 100;
  margin: 0;

  @media (max-width: 600px) {
    font-size: 60px; // define o tamanho da fonte como 10% do viewport
  }
`;

const TextSecond = styled.h2`
  margin-top: 0;
  font-family: Garamond, serif;
  font-size: 50px; // define o tamanho da fonte como 5% do viewport
  font-weight: 100;

  @media (max-width: 600px) {
    font-size: 30px; // define o tamanho da fonte como 10% do viewport
  }

  p {
    margin-top: 10px;
    font-size: 20px;
    letter-spacing: 6px;
    font-family: "Titillium Web", sans-serif;

    @media (max-width: 600px) {
      font-size: 15px; // define o tamanho da fonte como 10% do viewport
    }
  }
`;

const Popup = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #333;
  padding: 20px;
  border-radius: 16px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
  display: ${({ show }) => (show ? "block" : "none")};

  button {
    margin: 10px;
    padding: 10px;
    border: none;
    border-radius: 16px;
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

const SectionProfile = styled.section`
  margin: 50px 0;
  display: flex;
  align-items: center;
  text-align: center;
  flex-direction: column;
  height: 90vh;

  @media (max-width: 600px) {
    padding: 0 30px;
    height: 128vh;
    margin-bottom: 100px;
    }
  
`;

const ProjectsGrid = styled.div`
  display: flex;
  gap: 20px;
  justify-content: center;
  @media (max-width: 600px) {
    flex-wrap: wrap;
    }

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
  border-radius: 16px;
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

  useEffect(() => {
    AOS.init({
      duration: 1000, // Duração da animação em milissegundos
      once: true, // Executa a animação apenas uma vez ao rolar
    });
  }, []);

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
      name: "Busca Cep",
      image: "BuscaCep.png",
      github: "https://github.com/JoaoZ14/BuscaCep",
      deploy: "https://searcep.netlify.app/",
      technologies: ["react", "js", "css", "html"], // Tecnologias usadas
    },
    {
      name: "Calculadora",
      image: "calculadora.png",
      github: "https://github.com/JoaoZ14/Calculator",
      deploy: "",
      technologies: ["html", "css", "js"], // Tecnologias usadas
    },
    {
      name: "Weather App",
      image: "WeatherApp.png",
      github: "https://github.com/JoaoZ14/Weather-App",
      deploy: "https://weatherappjg.netlify.app",
      technologies: ["react", "html", "css", "js"],
    },
  ];

  const handleDownloadCV = (language) => {
    if (language === "pt") {
      window.open(
        "Currículo Simples Profissional - Formação, experiência, cursos e habilidades (1).pdf",
        "_blank"
      );
    } else {
      window.open("Currículo Simples Profissional - English (2).pdf", "_blank");
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

            <a
              href="http://www.linkedin.com/in/joao-possidonio"
              target="_blank"
            >
              <FaLinkedinIcon />
            </a>
          </DivIcons>
        </DivText>

        <Popup show={showPopup}>
          <h3>Selecione o idioma do CV</h3>
          <button onClick={() => handleDownloadCV("pt")}>Português</button>
          <button onClick={() => handleDownloadCV("en")}>Inglês</button>
          <IconCloseCircle onClick={() => setShowPopup(false)}>
            X
          </IconCloseCircle>
        </Popup>

        <Line id="about" />
        <SectionProfile>
          <AboutSection>
            <div id="one">
              <div id="image">
                <img data-aos="fade-up" src="me2.png" />
                <div data-aos="fade-up" id="background" />
              </div>
              <div data-aos="fade-left" id="text">
                <h2>Sobre Mim</h2>

                <p>
                  Olá! Meu nome é João Guilherme. <br />Sou um desenvolvedor frontend
                  apaixonado por criar interfaces intuitivas e designs
                  funcionais. Adoro transformar ideias em experiências digitais
                  com foco em detalhes e desempenho. Tenho experiência com
                  React, JavaScript, HTML, CSS, e sempre estou explorando novas
                  tecnologias para expandir minhas habilidades.
                  <br />

                  Além de programação, gosto de resolver problemas complexos,
                  colaborar com equipes criativas, e me manter atualizado com as
                  últimas tendências em desenvolvimento web.
                </p>
              </div>
            </div>
          </AboutSection>
          <h2>Tecnologias</h2>

          <DivIconsTec data-aos="fade-right">
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
        </SectionProfile>


        <DivMargin id="projects" />

        <Line />
        <h2>Projetos</h2>

        <Section>
          <ProjectsGrid data-aos="fade-down">
            {projects.map((project, index) => (
              <ProjectCard
              key={index}

              >
                <img src={project.image} alt={project.name} />
                <div>
                  <h3>{project.name}</h3>
                  <div className="icons">
                    
                    {project.technologies.map((tech) => (
                      <div key={tech}>{icons[tech]}</div>
                    ))}
                  </div>
                  <DivIconsTec>

                  {project.deploy ?
                      <button
                      id="buttonDeploy"
                      onClick={() => window.open(project.deploy, "_blank", "noopener,noreferrer")}
                    >DEPLOY</button>
                      : ""

                    }
                    {project.github ?
                      <FaGithubIcon
                      id="buttonGit"
                      onClick={() => window.open(project.github, "_blank", "noopener,noreferrer")}
                    ></FaGithubIcon>
                      : ""

                    }
                    </DivIconsTec>
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
            <p>Email: joaopossidonio.dev@gmail.com</p>
          </ContactList>
        </Section>

        <Line />
      </DivPrincipal>
    </Wraper>
  );
};

export default LandingPage;
