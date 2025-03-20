import styled from "styled-components";
import datas from "../../data.json";
import { CareerType } from "../../type";
import CareerGroup from "./CareerGroup";
import Title from "../Common/Title";
import { Wrapper, Content } from "../Common/LayoutComponents";
import { useEffect, useRef } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { careerIdAtom, workScrollTopAtom } from "../../atoms";

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
  const wrapperRef = useRef<HTMLDivElement>(null);
  const careerId = useRecoilValue(careerIdAtom);
  const setTopScroll = useSetRecoilState(workScrollTopAtom);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (wrapperRef.current) {
        setTopScroll(wrapperRef.current.scrollHeight - 923);
      }
    }, 400);

    return () => clearTimeout(timeout);
  }, [careerId]);

  return (
    <Wrapper ref={wrapperRef} style={{ background: "none" }}>
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
