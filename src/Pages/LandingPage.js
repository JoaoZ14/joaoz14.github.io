import React, { useEffect, useState, useRef } from "react";
import styled, { css } from "styled-components";
import { IoIosArrowDown } from "react-icons/io";
import { useTranslation } from "react-i18next";
import {
  SiAmazonwebservices,
  SiFirebase,
  SiGooglecloud,
  SiPostgresql,
  SiReact,
  SiMercadopago,
  SiStyledcomponents,
  SiSupabase,
  SiTypescript,
} from "react-icons/si";
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
  padding: var(--section-y) var(--container-x) calc(var(--section-y) + 28px);
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

  @media (min-width: 900px) {
    padding: 80px 40px 120px;
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

  @media (max-width: 768px) {
    padding: 0 24px;
  }

  @media (max-width: 480px) {
    padding: 0 18px;
  }
`;

const AboutBlocks = styled.div`
  max-width: 1100px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 70px;
  padding-top: 10px;
`;

const AboutBlock = styled.div`
  text-align: center;
`;

const AboutHighlights = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 auto;
  max-width: 900px;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;

  @media (max-width: 600px) {
    gap: 8px;
  }
`;

const AboutHighlightItem = styled.li`
  text-align: left;
  padding: 0 0 0 18px;
  background: transparent;
  border-radius: 0;
  color: rgba(255, 255, 255, 0.85);
  font-family: "Titillium Web", sans-serif;
  font-size: 15px;
  line-height: 1.6;

  position: relative;

  &::before {
    content: "";
    position: absolute;
    left: 0;
    top: 9px;
    width: 8px;
    height: 2px;
    border-radius: 2px;
    background: rgb(255, 252, 223);
    opacity: 0.85;
  }
`;

const AboutSectionTitle = styled.h2`
  font-size: clamp(28px, 6vw, 40px);
  margin-bottom: 20px;
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

  @media (min-width: 900px) {
    font-size: 48px;
    margin-bottom: 30px;
  }
`;

const AboutSectionText = styled.p`
  font-size: 16px;
  line-height: 1.9;
  color: rgba(255, 255, 255, 0.8);
  font-family: "Titillium Web", sans-serif;
  margin-bottom: 20px;
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
    padding: 0 4px;
  }
`;

const CompanyHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 14px;
  flex-wrap: wrap;
  margin: 0 0 16px;

  @media (max-width: 768px) {
    gap: 10px;
    margin: 0 0 12px;
  }
`;

const CompanyLogo = styled.img`
  width: 52px;
  height: 52px;
  object-fit: contain;
  filter: brightness(1.05);
`;

const CompanyName = styled.h3`
  font-size: 34px;
  margin: 0;
  font-family: Garamond, serif;
  font-weight: 100;
  color: rgb(255, 252, 223);
  text-transform: lowercase;
  letter-spacing: 1px;

  @media (max-width: 768px) {
    font-size: 28px;
  }
`;

const CompanyDescription = styled.p`
  margin-bottom: 50px;
  margin-left: auto;
  margin-right: auto;
  max-width: 820px;
  font-size: 16px;
  line-height: 1.9;
  color: rgba(255, 255, 255, 0.8);
  font-family: "Titillium Web", sans-serif;

  @media (max-width: 768px) {
    padding: 0 4px;
    margin-bottom: 34px;
    font-size: 15px;
    line-height: 1.75;
  }
`;

const ExperienceTitle = styled.h3`
  font-size: 28px;
  margin: 0 0 24px;
  font-family: Garamond, serif;
  font-weight: 100;
  color: rgb(255, 252, 223);
  text-align: center;

  @media (max-width: 768px) {
    font-size: 22px;
    margin: 40px 0 20px;
  }
`;

const ExperienceCard = styled.div`
  text-align: left;
  width: 100%;
  padding: 0;
  background: transparent;
  border-radius: 0;

  transition: none;

  &:hover {
    transform: none;
    background: transparent;
  }

  @media (max-width: 768px) {
    padding: 0;
    background: transparent;
    border: none;
    border-radius: 0;
    padding: 10px;
    box-shadow: none;
  }
`;

const ExperienceRole = styled.div`
  font-size: 22px;
  font-weight: 700;
  color: white;
  font-family: "Titillium Web", sans-serif;
  margin-bottom: 0;

  @media (max-width: 768px) {
    font-size: 17px;
    line-height: 1.5;
    word-break: break-word;
    overflow-wrap: anywhere;
  }
`;

const ExperienceMeta = styled.div`
  font-size: 13px;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 12px;
  font-family: "Titillium Web", sans-serif;
`;

const ExperienceImpact = styled.p`
  margin: 0 0 14px;
  font-size: 15px;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.85);
  font-family: "Titillium Web", sans-serif;
