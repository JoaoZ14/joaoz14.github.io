import React, { useEffect, useState, useRef } from "react";
import styled, { css } from "styled-components";
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
  SiDockerIcon,
  SiOpenidIcon,
  SiJsonwebtokensIcon,
  SiSpringbootIcon,
} from "../components/Icons";
import AOS from "aos";
import "aos/dist/aos.css";
import emailjs from "@emailjs/browser";

const AboutSection = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 80px 40px 120px;
  background: linear-gradient(180deg, #2c2c2c 0%, #212121 100%);
  color: white;
  width: 100%;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(255, 252, 223, 0.03) 0%, transparent 70%);
    animation: rotate 20s linear infinite;
    pointer-events: none;
  }

  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  @media (max-width: 768px) {
    padding: 60px 15px 100px;
  }
`;

const AboutContent = styled.div`
  max-width: 1400px;
  width: 100%;
  text-align: center;
  position: relative;
  z-index: 1;
  padding: 0 20px;
  overflow: visible;
`;

const AboutSectionTitle = styled.h2`
  font-size: 48px;
  margin-bottom: 30px;
  font-family: Garamond, serif;
  font-weight: 100;
  color: white;
  position: relative;
  display: inline-block;

  &::after {
    content: '';
    position: absolute;
    bottom: -15px;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 2px;
    background: rgb(255, 252, 223);
    transition: width 0.3s ease;
  }

  &:hover::after {
    width: 100px;
  }

  @media (max-width: 768px) {
    font-size: 32px;
    margin-bottom: 20px;
  }
`;

const AboutSectionText = styled.p`
  font-size: 18px;
  line-height: 2;
  color: rgba(255, 255, 255, 0.8);
  font-family: "Titillium Web", sans-serif;
  margin-bottom: 30px;
  max-width: 1100px;
  margin-left: auto;
  margin-right: auto;
  transition: color 0.3s ease;

  &:hover {
    color: rgba(255, 255, 255, 0.95);
  }

  @media (max-width: 768px) {
    font-size: 16px;
    line-height: 1.8;
    margin-bottom: 20px;
  }
`;

const SkillsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 40px;
  margin-top: 50px;
  margin-bottom: 20px;
  max-width: 100%;
  width: 100%;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 30px;
    margin-top: 40px;
  }
`;

const SkillCard = styled.div`
  padding: 20px 0;
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 1px;
    background: rgb(255, 252, 223);
    transition: width 0.3s ease;
  }

  &:hover {
    &::after {
      width: 60px;
    }

    h3 {
      color: rgb(255, 252, 223);
    }

    p {
      color: rgba(255, 255, 255, 0.9);
    }
  }

  h3 {
    font-size: 22px;
    margin-bottom: 10px;
    color: rgba(255, 255, 255, 0.9);
    font-family: Garamond, serif;
    font-weight: 100;
    transition: color 0.3s ease;
  }

  p {
    font-size: 15px;
    line-height: 1.8;
    color: rgba(255, 255, 255, 0.6);
    font-family: "Titillium Web", sans-serif;
    transition: color 0.3s ease;
  }
`;

const ProjectsSection = styled.section`
  max-width: 1200px;
  margin: 80px auto;
  padding: 0 40px;
  width: 100%;

  @media (max-width: 768px) {
    padding: 0 20px;
    margin: 60px auto;
  }
`;

const ProjectsTitle = styled.h2`
  text-align: center;
  font-size: 48px;
  margin-bottom: 80px;
  font-family: Garamond, serif;
  font-weight: 100;
  color: white;
  position: relative;
  display: inline-block;
  width: 100%;

  &::after {
    content: '';
    position: absolute;
    bottom: -20px;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 2px;
    background: rgb(255, 252, 223);
  }

  @media (max-width: 768px) {
    font-size: 36px;
    margin-bottom: 60px;
  }
`;

const ProjectItem = styled.div`
  display: grid;
  grid-template-columns: ${props => props.reverse ? '1fr 1.2fr' : '1.2fr 1fr'};
  gap: 60px;
  align-items: center;
  margin-bottom: 120px;
  position: relative;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    gap: 30px;
    margin-bottom: 80px;
  }
`;

const ProjectImageWrapper = styled.div`
  position: relative;
  overflow: hidden;
  order: ${props => props.reverse ? '1' : '0'};
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.3);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover::after {
    opacity: 1;
  }

  img {
    width: 100%;
    height: 400px;
    object-fit: cover;
    display: block;
    transition: transform 0.5s ease;
  }

  &:hover img {
    transform: scale(1.05);
  }

  @media (max-width: 968px) {
    order: 0;
    
    img {
      height: 300px;
    }
  }

  ${({ $logoThumbnail }) =>
    $logoThumbnail &&
    css`
      display: flex;
      align-items: center;
      justify-content: center;

      img {
        width: auto;
        height: auto;
        max-width: 52%;
        max-height: 62%;
        object-fit: contain;
        transition: none;
      }

      &:hover img {
        transform: none;
      }
    `}
`;

