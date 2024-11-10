import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  border: 1px solid #f00;
  width: 100%;
  height: 1080px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const HomeInner = styled.div`
  width: 1290px;
  height: fit-content;
  display: flex;
  justify-content: space-between;
`;

const HomeTextSection = styled.div`
  width: 622px;
`;

const HomeTitle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  margin-bottom: 40px;
  span {
    font-family: "Teko", serif;
    font-size: 174px;
    font-weight: 700;
    letter-spacing: -2px;
    line-height: 1;
    color: ${({ theme }) => theme.textColor};
  }
`;

const HomeDesc = styled.p`
  font-size: 18px;
  color: ${({ theme }) => theme.textColor};
`;

const HomeImgSection = styled.div``;

const ImgCircle = styled.div`
  width: 500px;
  height: 500px;
  border-radius: 50%;
  background: #00f;
`;

const FrontCircle = styled.span`
  display: inline-block;
  width: 250px;
  height: 500px;
  border-radius: 250px 0 0 250px;
  background: ${({ theme }) => theme.accentColor};
  overflow: hidden;
  position: relative;
  filter: drop-shadow(5px 5px 5px rgba(0, 0, 0, 0.4));

  &::before {
    content: "";
    width: 90%;
    height: 80%;
    object-fit: cover;
    position: absolute;
    bottom: 0;
    right: 0;
    background: url("imgs/profile1.png") center/cover no-repeat;
  }

  span {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      to bottom,
      transparent 20%,
      rgba(0, 0, 0, 0.3) 75%
    );
  }

  &::after {
    content: "Front";
    position: absolute;
    left: 60%;
    bottom: 70px;
    transform: translateX(-50%);
    font-family: "Teko", serif;
    font-size: 70px;
    letter-spacing: -2px;
    color: #fff;
  }
`;

const BackCircle = styled.span`
  display: inline-block;
  width: 250px;
  height: 500px;
  border-radius: 0 250px 250px 0;
  background: #ececec;
  overflow: hidden;
  position: relative;
  filter: drop-shadow(5px 5px 5px rgba(0, 0, 0, 0.4));

  &::before {
    content: "";
    width: 82%;
    height: 80%;
    object-fit: cover;
    position: absolute;
    bottom: 0;
    left: 0;
    background: url("imgs/profile2.png") center/cover no-repeat;
  }

  span {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      to bottom,
      transparent 20%,
      rgba(0, 0, 0, 0.3) 75%
    );
  }

  &::after {
    content: "Back";
    position: absolute;
    right: 60%;
    bottom: 70px;
    transform: translateX(50%);
    font-family: "Teko", serif;
    font-size: 70px;
    letter-spacing: -2px;
    color: #fff;
  }
`;

const Home = () => {
  return (
    <Wrapper>
      <HomeInner>
        <HomeTextSection>
          <HomeTitle>
            <span>I CAN</span>
            <span>BE BOTH</span>
          </HomeTitle>
          <HomeDesc>
            프론트엔드의 세련된 인터페이스부터 백엔드의 견고한 시스템 설계까지,
            웹 개발자로서 웹의 모든 단계를 책임집니다. 직관적인 사용자 경험과
            효율적인 데이터 처리로 아이디어를 완벽한 디지털 솔루션으로
            구현합니다.
          </HomeDesc>
        </HomeTextSection>
        <HomeImgSection>
          <ImgCircle>
            <FrontCircle>
              <span />
            </FrontCircle>
            <BackCircle>
              <span />
            </BackCircle>
          </ImgCircle>
        </HomeImgSection>
      </HomeInner>
    </Wrapper>
  );
};

export default Home;
