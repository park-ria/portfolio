import React, { useState } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import { isDarkAtom, selectedIndexAtom } from "../atoms";

const Wrapper = styled.header<{ $menuIdx: number; $menuOpen: boolean }>`
  position: fixed;
  top: 0;
  width: fit-content;
  height: 100%;
  padding: 80px 30px 50px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  //transition: all 0.3s;
  opacity: ${({ $menuIdx }) => ($menuIdx === 4 ? 0 : 1)};
  z-index: 1;

  @media screen and (min-width: 601px) {
    ${({ $menuIdx }) =>
      $menuIdx < 1 &&
      `position: relative;
      top: 0;
      left: 0;
      width: 100%;
      height: 80px;
      padding: 0 15px;
      background: transparent;
      flex-direction: row;
      justify-content: space-around;
      border-bottom: 1px solid #eee;`}
  }

  @media screen and (max-width: 600px) {
    opacity: 0.95;
    background: ${({ theme }) => theme.bgColor};
    color: ${({ theme }) => theme.textColor};
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.5);
    transform: ${({ $menuOpen }) => ($menuOpen ? "none" : "translateX(-100%)")};
  }
`;

const Nav = styled.ul<{ $menuIdx: number }>`
  width: fit-content;
  display: flex;
  flex-direction: column;
  gap: 30px;
  justify-content: space-between;

  @media screen and (min-width: 601px) {
    ${({ $menuIdx }) =>
      $menuIdx < 1 &&
      `width: 1290px;
      flex-direction: row;
      justify-content: space-between;
      gap: 0px;`}
  }
`;

const Menu = styled(motion.li)<{ $isSelected: boolean; $menuIdx: number }>`
  width: fit-content;
  height: 32px;
  margin-right: 0;
  display: flex;
  flex-direction: column;
  font-size: 20px;
  color: ${({ theme }) => theme.textColor};
  cursor: pointer;

  @media screen and (max-width: 1500px) {
    &:last-child {
      margin-right: ${({ $menuIdx }) => ($menuIdx < 1 ? "125px" : "0")};
    }
  }

  @media screen and (max-width: 600px) {
    font-size: 18px;
    &:last-child {
      margin-right: 0;
    }
  }
`;

const Underline = styled(motion.span)<{ $menuIdx: number }>`
  display: inline-block;
  width: 100%;
  height: 3px;
  background: ${({ theme }) => theme.accentColor};

  @media screen and (min-width: 601px) {
    background: ${({ $menuIdx, theme }) =>
      $menuIdx === 1 ? "#fff" : theme.accentColor};
  }
`;

const ModeBtn = styled.div<{ $menuIdx: number }>`
  position: absolute;
  right: auto;
  bottom: 50px;
  cursor: pointer;

  @media screen and (min-width: 601px) {
    ${({ $menuIdx }) => $menuIdx < 1 && `right: 15px; bottom:auto;`}
  }
`;

const ModeBg = styled.div`
  width: 70px;
  height: 30px;
  background: #eee;
  border-radius: 13px;
  position: relative;
  box-shadow: inset 3px 3px 5px rgba(0, 0, 0, 0.2);

  img {
    width: 18px;
    height: 18px;
    object-fit: cover;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    &:first-child {
      left: 10px;
    }
    &:last-child {
      right: 10px;
    }
  }
`;

const ModeCircle = styled(motion.span)`
  display: inline-block;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: #242424;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
`;

const ToggleBtn = styled.div<{ $menuOpen: boolean }>`
  padding: 10px 6px;
  position: absolute;
  top: 20px;
  right: -30px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  background: ${({ theme }) => theme.bgColor};
  border-radius: 0 6px 6px 0;
  box-shadow: 2px 1px 3px rgba(0, 0, 0, 0.3);
  opacity: 0;
  cursor: pointer;
  span {
    width: 20px;
    height: 1px;
    background: ${({ theme }) => theme.textColor};
    transition: all 0.3s ease-in-out;

    &:first-child {
      transform: ${({ $menuOpen }) =>
        $menuOpen ? "translateY(6px) rotate(45deg)" : "none"};
    }
    &:nth-child(2) {
      opacity: ${({ $menuOpen }) => ($menuOpen ? "0" : "1")};
    }
    &:last-child {
      transform: ${({ $menuOpen }) =>
        $menuOpen ? "translateY(-6px) rotate(-45deg)" : "none"};
    }
  }

  @media screen and (max-width: 600px) {
    opacity: 0.95;
  }
`;

const menuArr: string[] = [
  "Home",
  "About",
  "Career",
  "Skill",
  "Works",
  "Contact",
];

interface HeaderType {
  onClick: (index: number) => void;
}

const Header = ({ onClick }: HeaderType) => {
  const [isDark, setIsDark] = useRecoilState(isDarkAtom);
  const [selectedIndex, setSelectedIndex] = useRecoilState(selectedIndexAtom);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleClick = (index: number) => {
    //setSelectedIndex(index);
    onClick(index);
  };

  return (
    <Wrapper $menuIdx={selectedIndex} $menuOpen={menuOpen}>
      <Nav $menuIdx={selectedIndex}>
        {menuArr.map((menu: string, index: number) => (
          <Menu
            key={index}
            $isSelected={index === selectedIndex}
            $menuIdx={selectedIndex}
            onClick={() => handleClick(index)}
          >
            {menu}
            {((index === 0 && selectedIndex < 1) ||
              index === selectedIndex) && (
              <Underline $menuIdx={selectedIndex} layoutId="underline" />
            )}
          </Menu>
        ))}
      </Nav>
      <ModeBtn $menuIdx={selectedIndex}>
        <ModeBg onClick={() => setIsDark((prev) => !prev)}>
          <img src="/imgs/moon.png" alt="dark mode" />
          <img src="/imgs/sun.png" alt="light mode" />
        </ModeBg>
        <ModeCircle
          initial={{ left: 6 }}
          animate={{
            left: isDark ? "auto" : 6,
            right: isDark ? 6 : "auto",
          }}
          transition={{ duration: 0.3 }}
          onClick={() => setIsDark((prev) => !prev)}
        />
      </ModeBtn>
      <ToggleBtn
        $menuOpen={menuOpen}
        onClick={() => setMenuOpen((prev) => !prev)}
      >
        <span></span>
        <span></span>
        <span></span>
      </ToggleBtn>
    </Wrapper>
  );
};

export default React.memo(Header);