`;

const ExperiencePhrases = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 0;

  @media (max-width: 768px) {
    gap: 10px;
    margin-top: 0;
  }
`;

const ExperiencePhrase = styled.p`
  margin: 0;
  font-size: 15px;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.85);
  font-family: "Titillium Web", sans-serif;

  @media (max-width: 768px) {
    font-size: 14px;
    line-height: 1.68;
    padding-right: 6px;
    word-break: break-word;
    overflow-wrap: anywhere;
  }
`;

const ExperiencePeriod = styled.span`
  font-size: 0.72em;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.78);

  @media (max-width: 768px) {
    font-size: 0.74em;
    line-height: 1.4;
  }
`;

const ExperienceDivider = styled.div`
  width: 100%;
  height: 1px;
  background: rgba(255, 252, 223, 0.25);
  margin: 8px 0 4px;

  @media (max-width: 768px) {
    margin: 8px 0 6px;
    background: rgba(255, 252, 223, 0.25);
  }
`;

const ExperienceList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 9px;
  font-size: 15px;
  font-family: "Titillium Web", sans-serif;

  li {
    position: relative;
    padding-left: 18px;
    line-height: 1.6;
    font-size: 14px;
    color: rgba(255, 255, 255, 0.82);
  }

  li::before {
    content: "";
    position: absolute;
    left: 0;
    top: 9px;
    width: 8px;
    height: 2px;
    border-radius: 2px;
    background: rgb(255, 252, 223);
    opacity: 0.85;
  }
`;

const ExperienceTimeline = styled.div`
  position: relative;
  max-width: 900px;
  width: 100%;
  margin: 0 auto;
  padding-left: 34px;

  &::before {
    content: "";
    position: absolute;
    left: 14px;
    top: 16px;
    bottom: 16px;
    width: 2px;
    background: rgba(255, 252, 223, 0.35);
    border-radius: 2px;
  }

  @media (max-width: 768px) {
    padding-left: 0;
    padding-right: 4px;

    &::before {
      display: none;
    }
  }
`;

const ExperienceTimelineItem = styled.div`
  position: relative;
  margin-bottom: 16px;

  &:last-child {
    margin-bottom: 0;
  }

  @media (max-width: 768px) {
    margin-bottom: 12px;
  }
`;

const ExperienceTimelineDot = styled.div`
  position: absolute;
  left: -20px;
  top: 26px;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: rgba(255, 252, 223, 0.28);
`;

const SkillsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 26px;
  margin-top: 0;
  margin-bottom: 0;
  max-width: 100%;
  width: 100%;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 30px;
    margin-top: 0;
    padding: 0 14px;
  }

  @media (min-width: 1020px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 0;
  }
`;

const SkillCard = styled.div`
  padding: 0;
  background: transparent;
  border-radius: 0;
  transition: none;
  position: relative;
  cursor: default;

  &:hover {
    transform: none;
    background: transparent;
  }

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  padding: 0;

  h3 {
    font-size: 22px;
    margin: 0;
    color: rgba(255, 255, 255, 0.9);
    font-family: Garamond, serif;
    font-weight: 100;
    text-align: left;
  }

  @media (max-width: 768px) {
    padding: 0 6px;
  }

  @media (min-width: 1020px) {
    padding: 0 26px;

    &:nth-child(1),
    &:nth-child(2) {
      border-right: 1px solid rgba(255, 252, 223, 0.22);
    }
  }
`;

const SkillCategoryPill = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 8px 12px;
  border-radius: 999px;
  background: rgba(255, 252, 223, 0.08);
  color: rgba(255, 252, 223, 0.95);
  font-family: "Titillium Web", sans-serif;
  font-size: 12px;
  letter-spacing: 1px;
  text-transform: uppercase;

  align-self: flex-start;
`;

const SkillSummary = styled.p`
  margin: 0 0 14px;
  font-size: 14px;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.75);
  font-family: "Titillium Web", sans-serif;
  text-align: left;

  @media (max-width: 768px) {
    padding-inline: 4px;
  }
`;

const SkillList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;

  @media (max-width: 768px) {
    padding-inline: 4px;
  }
`;

const SkillListItem = styled.li`
  position: relative;
  padding-left: 18px;
  text-align: left;
  font-size: 14px;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.82);
  font-family: "Titillium Web", sans-serif;

  &::before {
    content: "";
    position: absolute;
    left: 0;
    top: 9px;
    width: 8px;
    height: 2px;
    border-radius: 2px;
    background: rgba(255, 252, 223, 0.9);
    opacity: 0.85;
  }
`;

const ProjectsSection = styled.section`
  max-width: 1200px;
  margin: var(--section-y) auto;
  padding: 0 var(--container-x);
  width: 100%;

  @media (max-width: 768px) {
    padding: 0;
    display: flex;
    margin-left: auto;
    margin-right: auto;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin: auto;
    width: 300px;
  }

  @media (min-width: 900px) {
    margin: 80px auto;
    padding: 0 40px;
  }
`;

