import React, { useCallback, useEffect, useRef, useState } from "react";
import styled, { keyframes } from "styled-components";

export const SPLASH_SESSION_KEY = "splash-seen";

const HOLD_MS = 700;
const FADE_MS = 350;

const scaleIn = keyframes`
  from {
    transform: scale(0.8);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
`;

const SplashContainer = styled.div`
  position: fixed;
  inset: 0;
  background-color: var(--bg);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 28px;
  z-index: var(--z-splash);
  box-sizing: border-box;
  opacity: ${({ $isHiding }) => ($isHiding ? 0 : 1)};
  transition: opacity ${FADE_MS}ms var(--ease-out);
  pointer-events: ${({ $isHiding }) => ($isHiding ? "none" : "auto")};
  will-change: opacity;
  cursor: pointer;
  background-image: radial-gradient(var(--line-soft) 1px, transparent 1px);
  background-size: 22px 22px;

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

const LogoImage = styled.img`
  display: block;
  width: 180px;
  height: auto;
  max-width: 70vw;
  max-height: 70vh;
  object-fit: contain;
  filter: brightness(0);
  animation: ${scaleIn} 0.6s var(--ease-out);

  [data-theme="dark"] & {
    filter: brightness(0) invert(1);
  }

  transition: opacity ${FADE_MS}ms var(--ease-out);
  opacity: ${({ $isHiding }) => ($isHiding ? 0 : 1)};
  transform-origin: center;

  @media (max-width: 600px) {
    width: 140px;
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

const SkipHint = styled.p`
  margin: 0;
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--text-3);
`;

const SplashScreen = ({ onFinish }) => {
  const [isHiding, setIsHiding] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const finishingRef = useRef(false);

  const finish = useCallback(() => {
    if (finishingRef.current) return;
    finishingRef.current = true;
    try {
      sessionStorage.setItem(SPLASH_SESSION_KEY, "1");
    } catch {
      /* ignore */
    }
    setIsHiding(true);
    window.setTimeout(() => onFinish(), FADE_MS);
  }, [onFinish]);

  useEffect(() => {
    if (!imageLoaded) return undefined;
    const timer = window.setTimeout(finish, HOLD_MS);
    return () => window.clearTimeout(timer);
  }, [imageLoaded, finish]);

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === "Escape" || event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        finish();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [finish]);

  return (
    <SplashContainer
      $isHiding={isHiding}
      onClick={finish}
      role="dialog"
      aria-label="Introdução"
      aria-modal="true"
    >
      <LogoImage
        $isHiding={isHiding}
        src="/Logo/Design sem nome (27)-Photoroom.png"
        alt="Logo João Guilherme"
        onLoad={() => setImageLoaded(true)}
        onError={() => setImageLoaded(true)}
      />
      <SkipHint>Toque ou Esc para pular</SkipHint>
    </SplashContainer>
  );
};

export default SplashScreen;
