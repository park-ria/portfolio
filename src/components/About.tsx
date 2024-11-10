import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  height: 850px;
  background: ${({ theme }) => theme.accentColor};
`;

const About = () => {
  return <Wrapper>About</Wrapper>;
};

export default About;
