import styled from "styled-components";
import { SkillType } from "../../type";

const SkillDesc = styled.ul`
  margin: 5px 0 0 20px;
  @media screen and (max-width: 450px) {
    margin-left: 10px;
  }
`;

const SkillLine = styled.li`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  p {
    flex: 1;
    @media screen and (max-width: 450px) {
      font-size: 0.875rem;
    }
  }
`;

const SkillLabel = styled.label`
  width: 85px;
  display: flex;
  align-items: center;
  gap: 5px;

  &::before {
    content: "";
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: ${({ theme }) => theme.textColor};
  }
`;

interface CareerSkillType {
  skills: SkillType[];
}

const CareerSkill = ({ skills }: CareerSkillType) => {
  return (
    <li>
      프로젝트 기술 스택
      <SkillDesc>
        {skills.map((skill, sIndex) => (
          <SkillLine key={sIndex}>
            <SkillLabel>{skill.title}</SkillLabel>
            <p>{skill.content}</p>
          </SkillLine>
        ))}
      </SkillDesc>
    </li>
  );
};

export default CareerSkill;