const ProjectsTitle = styled.h2`
  text-align: center;
  font-size: clamp(28px, 6vw, 40px);
  margin-bottom: 44px;
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

  @media (min-width: 900px) {
    font-size: 48px;
    margin-bottom: 80px;
  }
`;

const ProjectItem = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 22px;
  align-items: center;
  margin-bottom: 72px;
  position: relative;

 

  @media (max-width: 768px) {
    gap: 14px;
    margin-bottom: 22px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.14);
  }

  @media (min-width: 900px) {
    grid-template-columns: ${({ $reverse }) => ($reverse ? "1fr 1.2fr" : "1.2fr 1fr")};
    gap: 60px;
    margin-bottom: 120px;
  }
`;

const ProjectImageWrapper = styled.div`
  position: relative;
  overflow: hidden;
  order: 0;
  
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
    height: 220px;
    object-fit: cover;
    display: block;
    transition: transform 0.5s ease;
  }

  &:hover img {
    transform: scale(1.05);
  }

  @media (min-width: 600px) {
    img {
      height: 300px;
    }
  }

  @media (max-width: 768px) {
    img {
      height: 180px;
    }

    border-radius: 12px;
  }
  
  @media (min-width: 900px) {
    order: ${({ $reverse }) => ($reverse ? "1" : "0")};

    img {
      height: 400px;
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

const ProjectImageNote = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 10px 14px;
  background: rgba(0, 0, 0, 0.75);
  color: rgba(255, 255, 255, 0.9);
  font-size: 12px;
  font-weight: 400;
  line-height: 1.4;
  text-align: center;
  font-family: "Titillium Web", sans-serif;

  @media (max-width: 768px) {
    font-size: 11px;
    padding: 8px 12px;
  }
`;

const ProjectInfo = styled.div`
  order: 1;

  @media (max-width: 768px) {
    text-align: left;
  }

  @media (min-width: 900px) {
    order: ${({ $reverse }) => ($reverse ? "0" : "1")};
  }
`;

const ProjectName = styled.h3`
  font-size: clamp(22px, 5.4vw, 30px);
  font-family: Garamond, serif;
  font-weight: 100;
  color: white;
  margin-bottom: 15px;
  letter-spacing: 1px;

  @media (max-width: 768px) {
    font-size: 22px;
    margin-bottom: 10px;
  }

  @media (min-width: 900px) {
    font-size: 32px;
  }
`;

const ProjectDescription = styled.p`
  font-size: 16px;
  line-height: 1.8;
  color: rgba(255, 255, 255, 0.7);
  font-family: "Titillium Web", sans-serif;
  margin-bottom: 25px;
  font-weight: 300;

  @media (max-width: 768px) {
    font-size: 14px;
    line-height: 1.65;
    margin-bottom: 18px;
    text-align: left;
  }
`;

const ProjectTechnologies = styled.div`
  display: flex;
  gap: 15px;
  margin-bottom: 30px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    justify-content: flex-start;
    gap: 10px;
    margin-bottom: 16px;
  }

  svg {
    font-size: 28px;
    color: rgba(255, 255, 255, 0.8);
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-3px);
      color: rgb(255, 252, 223);
    }
  }

  @media (max-width: 768px) {
    svg {
      font-size: 22px;
    }
  }
`;

const ProjectLinks = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  flex-wrap: wrap;

  @media (max-width: 599px) {
    display: grid;
    grid-template-columns: 1fr;
    width: 100%;
  }
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

  @media (max-width: 768px) {
    font-size: 13px;
    padding: 11px 16px;
    justify-content: center;
    width: 100%;
    box-sizing: border-box;
  }
`;

const DivIcons = styled.div`
  margin-top: 14px;
  margin-bottom: 2px;

  display: flex;
  gap: 14px;

  @media (max-width: 600px) {
    margin-top: 10px;
    gap: 12px;
  }

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
  font-size: 24px;
  margin-top: 0;
  margin-bottom: 36px;
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

  @media (min-width: 900px) {
    font-size: 28px;
    margin-bottom: 46px;
  }
`;

const TechCategories = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr;
  gap: 28px;

  @media (min-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
    column-gap: 54px;
    row-gap: 34px;
  }
`;

const TechCategory = styled.div`
  text-align: left;
  align-self: start;

  @media (max-width: 899px) {
    padding: 0 0 18px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.16);
  }

  @media (max-width: 899px) {
    &:last-child {
      border-bottom: none;
      padding-bottom: 0;
    }
  }

  @media (min-width: 900px) {
    padding: 0 18px 18px 0;
  }

  @media (min-width: 900px) {
    &:nth-child(1) {
      border-right: 1px solid rgba(255, 255, 255, 0.18);
      border-bottom: 1px solid rgba(255, 255, 255, 0.18);
    }

    &:nth-child(2) {
      border-bottom: 1px solid rgba(255, 255, 255, 0.18);
    }

    &:nth-child(3) {
      border-right: 1px solid rgba(255, 255, 255, 0.18);
    }
  }
