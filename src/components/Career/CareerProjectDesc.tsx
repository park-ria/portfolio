import styled from "styled-components";
import { ProjectType } from "../../type";
import CareerSkill from "./CareerSkill";
import CareerSkillIcon from "./CareerSkillIcon";
import { motion } from "framer-motion";

const ProjectDesc = styled(motion.ul)`
  margin: 10px 0;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  background: var(--light-gray-color);
  background: ${({ theme }) => theme.lightGrayColor};
  color: ${({ theme }) => theme.textColor};
  border-radius: 8px;
  overflow: hidden;
  transform-origin: top;
`;

const ProjectDescLabel = styled.span`
  display: inline-block;
  width: 60px;
`;

const Site = styled.a`
  cursor: pointer;
  transition: all 0.3s;
  &:hover {
    text-decoration: underline;
    color: crimson;
  }
`;

const SkillIconGroup = styled.li`
  display: flex;
  align-items: center;
  gap: 10px;
`;

interface CareerProjectType {
  isOpen: boolean;
  project: ProjectType;
}

const CareerProjectDesc = ({ isOpen, project }: CareerProjectType) => {
  return (
    <ProjectDesc
      initial={{ scaleY: 0 }}
      animate={{ scaleY: isOpen ? 1 : 0 }}
      transition={{ duration: 0.3 }}
    >
      <li>
        <ProjectDescLabel>기간</ProjectDescLabel>
        <span>{project.period}</span>
      </li>
      {project.site && (
        <li>
          <ProjectDescLabel>사이트</ProjectDescLabel>
          <span>
            <Site href={project.site} target="_blank">
              {project.site}
            </Site>
          </span>
        </li>
      )}
      <li>
        <ProjectDescLabel>포지션</ProjectDescLabel>
        <span>{project.position}</span>
      </li>
      {project.skill && <CareerSkill skills={project.skill} />}
      <SkillIconGroup>
        {project.skillIcon.map((icon, iIndex) => (
          <CareerSkillIcon key={iIndex} icon={icon} />
        ))}
      </SkillIconGroup>
    </ProjectDesc>
  );
};

export default CareerProjectDesc;
