import React, { useRef, RefObject, useEffect } from "react";
import styled, { createGlobalStyle, ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "./styles/theme";
import { useRecoilState, useRecoilValue } from "recoil";
import { isDarkAtom, selectedIndexAtom } from "./atoms";
import { useScroll } from "framer-motion";
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
  position: relative;
  display: flex;
  flex-direction: column;
  ${({ $menuIdx }) => $menuIdx && `flex-direction: row;`}
`;

const Section = styled.section`
  flex: 1;
`;

const App = () => {
  const isDark = useRecoilValue(isDarkAtom);
  const [selectedIndex, setSelectedIndex] = useRecoilState(selectedIndexAtom);
  const { scrollY } = useScroll();

  const homeRef = useRef<HTMLDivElement | null>(null);
  const aboutRef = useRef<HTMLDivElement | null>(null);
  const careerRef = useRef<HTMLDivElement | null>(null);
  const skillRef = useRef<HTMLDivElement | null>(null);
  const worksRef = useRef<HTMLDivElement | null>(null);
  const contactRef = useRef<HTMLDivElement | null>(null);

  interface MenuType {
    component: React.ComponentType;
    ref: RefObject<HTMLDivElement>;
  }

  const menuRef: MenuType[] = [
    { component: Home, ref: homeRef },
    { component: About, ref: aboutRef },
    { component: Career, ref: careerRef },
    { component: Skill, ref: skillRef },
    { component: Works, ref: worksRef },
    { component: Contact, ref: contactRef },
  ];

  const moveSection = (index: number) => {
    menuRef[index].ref.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  useEffect(() => {
    const updateIndexOnScroll = () => {
      menuRef.map((menu, index) => {
        if (menu.ref.current) {
          const { top, bottom } = menu.ref.current.getBoundingClientRect();
          if (top < window.innerHeight / 2 && bottom > window.innerHeight / 2)
            setSelectedIndex(index);
        }
      });
    };

    scrollY.on("change", updateIndexOnScroll);
    return () => scrollY.clearListeners();
  }, [scrollY, selectedIndex]);

  return (
    <>
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <GlobalStyle />
        <Intro />
        <Main $menuIdx={selectedIndex}>
          <Header onClick={moveSection} />
          <Section>
            {menuRef.map((menu, index) => (
              <div key={index} ref={menu.ref}>
                <menu.component />
              </div>
            ))}
          </Section>
        </Main>
      </ThemeProvider>
    </>
  );
};

export default App;
