import styled from "styled-components";
import { CareerType } from "../../type";
import CareerProject from "./CareerProject";
import { motion } from "framer-motion";
import { useRecoilValue } from "recoil";
import { selectedIndexAtom } from "../../atoms";

const Wrapper = styled(motion.div)`
  display: flex;
  justify-content: space-between;
  border-top: 1px solid var(--dark-gray-color);
  @media screen and (max-width: 1150px) {
    flex-direction: column;
  }
`;

const SubTitle = styled.div`
  margin: 10px 0 0 100px;
  display: flex;
  justify-content: flex-start;
  flex: 1;
  gap: 100px;
  @media screen and (max-width: 1150px) {
    margin-left: 0px;
    padding-left: 10px;
    padding-bottom: 10px;
    gap: 30px;
    border-bottom: 1px dashed;
  }
  @media screen and (max-width: 850px) {
    gap: 10px;
  }
  @media screen and (max-width: 450px) {
    padding-left: 0;
  }
`;

const SubTitleGroup = styled.div`
  @media screen and (max-width: 1150px) {
    display: flex;
    align-items: flex-end;
    gap: 10px;
  }
`;

const SubTitleText = styled.h3`
  font-size: 2rem;
  font-weight: 700;
  color: ${({ theme }) => theme.textColor};
  @media screen and (max-width: 850px) {
    font-size: 1.25rem;
  }
`;

const CareerDate = styled.span`
  font-size: 20px;
  color: var(--dark-gray-color);
  @media screen and (max-width: 850px) {
    font-size: 0.875rem;
  }
`;

const Projects = styled(motion.ul)`
  width: 50%;
  @media screen and (max-width: 1150px) {
    width: 100%;
  }
`;

interface CareerGroupType {
  data: CareerType;
}

const CareerGroup = ({ data }: CareerGroupType) => {
  const seletedIndex = useRecoilValue(selectedIndexAtom);

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: data.orderNum === "01" ? 0.3 : 0.75,
      },
    },
  };

  const listVariant = {
    hidden: {
      y: -10,
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <Wrapper
      variants={listVariant}
      initial="hidden"
      animate={seletedIndex === -1 || seletedIndex === 2 ? "visible" : "hidden"}
      transition={{ delay: data.orderNum === "01" ? 0.3 : 0.7 }}
    >
      <SubTitle>
        <SubTitleText>{data.orderNum}.</SubTitleText>
        <SubTitleGroup>
          <SubTitleText>{data.company}</SubTitleText>
          <CareerDate>{data.period}</CareerDate>
        </SubTitleGroup>
      </SubTitle>
      <Projects
        variants={container}
        initial="hidden"
        animate={
          seletedIndex === -1 || seletedIndex === 2 ? "visible" : "hidden"
        }
      >
        {data.project.map((project, pIndex) => (
          <motion.li key={pIndex} variants={listVariant}>
            <CareerProject
              project={project}
              first={data.orderNum === "01" && pIndex === 3}
            />
          </motion.li>
        ))}
      </Projects>
    </Wrapper>
  );
};

export default CareerGroup;
