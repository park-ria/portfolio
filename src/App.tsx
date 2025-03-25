import React, { useRef, RefObject, useEffect } from "react";
import styled, { createGlobalStyle, ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "./styles/theme";
import { useRecoilState, useRecoilValue } from "recoil";
import { isDarkAtom, selectedIndexAtom } from "./atoms";
import { motion, useScroll, useTransform } from "framer-motion";
import Intro from "./components/Intro";
import Header from "./components/Header";
import Home from "./components/Home";
import About from "./components/About";
import Career from "./components/Career/Career";
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

  :root{
    --dark-gray-color : #999;
    --gray-color: #ececec;
    --light-gray-color: #f9f9f9;
  }

  .teko {
    font-family: "Teko", sans-serif;
  }
`;
const IntroWrapper = styled.div`
  overflow: hidden;
`;

const Main = styled.main`
  position: relative;
  display: flex;
  flex-direction: column;
`;

const Section = styled.section`
  width: 100%;
  position: absolute;
  top: 80px;
  left: 0;
  overflow: hidden;
  @media screen and (max-width: 600px) {
    top: 0;
  }
`;

const TopBtn = styled.div`
  width: 50px;
  height: 50px;
  position: fixed;
  bottom: 30px;
  right: 30px;
  cursor: pointer;
  svg {
    &:first-child {
      width: 100%;
      height: 100%;
      fill: #222;
      stroke: ${({ theme }) => theme.accentColor};
    }
    &:last-child {
      width: 24px;
      height: 24px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      path {
        stroke: #fff;
      }
    }
  }
  @media screen and (max-width: 600px) {
    bottom: 10px;
    right: 10px;
  }
`;

const App = () => {
  const isDark = useRecoilValue(isDarkAtom);
  const [selectedIndex, setSelectedIndex] = useRecoilState(selectedIndexAtom);
  const { scrollY } = useScroll();

  const introRef = useRef<HTMLDivElement | null>(null);
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

  const changeSelectedIndex = (
    ref: React.RefObject<HTMLDivElement>,
    index: number
  ) => {
    if (ref.current) {
      const { top, bottom } = ref.current.getBoundingClientRect();
      if (top < window.innerHeight / 2 && bottom > window.innerHeight / 2)
        setSelectedIndex(index);
    }
  };

  useEffect(() => {
    const updateIndexOnScroll = () => {
      if (introRef.current) {
        changeSelectedIndex(introRef, -1);
      }

      menuRef.map((menu, index) => {
        if (menu.ref.current) {
          changeSelectedIndex(menu.ref, index);
        }
      });
    };

    scrollY.on("change", updateIndexOnScroll);
    return () => scrollY.clearListeners();
  }, [scrollY, selectedIndex]);

  const mainRef = useRef<HTMLDivElement | null>(null);
  const scrollToTop = () => {
    mainRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const { scrollYProgress } = useScroll();
  const dashOffset = useTransform(scrollYProgress, [0, 1], [200, 0]);

  return (
    <>
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <GlobalStyle />
        <IntroWrapper ref={introRef}>
          <Intro />
        </IntroWrapper>
        <Main ref={mainRef}>
          <Header onClick={moveSection} />
          <Section>
            {menuRef.map((menu, index) => (
              <div key={index} ref={menu.ref}>
                <menu.component />
              </div>
            ))}
          </Section>
          <TopBtn onClick={scrollToTop}>
            <motion.svg width="60" height="60" viewBox="0 0 60 60" fill="none">
              <rect x="2.5" y="2.5" width="55" height="55" rx="27.5" />
              <motion.rect
                x="2.5"
                y="2.5"
                width="55"
                height="55"
                rx="27.5"
                strokeWidth="5"
                strokeDasharray="200"
                style={{ strokeDashoffset: dashOffset as unknown as number }}
              />
            </motion.svg>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 21V3.5"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M19 10L12 3L5 10"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </TopBtn>
        </Main>
      </ThemeProvider>
    </>
  );
};

export default App;
