import React, { useEffect, useState, useRef } from "react";
import styled, { css } from "styled-components";
import { IoIosArrowDown } from "react-icons/io";
import {
  HiOutlineBriefcase,
  HiOutlineChatBubbleLeftRight,
  HiOutlineCodeBracketSquare,
  HiOutlineCommandLine,
  HiOutlineEnvelope,
  HiOutlineSquare3Stack3D,
  HiOutlineUser,
} from "react-icons/hi2";
import { useTranslation } from "react-i18next";
import {
  FaAws,
  FaBolt,
  FaCamera,
  FaCar,
  FaCat,
  FaClock,
  FaCoffee,
  FaDumbbell,
  FaFutbol,
  FaGamepad,
  FaHeadphones,
  FaHorse,
  FaLaptop,
  FaMobileAlt,
  FaMountain,
  FaMugHot,
  FaMusic,
  FaPizzaSlice,
  FaSeedling,
  FaTree,
} from "react-icons/fa";
import { MdOutdoorGrill } from "react-icons/md";
import { GiCowboyBoot } from "react-icons/gi";
import {
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
  FaInstagramIcon,
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

/* ============================================================
   LAYOUT BASE
   ============================================================ */
const Wraper = styled.div`
  background: var(--bg);
  width: 100%;
  overflow-x: clip;
`;

const DivPrincipal = styled.div`
  width: 100%;
  max-width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  overflow-x: clip;
  height: auto;
`;

const DivMargin = styled.div`
  height: 1px;
  scroll-margin-top: 96px;
`;

const Line = styled.div`
  width: 100%;
  height: 1px;
  background-color: var(--line);
  scroll-margin-top: 96px;
`;

/* ============================================================
   HERO
   ============================================================ */
const DivText = styled.section`
  position: relative;
  width: 100%;
  min-height: 92vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  @media (max-width: 900px) {
    min-height: 100svh;
  }
`;

const HeroParallaxLayer = styled.div`
  will-change: transform;
  transform: translate3d(0, 0, 0);
  backface-visibility: hidden;

  @media (prefers-reduced-motion: reduce) {
    will-change: auto;
    transform: none !important;
  }
`;

const HeroDotsLayer = styled(HeroParallaxLayer)`
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
`;

const HeroInner = styled(HeroParallaxLayer)`
  position: relative;
  z-index: 1;
  flex: 1;
  width: 100%;
  max-width: var(--container-max);
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 22px;
  padding: 128px var(--container-x) 88px;
  box-sizing: border-box;

  @media (max-width: 900px) {
    padding: 112px var(--container-x) 64px;
    gap: 18px;
  }
`;

/* Campo de pontos interativo do hero — "ímã ao contrário":
   os pontos fogem do cursor e voltam suave à origem ao afastar. */
const HeroCanvas = styled.canvas`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  pointer-events: none;
`;

const HeroDotField = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const SPACING = 24; // mesmo espaçamento do grid CSS anterior
    const DOT_RADIUS = 1.1;
    const INFLUENCE = 130; // raio de ação do cursor (px)
    const MAX_PUSH = 28; // deslocamento máximo por ponto (px)
    const EASE = 0.15; // suavização do retorno
    // Cores lidas do design system para acompanhar o tema (claro/escuro):
    // BASE = --line-soft (ponto em repouso), NEAR = --ink (ponto sob o cursor).
    let BASE = { r: 226, g: 226, b: 226 };
    let NEAR = { r: 0, g: 0, b: 0 };

    const hexToRgb = (hex) => {
      const v = (hex || "").trim().replace("#", "");
      if (v.length === 3) {
        return {
          r: Number.parseInt(v[0] + v[0], 16),
          g: Number.parseInt(v[1] + v[1], 16),
          b: Number.parseInt(v[2] + v[2], 16),
        };
      }
      if (v.length >= 6) {
        return {
          r: Number.parseInt(v.slice(0, 2), 16),
          g: Number.parseInt(v.slice(2, 4), 16),
          b: Number.parseInt(v.slice(4, 6), 16),
        };
      }
      return null;
    };

    const readThemeColors = () => {
      const cs = getComputedStyle(document.documentElement);
      BASE = hexToRgb(cs.getPropertyValue("--line-soft")) || BASE;
      NEAR = hexToRgb(cs.getPropertyValue("--ink")) || NEAR;
    };

    readThemeColors();

    let dots = [];
    let width = 0;
    let height = 0;
    let dpr = 1;
    let rafId = null;
    const mouse = { x: -9999, y: -9999, active: false };

    const buildDots = () => {
      dots = [];
      const cols = Math.ceil(width / SPACING);
      const rows = Math.ceil(height / SPACING);
      const offsetX = (width - cols * SPACING) / 2 + SPACING / 2;
      const offsetY = (height - rows * SPACING) / 2 + SPACING / 2;
      for (let r = 0; r <= rows; r++) {
        for (let c = 0; c <= cols; c++) {
          const hx = offsetX + c * SPACING;
          const hy = offsetY + r * SPACING;
          dots.push({ hx, hy, x: hx, y: hy });
        }
      }
    };

    const drawStatic = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = `rgb(${BASE.r}, ${BASE.g}, ${BASE.b})`;
      for (const d of dots) {
        ctx.beginPath();
        ctx.arc(d.hx, d.hy, DOT_RADIUS, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      let moving = false;

      for (const d of dots) {
        let tx = d.hx;
        let ty = d.hy;
        let strength = 0;

        if (mouse.active) {
          const dx = d.hx - mouse.x;
          const dy = d.hy - mouse.y;
          const dist = Math.hypot(dx, dy);
          if (dist < INFLUENCE && dist > 0.0001) {
            strength = 1 - dist / INFLUENCE;
            const push = strength * MAX_PUSH;
            tx = d.hx + (dx / dist) * push;
            ty = d.hy + (dy / dist) * push;
          }
        }

        d.x += (tx - d.x) * EASE;
        d.y += (ty - d.y) * EASE;

        if (Math.abs(tx - d.x) > 0.1 || Math.abs(ty - d.y) > 0.1) {
          moving = true;
        }

        const r = Math.round(BASE.r + (NEAR.r - BASE.r) * strength);
        const g = Math.round(BASE.g + (NEAR.g - BASE.g) * strength);
        const b = Math.round(BASE.b + (NEAR.b - BASE.b) * strength);
        ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
        ctx.beginPath();
        ctx.arc(d.x, d.y, DOT_RADIUS, 0, Math.PI * 2);
        ctx.fill();
      }

      rafId = moving || mouse.active ? requestAnimationFrame(draw) : null;
    };

    const requestTick = () => {
      if (rafId == null) rafId = requestAnimationFrame(draw);
    };

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      if (!width || !height) return;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildDots();
      if (prefersReduced) drawStatic();
      else requestTick();
    };

    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      mouse.active = x >= 0 && y >= 0 && x <= rect.width && y <= rect.height;
      if (mouse.active) {
        mouse.x = x;
        mouse.y = y;
      }
      requestTick();
    };

    resize();

    if (!prefersReduced) {
      window.addEventListener("mousemove", onMove, { passive: true });
    }
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    // Reage à troca de tema: recarrega as cores e redesenha.
    const themeObserver = new MutationObserver(() => {
      readThemeColors();
      if (prefersReduced) drawStatic();
      else requestTick();
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => {
      window.removeEventListener("mousemove", onMove);
      ro.disconnect();
      themeObserver.disconnect();
      if (rafId != null) cancelAnimationFrame(rafId);
    };
  }, []);

  return <HeroCanvas ref={canvasRef} aria-hidden="true" />;
};

