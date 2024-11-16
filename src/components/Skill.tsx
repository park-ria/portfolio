import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  height: 1266px;
`;

const Title = styled.h1`
  width: fit-content;
  margin: 0 auto;
  padding-top: 100px;
  font: 700 80px/1 "Teko", serif;
  letter-spacing: -2px;
  color: ${({ theme }) => theme.textColor};
`;

const Skill = () => {
  return (
    <Wrapper>
      <Title>SKILL</Title>
    </Wrapper>
  );
};

export default Skill;
