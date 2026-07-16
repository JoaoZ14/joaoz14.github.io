import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { HiBars3, HiXMark } from "react-icons/hi2";
import { FiMoon, FiSun } from "react-icons/fi";
import { useTheme } from "../context/ThemeContext";

const flagSrc = {
  pt: "/flags/br.svg",
  en: "/flags/us.svg",
  es: "/flags/es.svg",
};

const NavBar = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 64px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 0 var(--container-x);
  z-index: var(--z-nav);
  transition: background-color 0.3s ease, border-color 0.3s ease;

  background-color: ${({ $scrolled }) =>
    $scrolled ? "var(--bg)" : "transparent"};
  border-bottom: 1px solid
    ${({ $scrolled }) => ($scrolled ? "var(--line)" : "transparent")};

  /* No mobile a barra é sempre sólida com borda dura. */
  @media (max-width: 899px) {
    background-color: var(--bg);
    border-bottom-color: var(--line);
  }

  @media (min-width: 900px) {
    height: 80px;
  }
`;

const Brand = styled.a`
  position: relative;
  z-index: var(--z-nav-top);
  display: inline-flex;
  align-items: center;
  text-decoration: none;

  img {
    width: 52px;
    height: auto;
    display: block;
    filter: brightness(0);
    transition: filter 0.3s ease;
  }

  [data-theme="dark"] & img {
    filter: brightness(0) invert(1);
  }

  @media (min-width: 900px) {
    img {
      width: 72px;
    }
  }
`;

const Hamburger = styled.button`
  display: inline-flex;
  background: transparent;
  border: 1px solid var(--line);
  border-radius: 0;
  padding: 8px;
  margin-left: auto;
  z-index: var(--z-nav-top);
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: var(--ink);

  @media (min-width: 900px) {
    display: none;
  }
`;

const HamburgerIcon = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  line-height: 1;
`;

const NavLinks = styled.nav`
  display: ${({ $isOpen }) => ($isOpen ? "flex" : "none")};
  position: fixed;
  inset: 0;
  padding: 96px var(--container-x) 48px;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
  gap: 4px;
  background-color: var(--bg);
  background-image: radial-gradient(var(--line-soft) 1px, transparent 1px);
  background-size: 22px 22px;
  z-index: var(--z-nav-overlay);

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 4px;
    width: 100%;
  }

  a {
    display: block;
    width: 100%;
    box-sizing: border-box;
    padding: 18px 4px;
    text-decoration: none;
    color: var(--text);
    font-family: var(--font-mono);
    font-size: 20px;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    border-bottom: 1px solid var(--line-soft);
    transition: color 0.15s ease, transform 0.15s var(--ease-out);
  }

  a:hover {
    color: var(--accent);
    transform: translateX(8px);
  }

  @media (min-width: 900px) {
    display: flex;
    position: static;
    inset: auto;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    gap: 32px;
    padding: 0;
    background: none;
    z-index: auto;

    ul {
      flex-direction: row;
      align-items: center;
      gap: 32px;
      width: auto;
    }

    a {
      width: auto;
      padding: 8px 0;
      font-size: 13px;
      border-bottom: 1px solid transparent;
    }

    a:hover {
      transform: none;
      color: var(--accent);
      border-bottom-color: var(--accent);
    }
  }
`;

/* CTA sólido preto com hover invertido */
const CtaLink = styled.a`
  &&& {
    color: var(--bg);
    background: var(--ink);
    border: 1px solid var(--ink);
    padding: 18px 4px;
    text-align: center;
    text-transform: uppercase;
    transition: background-color 0.2s ease, color 0.2s ease;
  }

  &&&:hover {
    color: var(--ink);
    background: var(--bg);
  }

  @media (min-width: 900px) {
    &&& {
      padding: 10px 18px;
      font-size: 13px;
    }
    &&&:hover {
      color: var(--ink);
      background: var(--bg);
    }
  }
`;

const LanguageSwitcher = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 0;
  margin-top: 24px;
  align-self: center;

  @media (min-width: 900px) {
    margin-top: 0;
    margin-left: 8px;
    align-self: auto;
  }
`;

const ThemeDivider = styled.span`
  flex-shrink: 0;
  width: 1px;
  height: 18px;
  margin: 0 4px;
  background: color-mix(in srgb, var(--ink) 28%, var(--bg));

  @media (min-width: 900px) {
    height: 16px;
    margin: 0 2px;
  }