const HeroWatermark = styled(HeroParallaxLayer)`
  position: absolute;
  left: var(--container-x);
  bottom: 4%;
  z-index: 0;
  font-family: var(--font-display);
  font-weight: 900;
  font-size: clamp(64px, 17vw, 228px);
  line-height: 0.82;
  letter-spacing: -0.05em;
  color: var(--watermark);
  pointer-events: none;
  user-select: none;
  white-space: normal;
  max-width: min(100%, calc(100% - var(--container-x) * 2));
`;

const TextFirst = styled.h1`
  position: relative;
  z-index: 1;
  margin: 0;
  font-family: var(--font-display);
  font-weight: 900;
  font-size: clamp(48px, 9vw, 104px);
  line-height: 0.92;
  letter-spacing: -0.045em;
  color: var(--ink);
`;

const TextSecond = styled.h2`
  position: relative;
  z-index: 1;
  margin: 0;
  max-width: 46ch;
  font-family: var(--font-display);
  font-weight: 700;
  font-size: clamp(22px, 3.4vw, 38px);
  line-height: 1.08;
  letter-spacing: -0.03em;
  color: var(--text-2);

  p {
    margin: 18px 0 0;
    display: inline-flex;
    align-items: center;
    gap: 12px;
    font-family: var(--font-mono);
    font-weight: 500;
    font-size: clamp(12px, 1.6vw, 14px);
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: var(--text);
  }

  p::before {
    content: "";
    width: 40px;
    height: 1px;
    background: var(--ink);
  }
`;

const DivIcons = styled.div`
  position: relative;
  z-index: 1;
  margin-top: 10px;
  display: flex;
  gap: 10px;

  a {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 46px;
    height: 46px;
    border: 1px solid var(--line);
    background: var(--bg);
    transition: background-color 0.2s ease, transform 0.2s ease;
  }

  a:hover {
    background: var(--hover);
    transform: translateY(-2px);
  }

  @media (max-width: 600px) {
    gap: 8px;
    a {
      width: 44px;
      height: 44px;
    }
  }
`;

/* Botão Currículo — primary (preto sólido, hover invertido) */
const ButtonCVContainer = styled.div`
  position: relative;
  z-index: 2;
  display: inline-block;
  margin-top: 8px;
`;

const ButtonCV = styled.button`
  background: var(--ink);
  border: 1px solid var(--ink);
  border-radius: 0;
  color: var(--bg);
  font-family: var(--font-mono);
  font-size: 13px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 14px 22px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  transition: background-color 0.2s ease, color 0.2s ease;

  &:hover {
    background: var(--bg);
    color: var(--ink);
  }
`;

const ArrowIcon = styled(IoIosArrowDown)`
  font-size: 16px;
  color: currentColor;
  transition: transform 0.3s ease;
  transform: ${({ $isOpen }) => ($isOpen ? "rotate(180deg)" : "rotate(0deg)")};
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  background: var(--bg);
  border: 1px solid var(--line);
  border-radius: 0;
  min-width: 180px;
  opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
  visibility: ${({ $isOpen }) => ($isOpen ? "visible" : "hidden")};
  transform: ${({ $isOpen }) => ($isOpen ? "translateY(0)" : "translateY(-8px)")};
  transition: opacity 0.2s ease, transform 0.2s ease, visibility 0.2s ease;
  z-index: 1000;
`;

const DropdownItem = styled.button`
  width: 100%;
  padding: 13px 16px;
  border: none;
  background: transparent;
  color: var(--text);
  text-align: left;
  cursor: pointer;
  font-family: var(--font-mono);
  font-size: 13px;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  transition: background-color 0.2s ease;

  &:hover {
    background: var(--hover);
  }

  &:first-child {
    border-bottom: 1px solid var(--line-soft);
  }
`;

/* ============================================================
   SEÇÕES DE CONTEÚDO — títulos
   ============================================================ */
const sectionTitle = css`
  position: relative;
  margin: 0 0 40px;
  font-family: var(--font-display);
  font-weight: 800;
  font-size: clamp(28px, 5vw, 46px);
  line-height: 1.02;
  letter-spacing: -0.04em;
  color: var(--ink);
  display: inline-flex;
  align-items: center;
  gap: 14px;
  text-wrap: balance;

  @media (min-width: 900px) {
    margin-bottom: 56px;
  }
`;

const SectionLead = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 34px;
  height: 34px;
  border: 1px solid var(--ink);
  color: var(--ink);
  background: var(--bg);

  svg {
    width: 16px;
    height: 16px;
    stroke-width: 1.6;
  }

  @media (min-width: 900px) {
    width: 40px;
    height: 40px;

    svg {
      width: 18px;
      height: 18px;
    }
  }
`;

const SectionProfile = styled.section`
  width: 100%;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const AboutSection = styled.section`
  width: 100%;
  max-width: var(--container-max);
  margin: 0 auto;
  padding: var(--section-y) var(--container-x);
  box-sizing: border-box;
  background: var(--bg);
  color: var(--text);
  position: relative;
`;

const AboutContent = styled.div`
  width: 100%;
  position: relative;
  z-index: 1;
`;

const AboutBlocks = styled.div`
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: clamp(72px, 11vw, 96px);

  @media (min-width: 900px) {
    gap: clamp(64px, 9vw, 112px);
  }
`;

const AboutBlock = styled.div`
  position: relative;
  text-align: left;
  scroll-margin-top: 96px;
  overflow: visible;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0;
  will-change: transform;
  backface-visibility: hidden;

  ${({ $withLifeField }) =>
    $withLifeField &&
    css`
      overflow: hidden;
      min-height: 320px;
      padding-bottom: var(--space-2xl);

      @media (min-width: 900px) {
        display: grid;
        grid-template-columns: minmax(0, 48ch) minmax(160px, 1fr);
        column-gap: clamp(32px, 5vw, 64px);
        align-items: start;
      }
    `}

  ${({ $spaceBefore }) =>
    $spaceBefore &&
    css`
      margin-top: clamp(32px, 7vw, 56px);
      padding-top: clamp(32px, 7vw, 56px);
      border-top: 1px solid var(--line-soft);

      @media (min-width: 900px) {
        margin-top: clamp(40px, 6vw, 80px);
        padding-top: clamp(40px, 6vw, 72px);
      }
    `}

  @media (prefers-reduced-motion: reduce) {
    will-change: auto;
    transform: none !important;
  }

  /* Mobile: sem translate de parallax — seções em fluxo não podem se sobrepor */
  @media (max-width: 899px) {
    will-change: auto;
    transform: none !important;
  }
`;

const AboutSectionTitle = styled.h2`
  ${sectionTitle}
  position: relative;
  z-index: 1;

  ${({ $span }) =>
    $span &&
    css`
      @media (min-width: 900px) {
        grid-column: 1 / -1;
      }
    `}
`;

const AboutIconFieldRoot = styled.div`
  display: grid;
  position: absolute;
  inset: 0;
  z-index: 0;
  width: 100%;
  height: 100%;
  color: var(--ink);
  opacity: 0.14;
  pointer-events: none;
  user-select: none;
`;