`;

const TechCategoryTitle = styled.h4`
  margin: 0 0 14px;
  font-size: 13px;
  font-family: "Titillium Web", sans-serif;
  font-weight: 400;
  letter-spacing: 2.5px;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.65);

  @media (max-width: 899px) {
    text-align: center;
    margin-bottom: 16px;
  }
`;

const TechItems = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px 14px;
  align-items: start;
  justify-items: center;

  @media (min-width: 520px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  @media (min-width: 900px) {
    grid-template-columns: repeat(4, minmax(0, 1fr));
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

const IconWrapper = styled.button`
  appearance: none;
  border: none;
  background: transparent;
  padding: 6px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  cursor: pointer;
  position: relative;
  transition: all 0.3s ease;
  width: 104px;
  min-height: 108px;
  color: inherit;

  &:hover {
    transform: none;

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

  &:focus-visible {
    outline: 2px solid rgba(255, 252, 223, 0.55);
    outline-offset: 6px;
    border-radius: 8px;
  }

  svg {
    font-size: 44px;
    transition: all 0.3s ease;
    color: rgba(255, 255, 255, 0.85);

    @media (max-width: 768px) {
      font-size: 44px;
    }
  }
`;

const TechIconSlot = styled.div`
  width: 52px;
  height: 52px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

const TechFallbackIcon = styled.div`
  width: 46px;
  height: 46px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.06);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 252, 223, 0.9);
  font-family: "Titillium Web", sans-serif;
  font-weight: 400;
  letter-spacing: 1px;
  font-size: 12px;
  text-transform: uppercase;
`;

const TechName = styled.span`
  font-size: 12px;
  color: rgba(255, 255, 255, 0.6);
  font-family: "Titillium Web", sans-serif;
  text-align: center;
  font-weight: 300;
  letter-spacing: 1.6px;
  text-transform: uppercase;
  transition: all 0.3s ease;
  line-height: 1.25;
  max-width: 104px;
  word-break: break-word;
`;

const SoftSkillsWrap = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px 12px;

  @media (min-width: 520px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`;

const SoftSkillPill = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 8px 12px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.04);
  color: rgba(255, 255, 255, 0.82);
  font-family: "Titillium Web", sans-serif;
  font-size: 13px;
  font-weight: 300;
  letter-spacing: 0.4px;
  cursor: pointer;
  transition: background-color 0.25s ease, color 0.25s ease;

  &:hover {
    background: rgba(255, 252, 223, 0.08);
    color: rgba(255, 252, 223, 0.95);
  }
`;

const DescriptionBox = styled.div`
  margin-top: 18px;
  margin-bottom: 0;
  min-height: 54px;
  text-align: center;
  color: rgba(255, 255, 255, 0.7);
  font-size: 14px;
  font-family: "Titillium Web", sans-serif;
  font-weight: 300;
  line-height: 1.8;
  letter-spacing: 0.5px;
  padding: 0 12px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  position: relative;
  z-index: 1;
  transition: all 0.4s ease;

  @media (min-width: 600px) {
    padding: 0 16px;
  }

  @media (min-width: 900px) {
    font-size: 15px;
    padding: 0 20px;
    margin-top: 28px;
  }
`;

const TechnologyDescriptionText = styled.p`
  margin: 0;
  color: rgba(255, 255, 255, 0.72);
  animation: fadeInSoft 0.35s ease both;
  @keyframes fadeInSoft {
    from {
      opacity: 0;
      transform: translateY(6px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
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
  overflow-y: visible;
`;

const DivPrincipal = styled.div`
  text-align: center;
  align-items: center;
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  max-width: 100%;
  overflow-x: hidden;
  overflow-y: visible;
  height: auto;
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
    min-height: 100svh;
    padding: 96px 24px 56px;
    gap: 12px;
  }

  @media (max-width: 600px) {
    width: 100%;
    max-width: 100vw;
    min-height: 100svh;
    padding: 88px 16px 44px;
    gap: 10px;
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
  margin: var(--section-y) auto;
  padding: 0 var(--container-x);
`;

const ContactTitle = styled.h2`
  text-align: center;
  font-size: clamp(28px, 6vw, 40px);
  margin-bottom: 44px;
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

  @media (min-width: 900px) {
    font-size: 48px;
    margin-bottom: 80px;
  }
`;

const ContactWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 60px;
  align-items: start;

  @media (min-width: 900px) {
    gap: 70px;
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
  display: grid;
  grid-template-columns: 1fr;
  gap: 26px 60px;
  position: relative;

  @media (min-width: 900px) {
    grid-template-columns: 1fr 1fr;
    max-width: 900px;
    margin: 0 auto;
  }

  @media (max-width: 600px) {
    gap: 22px;
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

  @media (max-width: 600px) {
    margin-top: 10px;
  }
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
  transform: ${({ $isOpen }) => ($isOpen ? "rotate(180deg)" : "rotate(0deg)")};
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: calc(100% + 10px);
  left: 50%;
  background-color: #2c2c2c;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
  min-width: 170px;
  opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
  visibility: ${({ $isOpen }) => ($isOpen ? "visible" : "hidden")};
  transform: ${({ $isOpen }) => ($isOpen ? "translate(-50%, 0)" : "translate(-50%, -10px)")};
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
  const { t } = useTranslation();
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedTechnology, setSelectedTechnology] = useState("");
  const [isTechPinned, setIsTechPinned] = useState(false);
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
    react: t("tech.descriptions.react"),
    reactnative: t("tech.descriptions.reactnative"),
    js: t("tech.descriptions.js"),
    typescript: t("tech.descriptions.typescript"),
    html: t("tech.descriptions.html"),
    css: t("tech.descriptions.css"),
    styledcomponents: t("tech.descriptions.styledcomponents"),
    node: t("tech.descriptions.node"),
    python: t("tech.descriptions.python"),
    java: t("tech.descriptions.java"),
    springboot: t("tech.descriptions.springboot"),
    sql: t("tech.descriptions.sql"),
    postgresql: t("tech.descriptions.postgresql"),
    firebase: t("tech.descriptions.firebase"),
    restful: t("tech.descriptions.restful"),
    aws: t("tech.descriptions.aws"),
    googlecloud: t("tech.descriptions.googlecloud"),
    stripe: t("tech.descriptions.stripe"),
    supabase: t("tech.descriptions.supabase"),
    oauth2: t("tech.descriptions.oauth2"),
    git: t("tech.descriptions.git"),
    github: t("tech.descriptions.github"),
    softskills: t("tech.descriptions.softskills"),
  };

  const techNames = {
    react: "React",
    reactnative: "React Native",
    styledcomponents: "Styled-components",
    typescript: "TypeScript",
    js: "JavaScript",
    html: "HTML5",
    css: "HTML & CSS",
    node: "Node.js",
    python: "Python",
    java: "Java",
    springboot: "Spring Boot",
    sql: "SQL",
    postgresql: "PostgreSQL",
    firebase: "Firebase",
    restful: "RESTful APIs",
    aws: "AWS",
    googlecloud: "Google Cloud",
    stripe: "API Mercado Pago",
    supabase: "Supabase",
    oauth2: "OAuth 2.0",
    git: "Git",
    github: "GitHub",
    softskills: "Soft Skills",
  };

  const icons = {
    react: <FaReactIcon />,
    reactnative: <SiReact />,
    js: <FaJsIcon />,
    typescript: <SiTypescript />,
    html: <FaHtmlIcon />,
    css: <FaCssIcon />,
    styledcomponents: <SiStyledcomponents />,
    node: <FaNodeJsIcon />,
    python: <FaPythonIcon />,
    java: <FaJavaIcon />,
    springboot: <SiSpringbootIcon />,
    postgresql: <SiPostgresql />,
    firebase: <SiFirebase />,
    aws: <SiAmazonwebservices />,
    googlecloud: <SiGooglecloud />,
    stripe: <SiMercadopago />,
    supabase: <SiSupabase />,
    oauth2: <SiOpenidIcon />,
    git: <SiGitIcon />,
    github: <FaGithubIcon />,
    docker: <SiDockerIcon />,
    openid: <SiOpenidIcon />,
    jwt: <SiJsonwebtokensIcon />,
  };

  const technologyCategories = [
    {
      title: t("tech.categories.frontend"),
      keys: ["react", "reactnative", "html", "css", "js", "styledcomponents", "typescript"],
    },
    {
      title: t("tech.categories.backend"),
      keys: ["node", "java", "springboot", "python", "sql", "postgresql", "restful", "oauth2"],
    },
    {
      title: t("tech.categories.other"),
      keys: ["firebase", "supabase", "aws", "googlecloud", "stripe", "git", "github"],
    },
    {
      title: t("tech.categories.softSkills"),
      keys: ["softskills"],
    },
  ];

  const softSkillsRaw = t("tech.softSkills.items", { returnObjects: true });
  const softSkills = Array.isArray(softSkillsRaw) ? softSkillsRaw : [];

  const projects = [
    {
      name: "Elevate Auth API",
      image: "https://elevatebr.org/images/elevate-logo.png",
      descriptionKey: "projects.items.elevateAuthApi.description",
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
    {
      name: "SeatHub",
      image: "Logo_seathub.png",
      descriptionKey: "projects.items.seatHub.description",
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
      descriptionKey: "projects.items.tapInOut.description",
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
      name: "CampoLead",
      image: `${process.env.PUBLIC_URL || ""}/Design sem nome (36).png`,
      descriptionKey: "projects.items.campoLead.description",
      noteKey: "projects.items.campoLead.statusNote",
      github: "https://github.com/JoaoZ14/CampoLead",
      githubBe: "https://github.com/JoaoZ14/CampoLead.be",
      deploy: "",
      technologies: ["reactnative", "js", "java", "springboot", "supabase", "restful", "git"],
    },
    {
      name: "Artilheiro Store",
      image: `${process.env.PUBLIC_URL || ""}/ArtilheiroStore.png`,
      descriptionKey: "projects.items.footballJerseyShop.description",
      noteKey: "projects.items.footballJerseyShop.inactivityNote",
      github: "https://github.com/JoaoZ14/ArtilheiroStore",
      githubBe: "https://github.com/JoaoZ14/ArtilheiroStore.be",
      deploy: "https://artilheirostore.netlify.app/",
      technologies: ["react", "js", "java", "springboot", "postgresql", "supabase", "stripe", "git"],
    },
    {
      name: "Busca CEP",
      image: "BuscaCep.png",
      descriptionKey: "projects.items.buscaCep.description",
      github: "https://github.com/JoaoZ14/BuscaCep",
      deploy: "https://searcep.netlify.app/",
      technologies: ["react", "js", "css", "html"],
    },
    {
      name: "Weather App",
      image: "WeatherApp.png",
      descriptionKey: "projects.items.weatherApp.description",
      noteKey: "projects.items.weatherApp.inactivityNote",
      github: "https://github.com/JoaoZ14/Weather-App",
      deploy: "https://weatherappjg.netlify.app",
      technologies: ["react", "html", "css", "js"],
    },
    {
      name: "Calculadora",
      image: "calculadora.png",
      descriptionKey: "projects.items.calculator.description",
      github: "https://github.com/JoaoZ14/Calculator",
      deploy: "",
      technologies: ["html", "css", "js"],
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
          <TextFirst>{t("hero.greeting")}</TextFirst>
          <TextSecond>
            {t("hero.intro")}
            <br /> <p>{t("hero.role")}</p>
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
              {t("hero.cv")}
              <ArrowIcon $isOpen={showDropdown} />
            </ButtonCV>
            <DropdownMenu $isOpen={showDropdown}>
              <DropdownItem onClick={() => handleDownloadCV("pt")}>
                {t("hero.portuguese")}
              </DropdownItem>
              <DropdownItem onClick={() => handleDownloadCV("en")}>
                {t("hero.english")}
              </DropdownItem>
            </DropdownMenu>
          </ButtonCVContainer>
        </DivText>

        <Line id="about" />
        <SectionProfile>
          <AboutSection data-aos="fade-up">
            <AboutContent>
              <AboutBlocks>
                <AboutBlock>
                  <AboutSectionTitle data-aos="fade-up">{t("about.title")}</AboutSectionTitle>
                  <AboutSectionText>
                    {t("about.summary1")}
                  </AboutSectionText>
                  <AboutSectionText data-aos="fade-up" data-aos-delay="50">
                    {t("about.summary2")}
                  </AboutSectionText>
                </AboutBlock>

                <AboutBlock>
                  <ExperienceTitle data-aos="fade-up">{t("about.experienceTitle")}</ExperienceTitle>
                  <CompanyHeader data-aos="fade-up" data-aos-delay="50">
                    <CompanyLogo
                      src="https://elevatebr.org/images/elevate-logo.png"
                      alt="Logo da elevate"
                      loading="eager"
                    />
                    <CompanyName>elevate</CompanyName>
                  </CompanyHeader>
                  <CompanyDescription data-aos="fade-up" data-aos-delay="100">
                    {t("experience.elevate.description")}
                  </CompanyDescription>

                  <ExperienceTimeline>
                    <ExperienceTimelineItem data-aos="fade-up" data-aos-delay="50">
                      <ExperienceCard>
                        <ExperienceRole>
                          {t("experience.elevate.roles.junior.title")} —{" "}
                          <ExperiencePeriod>{t("experience.elevate.roles.junior.period")}</ExperiencePeriod>
                        </ExperienceRole>
                      </ExperienceCard>
                    </ExperienceTimelineItem>

                    <ExperienceTimelineItem data-aos="fade-up" data-aos-delay="100" >
                      <ExperienceCard>
                        <ExperienceRole style={{ marginBottom: '16px' }}>
                          {t("experience.elevate.roles.intern.title")} —{" "}
                          <ExperiencePeriod>{t("experience.elevate.roles.intern.period")}</ExperiencePeriod>
                        </ExperienceRole>

                        <ExperienceDivider />
                        <ExperiencePhrases>
                          <ExperiencePhrase>
                            {t("experience.elevate.bullets.techLead")}
                          </ExperiencePhrase>
                          <ExperiencePhrase>
                            {t("experience.elevate.bullets.productEvolution")}
                          </ExperiencePhrase>
                          <ExperiencePhrase>
                            {t("experience.elevate.bullets.endToEndImprovements")}
                          </ExperiencePhrase>
                          <ExperiencePhrase>
                            {t("experience.elevate.bullets.architectureBestPractices")}
                          </ExperiencePhrase>
                          <ExperiencePhrase>
                            {t("experience.elevate.bullets.bugFixes")}
                          </ExperiencePhrase>
                          <ExperiencePhrase>
                            {t("experience.elevate.bullets.fullCycleDelivery")}
                          </ExperiencePhrase>
                          <ExperiencePhrase>
                            {t("experience.elevate.bullets.featuresFrontendBackend")}
                          </ExperiencePhrase>
                          <ExperiencePhrase>
                            {t("experience.elevate.bullets.reviewsDocumentation")}
                          </ExperiencePhrase>
                        </ExperiencePhrases>
                      </ExperienceCard>
                    </ExperienceTimelineItem>
                  </ExperienceTimeline>
                </AboutBlock>

                <AboutBlock>
                  <ExperienceTitle data-aos="fade-up">{t("skills.title")}</ExperienceTitle>
                  <SkillsContainer>
                    <SkillCard data-aos="fade-up" data-aos-delay="100">
                      <h3>{t("skills.frontend.title")}</h3>
                      <SkillSummary>
                        {t("skills.frontend.summary")}
                      </SkillSummary>
                      <SkillList>
                        <SkillListItem>{t("skills.frontend.items.reusableComponents")}</SkillListItem>
                        <SkillListItem>{t("skills.frontend.items.performanceUx")}</SkillListItem>
                        <SkillListItem>{t("skills.frontend.items.serviceIntegrations")}</SkillListItem>
                      </SkillList>
                    </SkillCard>

                    <SkillCard data-aos="fade-up" data-aos-delay="200">
                      <h3>{t("skills.backend.title")}</h3>
                      <SkillSummary>
                        {t("skills.backend.summary")}
                      </SkillSummary>
                      <SkillList>
                        <SkillListItem>{t("skills.backend.items.endpointsIntegrations")}</SkillListItem>
                        <SkillListItem>{t("skills.backend.items.businessRules")}</SkillListItem>
                        <SkillListItem>{t("skills.backend.items.authAccessControl")}</SkillListItem>
                      </SkillList>
                    </SkillCard>

                    <SkillCard data-aos="fade-up" data-aos-delay="300">
                      <h3>{t("skills.excellence.title")}</h3>
                      <SkillSummary>
                        {t("skills.excellence.summary")}
                      </SkillSummary>
                      <SkillList>
                        <SkillListItem>{t("skills.excellence.items.codeReview")}</SkillListItem>
                        <SkillListItem>{t("skills.excellence.items.documentation")}</SkillListItem>
                        <SkillListItem>{t("skills.excellence.items.teamwork")}</SkillListItem>
                      </SkillList>
                    </SkillCard>
                  </SkillsContainer>
                </AboutBlock>

                <AboutBlock>
                  <TechTitle data-aos="fade-up">{t("tech.title")}</TechTitle>
                  <TechCategories>
                    {technologyCategories.map((category, categoryIndex) => (
                      <TechCategory key={category.title} data-aos="fade-up" data-aos-delay={categoryIndex * 80}>
                        <TechCategoryTitle>{category.title}</TechCategoryTitle>
                        {category.title === t("tech.categories.softSkills") ? (
                          <SoftSkillsWrap
                            onMouseEnter={() => {
                              if (!isTechPinned) setSelectedTechnology("softskills");
                            }}
                            onMouseLeave={() => {
                              if (!isTechPinned) setSelectedTechnology("");
                            }}
                            onClick={() => {
                              setIsTechPinned((prevPinned) => {
                                const nextPinned = !(prevPinned && selectedTechnology === "softskills");
                                setSelectedTechnology(nextPinned ? "softskills" : "");
                                return nextPinned;
                              });
                            }}
                          >
                            {softSkills.map((label) => (
                              <SoftSkillPill key={label}>{label}</SoftSkillPill>
                            ))}
                          </SoftSkillsWrap>
                        ) : (
                          <TechItems>
                            {category.keys.map((key, index) => (
                              <IconWrapper
                                key={key}
                                data-aos="fade-up"
                                data-aos-delay={index * 30}
                                type="button"
                                onMouseEnter={() => {
                                  if (!isTechPinned) setSelectedTechnology(key);
                                }}
                                onMouseLeave={() => {
                                  if (!isTechPinned) setSelectedTechnology("");
                                }}
                                onClick={() => {
                                  setIsTechPinned((prevPinned) => {
                                    const nextPinned = !(prevPinned && selectedTechnology === key);
                                    setSelectedTechnology(nextPinned ? key : "");
                                    return nextPinned;
                                  });
                                }}
                              >
                              <TechIconSlot>
                                {icons[key] ? icons[key] : (
                                  <TechFallbackIcon>{(techNames[key] || key).slice(0, 2)}</TechFallbackIcon>
                                )}
                              </TechIconSlot>
                                <TechName>{techNames[key]}</TechName>
                              </IconWrapper>
                            ))}
                          </TechItems>
                        )}
                      </TechCategory>
                    ))}
                  </TechCategories>

                  <DescriptionBox data-aos="fade-up">
                    <TechnologyDescriptionText key={selectedTechnology || "default"}>
                      {selectedTechnology
                        ? descriptions[selectedTechnology]
                        : t("tech.exploreDefault")}
                    </TechnologyDescriptionText>
                  </DescriptionBox>
                </AboutBlock>
              </AboutBlocks>
            </AboutContent>
          </AboutSection>
        </SectionProfile>


        <DivMargin id="projects" />

        <ProjectsSection>
          <ProjectsTitle data-aos="fade-up">{t("projects.title")}</ProjectsTitle>
          
          {projects.map((project, index) => (
            <ProjectItem 
              key={index} 
              $reverse={index % 2 !== 0}
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <ProjectImageWrapper $reverse={index % 2 !== 0} $logoThumbnail={project.logoThumbnail}>
                <img src={project.image} alt={project.name} loading="eager" />
                {project.noteKey && (
                  <ProjectImageNote>{t(project.noteKey)}</ProjectImageNote>
                )}
              </ProjectImageWrapper>
              
              <ProjectInfo $reverse={index % 2 !== 0}>
                <ProjectName>{project.name}</ProjectName>
                
                {project.partner ? (
                  <ProjectPartner>
                    <span>{t("projects.inCollaborationWith")}</span>
                    <PartnerLogoLink
                      href={project.partner.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={t("projects.visitPartnerSiteAria", { name: project.partner.name })}
                    >
                      <img src={project.partner.logo} alt={project.partner.name} loading="eager" />
                      <span>{project.partner.name}</span>
                    </PartnerLogoLink>
                  </ProjectPartner>
                ) : (
                  <ProjectPartner>
                    <span>{t("projects.personal")}</span>
                  </ProjectPartner>
                )}
                
                <ProjectDescription>{t(project.descriptionKey)}</ProjectDescription>
                
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
                      {t("projects.viewSite")}
                    </ProjectLink>
                  )}
                  {project.github && (
                    <ProjectLink 
                      href={project.github} 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      <FaGithubIcon /> {project.githubBe ? t("projects.codeFrontend") : t("projects.code")}
                    </ProjectLink>
                  )}
                  {project.githubBe && (
                    <ProjectLink 
                      href={project.githubBe} 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      <FaGithubIcon /> {t("projects.codeBackend")}
                    </ProjectLink>
                  )}
                </ProjectLinks>
              </ProjectInfo>
            </ProjectItem>
          ))}
        </ProjectsSection>

        <Line />

        <ContactSection id="contact" data-aos="fade-up">
          <ContactTitle>{t("contact.title")}</ContactTitle>
          
          <ContactWrapper>
            <ContactInfo>
              <ContactItem>
                <h3>{t("contact.email")}</h3>
                <a href="mailto:contato@joaopossidonio.com">
                  joaopossidonio.dev@gmail.com
                </a>
              </ContactItem>

              <ContactItem>
                <h3>{t("contact.whatsapp")}</h3>
                <a href="https://wa.me/5524988685043" target="_blank" rel="noopener noreferrer">
                  <FaWhatsappIcon /> +55 (24) 98868-5043
                </a>
              </ContactItem>

              <ContactItem>
                <h3>{t("contact.linkedin")}</h3>
                <a href="https://www.linkedin.com/in/joao-possidonio/" target="_blank" rel="noopener noreferrer">
                  <FaLinkedinIcon /> /joao-possidonio
                </a>
              </ContactItem>

              <ContactItem>
                <h3>{t("contact.github")}</h3>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              <a href="https://github.com/JoaoZ14" target="_blank" rel="noopener noreferrer">
                  <FaGithubIcon /> /JoaoZ14
                </a>
              </ContactItem>
            </ContactInfo>
          </ContactWrapper>
        </ContactSection>

        <Line />
      </DivPrincipal>
    </Wraper>
  );
};

export default LandingPage;
