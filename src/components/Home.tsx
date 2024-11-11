import styled from "styled-components";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const Wrapper = styled.div`
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
  position: relative;

  //background: #00f;

  .effect2 {
    position: absolute;
    top: 0;
    left: 0;
    fill: ${({ theme }) => theme.textColor};
    fill: #f00;
  }

  .effect5 {
    position: absolute;
    top: 0;
    right: 0;
    fill: ${({ theme }) => theme.textColor};
    fill: #f00;
  }
`;

const FrontCircle = styled(motion.span)`
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

const BackCircle = styled(motion.span)`
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
  const imgCircleRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: imgCircleRef,
    offset: ["start end", "end start"],
  });

  const frontTranslateY = useTransform(
    scrollYProgress,
    [0, 0.6],
    ["50%", "0%"]
  );
  const backTranslateY = useTransform(
    scrollYProgress,
    [0, 0.3],
    ["-20%", "0%"]
  );

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
          <ImgCircle ref={imgCircleRef}>
            <svg
              className="effect2"
              width="137"
              height="82"
              viewBox="0 0 137 82"
            >
              <rect width="137" height="82" fill="url(#pattern0_156_4)" />
              <defs>
                <pattern
                  id="pattern0_156_4"
                  patternContentUnits="objectBoundingBox"
                  width="1"
                  height="1"
                >
                  <use
                    xlinkHref="#image0_156_4"
                    transform="matrix(0.01 0 0 0.0167073 0 -0.00121951)"
                  />
                </pattern>
                <image
                  id="image0_156_4"
                  width="100"
                  height="60"
                  xlinkHref="data:image/png;base64,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"
                />
              </defs>
            </svg>
            <svg className="effect5" width="74" height="73" viewBox="0 0 74 73">
              <rect width="74" height="73" fill="url(#pattern0_156_27)" />
              <defs>
                <pattern
                  id="pattern0_156_27"
                  patternContentUnits="objectBoundingBox"
                  width="1"
                  height="1"
                >
                  <use
                    xlinkHref="#image0_156_27"
                    transform="scale(0.0135135 0.0136986)"
                  />
                </pattern>
                <image
                  id="image0_156_27"
                  width="74"
                  height="73"
                  xlinkHref="data:image/png;base64,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"
                />
              </defs>
            </svg>
            <FrontCircle style={{ translateY: frontTranslateY }}>
              <span />
            </FrontCircle>
            <BackCircle style={{ translateY: backTranslateY }}>
              <span />
            </BackCircle>
          </ImgCircle>
        </HomeImgSection>
      </HomeInner>
    </Wrapper>
  );
};

export default Home;
