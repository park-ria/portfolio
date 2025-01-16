import { useEffect, useState } from "react";
import styled from "styled-components";
import { ProjectType } from "../../type";
import CareerProjectDesc from "./CareerProjectDesc";
import { motion } from "framer-motion";

const Wrapper = styled(motion.div)`
  padding-left: 10px;
  border-bottom: 1px solid var(--dark-gray-color);
  overflow: hidden;
  transform-origin: top;
  @media screen and (max-width: 450px) {
    padding-left: 0;
  }
`;

const ProjectTop = styled.div`
  margin: 10px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ProjectName = styled.div`
  height: fit-content;
  font-size: 1.25rem;
  color: ${({ theme }) => theme.textColor};
  cursor: pointer;
  transition: color 0.3s;
  &:hover {
    color: ${({ theme }) => theme.accentColor};
  }
  @media screen and (max-width: 850px) {
    font-size: 1rem;
  }
  @media screen and (max-width: 450px) {
    font-size: 0.875rem;
  }
`;

const OpenButton = styled.span<{ $isOpen: boolean }>`
  font-size: 1.6rem;
  color: ${({ theme }) => theme.textColor};
  padding: 0 10px;
  cursor: pointer;
  transform: ${({ $isOpen }) => ($isOpen ? "rotate(45deg)" : "rotate(0)")};
  transition: all 0.3s;
  &:hover {
    scale: 1.5;
    color: ${({ theme }) => theme.accentColor};
  }
  @media screen and (max-width: 450px) {
    padding: 0 5px;
  }
`;

interface CareerProjectType {
  project: ProjectType;
  first: boolean;
}

const CareerProject = ({ project, first }: CareerProjectType) => {
  const [isOpen, setIsOpen] = useState(false);
  const onClick = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    if (first) setIsOpen(true);
  }, []);

  return (
    <Wrapper
      initial={{ height: 58 }}
      animate={{ height: isOpen ? "fit-content" : 58 }}
      transition={{ duration: 0.3 }}
    >
      <ProjectTop>
        <ProjectName onClick={onClick}>{project.name}</ProjectName>
        <OpenButton $isOpen={isOpen} onClick={onClick}>
          +
        </OpenButton>
      </ProjectTop>
      <CareerProjectDesc isOpen={isOpen} project={project} />
    </Wrapper>
  );
};

export default CareerProject;
