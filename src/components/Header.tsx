import { motion } from "framer-motion";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import { selectedIndexAtom } from "../atoms";
import React from "react";

const Wrapper = styled.header<{ $menuIdx: number }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 80px;
  display: flex;
  align-items: center;
  z-index: 1;

  ${({ $menuIdx }) =>
    $menuIdx &&
    `position: sticky;
    top: 0;
    width: fit-content;
    height: fit-content;
    padding: 200px 30px 0 30px;`}
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

const Underline = styled(motion.span)`
  display: inline-block;
  width: 100%;
  height: 3px;
  background: ${({ theme }) => theme.accentColor};
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
              <Underline layoutId="underline"></Underline>
            )}
          </Menu>
        ))}
      </Nav>
    </Wrapper>
  );
};

export default React.memo(Header);
