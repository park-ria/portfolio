import styled, { createGlobalStyle, ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "./styles/theme";
import { useRecoilState, useRecoilValue } from "recoil";
import { isDarkAtom, selectedIndexAtom } from "./atoms";
import { useRef } from "react";
import Intro from "./components/Intro";
import Header from "./components/Header";
import Home from "./components/Home";
import About from "./components/About";
import Career from "./components/Career";
import Skill from "./components/Skill";
import Works from "./components/Works";
import Contact from "./components/Contact";

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
    color: inherit;
  }

  body{
    font-family: "Noto Sans KR", sans-serif;
    background: ${({ theme }) => theme.bgColor};
  }

  .teko {
    font-family: "Teko", sans-serif;
  }
`;

const Main = styled.main<{ $menuIdx: number }>`
  display: flex;
  flex-direction: column;

  ${({ $menuIdx }) =>
    $menuIdx &&
    `flex-direction: row;
  flex: 1;`}
`;

const Section = styled.section``;

const componentMap = {
  Home,
  About,
  Career,
  Skill,
  Works,
  Contact,
};

const menuArr: (keyof typeof componentMap)[] = [
  "Home",
  "About",
  "Career",
  "Skill",
  "Works",
  "Contact",
];

const App = () => {
  const isDark = useRecoilValue(isDarkAtom);
  const menuRef = useRef<(HTMLDivElement | null)[]>([]);
  const [selectedIndex, setSelectedIndex] = useRecoilState(selectedIndexAtom);

  const moveSection = (index: number) => {
    menuRef.current[index]?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <GlobalStyle />
        <Intro />
        <Main $menuIdx={selectedIndex}>
          <Header onClick={moveSection} />
          <Section>
            {menuArr.map((menu, index) => {
              const Component = componentMap[menu];
              return (
                <div key={index} ref={(el) => (menuRef.current[index] = el)}>
                  <Component />
                </div>
              );
            })}
          </Section>
        </Main>
      </ThemeProvider>
    </>
  );
};

export default App;
