import React from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { FiArrowRight, FiArrowUp } from "react-icons/fi";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa6";

const FooterWrap = styled.footer`
  position: relative;
  width: 100%;
  background: #000;
  color: #fff;
  overflow: hidden;

  /* Footer sempre preto; tokens de conteúdo claros nos dois temas.
     Assim o modo claro continua igual e o escuro não inverte para branco. */
  --ink: #000;
  --bg: #fff;
  --on-ink-faint: rgba(255, 255, 255, 0.045);
  --on-ink-line: rgba(255, 255, 255, 0.12);
  --on-ink-soft: rgba(255, 255, 255, 0.45);
  --on-ink-muted: rgba(255, 255, 255, 0.6);
  --on-ink-strong: rgba(255, 255, 255, 0.82);
`;

/* Marca d'água gigante que sangra as bordas — ecoa a watermark do hero */
const Watermark = styled.span`
  position: absolute;
  left: 50%;
  bottom: -0.14em;
  transform: translateX(-50%);
  z-index: 0;
  font-family: var(--font-display);
  font-weight: 900;
  font-size: clamp(64px, 21vw, 340px);
  line-height: 0.78;
  letter-spacing: -0.04em;
  color: var(--on-ink-faint);
  white-space: nowrap;
  pointer-events: none;
  user-select: none;
`;

const WatermarkLayer = styled.div`
  position: absolute;
  inset: 0;
  z-index: 0;
  overflow: hidden;
  pointer-events: none;
`;

const FooterInner = styled.div`
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: var(--container-max);
  margin: 0 auto;
  padding: clamp(64px, 9vw, 120px) var(--container-x) 40px;
`;

/* ===== Chamada / manifesto ===== */
const Cta = styled.div`
  display: flex;
  flex-direction: column;
  gap: clamp(20px, 3vw, 28px);
  padding-bottom: clamp(48px, 6vw, 80px);
  border-bottom: 1px solid var(--on-ink-line);
`;

const CtaKicker = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 12px;
  font-family: var(--font-mono);
  font-size: 12px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--on-ink-muted);

  &::before {
    content: "";
    width: 32px;
    height: 1px;
    background: var(--on-ink-soft);
  }
`;

const CtaTitle = styled.h2`
  margin: 0;
  max-width: 18ch;
  font-family: var(--font-mono);
  font-weight: 700;
  font-size: clamp(30px, 5.6vw, 64px);
  line-height: 1.08;
  letter-spacing: -0.02em;
  color: var(--bg);
  text-wrap: balance;
`;

const CtaAction = styled.a`
  align-self: flex-start;
  display: inline-flex;
  align-items: center;
  gap: 12px;
  margin-top: 4px;
  padding: 14px 24px;
  border: 1px solid var(--bg);
  background: var(--bg);
  color: var(--ink);
  font-family: var(--font-mono);
  font-size: 13px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  text-decoration: none;
  transition: background-color 0.25s var(--ease-out), color 0.25s var(--ease-out);

  svg {
    font-size: 16px;
    transition: transform 0.25s var(--ease-out);
  }

  &:hover {
    background: transparent;
    color: var(--bg);
  }

  &:hover svg {
    transform: translateX(5px);
  }

  @media (prefers-reduced-motion: reduce) {
    svg,
    &:hover svg {
      transition: none;
      transform: none;
    }
  }
`;

/* ===== Grade de colunas ===== */
const Columns = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: clamp(36px, 5vw, 56px);
  padding: clamp(48px, 6vw, 72px) 0;

  @media (min-width: 560px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 960px) {
    grid-template-columns: 1.5fr 1fr 1fr 1.2fr;
    gap: 48px;
  }
`;

const IdentityCol = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 22px;

  @media (min-width: 560px) {
    grid-column: 1 / -1;
  }

  @media (min-width: 960px) {
    grid-column: auto;
  }
`;

const BrandLink = styled.a`
  display: inline-flex;
  align-items: flex-start;
  text-decoration: none;

  img {
    width: clamp(150px, 18vw, 200px);
    height: auto;
    display: block;
    filter: brightness(0) invert(1);
  }
`;

const Location = styled.span`
  font-family: var(--font-mono);
  font-size: 12px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--on-ink-muted);
`;

const Col = styled.div`
  display: flex;
  flex-direction: column;
