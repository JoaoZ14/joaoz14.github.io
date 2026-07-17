import { FaWhatsapp } from "react-icons/fa6";
import {
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaReact,
  FaJs,
  FaHtml5,
  FaCss3Alt,
  FaNodeJs,
  FaPython,
  FaJava,
} from "react-icons/fa";
import { SiDocker, SiGit, SiJsonwebtokens, SiOpenid, SiSpringboot } from "react-icons/si";
import styled from "styled-components";
import { IoMdCloseCircle } from "react-icons/io";

/* Ícones sociais — herdam a cor do contexto (CTA, links, hero). */
export const FaWhatsappIcon = styled(FaWhatsapp)`
  color: currentColor;
  font-size: 26px;
`;

export const FaGithubIcon = styled(FaGithub)`
  color: currentColor;
  font-size: 26px;
`;

export const FaLinkedinIcon = styled(FaLinkedin)`
  color: currentColor;
  font-size: 26px;
`;

export const FaInstagramIcon = styled(FaInstagram)`
  color: currentColor;
  font-size: 26px;
`;

/* Ícones de tecnologia — monocromáticos (herdam o preto do contexto) */
export const FaReactIcon = styled(FaReact)`
  color: currentColor;
  font-size: 60px;
`;

export const FaJsIcon = styled(FaJs)`
  color: currentColor;
  font-size: 60px;
`;

export const FaHtmlIcon = styled(FaHtml5)`
  color: currentColor;
  font-size: 60px;
`;

export const FaCssIcon = styled(FaCss3Alt)`
  color: currentColor;
  font-size: 60px;
`;

export const FaNodeJsIcon = styled(FaNodeJs)`
  color: currentColor;
  font-size: 60px;
`;

export const FaPythonIcon = styled(FaPython)`
  color: currentColor;
  font-size: 60px;
`;

export const FaJavaIcon = styled(FaJava)`
  color: currentColor;
  font-size: 60px;
`;

export const SiSpringbootIcon = styled(SiSpringboot)`
  color: currentColor;
  font-size: 60px;
`;

export const SiGitIcon = styled(SiGit)`
  color: currentColor;
  font-size: 60px;
`;

export const SiDockerIcon = styled(SiDocker)`
  color: currentColor;
  font-size: 60px;
`;

export const SiOpenidIcon = styled(SiOpenid)`
  color: currentColor;
  font-size: 60px;
`;

export const SiJsonwebtokensIcon = styled(SiJsonwebtokens)`
  color: currentColor;
  font-size: 60px;
`;

export const IconCloseCircle = styled(IoMdCloseCircle)`
  color: var(--ink);
  cursor: pointer;
  font-size: 20px;
  position: absolute;
  top: 10px;
  right: 10px;
`;
