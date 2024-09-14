import styled from "styled-components";
import "./App.css";
import LandingPage from "./Pages/LandingPage";
import Navigation from "./components/Navigation";

const AppDiv = styled.div`
  background-color: #212121;
`;

function App() {
  return (
    <AppDiv>
      <Navigation />
      <LandingPage />
    </AppDiv>
  );
}

export default App;