`;

const ColTitle = styled.h3`
  margin: 0 0 18px;
  font-family: var(--font-mono);
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--on-ink-muted);
`;

const LinkList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  a {
    position: relative;
    align-self: flex-start;
    display: inline-flex;
    align-items: center;
    gap: 10px;
    color: var(--on-ink-strong);
    text-decoration: none;
    font-family: var(--font-display);
    font-weight: 600;
    font-size: 16px;
    letter-spacing: -0.01em;
    transition: color 0.2s ease, transform 0.25s var(--ease-out);

    svg {
      font-size: 16px;
      opacity: 0.7;
      transition: opacity 0.2s ease;
    }
  }

  a:hover {
    color: var(--bg);
    transform: translateX(4px);
  }

  a:hover svg {
    opacity: 1;
  }

  @media (prefers-reduced-motion: reduce) {
    a {
      transition: color 0.2s ease;
    }
    a:hover {
      transform: none;
    }
  }
`;

/* ===== Barra inferior ===== */
const BottomBar = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding-top: 28px;
  border-top: 1px solid var(--on-ink-line);
  font-family: var(--font-mono);
  font-size: 12px;
  letter-spacing: 0.04em;
  color: var(--on-ink-muted);

  @media (min-width: 760px) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
`;

const BottomInfo = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px 14px;

  strong {
    font-family: var(--font-display);
    font-weight: 800;
    letter-spacing: -0.02em;
    color: var(--bg);
    text-transform: none;
    font-size: 14px;
  }

  sup {
    font-size: 9px;
    color: var(--on-ink-muted);
  }
`;

const BottomMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px 20px;
`;

const BackToTop = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: var(--on-ink-muted);
  text-decoration: none;
  text-transform: uppercase;
  transition: color 0.2s ease;

  svg {
    font-size: 14px;
    transition: transform 0.25s var(--ease-out);
  }

  &:hover {
    color: var(--bg);
  }

  &:hover svg {
    transform: translateY(-4px);
  }

  @media (prefers-reduced-motion: reduce) {
    svg,
    &:hover svg {
      transition: none;
      transform: none;
    }
  }
`;

const Footer = () => {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <FooterWrap>
      <WatermarkLayer aria-hidden="true">
        <Watermark>Possidonio</Watermark>
      </WatermarkLayer>

      <FooterInner>
        <Cta>
          <CtaKicker>{t("footer.ctaKicker")}</CtaKicker>
          <CtaTitle>{t("footer.ctaTitle")}</CtaTitle>
          <CtaAction href="#contact">
            {t("footer.ctaAction")}
            <FiArrowRight aria-hidden="true" />
          </CtaAction>
        </Cta>

        <Columns>
          <IdentityCol>
            <BrandLink href="#home" aria-label="Possidonio">
              <img
                src="/brand/logo-mark.png"
                alt="Logo Possidonio"
              />
            </BrandLink>
            <Location>{t("footer.location")}</Location>
          </IdentityCol>

          <Col>
            <ColTitle>{t("footer.navTitle")}</ColTitle>
            <LinkList>
              <a href="#about">{t("nav.about")}</a>
              <a href="#skills">{t("nav.skills")}</a>
              <a href="#projects">{t("nav.projects")}</a>
              <a href="#contact">{t("nav.contact")}</a>
            </LinkList>
          </Col>

          <Col>
            <ColTitle>{t("footer.socialTitle")}</ColTitle>
            <LinkList>
              <a
                href="https://github.com/JoaoZ14"
                target="_blank"
                rel="noreferrer"
              >
                <FaGithub aria-hidden="true" /> GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/joao-possidonio"
                target="_blank"
                rel="noreferrer"
              >
                <FaLinkedin aria-hidden="true" /> LinkedIn
              </a>
              <a
                href="https://wa.me/5524988685043"
                target="_blank"
                rel="noreferrer"
              >
                <FaWhatsapp aria-hidden="true" /> WhatsApp
              </a>
            </LinkList>
          </Col>

          <Col>
            <ColTitle>{t("footer.contactTitle")}</ColTitle>
            <LinkList>
              <a href="mailto:joaopossidonio.dev@gmail.com">
                joaopossidonio.dev@gmail.com
              </a>
              <a
                href="https://wa.me/5524988685043"
                target="_blank"
                rel="noreferrer"
              >
                +55 (24) 98868-5043
              </a>
            </LinkList>
          </Col>
        </Columns>

        <BottomBar>
          <BottomInfo>
            <strong>João Possidonio</strong>
            <sup>®</sup>
            <span>
              © {year} · {t("hero.role")}
            </span>
          </BottomInfo>

          <BottomMeta>
            <BackToTop href="#home">
              {t("footer.backToTop")}
              <FiArrowUp aria-hidden="true" />
            </BackToTop>
          </BottomMeta>
        </BottomBar>
      </FooterInner>
    </FooterWrap>
  );
};

export default Footer;