const AboutIconCell = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;

  svg {
    width: 13px;
    height: 13px;
  }
`;

const AboutMedia = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  align-self: stretch;
  align-items: center;
  justify-content: center;
  margin-top: var(--space-xl);
  min-height: 280px;
  padding: var(--space-lg) 0 var(--space-md);

  @media (min-width: 900px) {
    margin-top: 0;
    padding: 0;
    grid-column: 2;
    grid-row: 2;
    min-height: 320px;
  }
`;

const AboutPortrait = styled.div`
  position: relative;
  z-index: 1;
  width: min(72%, 260px);
  aspect-ratio: 1 / 1;
  border: 1px solid var(--line);
  background: var(--bg-2);
  overflow: hidden;
  box-shadow: 8px 8px 0 0 var(--ink);

  @media (min-width: 900px) {
    width: min(94%, 340px);
  }

  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    /* Face / boné; corta espelho, placa e celular. */
    object-position: 50% 22%;
  }
`;

const AboutCopy = styled.div`
  position: relative;
  z-index: 1;
  max-width: 48ch;
  padding: var(--space-md) var(--space-lg);
  border-left: 1px solid var(--line);
  background: transparent;

  @media (min-width: 900px) {
    grid-column: 1;
    grid-row: 2;
    padding: var(--space-md) var(--space-xl);
  }
`;

const AboutSectionText = styled.p`
  font-size: clamp(15px, 1.35vw, 17px);
  line-height: 1.85;
  color: var(--text-2);
  font-family: var(--font-editorial);
  margin: 0 0 20px;
  max-width: 48ch;
  text-wrap: pretty;

  &:last-child {
    margin-bottom: 0;
  }

  ${({ $lead }) =>
    $lead &&
    css`
      &::first-letter {
        float: left;
        font-family: var(--font-display);
        font-weight: 800;
        font-size: 3.35em;
        line-height: 0.82;
        letter-spacing: -0.04em;
        color: var(--ink);
        padding: 4px 10px 0 0;
      }
    `}
`;

/* ============================================================
   EXPERIÊNCIA
   ============================================================ */
const ExperienceTitle = styled.h3`
  ${sectionTitle}
`;

const CompanyHeader = styled.div`
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  flex-wrap: wrap;
  margin: 0 0 var(--space-md);
`;

const CompanyLogo = styled.img`
  width: 44px;
  height: 44px;
  object-fit: contain;
  border: 1px solid var(--line);
  padding: var(--space-xs);
  background: var(--bg);
`;

const CompanyName = styled.h3`
  font-size: clamp(24px, 3vw, 32px);
  margin: 0;
  font-family: var(--font-display);
  font-weight: 800;
  color: var(--ink);
  text-transform: lowercase;
  letter-spacing: -0.03em;
`;

const CompanyDescription = styled.p`
  margin: 0 0 var(--space-xl);
  max-width: 62ch;
  font-size: 15px;
  line-height: 1.85;
  color: var(--text-2);
  font-family: var(--font-editorial);
  text-wrap: pretty;
`;

const ExperienceTimeline = styled.div`
  --exp-pad: var(--space-lg);
  position: relative;
  width: 100%;
  margin: 0;
  padding-left: var(--exp-pad);
  border-left: 1px solid var(--line-soft);
  box-sizing: border-box;

  @media (max-width: 768px) {
    --exp-pad: var(--space-md);
  }
`;

const ExperienceTimelineItem = styled.div`
  position: relative;
  margin-bottom: var(--space-xl);

  /* Nó sólido ancorado no eixo da timeline (minimal-brutal, radius 0) */
  &::before {
    content: "";
    position: absolute;
    top: 5px;
    left: calc(-1 * var(--exp-pad) - 5px);
    width: 9px;
    height: 9px;
    background: var(--ink);
  }

  &:last-child {
    margin-bottom: 0;
  }
`;

const ExperienceCard = styled.div`
  text-align: left;
  width: 100%;
`;

const ExperienceRole = styled.div`
  font-size: clamp(17px, 2vw, 20px);
  font-weight: 700;
  color: var(--ink);
  font-family: var(--font-display);
  letter-spacing: -0.02em;

  @media (max-width: 768px) {
    line-height: 1.4;
    word-break: break-word;
    overflow-wrap: anywhere;
  }
`;

const ExperiencePeriod = styled.span`
  display: block;
  margin-bottom: var(--space-xs);
  font-family: var(--font-mono);
  font-size: 12px;
  font-weight: 400;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--text-3);
`;

const ExperienceDivider = styled.div`
  width: 100%;
  height: 1px;
  background: var(--line-soft);
  margin: var(--space-md) 0;
`;

const ExperiencePhrases = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
`;

const ExperiencePhrase = styled.p`
  position: relative;
  margin: 0;
  padding-left: var(--space-md);
  max-width: 62ch;
  font-size: 14px;
  line-height: 1.8;
  color: var(--text-2);
  font-family: var(--font-editorial);
  text-wrap: pretty;

  &::before {
    content: "";
    position: absolute;
    left: 0;
    top: 10px;
    width: 8px;
    height: 1px;
    background: var(--ink);
  }

  @media (max-width: 768px) {
    font-size: 13px;
    word-break: break-word;
    overflow-wrap: anywhere;
  }
`;

/* ============================================================
   HABILIDADES
   ============================================================ */
/* Faixas editoriais: label à esquerda, conteúdo à direita */
const SkillsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  border-top: 1px solid var(--line);
`;

const SkillCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
  padding: clamp(24px, 4vw, 40px) 0;
  border-bottom: 1px solid var(--line-soft);
  align-items: flex-start;

  &:last-child {
    border-bottom: none;
  }

  h3 {
    margin: 0;
    color: var(--ink);
    font-family: var(--font-display);
    font-weight: 800;
    font-size: clamp(20px, 2.4vw, 26px);
    line-height: 1.02;
    letter-spacing: -0.035em;
    text-align: left;
    text-wrap: balance;
  }
`;

/* Coluna de conteúdo (resumo + lista) da faixa */
const SkillBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--space-md);
`;

const SkillSummary = styled.p`
  margin: 0;
  font-size: clamp(15px, 1.3vw, 16px);
  line-height: 1.7;
  color: var(--text);
  font-family: var(--font-body);
  text-align: left;
  max-width: 60ch;
`;

const SkillList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
  width: 100%;
  max-width: 60ch;
`;

const SkillListItem = styled.li`
  position: relative;
  padding-left: 22px;
  text-align: left;
  font-family: var(--font-mono);
  font-size: 13px;
  line-height: 1.55;
  letter-spacing: 0.01em;
  color: var(--text-2);

  &::before {
    content: "";
    position: absolute;
    left: 0;
    top: 9px;
    width: 12px;
    height: 1px;
    background: var(--ink);
  }
`;

/* ============================================================
   TECNOLOGIAS
   ============================================================ */
const TechTitle = styled.h3`
  ${sectionTitle}
`;

const TechCategories = styled.div`
  width: 100%;
  margin: 0;
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;

  @media (min-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
    column-gap: 48px;
    row-gap: 44px;
  }
`;

const TechCategory = styled.div`
  text-align: left;
  align-self: start;
