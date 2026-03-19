import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

const flagSrc = {
  pt: "/flags/br.svg",
  en: "/flags/us.svg",
  es: "/flags/es.svg",
};

const NavBar = styled.div`
  text-align: center;
  position: fixed !important;
  top: 0 !important;
  left: 0 !important;
  right: 0 !important;
  height: 64px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  background-color: rgba(33, 33, 33, 0.95);
  z-index: 1000 !important;
  box-sizing: border-box;
  padding: 0 var(--container-x);

  @media (min-width: 900px) {
    height: 80px;
  }
`;

const Logo = styled.h1`
  font-family: Georgia, serif;
  font-size: 40px;
  margin: 0;

  img {
    width: 84px;
  }

  @media (min-width: 900px) {
    img {
      width: 100px;
    }
  }
`;

const NavLinks = styled.ul`
  list-style: none;
  display: flex;
  gap: 18px;
  font-family: Times, Times New Roman, serif;
  text-align: center;
  font-size: 15px;
  font-weight: 100;
  align-items: center;
  margin: 0;
  padding: 0;

  a {
    text-decoration: none;
    color: white;
    opacity: 0.92;
    transition: opacity 120ms ease, transform 120ms ease;
    display: inline-block;
    padding: 10px 10px; /* hit-area */
    border-radius: 10px;
  }

  a:hover {
    opacity: 1;
    transform: translateY(-1px);
  }

  @media (min-width: 900px) {
    gap: 36px;
    font-size: 16px;
  }

  @media (max-width: 899px) {
    display: ${({ $isOpen }) => ($isOpen ? "block" : "none")}; /* Esconde/mostra no dropdown */
    position: absolute;
    top: 64px;
    left: 0;
    background-color: rgba(33, 33, 33, 0.95);
    width: 100%;
    text-align: center;
    padding: 18px 0 22px;
    backdrop-filter: blur(10px);
    border-top: 1px solid rgba(255, 255, 255, 0.08);

    li {
      margin: 8px 0;
    }
  }
`;

const Hamburger = styled.div`
  display: none; /* Esconde o botão de hambúrguer no desktop */

  @media (max-width: 899px) {
    display: block;
    cursor: pointer;
  }

  div {
    width: 24px;
    height: 3px;
    background-color: white;
    margin: 5px 0;
    transition: 0.4s;
  }
`;

const LanguageSwitcher = styled.div`
  display: inline-flex;
  gap: 6px;
  padding: 0;
  border-radius: 999px;
  background: transparent;
  border: none;
  box-shadow: none;
  backdrop-filter: none;

  @media (max-width: 899px) {
    margin-top: 10px;
    margin-left: auto;
    margin-right: auto;
  }
`;

const FlagButton = styled.button`
  width: 22px;
  height: 22px;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(255, 255, 255, 0.02);
  color: white;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
  font-size: 15px;
  padding: 0;
  user-select: none;
  transform: translateY(0);
  transition: transform 120ms ease, background 120ms ease, border-color 120ms ease, box-shadow 120ms ease, filter 120ms ease;

  ${({ $active }) =>
    $active
      ? `
    opacity: 1;
    background: rgba(255, 255, 255, 0.04);
    border-color: rgba(255, 255, 255, 0.22);
    box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.12);
  `
      : `
    opacity: 0.78;
  `}

  &:hover {
    opacity: 1;
    background: rgba(255, 255, 255, 0.06);
    border-color: rgba(255, 255, 255, 0.22);
  }

  &:active {
    transform: translateY(0);
  }

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.18);
  }
`;

const FlagImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 999px;
  display: block;
`;

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef(null);
  const { t, i18n } = useTranslation();

  const handleClickOutside = (event) => {
    if (navRef.current && !navRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const currentLang = (i18n.resolvedLanguage || i18n.language || "pt").split("-")[0];
  const setLang = (next) => i18n.changeLanguage(next);

  return (
    <NavBar ref={navRef}>
      <Logo>
        <a href="#home">
          <img src="../Logo/Design sem nome (27)-Photoroom.png" alt="Logo" />
        </a>
      </Logo>
      <Hamburger onClick={toggleMenu}>
        <div />
        <div />
        <div />
      </Hamburger>
      <NavLinks $isOpen={isOpen}>
        <li>
          <a href="#about">{t("nav.about")}</a>
        </li>
        <li>
          <a href="#projects">{t("nav.projects")}</a>
        </li>
        <li>
          <a href="#contact">{t("nav.contact")}</a>
        </li>
        <li>
          <LanguageSwitcher aria-label={t("nav.language")}>
            <FlagButton
              type="button"
              aria-label="Português"
              title="Português"
              $active={currentLang === "pt"}
              onClick={() => setLang("pt")}
            >
              <FlagImage src={flagSrc.pt} alt="Bandeira do Brasil" />
            </FlagButton>
            <FlagButton
              type="button"
              aria-label="English"
              title="English"
              $active={currentLang === "en"}
              onClick={() => setLang("en")}
            >
              <FlagImage src={flagSrc.en} alt="Flag of the United States" />
            </FlagButton>
            <FlagButton
              type="button"
              aria-label="Español"
              title="Español"
              $active={currentLang === "es"}
              onClick={() => setLang("es")}
            >
              <FlagImage src={flagSrc.es} alt="Bandera de España" />
            </FlagButton>
          </LanguageSwitcher>
        </li>
      </NavLinks>
    </NavBar>
  );
};

export default Navigation;
