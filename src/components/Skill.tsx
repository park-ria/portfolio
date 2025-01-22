import styled from "styled-components";
import datas from "../data.json";
import { Content, Wrapper } from "./Common/LayoutComponents";
import Title from "./Common/Title";

const SkillContent = styled(Content)`
  @media screen and (max-width: 1450px) {
    width: 100%;
  }
`;

const SkillGroup = styled.div`
  width: 1003px;
  margin: 0 auto;
  margin-bottom: 100px;
  @media screen and (max-width: 1150px) {
    width: 80%;
  }
`;

const SubTitle = styled.h3`
  margin-bottom: 30px;
  font: 500 2rem/1 "Teko", serif;
  letter-spacing: -2px;
  color: ${({ theme }) => theme.textColor};
`;

const Skills = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fill, 100px);
  justify-content: space-between;
  grid-gap: 30px;
`;

const SkillDesc = styled.li`
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: center;
`;

const SkillImgSpan = styled.span`
  width: 100px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  background: ${({ theme }) => theme.skillIconBg};
  box-shadow: 4px 6px 6px rgba(0, 0, 0, 0.4);
`;

const SkillImg = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
`;

const SkillName = styled.p`
  font-size: 1.25rem;
  text-align: center;
  letter-spacing: -1px;
  color: ${({ theme }) => theme.textColor};
`;

const Skill = () => {
  return (
    <Wrapper style={{ background: "none" }}>
      <Title word={"SKILL"} menuIdx={3} />
      <SkillContent>
        {datas.skill.map((list) => (
          <SkillGroup key={list.title}>
            <SubTitle>{list.title}</SubTitle>
            <Skills>
              {list.skills.map((skill) => (
                <SkillDesc key={skill.name}>
                  <SkillImgSpan>
                    <SkillImg src={`/imgs/${skill.img}.png`} alt={skill.name} />
                  </SkillImgSpan>
                  <SkillName className="teko">{skill.name}</SkillName>
                </SkillDesc>
              ))}
            </Skills>
          </SkillGroup>
        ))}
      </SkillContent>
    </Wrapper>
  );
};

export default Skill;