`;

const TechCategoryTitle = styled.h4`
  margin: 0 0 18px;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--line);
  font-size: 12px;
  font-family: var(--font-mono);
  font-weight: 500;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--text);
  display: inline-flex;
  align-items: center;
  gap: 8px;

  svg {
    width: 14px;
    height: 14px;
    flex-shrink: 0;
    color: var(--ink);
    stroke-width: 1.6;
  }
`;

const TechItems = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
  align-items: stretch;
  overflow: visible;

  @media (min-width: 520px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  @media (min-width: 900px) {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
`;

const techTooltipBase = css`
  position: absolute;
  bottom: calc(100% + 10px);
  left: 50%;
  transform: translateX(-50%);
  width: max-content;
  max-width: min(240px, 72vw);
  padding: 10px 12px;
  background: var(--ink);
  color: var(--bg);
  font-family: var(--font-body);
  font-size: 13px;
  line-height: 1.5;
  text-align: left;
  text-transform: none;
  letter-spacing: normal;
  text-wrap: pretty;
  z-index: var(--z-tooltip);
  pointer-events: none;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.2s ease, visibility 0.2s ease;
  box-sizing: border-box;

  &::after {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    border: 6px solid transparent;
    border-top-color: var(--ink);
  }

  /* Mobile: mesma largura do card da tech */
  @media (max-width: 899px) {
    left: 0;
    right: 0;
    width: 100%;
    max-width: none;
    transform: none;

    &::after {
      left: 50%;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

const tooltipVisible = css`
  opacity: 1;
  visibility: visible;
`;

/* Chip quadrado com borda */
const IconWrapper = styled.button`
  position: relative;
  appearance: none;
  border: 1px solid var(--line-soft);
  background: var(--bg);
  border-radius: 0;
  padding: 14px 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  cursor: pointer;
  color: var(--ink);
  min-height: 104px;
  overflow: visible;
  transition: border-color 0.2s ease, background-color 0.2s ease,
    transform 0.2s ease;

  ${({ $raised }) =>
    $raised &&
    css`
      z-index: 3;
    `}

  &:hover,
  &:focus-visible {
    z-index: 3;
    border-color: var(--ink);
    background: var(--hover);
  }

  &:focus-visible {
    outline: 2px solid var(--ink);
    outline-offset: 2px;
  }

  svg {
    font-size: 34px;
    color: var(--ink);
  }
`;

const TechIconSlot = styled.div`
  width: 40px;
  height: 40px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: var(--ink);
`;

const TechFallbackIcon = styled.div`
  width: 40px;
  height: 40px;
  border: 1px solid var(--line);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: var(--ink);
  font-family: var(--font-mono);
  font-weight: 500;
  letter-spacing: 0.05em;
  font-size: 12px;
  text-transform: uppercase;
`;

const TechName = styled.span`
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--text-2);
  text-align: center;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  line-height: 1.3;
  max-width: 104px;
  word-break: break-word;
`;

const TechTooltip = styled.span`
  ${techTooltipBase}

  ${({ $active }) => $active && tooltipVisible}

  @media (hover: hover) and (pointer: fine) {
    ${IconWrapper}:hover &,
    ${IconWrapper}:focus-visible & {
      ${tooltipVisible}
    }
  }
`;

const SoftSkillsProse = styled.p`
  margin: 0;
  max-width: 65ch;
  font-size: 15px;
  line-height: 1.7;
  color: var(--text-2);
  font-family: var(--font-body);
  text-wrap: pretty;
`;

const TechToggle = styled.button`
  margin-top: var(--space-md);
  padding: 10px 14px;
  border: 1px solid var(--line);
  background: var(--bg);
  color: var(--ink);
  font-family: var(--font-mono);
  font-size: 12px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  cursor: pointer;
  transition: background-color 0.2s ease, color 0.2s ease;

  &:hover {
    background: var(--ink);
    color: var(--bg);
  }
`;

const ProjectPrivateNote = styled.p`
  margin: var(--space-sm) 0 0;
  max-width: 52ch;
  font-family: var(--font-mono);
  font-size: 12px;
  letter-spacing: 0.04em;
  color: var(--text-3);
  line-height: 1.5;
`;

/* ============================================================
   PROJETOS — layout editorial
   ============================================================ */
const ProjectsSection = styled.section`
  width: 100%;
  max-width: var(--container-max);
  margin: 0 auto;
  padding: var(--section-y) var(--container-x);
  scroll-margin-top: 96px;
  box-sizing: border-box;
  will-change: transform;
  backface-visibility: hidden;

  @media (prefers-reduced-motion: reduce) {
    will-change: auto;
    transform: none !important;
  }

  @media (max-width: 899px) {
    will-change: auto;
    transform: none !important;
  }
`;

const ProjectsTitle = styled.h2`
  ${sectionTitle}
  margin-bottom: var(--space-xl);

  @media (min-width: 900px) {
    margin-bottom: var(--space-2xl);
  }
`;

const ProjectShowcase = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-xl);

  @media (min-width: 900px) {
    grid-template-columns: minmax(0, 1.05fr) minmax(0, 0.95fr);
    gap: clamp(40px, 5vw, 72px);
    align-items: start;
  }
`;

const ProjectIndexList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  border-top: 1px solid var(--line);

  li {
    list-style: none;
  }
`;

const ProjectRowMarker = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 20px;
  font-family: var(--font-mono);
  font-size: 18px;
  line-height: 1;
  color: var(--text-3);
  transition: transform 0.25s var(--ease-out), color 0.25s var(--ease-out);
`;

const ProjectRowIndexNum = styled.span`
  font-family: var(--font-mono);
  font-size: 12px;
  letter-spacing: 0.1em;
  color: inherit;
  opacity: 0.65;
`;

const ProjectRowName = styled.span`
  font-family: var(--font-display);
  font-weight: 800;
  font-size: clamp(22px, 3.4vw, 40px);
  letter-spacing: -0.04em;
  line-height: 1.05;
  color: inherit;
  text-wrap: balance;
  transition: transform 0.25s var(--ease-out);
`;

const ProjectIndexRow = styled.button`
  appearance: none;
  width: 100%;
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: baseline;
  gap: var(--space-md);
  padding: clamp(16px, 2.2vw, 24px) 0;
  border: 0;
  border-bottom: 1px solid var(--line-soft);
  background: transparent;
  cursor: pointer;
  text-align: left;
  color: var(--text-3);
  transition: color 0.25s var(--ease-out);

  &:hover,
  &[aria-current="true"],
  &[aria-expanded="true"] {
    color: var(--ink);
  }

  &:hover ${ProjectRowMarker},
  &[aria-current="true"] ${ProjectRowMarker},
  &[aria-expanded="true"] ${ProjectRowMarker} {
    color: var(--ink);
  }

  @media (hover: hover) and (pointer: fine) {
    &:hover ${ProjectRowName},
    &[aria-current="true"] ${ProjectRowName} {
      transform: translateX(var(--space-sm));
    }

    &:hover ${ProjectRowMarker},
    &[aria-current="true"] ${ProjectRowMarker} {
      transform: translateX(4px);
    }
  }

  &:focus-visible {
    outline: 2px solid var(--ink);
    outline-offset: 2px;
  }

  @media (prefers-reduced-motion: reduce) {
    ${ProjectRowName},
    ${ProjectRowMarker} {
      transition: color 0.25s var(--ease-out);
      transform: none;
    }
  }
`;

