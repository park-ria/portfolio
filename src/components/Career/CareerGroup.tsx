import styled from "styled-components";
import { CareerType } from "../../type";
import ProjectCareer from "./CareerProject";

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  border-top: 1px solid var(--dark-gray-color);
`;

const SubTitle = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: space-evenly;
  flex: 1;
`;

const SubTitleText = styled.h3`
  font-size: 2rem;
  font-weight: 700;
  color: ${({ theme }) => theme.textColor};
`;

const CareerDate = styled.span`
  font-size: 20px;
  color: var(--dark-gray-color);
`;

const Projects = styled.ul`
  width: 50%;
  //border-top: 1px solid var(--dark-gray-color);
`;

interface CareerGroupType {
  data: CareerType;
}

const CareerGroup = ({ data }: CareerGroupType) => {
  return (
    <Wrapper>
      <SubTitle>
        <SubTitleText>{data.orderNum}.</SubTitleText>
        <div>
          <SubTitleText>{data.company}</SubTitleText>
          <CareerDate>{data.period}</CareerDate>
        </div>
      </SubTitle>
      <Projects>
        {data.project.map((project, pIndex) => (
          <ProjectCareer key={pIndex} project={project} />
        ))}
      </Projects>
    </Wrapper>
  );
};

export default CareerGroup;
