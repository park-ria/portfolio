import { useRef } from "react";
import styled from "styled-components";

const Nav = styled.ul`
  width: 1290px;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Menu = styled.li`
  font-size: 20px;
  cursor: pointer;
`;

const menuArr: string[] = [
  "Home",
  "About",
  "Career",
  "Skill",
  "Works",
  "Contact",
];

const Header = () => {
  return (
    <Nav>
      {menuArr.map((menu: string, index: number) => (
        <Menu
          key={index}
          //onClick={(e) => moveScroll(e, index)}
        >
          {menu}
        </Menu>
      ))}
    </Nav>
  );
};

export default Header;