const ProjectPreview = styled.div`
  position: sticky;
  top: 96px;
  display: flex;
  flex-direction: column;
  gap: var(--space-lg);
`;

const ProjectPreviewFade = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-lg);
  animation: projectFade 0.4s var(--ease-out) both;

  @keyframes projectFade {
    from {
      opacity: 0;
      transform: translateY(8px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

const ProjectAccordionPanel = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-lg);
  padding: var(--space-md) 0 var(--space-xl);
  animation: projectFade 0.35s var(--ease-out) both;

  @keyframes projectFade {
    from {
      opacity: 0;
      transform: translateY(6px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

const ProjectImageWrapper = styled.div`
  position: relative;
  overflow: hidden;
  order: 0;
  border: 1px solid var(--line);
  background: var(--surface);

  img {
    width: 100%;
    height: clamp(240px, 35vw, 380px);
    object-fit: cover;
    display: block;
    transition: transform 0.45s var(--ease-out);
  }

  &:hover img {
    transform: scale(1.03);
  }

  @media (min-width: 900px) {
    order: ${({ $reverse }) => ($reverse ? "1" : "0")};
  }

  @media (prefers-reduced-motion: reduce) {
    img {
      transition: none;
    }
    &:hover img {
      transform: none;
    }
  }

  ${({ $logoThumbnail }) =>
    $logoThumbnail &&
    css`
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--bg-2);
      min-height: clamp(200px, 28vw, 280px);

      img {
        width: auto;
        height: auto;
        max-width: 50%;
        max-height: 60%;
        object-fit: contain;
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
  padding: var(--space-sm) var(--space-md);
  background: var(--ink);
  color: var(--bg);
  font-size: 11px;
  font-family: var(--font-mono);
  letter-spacing: 0.04em;
  line-height: 1.4;
  text-align: left;
`;

const ProjectPartner = styled.div`
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  flex-wrap: wrap;

  span {
    font-family: var(--font-mono);
    font-size: 11px;
    color: var(--text-2);
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }
`;

const PartnerLogoLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: var(--space-xs);
  transition: opacity 0.2s var(--ease-out);
  opacity: 0.8;
  text-decoration: none;
  border-radius: 0;

  &:hover {
    opacity: 1;
  }

  &:focus-visible {
    opacity: 1;
    outline: 2px solid var(--ink);
    outline-offset: 2px;
  }

  img {
    height: 20px;
    width: auto;
  }

  span {
    font-family: var(--font-mono);
    font-size: 12px;
    color: var(--text-2);
    letter-spacing: 0.04em;
    text-transform: none;
  }
`;

const ProjectDescription = styled.p`
  font-size: 15px;
  line-height: 1.7;
  color: var(--text-2);
  font-family: var(--font-body);
  margin: 0;
  max-width: 65ch;
  text-wrap: pretty;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const ProjectActions = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--space-md);
  width: 100%;
`;

const ProjectTechLabel = styled.span`
  display: block;
  margin-bottom: var(--space-xs);
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--text-3);
`;

const ProjectTechnologies = styled.div`
  display: flex;
  gap: var(--space-md);
  flex-wrap: wrap;
`;

const ProjectTechIcon = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  color: var(--ink);

  svg {
    font-size: 20px;
    color: currentColor;
    transition: transform 0.2s var(--ease-out);
  }

  ${TechFallbackIcon} {
    width: 28px;
    height: 28px;
    font-size: 10px;
  }

  &:hover svg {
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    width: 40px;
    height: 40px;

    svg {
      font-size: 18px;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    svg {
      transition: none;
    }

    &:hover svg {
      transform: none;
    }
  }
`;

const ProjectLinks = styled.div`
  display: flex;
  gap: var(--space-sm);
  align-items: center;
  flex-wrap: wrap;

  @media (max-width: 599px) {
    display: grid;
    grid-template-columns: 1fr;
    width: 100%;
    gap: var(--space-sm);

    ${({ $dualCode }) =>
      $dualCode &&
      css`
        grid-template-columns: 1fr 1fr;
      `}
  }
`;

const ProjectLink = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-xs);
  min-height: 44px;
  padding: var(--space-sm) var(--space-lg);
  border: 1px solid var(--line);
  border-radius: 0;
  text-decoration: none;
  font-family: var(--font-mono);
  font-size: 12px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  transition: background-color 0.2s var(--ease-out), color 0.2s var(--ease-out),
    transform 0.15s var(--ease-out);

  svg {
    font-size: 16px;
    color: currentColor;
  }

  &:focus-visible {
    outline: 2px solid var(--ink);
    outline-offset: 2px;
  }

  &:active {
    transform: translateY(1px);
  }

  ${({ $primary }) =>
    $primary
      ? css`
          background: var(--ink);
          color: var(--bg);

          &:hover {
            background: var(--bg);
            color: var(--ink);
          }
        `
      : css`
          background: transparent;
          color: var(--text);

          &:hover {
            background: var(--ink);
            color: var(--bg);
          }
        `}

  ${({ $spanFull }) =>
    $spanFull &&
    css`
      @media (max-width: 599px) {
        grid-column: 1 / -1;
      }
    `}

  @media (max-width: 768px) {
    font-size: 12px;
    padding: var(--space-sm) var(--space-md);
    width: 100%;
    box-sizing: border-box;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: background-color 0.2s var(--ease-out), color 0.2s var(--ease-out);

    &:active {
      transform: none;
    }
  }
`;

/* ============================================================
   CONTATO
   ============================================================ */
const ContactSection = styled.section`
  width: 100%;
  max-width: var(--container-max);
  margin: 0 auto;
  padding: var(--section-y) var(--container-x);
  scroll-margin-top: 96px;
  box-sizing: border-box;
  will-change: transform;
  backface-visibility: hidden;

  @media (prefers-reduced-motion: reduce) {
    will-change: auto;
    transform: none !important;
  }

  @media (max-width: 899px) {
    will-change: auto;
    transform: none !important;
  }
`;

const ContactTitle = styled.h2`
  ${sectionTitle}
`;

const ContactWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;
  align-items: start;
`;

const ContactInfo = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 0;
  border-top: 1px solid var(--line);

  @media (min-width: 760px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const ContactItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  padding: 24px 0;
  border-bottom: 1px solid var(--line-soft);

  h3 {
    font-size: 12px;
    font-family: var(--font-mono);
    font-weight: 500;
    color: var(--text-3);
    letter-spacing: 0.1em;
    text-transform: uppercase;
    margin: 0;
  }

  a {
    font-size: clamp(16px, 2vw, 20px);
    font-family: var(--font-display);
    font-weight: 700;
    color: var(--ink);
    text-decoration: none;
    transition: opacity 0.2s ease;
    display: inline-flex;
    align-items: center;
    gap: 10px;
    word-break: break-word;
    letter-spacing: -0.02em;

    svg {
      font-size: 18px;
      color: var(--ink);
      flex-shrink: 0;
    }

    &:hover {
      opacity: 0.6;
    }
  }

  @media (min-width: 760px) {
    padding: 24px;

    &:nth-child(odd) {
      border-right: 1px solid var(--line-soft);
    }
  }
`;

const ABOUT_LIFE_ICONS = [
  FaGamepad,
  FaDumbbell,
  FaCar,
  FaSeedling,
  FaFutbol,
  FaHorse,
  FaMusic,
  FaCoffee,
  MdOutdoorGrill,
  FaPizzaSlice,
  FaBolt,
  FaMountain,
  FaTree,
  GiCowboyBoot,
  FaHeadphones,
  FaLaptop,
  FaCamera,
  FaMobileAlt,
  FaClock,
  FaCat,
  FaMugHot,
];

/** PRNG estável → mesma sequência a cada rebuild da grade. */
const seededRandom = (seed) => {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
};

const ABOUT_ICON_SPACING = 48;

const AboutLifeField = () => {
  const rootRef = useRef(null);
  const [grid, setGrid] = useState({ cols: 0, rows: 0, icons: [] });

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    const build = () => {
      const { width, height } = root.getBoundingClientRect();
      if (width < 8 || height < 8) return;

      // Preenche a largura (e a altura) inteiras sem sobra nas laterais.
      const cols = Math.max(1, Math.round(width / ABOUT_ICON_SPACING));
      const rows = Math.max(1, Math.round(height / ABOUT_ICON_SPACING));
      const rand = seededRandom(14072026);
      const icons = Array.from({ length: cols * rows }, () => {
        const index = Math.floor(rand() * ABOUT_LIFE_ICONS.length);
        return ABOUT_LIFE_ICONS[index];
      });

      setGrid({ cols, rows, icons });
    };

    build();
    const observer = new ResizeObserver(build);
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  return (
    <AboutIconFieldRoot
      ref={rootRef}
      aria-hidden="true"
      style={{
        gridTemplateColumns: grid.cols > 0 ? `repeat(${grid.cols}, 1fr)` : undefined,
        gridTemplateRows: grid.rows > 0 ? `repeat(${grid.rows}, 1fr)` : undefined,
      }}
    >
      {grid.icons.map((Icon, cellIndex) => (
        <AboutIconCell key={cellIndex}>
          <Icon />
        </AboutIconCell>
      ))}
    </AboutIconFieldRoot>
  );
};

const FINE_POINTER_QUERY = "(hover: hover) and (pointer: fine)";
const SHOWCASE_QUERY = "(min-width: 900px) and (hover: hover) and (pointer: fine)";

const LandingPage = () => {
  const { t } = useTranslation();
  const [showDropdown, setShowDropdown] = useState(false);
  const [activeTooltip, setActiveTooltip] = useState("");
  const [canHover, setCanHover] = useState(() =>
    typeof window !== "undefined" && window.matchMedia(FINE_POINTER_QUERY).matches
  );
  const [projectShowcase, setProjectShowcase] = useState(() =>
    typeof window !== "undefined" && window.matchMedia(SHOWCASE_QUERY).matches
  );
  const [activeProject, setActiveProject] = useState(0);
  const [openProject, setOpenProject] = useState(0);
  const [showAllTech, setShowAllTech] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    AOS.init({
      duration: 700,
      easing: "ease-out",
      once: true,
      offset: 40,
    });
  }, []);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches) return undefined;

    let frame = 0;
    const narrowQuery = window.matchMedia("(max-width: 899px)");

    const update = () => {
      frame = 0;
      const mid = window.innerHeight * 0.5;
      const isNarrow = narrowQuery.matches;

      document.querySelectorAll("[data-parallax]").forEach((el) => {
        const speed = Number(el.getAttribute("data-parallax"));
        if (!Number.isFinite(speed) || speed === 0) return;

        // No mobile, só camadas decorativas (absolute) — nunca seções em fluxo.
        if (isNarrow && el.getAttribute("data-parallax-layer") !== "decor") {
          el.style.removeProperty("transform");
          return;
        }

        const prevY = Number(el.dataset.parallaxY) || 0;
        const rect = el.getBoundingClientRect();
        const untransformedCenter = rect.top - prevY + rect.height * 0.5;

        if (
          untransformedCenter + rect.height < -160 ||
          untransformedCenter - rect.height > window.innerHeight + 160
        ) {
          return;
        }

        const y = (mid - untransformedCenter) * speed;
        el.dataset.parallaxY = String(y);
        el.style.transform = `translate3d(0, ${y.toFixed(2)}px, 0)`;
      });
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    narrowQuery.addEventListener("change", onScroll);
    update();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      narrowQuery.removeEventListener("change", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia(FINE_POINTER_QUERY);
    const handleChange = (event) => {
      setCanHover(event.matches);
      if (event.matches) setActiveTooltip("");
    };

    setCanHover(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia(SHOWCASE_QUERY);
    const handleChange = (event) => setProjectShowcase(event.matches);

    setProjectShowcase(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    if (!activeTooltip) return undefined;

    const handleCloseTooltip = (event) => {
      if (!event.target.closest("[data-tech-chip]")) {
        setActiveTooltip("");
      }
    };

    document.addEventListener("click", handleCloseTooltip);
    return () => document.removeEventListener("click", handleCloseTooltip);
  }, [activeTooltip]);

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
    aws: <FaAws />,
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
  ];

  const TECH_PREVIEW_LIMIT = 4;
  const softSkillsRaw = t("tech.softSkills.items", { returnObjects: true });
  const softSkills = Array.isArray(softSkillsRaw) ? softSkillsRaw : [];
  const softSkillsProse = softSkills.join(" · ");
  const hasHiddenTech = technologyCategories.some(
    (category) => category.keys.length > TECH_PREVIEW_LIMIT
  );
  const handleTechClick = (key) => {
    if (canHover) return;
    setActiveTooltip((prev) => (prev === key ? "" : key));
  };

  const hasProjectLinks = (project) =>
    Boolean(project.deploy || project.github || project.githubBe);

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

  const activeProjectData = projects[activeProject] || projects[0];

  const renderProjectDetails = (project, index) => {
    const hasLinks = hasProjectLinks(project);
    const hasDualCode = Boolean(project.github && project.githubBe);

    return (
      <>
        <ProjectImageWrapper $logoThumbnail={project.logoThumbnail}>
          <img
            src={project.image}
            alt={project.name}
            loading={index < 2 ? "eager" : "lazy"}
            decoding="async"
          />
          {project.noteKey && (
            <ProjectImageNote>{t(project.noteKey)}</ProjectImageNote>
          )}
        </ProjectImageWrapper>

        {project.partner ? (
          <ProjectPartner>
            <span>{t("projects.inCollaborationWith")}</span>
            <PartnerLogoLink
              href={project.partner.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t("projects.visitPartnerSiteAria", { name: project.partner.name })}
            >
              <img
                src={project.partner.logo}
                alt=""
                aria-hidden="true"
                loading="lazy"
                decoding="async"
              />
              <span>{project.partner.name}</span>
            </PartnerLogoLink>
          </ProjectPartner>
        ) : (
          <ProjectPartner>
            <span>{t("projects.personal")}</span>
          </ProjectPartner>
        )}

        <ProjectDescription>{t(project.descriptionKey)}</ProjectDescription>

        {!hasLinks && (
          <ProjectPrivateNote>
            {t(project.privateNoteKey || "projects.privateNote")}
          </ProjectPrivateNote>
        )}

        {(project.technologies.length > 0 || hasLinks) && (
          <ProjectActions>
            {project.technologies.length > 0 && (
              <div>
                <ProjectTechLabel>{t("projects.stack")}</ProjectTechLabel>
                <ProjectTechnologies>
                  {project.technologies.map((tech) => (
                    <ProjectTechIcon
                      key={tech}
                      role="img"
                      aria-label={techNames[tech] || tech}
                      title={techNames[tech] || tech}
                    >
                      {icons[tech] ? icons[tech] : (
                        <TechFallbackIcon>{(techNames[tech] || tech).slice(0, 2)}</TechFallbackIcon>
                      )}
                    </ProjectTechIcon>
                  ))}
                </ProjectTechnologies>
              </div>
            )}

            {hasLinks && (
              <ProjectLinks $dualCode={hasDualCode}>
                {project.deploy && (
                  <ProjectLink
                    $primary
                    $spanFull={hasDualCode}
                    href={project.deploy}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={t("projects.viewSiteAria", { name: project.name })}
                  >
                    {t("projects.viewSite")}
                  </ProjectLink>
                )}
                {project.github && (
                  <ProjectLink
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={t("projects.viewCodeAria", { name: project.name })}
                  >
                    <FaGithubIcon aria-hidden="true" /> {project.githubBe ? t("projects.codeFrontend") : t("projects.code")}
                  </ProjectLink>
                )}
                {project.githubBe && (
                  <ProjectLink
                    href={project.githubBe}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={t("projects.viewCodeAria", { name: project.name })}
                  >
                    <FaGithubIcon aria-hidden="true" /> {t("projects.codeBackend")}
                  </ProjectLink>
                )}
              </ProjectLinks>
            )}
          </ProjectActions>
        )}
      </>
    );
  };

  const handleDownloadCV = (language) => {
    const cvPaths = {
      pt: "/Curriculo%20Jo%C3%A3o%20Guilherme-PORTUGUES.pdf",
      en: "/Curriculo%20Jo%C3%A3o%20Guilherme-ENGLISH.pdf",
      es: "/Curriculo%20Jo%C3%A3o%20Guilherme-ESPANHOL.pdf",
    };

    window.open(`${process.env.PUBLIC_URL}${cvPaths[language]}`, "_blank");
    setShowDropdown(false);
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <Wraper>
      <DivPrincipal>
        <DivMargin id="home" />

        <DivText>
          <HeroDotsLayer data-parallax="0.22" data-parallax-layer="decor">
            <HeroDotField />
          </HeroDotsLayer>
          <HeroWatermark data-parallax="0.38" data-parallax-layer="decor" aria-hidden="true">
            João<br />Possidonio
          </HeroWatermark>
          <HeroInner data-parallax="0.08">
            <TextFirst>{t("hero.greeting")}</TextFirst>
            <TextSecond>
              {t("hero.intro")}
              <br /> <p>{t("hero.role")}</p>
            </TextSecond>

            <DivIcons>
              <a
                href="https://wa.me/5524988685043"
                target="_blank"
                rel="noreferrer"
                aria-label={t("contact.whatsapp")}
              >
                <FaWhatsappIcon />
              </a>

              <a
                href="https://github.com/JoaoZ14"
                target="_blank"
                rel="noreferrer"
                aria-label={t("contact.github")}
              >
                <FaGithubIcon />
              </a>

              <a
                href="https://www.linkedin.com/in/joao-possidonio"
                target="_blank"
                rel="noreferrer"
                aria-label={t("contact.linkedin")}
              >
                <FaLinkedinIcon />
              </a>

              <a
                href="https://www.instagram.com/_possidonioj/"
                target="_blank"
                rel="noreferrer"
                aria-label={t("contact.instagram")}
              >
                <FaInstagramIcon />
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
                <DropdownItem onClick={() => handleDownloadCV("es")}>
                  {t("hero.spanish")}
                </DropdownItem>
              </DropdownMenu>
            </ButtonCVContainer>
          </HeroInner>
        </DivText>

        <Line id="about" />
        <SectionProfile>
          <AboutSection>
            <AboutContent>
              <AboutBlocks>
                <AboutBlock $withLifeField data-parallax="0.1">
                  <AboutSectionTitle $span>
                    <SectionLead aria-hidden="true"><HiOutlineUser /></SectionLead>
                    {t("about.title")}
                  </AboutSectionTitle>
                  <AboutCopy>
                    <AboutSectionText $lead>
                      {t("about.summary1")}
                    </AboutSectionText>
                    <AboutSectionText>
                      {t("about.summary2")}
                    </AboutSectionText>
                  </AboutCopy>
                  <AboutMedia>
                    <AboutLifeField />
                    <AboutPortrait>
                      <img
                        src={`${process.env.PUBLIC_URL || ""}/joao-portrait.jpeg`}
                        alt="João Guilherme Possidonio"
                        loading="lazy"
                        decoding="async"
                      />
                    </AboutPortrait>
                  </AboutMedia>
                </AboutBlock>

                <AboutBlock id="experience" data-parallax="0.12">
                  <ExperienceTitle>
                    <SectionLead aria-hidden="true"><HiOutlineBriefcase /></SectionLead>
                    {t("about.experienceTitle")}
                  </ExperienceTitle>
                  <CompanyHeader>
                    <CompanyLogo
                      src="https://elevatebr.org/images/elevate-logo.png"
                      alt="Logo da elevate"
                      loading="eager"
                    />
                    <CompanyName>elevate</CompanyName>
                  </CompanyHeader>
                  <CompanyDescription>
                    {t("experience.elevate.description")}
                  </CompanyDescription>

                  <ExperienceTimeline>
                    <ExperienceTimelineItem>
                      <ExperienceCard>
                        <ExperiencePeriod>{t("experience.elevate.roles.junior.period")}</ExperiencePeriod>
                        <ExperienceRole>{t("experience.elevate.roles.junior.title")}</ExperienceRole>

                        <ExperienceDivider />
                        <ExperiencePhrases>
                          <ExperiencePhrase>
                            {t("experience.elevate.bullets.productEvolution")}
                          </ExperiencePhrase>
                          <ExperiencePhrase>
                            {t("experience.elevate.bullets.techLead")}
                          </ExperiencePhrase>
                          <ExperiencePhrase>
                            {t("experience.elevate.bullets.fullCycleDelivery")}
                          </ExperiencePhrase>
                          <ExperiencePhrase>
                            {t("experience.elevate.bullets.featuresFrontendBackend")}
                          </ExperiencePhrase>
                        </ExperiencePhrases>
                      </ExperienceCard>
                    </ExperienceTimelineItem>

                    <ExperienceTimelineItem>
                      <ExperienceCard>
                        <ExperiencePeriod>{t("experience.elevate.roles.intern.period")}</ExperiencePeriod>
                        <ExperienceRole>{t("experience.elevate.roles.intern.title")}</ExperienceRole>

                        <ExperienceDivider />
                        <ExperiencePhrases>
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
                            {t("experience.elevate.bullets.reviewsDocumentation")}
                          </ExperiencePhrase>
                        </ExperiencePhrases>
                      </ExperienceCard>
                    </ExperienceTimelineItem>
                  </ExperienceTimeline>
                </AboutBlock>

                <AboutBlock data-parallax="0.11" $spaceBefore>
                  <ExperienceTitle>
                    <SectionLead aria-hidden="true"><HiOutlineSquare3Stack3D /></SectionLead>
                    {t("skills.title")}
                  </ExperienceTitle>
                  <SkillsContainer>
                    <SkillCard>
                      <h3>{t("skills.frontend.title")}</h3>
                      <SkillBody>
                        <SkillSummary>
                          {t("skills.frontend.summary")}
                        </SkillSummary>
                        <SkillList>
                          <SkillListItem>{t("skills.frontend.items.reusableComponents")}</SkillListItem>
                          <SkillListItem>{t("skills.frontend.items.performanceUx")}</SkillListItem>
                          <SkillListItem>{t("skills.frontend.items.serviceIntegrations")}</SkillListItem>
                        </SkillList>
                      </SkillBody>
                    </SkillCard>

                    <SkillCard>
                      <h3>{t("skills.backend.title")}</h3>
                      <SkillBody>
                        <SkillSummary>
                          {t("skills.backend.summary")}
                        </SkillSummary>
                        <SkillList>
                          <SkillListItem>{t("skills.backend.items.endpointsIntegrations")}</SkillListItem>
                          <SkillListItem>{t("skills.backend.items.businessRules")}</SkillListItem>
                          <SkillListItem>{t("skills.backend.items.authAccessControl")}</SkillListItem>
                        </SkillList>
                      </SkillBody>
                    </SkillCard>

                    <SkillCard>
                      <h3>{t("skills.excellence.title")}</h3>
                      <SkillBody>
                        <SkillSummary>
                          {t("skills.excellence.summary")}
                        </SkillSummary>
                        <SkillList>
                          <SkillListItem>{t("skills.excellence.items.codeReview")}</SkillListItem>
                          <SkillListItem>{t("skills.excellence.items.documentation")}</SkillListItem>
                          <SkillListItem>{t("skills.excellence.items.teamwork")}</SkillListItem>
                        </SkillList>
                      </SkillBody>
                    </SkillCard>
                  </SkillsContainer>
                </AboutBlock>

                <AboutBlock data-parallax="0.13">
                  <TechTitle>
                    <SectionLead aria-hidden="true"><HiOutlineCommandLine /></SectionLead>
                    {t("tech.title")}
                  </TechTitle>
                  <TechCategories>
                    {technologyCategories.map((category, categoryIndex) => {
                      const visibleKeys = showAllTech
                        ? category.keys
                        : category.keys.slice(0, TECH_PREVIEW_LIMIT);

                      return (
                        <TechCategory key={category.title}>
                          <TechCategoryTitle>{category.title}</TechCategoryTitle>
                          <TechItems>
                            {visibleKeys.map((key) => (
                              <IconWrapper
                                key={key}
                                data-tech-chip
                                type="button"
                                $raised={activeTooltip === key}
                                aria-describedby={`tech-tooltip-${key}`}
                                onClick={() => handleTechClick(key)}
                              >
                                <TechIconSlot>
                                  {icons[key] ? icons[key] : (
                                    <TechFallbackIcon>{(techNames[key] || key).slice(0, 2)}</TechFallbackIcon>
                                  )}
                                </TechIconSlot>
                                <TechName>{techNames[key]}</TechName>
                                <TechTooltip
                                  id={`tech-tooltip-${key}`}
                                  role="tooltip"
                                  $active={activeTooltip === key}
                                >
                                  {descriptions[key]}
                                </TechTooltip>
                              </IconWrapper>
                            ))}
                          </TechItems>
                        </TechCategory>
                      );
                    })}

                    {softSkillsProse && (
                      <TechCategory>
                        <TechCategoryTitle>
                          <HiOutlineChatBubbleLeftRight aria-hidden="true" />
                          {t("tech.categories.softSkills")}
                        </TechCategoryTitle>
                        <SoftSkillsProse>{softSkillsProse}</SoftSkillsProse>
                      </TechCategory>
                    )}
                  </TechCategories>

                  {hasHiddenTech && (
                    <TechToggle
                      type="button"
                      onClick={() => setShowAllTech((prev) => !prev)}
                      aria-expanded={showAllTech}
                    >
                      {showAllTech ? t("tech.showLess") : t("tech.showMore")}
                    </TechToggle>
                  )}
                </AboutBlock>
              </AboutBlocks>
            </AboutContent>
          </AboutSection>
        </SectionProfile>

        <Line />

        <ProjectsSection id="projects" data-parallax="0.12">
          <ProjectsTitle>
            <SectionLead aria-hidden="true"><HiOutlineCodeBracketSquare /></SectionLead>
            {t("projects.title")}
          </ProjectsTitle>

          {projectShowcase ? (
            <ProjectShowcase>
              <ProjectIndexList>
                {projects.map((project, index) => (
                  <li key={project.name}>
                    <ProjectIndexRow
                      type="button"
                      aria-current={activeProject === index}
                      aria-label={project.name}
                      onMouseEnter={() => setActiveProject(index)}
                      onFocus={() => setActiveProject(index)}
                      onClick={() => setActiveProject(index)}
                    >
                      <ProjectRowIndexNum>{String(index + 1).padStart(2, "0")}</ProjectRowIndexNum>
                      <ProjectRowName>{project.name}</ProjectRowName>
                      <ProjectRowMarker aria-hidden="true">→</ProjectRowMarker>
                    </ProjectIndexRow>
                  </li>
                ))}
              </ProjectIndexList>

              <ProjectPreview aria-live="polite">
                <ProjectPreviewFade key={activeProjectData.name}>
                  {renderProjectDetails(activeProjectData, activeProject)}
                </ProjectPreviewFade>
              </ProjectPreview>
            </ProjectShowcase>
          ) : (
            <ProjectIndexList as="div">
              {projects.map((project, index) => {
                const open = openProject === index;

                return (
                  <div key={project.name}>
                    <ProjectIndexRow
                      type="button"
                      aria-expanded={open}
                      aria-controls={`project-panel-${index}`}
                      onClick={() => setOpenProject(open ? -1 : index)}
                    >
                      <ProjectRowIndexNum>{String(index + 1).padStart(2, "0")}</ProjectRowIndexNum>
                      <ProjectRowName>{project.name}</ProjectRowName>
                      <ProjectRowMarker aria-hidden="true">{open ? "−" : "+"}</ProjectRowMarker>
                    </ProjectIndexRow>
                    {open && (
                      <ProjectAccordionPanel
                        id={`project-panel-${index}`}
                        role="region"
                        aria-label={project.name}
                      >
                        {renderProjectDetails(project, index)}
                      </ProjectAccordionPanel>
                    )}
                  </div>
                );
              })}
            </ProjectIndexList>
          )}
        </ProjectsSection>

        <Line />

        <ContactSection id="contact" data-parallax="0.1">
          <ContactTitle>
            <SectionLead aria-hidden="true"><HiOutlineEnvelope /></SectionLead>
            {t("contact.title")}
          </ContactTitle>

          <ContactWrapper>
            <ContactInfo>
              <ContactItem>
                <h3>{t("contact.email")}</h3>
                <a href="mailto:joaopossidonio.dev@gmail.com">
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

              <ContactItem>
                <h3>{t("contact.instagram")}</h3>
                <a
                  href="https://www.instagram.com/_possidonioj/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaInstagramIcon /> @_possidonioj
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
