import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";

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
  align-items: center;
  justify-content: center;
  z-index: var(--z-splash);
  box-sizing: border-box;
  opacity: ${({ $isHiding }) => ($isHiding ? 0 : 1)};
  transition: opacity 1s ease-in-out;
  pointer-events: ${({ $isHiding }) => ($isHiding ? "none" : "auto")};
  will-change: opacity;

  /* Grid técnico sutil ao fundo */
  background-image: radial-gradient(var(--line-soft) 1px, transparent 1px);
  background-size: 22px 22px;
`;

const LogoImage = styled.img`
  display: block;
  width: 180px;
  height: auto;
  max-width: 70vw;
  max-height: 70vh;
  object-fit: contain;
  filter: brightness(0);
  animation: ${scaleIn} 0.8s cubic-bezier(0.25, 1, 0.5, 1);

  [data-theme="dark"] & {
    filter: brightness(0) invert(1);
  }

  transition: opacity 1s ease-in-out;
  opacity: ${({ $isHiding }) => ($isHiding ? 0 : 1)};
  transform-origin: center;

  @media (max-width: 600px) {
    width: 140px;
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

const SplashScreen = ({ onFinish }) => {
  const [isHiding, setIsHiding] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    // Aguarda a imagem carregar e depois espera um tempo mínimo antes de esconder
    if (imageLoaded) {
      const timer = setTimeout(() => {
        setIsHiding(true);
        // Aguarda a animação de fade out terminar antes de chamar onFinish
        setTimeout(() => {
          onFinish();
        }, 1000); // Tempo da animação fadeOut
      }, 1500); // Tempo mínimo que a splash screen fica visível (1.5 segundos)

      return () => clearTimeout(timer);
    }
  }, [imageLoaded, onFinish]);

  return (
    <SplashContainer $isHiding={isHiding}>
      <LogoImage
        $isHiding={isHiding}
        src="/Logo/Design sem nome (27)-Photoroom.png"
        alt="Logo"
        onLoad={() => setImageLoaded(true)}
      />
    </SplashContainer>
  );
};

export default SplashScreen;

