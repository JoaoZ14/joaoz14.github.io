import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import "./App.css";
import LandingPage from "./Pages/LandingPage";
import Navigation from "./components/Navigation";
import SplashScreen from "./components/SplashScreen";

const AppDiv = styled.div`
  background-color: #212121;
  overflow-x: hidden;
  overflow-y: visible;
  width: 100%;
  max-width: 100vw;
`;

const ContentWrapper = styled.div`
  opacity: ${({ $isVisible }) => ($isVisible ? 1 : 0)};
  transform: ${({ $isVisible }) => ($isVisible ? "translateY(0)" : "translateY(20px)")};
  transition: opacity 1.2s ease-out, transform 1.2s ease-out;
  overflow-x: hidden;
  overflow-y: visible;
  height: auto;
`;

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [contentVisible, setContentVisible] = useState(false);
  const isScrollLockedRef = useRef(false);
  const scrollYRef = useRef(0);

  const handleSplashFinish = () => {
    setShowSplash(false);
    // Aguarda 500ms antes de mostrar o conteúdo
    setTimeout(() => {
      setContentVisible(true);
    }, 500);
  };

  // Evita "scrollbar duplicada" durante o Splash/entrada do conteúdo.
  // Também garante que a rolagem volte ao normal depois do splash.
  useEffect(() => {
    const shouldLockScroll = showSplash || !contentVisible;
    const html = document.documentElement;

    if (shouldLockScroll) {
      // Bloqueia somente na transição para não ficar reexecutando.
      if (!isScrollLockedRef.current) {
        scrollYRef.current = window.scrollY || window.pageYOffset || 0;
        isScrollLockedRef.current = true;
      }

      html.style.overflowY = "hidden";
      return;
    }

    // Libera o scroll explicitamente e restaura a posição anterior.
    if (isScrollLockedRef.current) {
      html.style.overflowY = "auto";
      isScrollLockedRef.current = false;
      window.scrollTo(0, scrollYRef.current);
    } else {
      // Garantia: evita ficar preso em overflow hidden por alguma razão.
      html.style.overflowY = "auto";
    }
  }, [showSplash, contentVisible]);

  return (
    <AppDiv>
      {showSplash && <SplashScreen onFinish={handleSplashFinish} />}
      <Navigation />
      <ContentWrapper $isVisible={contentVisible}>
        <LandingPage />
      </ContentWrapper>
    </AppDiv>
  );
}

export default App;
