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
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #212121;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  opacity: ${({ $isHiding }) => ($isHiding ? 0 : 1)};
  transition: opacity 1s ease-in-out;
  pointer-events: ${({ $isHiding }) => ($isHiding ? "none" : "auto")};
  will-change: opacity;
`;

const LogoImage = styled.img`
  width: 200px;
  height: auto;
  animation: ${scaleIn} 0.8s ease-out;
  transition: opacity 1s ease-in-out;
  opacity: ${({ $isHiding }) => ($isHiding ? 0 : 1)};
  
  @media (max-width: 600px) {
    width: 150px;
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

