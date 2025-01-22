import styled from "styled-components";
import datas from "../../data.json";
import { CareerType } from "../../type";
import CareerGroup from "./CareerGroup";
import Title from "../Common/Title";
import { Wrapper, Content } from "../Common/LayoutComponents";

const CareerContent = styled(Content)`
  @media screen and (max-width: 1450px) {
    width: 100%;
  }
`;

const CareerDesc = styled.div`
  display: flex;
  flex-direction: column;
  gap: 80px;
  @media screen and (max-width: 450px) {
    gap: 50px;
  }
`;

const Career = () => {
  return (
    <Wrapper style={{ background: "none" }}>
      <Title word={"CAREER"} menuIdx={2} />
      <CareerContent>
        <CareerDesc>
          {datas.career?.map((data: CareerType, index: number) => (
            <CareerGroup key={index} data={data} />
          ))}
        </CareerDesc>
      </CareerContent>
    </Wrapper>
  );
};

export default Career;
