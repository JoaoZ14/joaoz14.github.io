import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import "./App.css";
import LandingPage from "./Pages/LandingPage";
import Navigation from "./components/Navigation";
import SplashScreen from "./components/SplashScreen";

const AppDiv = styled.div`
  background-color: #212121;
  overflow-x: hidden;
  width: 100%;
  max-width: 100vw;
`;

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const ContentWrapper = styled.div`
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  transform: ${({ isVisible }) => (isVisible ? "translateY(0)" : "translateY(20px)")};
  transition: opacity 1.2s ease-out, transform 1.2s ease-out;
`;

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [contentVisible, setContentVisible] = useState(false);

  const handleSplashFinish = () => {
    setShowSplash(false);
    // Aguarda 500ms antes de mostrar o conteúdo
    setTimeout(() => {
      setContentVisible(true);
    }, 500);
  };

  return (
    <AppDiv>
      {showSplash && <SplashScreen onFinish={handleSplashFinish} />}
      <Navigation />
      <ContentWrapper isVisible={contentVisible}>
        <LandingPage />
      </ContentWrapper>
    </AppDiv>
  );
}

export default App;
