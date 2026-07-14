import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import "./App.css";
import LandingPage from "./Pages/LandingPage";
import Navigation from "./components/Navigation";
import SplashScreen, { SPLASH_SESSION_KEY } from "./components/SplashScreen";
import Footer from "./components/Footer";
import { ThemeProvider } from "./context/ThemeContext";

const hasSeenSplash = () => {
  try {
    return sessionStorage.getItem(SPLASH_SESSION_KEY) === "1";
  } catch {
    return false;
  }
};

const AppDiv = styled.div`
  background-color: var(--bg);
  overflow-x: clip;
  width: 100%;
  max-width: 100vw;
`;

const ContentWrapper = styled.div`
  opacity: ${({ $isVisible }) => ($isVisible ? 1 : 0)};
  transform: ${({ $isVisible }) => ($isVisible ? "translateY(0)" : "translateY(20px)")};
  transition: opacity 1.2s cubic-bezier(0.25, 1, 0.5, 1),
    transform 1.2s cubic-bezier(0.25, 1, 0.5, 1);
  overflow-x: clip;
  height: auto;

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

function App() {
  const skipSplash = hasSeenSplash();
  const [showSplash, setShowSplash] = useState(!skipSplash);
  const [contentVisible, setContentVisible] = useState(skipSplash);
  const isScrollLockedRef = useRef(false);
  const scrollYRef = useRef(0);

  const handleSplashFinish = () => {
    setShowSplash(false);
    setTimeout(() => {
      setContentVisible(true);
    }, 80);
  };

  // Trava a rolagem durante o Splash/entrada do conteúdo.
  // O lock é no body (não no html), para não recriar um contêiner de scroll
  // no html — que era a origem da barra duplicada/interna.
  useEffect(() => {
    const shouldLockScroll = showSplash || !contentVisible;
    const body = document.body;

    if (shouldLockScroll) {
      // Bloqueia somente na transição para não ficar reexecutando.
      if (!isScrollLockedRef.current) {
        scrollYRef.current = window.scrollY || window.pageYOffset || 0;
        isScrollLockedRef.current = true;
      }

      body.style.overflow = "hidden";
      return;
    }

    // Libera o scroll (volta ao valor do CSS) e restaura a posição anterior.
    if (isScrollLockedRef.current) {
      body.style.overflow = "";
      isScrollLockedRef.current = false;
      window.scrollTo(0, scrollYRef.current);
    } else {
      body.style.overflow = "";
    }
  }, [showSplash, contentVisible]);

  return (
    <ThemeProvider>
      <AppDiv>
        {showSplash && <SplashScreen onFinish={handleSplashFinish} />}
        <Navigation />
        <ContentWrapper $isVisible={contentVisible}>
          <LandingPage />
          <Footer />
        </ContentWrapper>
      </AppDiv>
    </ThemeProvider>
  );
}

export default App;
