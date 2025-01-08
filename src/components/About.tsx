import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  padding-left: 120px;
  padding-right: 15px;
  background: ${({ theme }) => theme.accentColor};
  @media screen and (max-width: 600px) {
    padding-left: 15px;
    padding-right: 15px;
  }
`;

const Title = styled.h1`
  width: fit-content;
  margin: 0 auto;
  padding-top: 100px;
  font: 700 80px/1 "Teko", serif;
  letter-spacing: -2px;
  color: ${({ theme }) => theme.textColor};
  @media screen and (max-width: 450px) {
    font-size: 50px;
  }
`;

const Content = styled.div`
  width: 1290px;
  margin: 0 auto;
  margin-top: 70px;
  padding-bottom: 100px;
  display: flex;
  @media screen and (max-width: 1400px) {
    margin-top: 50px;
  }
  @media screen and (max-width: 1150px) {
    width: 100%;
    flex-direction: column-reverse;
    align-items: center;
    gap: 50px;
  }
  @media screen and (max-width: 420px) {
    width: 300px;
  }
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 50px;
  @media screen and (max-width: 1400px) {
    gap: 30px;
  }
`;

const TextRow = styled.div`
  display: flex;
  gap: 50px;
  @media screen and (max-width: 1400px) {
    flex-wrap: wrap;
    gap: 30px;
  }
  @media screen and (max-width: 420px) {
    justify-content: space-between;
    gap: 0;
    row-gap: 30px;
    & span:nth-child(2) {
      font-size: 0.97rem;
    }
  }
`;

const SubTitle = styled.h3`
  margin-bottom: 10px;
  font: 500 2rem/1 "Teko", serif;
  color: ${({ theme }) => theme.textColor};
  @media screen and (max-width: 600px) {
    font-size: 1.5rem;
  }
`;

const SubDesc = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  font-size: 1.25rem;
  label {
    margin-right: 20px;
  }
  @media screen and (max-width: 600px) {
    font-size: 1rem;
  }
`;

const AboutCircle = styled.span`
  width: 400px;
  height: 400px;
  border-radius: 50%;
  background: #fff;
  filter: drop-shadow(5px 5px 5px rgba(0, 0, 0, 0.4));
  opacity: 0;
  overflow: hidden;
  transition: all 0.3s;
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url("/imgs/profile4.png") top/cover no-repeat;
  }
  @media screen and (max-width: 1150px) {
    opacity: 1;
  }
  @media screen and (max-width: 450px) {
    width: 300px;
    height: 300px;
  }
`;

const About = () => {
  return (
    <Wrapper>
      <Title>ABOUT ME</Title>
      <Content>
        <TextWrapper>
          <TextRow>
            <div>
              <SubTitle>Information</SubTitle>
              <SubDesc>
                <div>
                  <label>이름</label>
                  <span>박리아</span>
                </div>
                <div>
                  <label>나이</label>
                  <span>1991.02</span>
                </div>
              </SubDesc>
            </div>
            <div>
              <SubTitle>Career</SubTitle>
              <SubDesc>
                <div>
                  <label>웹개발</label>
                  <span>3년 8개월</span>
                </div>
                <div>
                  <label>서버엔지니어</label>
                  <span>1년</span>
                </div>
              </SubDesc>
            </div>
            <div>
              <SubTitle>Certificate</SubTitle>
              <SubDesc>
                <span>정보처리기사</span>
              </SubDesc>
            </div>
          </TextRow>
          <TextRow>
            <div>
              <SubTitle>Education</SubTitle>
              <SubDesc>
                <span>조선대학교 컴퓨터공학부 졸업</span>
                <span>UXUI 디자인 웹 프론트엔트 개발 부트캠프 수료</span>
                <span>지능형 빅데이터 서비스 개발자 과정 수료</span>
              </SubDesc>
            </div>
          </TextRow>
          <TextRow>
            <div>
              <SubTitle>Education</SubTitle>
              <SubDesc>
                <span> 자바스크립트 문법 멘토(24.08.16~진행중)</span>
              </SubDesc>
            </div>
          </TextRow>
        </TextWrapper>
        <AboutCircle />
      </Content>
    </Wrapper>
  );
};

export default About;
