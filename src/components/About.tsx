import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  background: ${({ theme }) => theme.accentColor};
`;

const Title = styled.h1`
  width: fit-content;
  margin: 0 auto;
  padding-top: 100px;
  font: 700 80px/1 "Teko", serif;
  letter-spacing: -2px;
  color: ${({ theme }) => theme.textColor};
`;

const SubWrapper = styled.div`
  width: 1290px;
  margin: 0 auto;
  margin-top: 70px;
  padding: 0 0 100px 100px;
  display: flex;
  flex-direction: column;
  gap: 50px;
  @media screen and (max-width: 1400px) {
    margin-top: 50px;
  }
`;

const SubRow = styled.div`
  display: flex;
  gap: 50px;
`;

const SubTitle = styled.h3`
  margin-bottom: 10px;
  font: 500 2rem/1 "Teko", serif;
  color: ${({ theme }) => theme.textColor};
`;

const SubDesc = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  font-size: 1.25rem;
  label {
    margin-right: 20px;
  }
`;

const About = () => {
  return (
    <Wrapper>
      <Title>ABOUT ME</Title>
      <SubWrapper>
        <SubRow>
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
        </SubRow>
        <SubRow>
          <div>
            <SubTitle>Education</SubTitle>
            <SubDesc>
              <span>조선대학교 컴퓨터공학부 졸업</span>
              <span>
                K-Digital Tranining 기업연계 프론트엔트 개발 부트캠프 수료
              </span>
              <span>지능형 빅데이터 서비스 개발자 과정 수료</span>
            </SubDesc>
          </div>
        </SubRow>
        <SubRow>
          <div>
            <SubTitle>Education</SubTitle>
            <SubDesc>
              <span> 자바스크립트 문법 멘토(24.08.16~진행중)</span>
            </SubDesc>
          </div>
        </SubRow>
      </SubWrapper>
    </Wrapper>
  );
};

export default About;