`;

const FlagButton = styled.button`
  position: relative;
  width: 30px;
  height: 30px;
  border-radius: 0;
  border: 1px solid ${({ $active }) => ($active ? "var(--accent)" : "var(--line-soft)")};
  background: var(--bg);
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 3px;

  /* Amplia a área de toque para ~44px sem inflar o visual */
  &::after {
    content: "";
    position: absolute;
    inset: -8px;
  }
  opacity: ${({ $active }) => ($active ? 1 : 0.55)};
  filter: ${({ $active }) => ($active ? "none" : "grayscale(1)")};
  transition: opacity 0.15s ease, border-color 0.15s ease, filter 0.15s ease;

  &:hover {
    opacity: 1;
    filter: none;
    border-color: var(--accent);
  }

  @media (min-width: 900px) {
    width: 26px;
    height: 26px;
  }
`;

const FlagImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

/* Switch claro/escuro — track retangular + knob quadrado que desliza */
const ThemeToggle = styled.button`
  position: relative;
  flex-shrink: 0;
  width: 52px;
  height: 30px;
  border-radius: 0;
  border: 1px solid color-mix(in srgb, var(--ink) 42%, var(--bg));
  background: var(--bg-2);
  cursor: pointer;
  padding: 0;
  transition: border-color 0.15s ease, background-color 0.3s ease;

  /* Amplia a área de toque para ~44px sem inflar o visual */
  &::after {
    content: "";
    position: absolute;
    inset: -8px;
  }

  &:hover {
    border-color: var(--ink);
    background: var(--hover);
  }

  @media (min-width: 900px) {
    width: 46px;
    height: 26px;
  }
`;

const ThemeThumb = styled.span`
  position: absolute;
  top: 3px;
  left: 3px;
  width: 22px;
  height: 22px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: var(--ink);
  color: var(--bg);
  pointer-events: none;
  transform: translateX(${({ $on }) => ($on ? "24px" : "0")});
  transition: transform 0.35s var(--ease-out);

  svg {
    font-size: 12px;
  }

  @media (min-width: 900px) {
    width: 18px;
    height: 18px;
    transform: translateX(${({ $on }) => ($on ? "22px" : "0")});

    svg {
      font-size: 11px;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef(null);
  const { t, i18n } = useTranslation();
  const { theme, toggleTheme } = useTheme();

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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Trava a rolagem do fundo enquanto o menu mobile está aberto.
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const toggleMenu = () => setIsOpen((prev) => !prev);

  const currentLang = (i18n.resolvedLanguage || i18n.language || "pt").split("-")[0];
  const setLang = (next) => i18n.changeLanguage(next);
  const closeMenu = () => setIsOpen(false);

  return (
    <NavBar ref={navRef} $scrolled={scrolled || isOpen}>
      <Brand href="#home" onClick={closeMenu}>
        <img src="/brand/logo-mark.png" alt="Logo João Possidonio" />
      </Brand>
      <Hamburger
        type="button"
        aria-label={isOpen ? "Fechar menu de navegação" : "Abrir menu de navegação"}
        aria-expanded={isOpen}
        onClick={toggleMenu}
      >
        <HamburgerIcon>{isOpen ? <HiXMark /> : <HiBars3 />}</HamburgerIcon>
      </Hamburger>
      <NavLinks $isOpen={isOpen} aria-label={t("nav.label")}>
        <ul>
          <li>
            <a href="#about" onClick={closeMenu}>
              {t("nav.about")}
            </a>
          </li>
          <li>
            <a href="#skills" onClick={closeMenu}>
              {t("nav.skills")}
            </a>
          </li>
          <li>
            <a href="#projects" onClick={closeMenu}>
              {t("nav.projects")}
            </a>
          </li>
          <li>
            <CtaLink as="a" href="#contact" onClick={closeMenu}>
              {t("nav.contact")}
            </CtaLink>
          </li>
        </ul>
        <LanguageSwitcher aria-label={t("nav.language")}>
          <ThemeToggle
            type="button"
            role="switch"
            aria-checked={theme === "dark"}
            onClick={toggleTheme}
            aria-label={theme === "dark" ? t("nav.themeToLight") : t("nav.themeToDark")}
            title={theme === "dark" ? t("nav.themeToLight") : t("nav.themeToDark")}
          >
            <ThemeThumb $on={theme === "dark"}>
              {theme === "dark" ? <FiSun /> : <FiMoon />}
            </ThemeThumb>
          </ThemeToggle>
          <ThemeDivider aria-hidden="true" />
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
      </NavLinks>
    </NavBar>
  );
};

export default Navigation;
