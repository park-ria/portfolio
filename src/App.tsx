import React from "react";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "./styles/theme";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "./atoms";
import Intro from "./components/Intro";

const GlobalStyle = createGlobalStyle`
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  ul, li{
    list-style: none;
  }

  a{
    text-decoration: none;
    color:inherit;
  }
`;

const App = () => {
  const isDark = useRecoilValue(isDarkAtom);

  return (
    <>
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <GlobalStyle />
        <Intro />
      </ThemeProvider>
    </>
  );
};

export default App;
