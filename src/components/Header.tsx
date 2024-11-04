import { useRef } from "react";
import styled from "styled-components";

const Nav = styled.ul`
  width: 1290px;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
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
  const menus = useRef<(HTMLLIElement | null)[]>([]);
  return (
    <Nav>
      {menuArr.map((menu: string, index: number) => (
        <li key={index} ref={(el) => (menus.current[index] = el)}>
          {menu}
        </li>
      ))}
    </Nav>
  );
};

export default Header;