const ProjectInfo = styled.div`
  order: ${props => props.reverse ? '0' : '1'};
  
  @media (max-width: 968px) {
    order: 1;
  }
`;

const ProjectName = styled.h3`
  font-size: 32px;
  font-family: Garamond, serif;
  font-weight: 100;
  color: white;
  margin-bottom: 15px;
  letter-spacing: 1px;

  @media (max-width: 768px) {
    font-size: 28px;
  }
`;

const ProjectDescription = styled.p`
  font-size: 16px;
  line-height: 1.8;
  color: rgba(255, 255, 255, 0.7);
  font-family: "Titillium Web", sans-serif;
  margin-bottom: 25px;
  font-weight: 300;
`;

const ProjectTechnologies = styled.div`
  display: flex;
  gap: 15px;
  margin-bottom: 30px;
  flex-wrap: wrap;

  svg {
    font-size: 28px;
    color: rgba(255, 255, 255, 0.8);
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-3px);
      color: rgb(255, 252, 223);
    }
  }
`;

const ProjectLinks = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
`;

const ProjectLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: rgba(255, 255, 255, 0.9);
  text-decoration: none;
  font-family: "Titillium Web", sans-serif;
  font-size: 14px;
  font-weight: 300;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: all 0.3s ease;

  svg {
    font-size: 18px;
  }

  &:hover {
    border-color: rgb(255, 252, 223);
    color: rgb(255, 252, 223);
    transform: translateY(-2px);
  }
`;

const DivIcons = styled.div`
  margin-top: 28px;
  margin-bottom: 2px;

  display: flex;
  gap: 14px;

  a {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.25s ease, opacity 0.25s ease;
    opacity: 0.9;

    &:hover {
      transform: translateY(-2px);
      opacity: 1;
    }
  }
`;

const TechTitle = styled.h3`
  text-align: center;
  font-size: 28px;
  margin-top: 80px;
  margin-bottom: 60px;
  font-family: Garamond, serif;
  font-weight: 100;
  color: rgba(255, 255, 255, 0.95);
  letter-spacing: 3px;
  text-transform: uppercase;
  position: relative;
  z-index: 1;

  &::after {
    content: '';
    position: absolute;
    bottom: -20px;
    left: 50%;
    transform: translateX(-50%);
    width: 40px;
    height: 1px;
    background: rgb(255, 252, 223);
    transition: width 0.3s ease;
  }

  &:hover::after {
    width: 80px;
  }

  @media (max-width: 768px) {
    font-size: 24px;
    margin-top: 60px;
    margin-bottom: 50px;
  }
`;

const DivIconsTec = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 60px;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  position: relative;
  z-index: 1;
  padding: 20px 0;

  @media (max-width: 768px) {
    gap: 40px;
    padding: 20px;
  }

  @media (max-width: 600px) {
    gap: 30px;
  }
`;

const IconWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  cursor: pointer;
  position: relative;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-8px);

    svg {
      transform: scale(1.15);
      filter: brightness(1.2);
    }

    span {
      color: rgb(255, 252, 223);
    }

    &::after {
      width: 40px;
      opacity: 1;
    }
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 1px;
    background: rgb(255, 252, 223);
    transition: all 0.3s ease;
    opacity: 0;
  }

  svg {
    font-size: 52px;
    transition: all 0.3s ease;
    color: rgba(255, 255, 255, 0.85);

    @media (max-width: 768px) {
      font-size: 44px;
    }
  }
`;

const TechName = styled.span`
  font-size: 13px;
  color: rgba(255, 255, 255, 0.6);
  font-family: "Titillium Web", sans-serif;
  text-align: center;
  font-weight: 300;
  letter-spacing: 2px;
  text-transform: uppercase;
  transition: all 0.3s ease;
`;

const DescriptionBox = styled.div`
  margin-top: 60px;
  margin-bottom: 40px;
  min-height: 60px;
  text-align: center;
  color: rgba(255, 255, 255, 0.7);
  font-size: 15px;
  font-family: "Titillium Web", sans-serif;
  font-weight: 300;
  line-height: 1.8;
  letter-spacing: 0.5px;
  padding: 0 20px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  position: relative;
  z-index: 1;
  transition: all 0.4s ease;

  @media (max-width: 768px) {
    font-size: 14px;
    padding: 0 15px;
    min-height: 50px;
    margin-top: 50px;
    margin-bottom: 30px;
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
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  overflow-x: hidden;
`;

const DivPrincipal = styled.div`
  text-align: center;
  align-items: center;
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  max-width: 100%;
`;

