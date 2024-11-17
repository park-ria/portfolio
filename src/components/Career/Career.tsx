import styled from "styled-components";
import datas from "../../data.json";
import { CareerType } from "../../type";
import CareerGroup from "./CareerGroup";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const Title = styled.h1`
  width: fit-content;
  margin: 0 auto;
  padding-top: 100px;
  font: 700 80px/1 "Teko", serif;
  letter-spacing: -2px;
  color: ${({ theme }) => theme.textColor};
`;

const CareerDesc = styled.div`
  width: 1290px;
  margin: 0 auto;
  margin-top: 70px;
  margin-bottom: 100px;
  display: flex;
  flex-direction: column;
  gap: 80px;
`;

const Career = () => {
  return (
    <Wrapper>
      <Title>CAREER</Title>
      <CareerDesc>
        {datas.career?.map((data: CareerType, index: number) => (
          <CareerGroup key={index} data={data} />
        ))}
      </CareerDesc>
    </Wrapper>
  );
};

export default Career;
