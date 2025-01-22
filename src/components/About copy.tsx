import styled from "styled-components";
import { Wrapper, Content } from "./Common/LayoutComponents";
import Title from "./Common/Title";
import { motion } from "framer-motion";
import { useRecoilValue } from "recoil";
import { selectedIndexAtom } from "../atoms";

const AboutContent = styled(Content)`
  padding-left: 100px;
  @media screen and (max-width: 850px) {
    padding-left: 0;
  }
`;

const ContentBox = styled.div`
  display: flex;
  @media screen and (max-width: 1150px) {
    flex-direction: column-reverse;
    align-items: center;
    gap: 50px;
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

const TextDesc = styled(motion.div)``;

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

const AboutCircle = styled(motion.span)`
  width: 400px;
  height: 400px;
  border-radius: 50%;
  background: #fff;
  filter: drop-shadow(5px 5px 5px rgba(0, 0, 0, 0.4));
  display: none;
  overflow: hidden;
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
    display: block;
  }
  @media screen and (max-width: 450px) {
    width: 300px;
    height: 300px;
  }
`;

const photoTransition = {
  duration: 0.5,
  ease: "easeInOut",
  delay: 0.1,
};

const photoReveal = {
  initial: {
    y: "50%",
    opacity: 0,
  },
  animate: {
    y: "0%",
    opacity: 1,
  },
};

const textTransition = {
  duration: 0.4,
  ease: "easeIn",
};

const textReveal = {
  initial: {
    x: "-100%",
    opacity: 0,
  },
  animate: {
    x: "0%",
    opacity: 1,
  },
};

const textSections = [
  [
    {
      title: "Information",
      content: [
        {
          label: "이름",
          value: "박리아",
        },
        {
          label: "나이",
          value: "1991.02",
        },
      ],
    },
    {
      title: "Career",
      content: [
        {
          label: "웹개발",
          value: "3년 8개월",
        },
        {
          label: "서버엔지니어",
          value: "1년",
        },
      ],
    },
    {
      title: "Certificate",
      content: "정보처리기사",
    },
  ],
  {
    title: "Education",
    content: [
      "조선대학교 컴퓨터공학부 졸업",
      "UXUI 디자인 웹 프론트엔트 개발 부트캠프 수료",
      "지능형 빅데이터 서비스 개발자 과정 수료",
    ],
  },
  {
    title: "Study",
    content: ["자바스크립트 문법 멘토(24.08.16~24.11.18)"],
  },
];

const About = () => {
  const selectedIndex = useRecoilValue(selectedIndexAtom);
  const delay = 0.1 as number;
  let num = 0;

  return (
    <Wrapper>
      <Title word={"ABOUT ME"} menuIdx={1} />
      <AboutContent>
        <ContentBox>
          <TextWrapper>
            {textSections.map((list, index) => (
              <TextRow key={index}>
                {Array.isArray(list) ? (
                  list.map((desc, descIdx) => (
                    <TextDesc
                      key={"desc" + descIdx}
                      variants={textReveal}
                      initial="initial"
                      animate={
                        selectedIndex === -1 || selectedIndex === 1
                          ? "animate"
                          : "initial"
                      }
                      transition={{
                        ...textTransition,
                        delay: parseFloat((++num * delay).toFixed(1)),
                      }}
                    >
                      <SubTitle>{desc.title}</SubTitle>
                      <SubDesc>
                        {typeof desc.content === "object" ? (
                          desc.content.map((content, contentIdx) => (
                            <div key={"content" + contentIdx}>
                              {typeof content === "object" && (
                                <>
                                  <label>{content.label}</label>
                                  <span>{content.value}</span>
                                </>
                              )}
                            </div>
                          ))
                        ) : (
                          <span>{desc.content}</span>
                        )}
                      </SubDesc>
                    </TextDesc>
                  ))
                ) : (
                  <TextDesc
                    variants={textReveal}
                    initial="initial"
                    animate={
                      selectedIndex === -1 || selectedIndex === 1
                        ? "animate"
                        : "initial"
                    }
                    transition={{
                      ...textTransition,
                      delay: parseFloat((++num * delay).toFixed(1)),
                    }}
                  >
                    <SubTitle>{list.title}</SubTitle>
                    <SubDesc>
                      {list.content.map((content, contentIdx) => (
                        <span key={"content2" + contentIdx}>{content}</span>
                      ))}
                    </SubDesc>
                  </TextDesc>
                )}
              </TextRow>
            ))}
          </TextWrapper>
          <AboutCircle
            variants={photoReveal}
            initial="initial"
            animate={
              selectedIndex === -1 || selectedIndex === 1
                ? "animate"
                : "initial"
            }
            transition={photoTransition}
          />
        </ContentBox>
      </AboutContent>
    </Wrapper>
  );
};

export default About;
