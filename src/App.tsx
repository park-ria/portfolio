import { createGlobalStyle, ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "./styles/theme";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "./atoms";
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
  }

  .teko {
    font-family: "Teko", sans-serif;
  }
`;

// 컴포넌트를 매핑하여 사용할 수 있도록 설정
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

  const moveSection = (e: React.MouseEvent<HTMLLIElement>, index: number) => {
    console.log(index);
    //menuRef.current[index]?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <GlobalStyle />
        <Intro />
        <Header />
        {menuArr.map((menu, index) => {
          const Component = componentMap[menu];
          return (
            <div key={index} ref={(el) => (menuRef.current[index] = el)}>
              <Component />
            </div>
          );
        })}
      </ThemeProvider>
    </>
  );
};

export default App;
