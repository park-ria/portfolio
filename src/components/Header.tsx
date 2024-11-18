import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import { isDarkAtom, selectedIndexAtom } from "../atoms";

const Wrapper = styled.header<{ $menuIdx: number }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 80px;
  background: transparent;
  display: flex;
  align-items: center;
  z-index: 1;

  ${({ $menuIdx }) =>
    $menuIdx
      ? `position: fixed;
        top: 0;
        width: fit-content;
        height: fit-content;
        padding: 200px 30px 0 30px;`
      : "border-bottom: 1px solid #eee;"}
`;

const Nav = styled.ul<{ $menuIdx: number }>`
  width: 1290px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;

  ${({ $menuIdx }) =>
    $menuIdx &&
    `width: fit-content;
    flex-direction: column;
    gap: 30px;`}
`;

const Menu = styled(motion.li)<{ $isSelected: boolean; $menuIdx: number }>`
  display: flex;
  flex-direction: column;
  font-size: 20px;
  color: ${({ theme }) => theme.textColor};
  cursor: pointer;

  ${({ $menuIdx }) => $menuIdx && `width: fit-content;`}
`;

const Underline = styled(motion.span)<{ $menuIdx: number }>`
  display: inline-block;
  width: 100%;
  height: 3px;
  background: ${({ $menuIdx, theme }) =>
    $menuIdx === 1 ? "#fff" : theme.accentColor};
`;

const ModeBtn = styled.div`
  position: relative;
  cursor: pointer;
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

  const handleClick = (index: number) => {
    setSelectedIndex(index);
    onClick(index);
  };

  return (
    <Wrapper $menuIdx={selectedIndex}>
      <Nav $menuIdx={selectedIndex}>
        {menuArr.map((menu: string, index: number) => (
          <Menu
            key={index}
            $isSelected={index === selectedIndex}
            $menuIdx={selectedIndex}
            onClick={() => handleClick(index)}
          >
            {menu}
            {index === selectedIndex && (
              <Underline
                $menuIdx={selectedIndex}
                layoutId="underline"
              ></Underline>
            )}
          </Menu>
        ))}
        <ModeBtn>
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
          />
        </ModeBtn>
      </Nav>
    </Wrapper>
  );
};

export default React.memo(Header);