const DivMargin = styled.div`
  height: 1px;
`;

const DivText = styled.div`
  width: min(100%, 960px);
  max-width: 100%;
  min-height: 86vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  flex-direction: column;
  gap: 16px;
  padding: 100px 24px 64px;

  @media (max-width: 900px) {
    min-height: auto;
    padding: 120px 24px 72px;
    gap: 14px;
  }

  @media (max-width: 600px) {
    width: 100%;
    max-width: 100vw;
    min-height: auto;
    padding: 100px 16px 56px;
    gap: 12px;
  }
`;

const TextFirst = styled.h1`
  font-family: Garamond, serif;
  font-size: clamp(52px, 8vw, 84px);
  font-weight: 100;
  margin: 0;
  line-height: 0.95;
  letter-spacing: 0.5px;

  @media (max-width: 600px) {
    font-size: 46px;
  }
`;

const TextSecond = styled.h2`
  margin: 0;
  font-family: Garamond, serif;
  font-size: clamp(28px, 4.4vw, 44px);
  font-weight: 100;
  line-height: 1.2;
  max-width: 820px;

  @media (max-width: 600px) {
    font-size: 28px;
  }

  p {
    margin-top: 14px;
    font-size: clamp(14px, 1.8vw, 18px);
    letter-spacing: 3px;
    font-family: "Titillium Web", sans-serif;
    font-weight: 300;
    color: rgba(255, 255, 255, 0.85);

    @media (max-width: 600px) {
      font-size: 13px;
      letter-spacing: 2px;
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
  width: 100%;
  max-width: 100%;

  @media (max-width: 600px) {
    padding: 0 20px;
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

const ContactSection = styled.section`
  max-width: 1400px;
  margin: 100px auto;
  padding: 0 40px;

  @media (max-width: 768px) {
    padding: 0 20px;
    margin: 80px auto;
  }

  @media (max-width: 600px) {
    padding: 0 15px;
    margin: 60px auto;
  }
`;

const ContactTitle = styled.h2`
  text-align: center;
  font-size: 48px;
  margin-bottom: 80px;
  font-family: Garamond, serif;
  font-weight: 100;
  color: white;
  position: relative;
  display: inline-block;
  width: 100%;

  &::after {
    content: '';
    position: absolute;
    bottom: -20px;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 2px;
    background: rgb(255, 252, 223);
  }

  @media (max-width: 768px) {
    font-size: 36px;
    margin-bottom: 60px;
  }

  @media (max-width: 600px) {
    font-size: 32px;
    margin-bottom: 50px;
  }
`;

const ContactWrapper = styled.div`
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 150px;
  align-items: start;

  @media (max-width: 1100px) {
    grid-template-columns: 260px 1fr;
    gap: 100px;
  }

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    gap: 60px;
  }

  @media (max-width: 600px) {
    gap: 40px;
  }
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    right: -75px;
    width: 1px;
    height: 100%;
    background: rgba(255, 255, 255, 0.15);

    @media (max-width: 1100px) {
      right: -50px;
    }

    @media (max-width: 968px) {
      display: none;
    }
  }

  @media (max-width: 600px) {
    gap: 30px;
  }
`;

const ContactItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;

  h3 {
    font-size: 13px;
    font-family: "Titillium Web", sans-serif;
    font-weight: 400;
    color: rgba(255, 255, 255, 0.5);
    letter-spacing: 1px;
    text-transform: uppercase;
    margin: 0;

    @media (max-width: 600px) {
      font-size: 12px;
    }
  }

  a {
    font-size: 16px;
    font-family: "Titillium Web", sans-serif;
    font-weight: 300;
    color: rgba(255, 255, 255, 0.9);
    text-decoration: none;
    transition: all 0.3s ease;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    word-break: break-word;

    svg {
      font-size: 18px;
      color: rgb(255, 252, 223);
      flex-shrink: 0;
    }

    &:hover {
      color: rgb(255, 252, 223);
      transform: translateX(5px);
    }

    @media (max-width: 600px) {
      font-size: 14px;

      svg {
        font-size: 16px;
      }
    }
  }

  p {
    font-size: 16px;
    font-family: "Titillium Web", sans-serif;
    font-weight: 300;
    color: rgba(255, 255, 255, 0.9);
    margin: 0;
    display: flex;
    align-items: center;
    gap: 8px;

    svg {
      font-size: 18px;
      color: rgb(255, 252, 223);
      flex-shrink: 0;
    }

    @media (max-width: 600px) {
      font-size: 14px;

      svg {
        font-size: 16px;
      }
    }
  }
`;

const FormWrapper = styled.div`
  width: 100%;
  max-width: 100%;
`;

const ContactForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 25px;
  width: 100%;

  @media (max-width: 600px) {
    gap: 20px;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;

  @media (max-width: 600px) {
    gap: 8px;
  }
`;

const FormLabel = styled.label`
  font-size: 13px;
  font-family: "Titillium Web", sans-serif;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.6);
  letter-spacing: 1px;
  text-transform: uppercase;

  @media (max-width: 600px) {
    font-size: 12px;
  }
`;

const FormInput = styled.input`
  background: transparent;
  border: none;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  padding: 12px 0;
  font-size: 16px;
  font-family: "Titillium Web", sans-serif;
  color: rgba(255, 255, 255, 0.9);
  transition: all 0.3s ease;
  width: 100%;

  &:focus {
    outline: none;
    border-bottom-color: rgb(255, 252, 223);
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.3);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  @media (max-width: 600px) {
    font-size: 14px;
    padding: 10px 0;
  }
`;

const FormSelect = styled.select`
  background: transparent;
  border: none;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  padding: 12px 0;
  font-size: 16px;
  font-family: "Titillium Web", sans-serif;
  color: rgba(255, 255, 255, 0.9);
  transition: all 0.3s ease;
  cursor: pointer;
  width: 100%;

  &:focus {
    outline: none;
    border-bottom-color: rgb(255, 252, 223);
  }

  option {
    background: #2c2c2c;
    color: white;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  @media (max-width: 600px) {
    font-size: 14px;
    padding: 10px 0;
  }
`;

const FormTextarea = styled.textarea`
  background: transparent;
  border: none;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  padding: 12px 0;
  font-size: 16px;
  font-family: "Titillium Web", sans-serif;
  color: rgba(255, 255, 255, 0.9);
  min-height: 120px;
  resize: vertical;
  transition: all 0.3s ease;
  width: 100%;

  &:focus {
    outline: none;
    border-bottom-color: rgb(255, 252, 223);
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.3);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  @media (max-width: 600px) {
    font-size: 14px;
    padding: 10px 0;
    min-height: 100px;
  }
`;

const FormButton = styled.button`
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.3);
  padding: 15px 40px;
  font-size: 14px;
  font-family: "Titillium Web", sans-serif;
  font-weight: 300;
  color: rgba(255, 255, 255, 0.9);
  letter-spacing: 2px;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.3s ease;
  align-self: flex-start;

  &:hover:not(:disabled) {
    border-color: rgb(255, 252, 223);
    color: rgb(255, 252, 223);
    transform: translateY(-2px);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  @media (max-width: 600px) {
    width: 100%;
    padding: 12px 30px;
    font-size: 13px;
    letter-spacing: 1.5px;
  }
`;

const StatusMessage = styled.div`
  padding: 15px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-family: "Titillium Web", sans-serif;
  font-weight: 300;
  letter-spacing: 0.5px;
  margin-top: 20px;
  animation: fadeIn 0.3s ease;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  &.success {
    background: rgba(76, 175, 80, 0.2);
    border: 1px solid rgba(76, 175, 80, 0.5);
    color: #4caf50;
  }

  &.error {
    background: rgba(244, 67, 54, 0.2);
    border: 1px solid rgba(244, 67, 54, 0.5);
    color: #f44336;
  }

  @media (max-width: 600px) {
    font-size: 13px;
    padding: 12px 16px;
    margin-top: 15px;
  }
`;

const ProjectPartner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-bottom: 20px;
  flex-wrap: wrap;

  span {
    font-size: 13px;
    color: rgba(255, 255, 255, 0.5);
    font-family: "Titillium Web", sans-serif;
    font-weight: 300;
    letter-spacing: 1px;
    text-transform: uppercase;
  }
`;

const PartnerLogoLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;
  opacity: 0.7;
  text-decoration: none;

  &:hover {
    opacity: 1;
    transform: translateY(-2px);
  }

  img {
    height: 24px;
    width: auto;
    filter: brightness(0.9);
    transition: filter 0.3s ease;
  }

  span {
    font-size: 14px;
    color: rgba(255, 255, 255, 0.7);
    font-family: "Titillium Web", sans-serif;
    font-weight: 400;
    letter-spacing: 0.5px;
    transition: color 0.3s ease;
  }

  &:hover img {
    filter: brightness(1.2);
  }

  &:hover span {
    color: rgba(255, 255, 255, 0.9);
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
const ButtonCVContainer = styled.div`
  position: relative;
  display: inline-block;
  margin-top: 14px;
`;

const ButtonCV = styled.button`
  background-color: white;
  border: 1px solid transparent;
  border-radius: 10px;
  text-decoration: none;
  color: #212121;
  font-weight: 400;
  padding: 10px 16px;
  cursor: pointer;
  font-size: 14px;
  font-family: "Titillium Web", sans-serif;
  letter-spacing: 0.4px;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: background-color 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease;
  
  &:hover {
    background-color: rgb(255, 252, 223);
    transform: translateY(-1px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.25);
  }
`;

const ArrowIcon = styled(IoIosArrowDown)`
  font-size: 16px;
  color: #212121;
  transition: transform 0.3s;
  transform: ${({ isOpen }) => (isOpen ? "rotate(180deg)" : "rotate(0deg)")};
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: calc(100% + 10px);
  left: 50%;
  background-color: #2c2c2c;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
  min-width: 170px;
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  visibility: ${({ isOpen }) => (isOpen ? "visible" : "hidden")};
  transform: ${({ isOpen }) => (isOpen ? "translate(-50%, 0)" : "translate(-50%, -10px)")};
  transition: opacity 0.25s ease, transform 0.25s ease, visibility 0.25s ease;
  z-index: 1000;
  overflow: hidden;
`;

const DropdownItem = styled.button`
  width: 100%;
  padding: 11px 16px;
  border: none;
  background-color: transparent;
  color: white;
  text-align: left;
  cursor: pointer;
  font-size: 14px;
  font-family: "Titillium Web", sans-serif;
  transition: background-color 0.25s ease;
  
  &:hover {
    background-color: #3c3c3c;
  }
  
  &:first-child {
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }
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
  max-width: 100%;
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
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedTechnology, setSelectedTechnology] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("");
  const dropdownRef = useRef(null);
  const formRef = useRef(null);

  useEffect(() => {
    AOS.init({
      duration: 1000, // Duração da animação em milissegundos
      once: true, // Executa a animação apenas uma vez ao rolar
    });
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    if (showDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDropdown]);

  const descriptions = {
    react: "Desenvolvimento de SPAs e interfaces reativas com componentes reutilizáveis, hooks e gerenciamento de estado eficiente",
    js: "Domínio completo de ES6+, programação assíncrona, manipulação de DOM e integração com APIs REST",
    html: "Estruturação semântica, acessibilidade e otimização SEO para experiências web de qualidade",
    css: "Criação de layouts responsivos com Flexbox, Grid, animações CSS3 e arquiteturas escaláveis",
    node: "Desenvolvimento de APIs RESTful, autenticação, middlewares e integração com bancos de dados",
    python: "Automação de processos, scripts, análise de dados e desenvolvimento de aplicações backend",
    java: "Programação orientada a objetos, estruturas de dados e desenvolvimento de sistemas robustos",
    springboot: "Arquitetura de microserviços, APIs REST, Spring Security e integração com banco de dados",
    git: "Controle de versão avançado, Git Flow, resolução de conflitos e colaboração em equipe",
  };

  const techNames = {
    react: "React",
    js: "JavaScript",
    html: "HTML5",
    css: "CSS3",
    node: "Node.js",
    python: "Python",
    java: "Java",
    springboot: "Spring Boot",
    git: "Git",
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
    docker: <SiDockerIcon />,
    openid: <SiOpenidIcon />,
    jwt: <SiJsonwebtokensIcon />,
  };

  const projects = [
    {
      name: "SeatHub",
      image: "Logo_seathub.png",
      description: "Plataforma completa de coworking para reserva de espaços de trabalho. Sistema de gestão com controle de disponibilidade, reservas por hora/dia/mês, dashboard administrativo e integração de pagamentos. Aplicação web e mobile com mapas interativos.",
      github: "",
      deploy: "https://seathub.net",
      technologies: ["react", "js", "java", "springboot"],
      partner: {
        name: "Elevate",
        logo: "https://elevatebr.org/images/elevate-logo.png",
        url: "https://elevatebr.org/"
      }
    },
    {
      name: "TapInOut",
      image: "Logo_tapinout.png",
      description: "Sistema de controle de ponto digital inteligente com biometria facial e GPS em tempo real. Dashboard com IA para alertas de horas extras, gestão de banco de horas e detecção de riscos trabalhistas. Segurança avançada com criptografia AES-256 e OAuth2.",
      github: "",
      deploy: "https://tapinout.com",
      technologies: ["react", "js", "java", "springboot"],
      partner: {
        name: "Elevate",
        logo: "https://elevatebr.org/images/elevate-logo.png",
        url: "https://elevatebr.org/"
      }
    },
    {
      name: "Busca CEP",
      image: "BuscaCep.png",
      description: "Aplicação web para consulta de CEPs integrada à API ViaCEP. Interface intuitiva que permite buscar endereços completos através do código postal, com validação e tratamento de erros.",
      github: "https://github.com/JoaoZ14/BuscaCep",
      deploy: "https://searcep.netlify.app/",
      technologies: ["react", "js", "css", "html"],
    },
    {
      name: "Weather App",
      image: "WeatherApp.png",
      description: "Aplicação de previsão do tempo em tempo real integrada com API meteorológica. Exibe temperatura, condições climáticas e previsões com design clean e responsivo.",
      github: "https://github.com/JoaoZ14/Weather-App",
      deploy: "https://weatherappjg.netlify.app",
      technologies: ["react", "html", "css", "js"],
    },
    {
      name: "Calculadora",
      image: "calculadora.png",
      description: "Calculadora web moderna e funcional com design minimalista. Realiza operações matemáticas básicas com interface responsiva e experiência de usuário fluida.",
      github: "https://github.com/JoaoZ14/Calculator",
      deploy: "",
      technologies: ["html", "css", "js"],
    },
    {
      name: "Elevate Auth API",
      image: "https://elevatebr.org/images/elevate-logo.png",
      description:
        "Plataforma de autenticação e autorização (Java + Spring Boot) com OAuth2/OpenID Connect e emissão/validação de tokens JWT. Solução multi-tenant por domínio, login customizado por cliente, controle de escopos/permissões e endpoints administrativos, com deploy containerizado via Docker.",
      logoThumbnail: true,
      github: "",
      deploy: "",
      partner: {
        name: "Elevate",
        logo: "https://elevatebr.org/images/elevate-logo.png",
        url: "https://elevatebr.org/",
      },
      technologies: ["java", "springboot", "openid", "jwt", "docker", "git"],
    },
  ];

  const handleDownloadCV = (language) => {
    const cvPath =
      language === "pt"
        ? "/Curriculo%20Jo%C3%A3o%20Guilherme-PORTUGUES.pdf"
        : "/Curriculo%20Jo%C3%A3o%20Guilherme-ENGLISH.pdf";

    window.open(`${process.env.PUBLIC_URL}${cvPath}`, "_blank");
    setShowDropdown(false);
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("");

    try {
      // Configurações do EmailJS - use variáveis de ambiente ou substitua diretamente
      const serviceId = process.env.REACT_APP_EMAILJS_SERVICE_ID || "YOUR_SERVICE_ID";
      const templateId = process.env.REACT_APP_EMAILJS_TEMPLATE_ID || "YOUR_TEMPLATE_ID";
      const publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY || "YOUR_PUBLIC_KEY";

      // Verifica se as credenciais foram configuradas
      if (serviceId === "YOUR_SERVICE_ID" || templateId === "YOUR_TEMPLATE_ID" || publicKey === "YOUR_PUBLIC_KEY") {
        throw new Error("Credenciais do EmailJS não configuradas. Por favor, configure as variáveis de ambiente ou atualize o código.");
      }

      const formData = new FormData(e.target);
      const subjectMap = {
        freelance: "Projeto Freelance",
        job: "Oportunidade de Emprego",
        collaboration: "Colaboração",
        question: "Dúvida",
        other: "Outro"
      };

      const templateParams = {
        from_name: formData.get('name'),
        from_email: formData.get('email'),
        subject: subjectMap[formData.get('subject')] || formData.get('subject'),
        company: formData.get('company') || "Não informado",
        message: formData.get('message'),
        to_email: "contato@joaopossidonio.com",
        reply_to: formData.get('email')
      };

      await emailjs.send(serviceId, templateId, templateParams, publicKey);
      
      setSubmitStatus("success");
      e.target.reset();
      setSelectedSubject("");
      
      setTimeout(() => {
        setSubmitStatus("");
      }, 5000);
    } catch (error) {
      console.error("Erro ao enviar email:", error);
      
      // Log detalhado do erro para debug
      if (error.text) {
        if (error.text.includes("insufficient authentication scopes")) {
          console.error("Erro de autenticação Gmail API. Use SMTP ao invés de OAuth ou verifique os escopos OAuth.");
        } else if (error.text.includes("Invalid template ID")) {
          console.error("Template ID inválido. Verifique a configuração do template no EmailJS.");
        } else if (error.text.includes("Invalid service ID")) {
          console.error("Service ID inválido. Verifique a configuração do serviço no EmailJS.");
        }
      }
      
      setSubmitStatus("error");
      
      setTimeout(() => {
        setSubmitStatus("");
      }, 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Wraper>
      <DivPrincipal>
        <DivMargin id="home" />

        <DivText>
          <TextFirst>Hello World,</TextFirst>
          <TextSecond>
            Meu nome é João Guilherme,
            <br /> <p>DESENVOLVEDOR FULLSTACK</p>
          </TextSecond>

          <DivIcons>
            <a href="https://wa.me/5524988685043">
              <FaWhatsappIcon />
            </a>

            <a href="https://github.com/JoaoZ14" target="_blank" rel="noreferrer">
              <FaGithubIcon />
            </a>

            <a
              href="http://www.linkedin.com/in/joao-possidonio"
              target="_blank"
              rel="noreferrer"
            >
              <FaLinkedinIcon />
            </a>
          </DivIcons>
          
          <ButtonCVContainer ref={dropdownRef}>
            <ButtonCV onClick={toggleDropdown}>
              Currículo Virtual
              <ArrowIcon isOpen={showDropdown} />
            </ButtonCV>
            <DropdownMenu isOpen={showDropdown}>
              <DropdownItem onClick={() => handleDownloadCV("pt")}>
                Português
              </DropdownItem>
              <DropdownItem onClick={() => handleDownloadCV("en")}>
                Inglês
              </DropdownItem>
            </DropdownMenu>
          </ButtonCVContainer>
        </DivText>

        <Line id="about" />
        <SectionProfile>
          <AboutSection data-aos="fade-up">
            <AboutContent>
              <AboutSectionTitle>Sobre Mim</AboutSectionTitle>
              <AboutSectionText>
                Desenvolvedor Fullstack com sólida expertise em arquitetura de aplicações modernas e escaláveis. 
                Transformo requisitos complexos em soluções elegantes, combinando domínio técnico em React, Node.js, 
                Java e Spring Boot com visão estratégica de negócio. Meu diferencial está em entregar não apenas código, 
                mas experiências digitais que geram valor real para usuários e empresas.
              </AboutSectionText>
              <AboutSectionText>
                Especializado em desenvolvimento de interfaces responsivas de alta performance e APIs RESTful robustas. 
                Pratico Clean Code, design patterns e metodologias ágeis no dia a dia. Tenho facilidade em aprender novas 
                tecnologias rapidamente e aplicá-las de forma pragmática. Busco constantemente otimizar processos, melhorar 
                a qualidade do código e contribuir com soluções criativas em ambientes colaborativos.
              </AboutSectionText>
              <AboutSectionText>
                Além das habilidades técnicas, trago proatividade, comunicação efetiva e paixão por resolver problemas 
                desafiadores. Acredito que tecnologia deve simplificar, conectar e impactar positivamente. Estou preparado 
                para contribuir desde o primeiro dia, seja em projetos inovadores de startups ou em sistemas enterprise de 
                larga escala.
              </AboutSectionText>
              
              <SkillsContainer>
                <SkillCard data-aos="fade-up" data-aos-delay="100">
                  <h3>Desenvolvimento Frontend</h3>
                  <p>Criação de interfaces intuitivas e performáticas com React, JavaScript ES6+, HTML5 e CSS3. Experiência em design responsivo, acessibilidade e otimização de performance</p>
                </SkillCard>
                <SkillCard data-aos="fade-up" data-aos-delay="200">
                  <h3>Arquitetura Backend</h3>
                  <p>Desenvolvimento de APIs RESTful escaláveis e seguras com Node.js, Java e Spring Boot. Conhecimento em bancos de dados, microserviços e integração de sistemas</p>
                </SkillCard>
                <SkillCard data-aos="fade-up" data-aos-delay="300">
                  <h3>Excelência Técnica</h3>
                  <p>Comprometimento com Clean Code, SOLID, Git Flow e metodologias ágeis. Mentalidade voltada para solução de problemas, aprendizado contínuo e trabalho em equipe</p>
                </SkillCard>
              </SkillsContainer>

              <TechTitle data-aos="fade-up">Tecnologias</TechTitle>

              <DivIconsTec>
                {Object.keys(descriptions).map((key, index) => (
                  <IconWrapper
                    key={key}
                    data-aos="fade-up"
                    data-aos-delay={index * 50}
                    onMouseEnter={() => setSelectedTechnology(key)}
                    onMouseLeave={() => setSelectedTechnology("")}
                  >
                    {icons[key]}
                    <TechName>{techNames[key]}</TechName>
                  </IconWrapper>
                ))}
              </DivIconsTec>
              
              <DescriptionBox data-aos="fade-up">
                {selectedTechnology ? descriptions[selectedTechnology] : "Explore as tecnologias que utilizo para criar soluções digitais"}
              </DescriptionBox>
            </AboutContent>
          </AboutSection>
        </SectionProfile>


        <DivMargin id="projects" />

        <ProjectsSection>
          <ProjectsTitle data-aos="fade-up">Projetos</ProjectsTitle>
          
          {projects.map((project, index) => (
            <ProjectItem 
              key={index} 
              reverse={index % 2 !== 0}
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <ProjectImageWrapper reverse={index % 2 !== 0} $logoThumbnail={project.logoThumbnail}>
                <img src={project.image} alt={project.name} />
              </ProjectImageWrapper>
              
              <ProjectInfo reverse={index % 2 !== 0}>
                <ProjectName>{project.name}</ProjectName>
                
                {project.partner && (
                  <ProjectPartner>
                    <span>Em colaboração com</span>
                    <PartnerLogoLink
                      href={project.partner.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Visitar site da ${project.partner.name}`}
                    >
                      <img src={project.partner.logo} alt={project.partner.name} />
                      <span>{project.partner.name}</span>
                    </PartnerLogoLink>
                  </ProjectPartner>
                )}
                
                <ProjectDescription>{project.description}</ProjectDescription>
                
                <ProjectTechnologies>
                  {project.technologies.map((tech) => (
                    <div key={tech}>{icons[tech]}</div>
                  ))}
                </ProjectTechnologies>
                
                <ProjectLinks>
                  {project.deploy && (
                    <ProjectLink 
                      href={project.deploy} 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      Ver Site
                    </ProjectLink>
                  )}
                  {project.github && (
                    <ProjectLink 
                      href={project.github} 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      <FaGithubIcon /> Código
                    </ProjectLink>
                  )}
                </ProjectLinks>
              </ProjectInfo>
            </ProjectItem>
          ))}
        </ProjectsSection>

        <Line />

        <ContactSection id="contact" data-aos="fade-up">
          <ContactTitle>Entre em Contato</ContactTitle>
          
          <ContactWrapper>
            <ContactInfo>
              <ContactItem>
                <h3>Email</h3>
                <a href="mailto:contato@joaopossidonio.com">
                  contato@joaopossidonio.com
                </a>
              </ContactItem>

              <ContactItem>
                <h3>WhatsApp</h3>
                <a href="https://wa.me/5524988685043" target="_blank" rel="noopener noreferrer">
                  <FaWhatsappIcon /> +55 (24) 98868-5043
                </a>
              </ContactItem>

              <ContactItem>
                <h3>LinkedIn</h3>
                <a href="https://www.linkedin.com/in/joao-possidonio/" target="_blank" rel="noopener noreferrer">
                  <FaLinkedinIcon /> /joao-possidonio
                </a>
              </ContactItem>

              <ContactItem>
                <h3>GitHub</h3>
                <a href="https://github.com/JoaoZ14" target="_blank" rel="noopener noreferrer">
                  <FaGithubIcon /> /JoaoZ14
                </a>
              </ContactItem>

              <ContactItem>
                <h3>Localização</h3>
                <p>Resende, Rio de Janeiro, Brasil</p>
              </ContactItem>
            </ContactInfo>

            <FormWrapper>
              <ContactForm ref={formRef} onSubmit={handleSubmit}>
              <FormGroup>
                <FormLabel htmlFor="name">Nome</FormLabel>
                <FormInput 
                  type="text" 
                  id="name" 
                  name="name" 
                  placeholder="Seu nome completo"
                  required 
                  disabled={isSubmitting}
                />
              </FormGroup>

              <FormGroup>
                <FormLabel htmlFor="email">Email</FormLabel>
                <FormInput 
                  type="email" 
                  id="email" 
                  name="email" 
                  placeholder="seu@email.com"
                  required 
                  disabled={isSubmitting}
                />
              </FormGroup>

              <FormGroup>
                <FormLabel htmlFor="subject">Assunto</FormLabel>
                <FormSelect 
                  id="subject" 
                  name="subject" 
                  required
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.target.value)}
                  disabled={isSubmitting}
                >
                  <option value="">Selecione um assunto</option>
                  <option value="freelance">Projeto Freelance</option>
                  <option value="job">Oportunidade de Emprego</option>
                  <option value="collaboration">Colaboração</option>
                  <option value="question">Dúvida</option>
                  <option value="other">Outro</option>
                </FormSelect>
              </FormGroup>

              {selectedSubject === "job" && (
                <FormGroup>
                  <FormLabel htmlFor="company">Nome da Empresa</FormLabel>
                  <FormInput 
                    type="text" 
                    id="company" 
                    name="company" 
                    placeholder="Nome da empresa"
                    required 
                    disabled={isSubmitting}
                  />
                </FormGroup>
              )}

              <FormGroup>
                <FormLabel htmlFor="message">Mensagem</FormLabel>
                <FormTextarea 
                  id="message" 
                  name="message" 
                  placeholder="Escreva sua mensagem aqui..."
                  required 
                  disabled={isSubmitting}
                />
              </FormGroup>

              <FormButton type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Enviando..." : "Enviar Mensagem"}
              </FormButton>

              {submitStatus === "success" && (
                <StatusMessage className="success">
                  ✓ Mensagem enviada com sucesso! Retornarei em breve.
                </StatusMessage>
              )}

              {submitStatus === "error" && (
                <StatusMessage className="error">
                  ✕ Erro ao enviar mensagem. Por favor, tente novamente ou entre em contato diretamente via email.
                </StatusMessage>
              )}
              </ContactForm>
            </FormWrapper>
          </ContactWrapper>
        </ContactSection>

        <Line />
      </DivPrincipal>
    </Wraper>
  );
};

export default LandingPage;
