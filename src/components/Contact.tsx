import styled from "styled-components";
import { motion } from "framer-motion";
import { Content, Wrapper } from "./Common/LayoutComponents";
import Title from "./Common/Title";
import { useRecoilValue } from "recoil";
import { selectedIndexAtom } from "../atoms";

const ContactTitle = styled.div`
  width: 350px;
  height: 80px;
  margin: 0 auto;
  display: flex;
  justify-content: flex-end;
  flex-direction: row-reverse;

  & > div {
    padding: 0;
  }
  @media screen and (max-width: 500px) {
    height: 50px;
  }
`;

const Plane = styled(motion.svg)`
  fill: ${({ theme }) => theme.textColor};
  @media screen and (max-width: 500px) {
    height: 50px;
  }
`;

const Ment = styled.p`
  margin: 20px auto 50px;
  text-align: center;
  font-size: 1.875rem;
  font-weight: 100;
  color: ${({ theme }) => theme.textColor};
  @media screen and (max-width: 900px) {
    font-size: 1.5rem;
  }
  @media screen and (max-width: 500px) {
    margin-bottom: 30px;
  }
`;

const ContactDetail = styled.div`
  width: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 50px;
  position: relative;
  margin: 0 auto;
  @media screen and (max-width: 500px) {
    width: 100%;
  }
`;

const Effect = styled.svg`
  position: absolute;
  top: -10%;
  left: -15%;
  fill: ${({ theme }) => theme.textColor};
  transition: opacity 0.3s ease-in-out;
  @media screen and (max-width: 900px) {
    opacity: 0;
  }
`;

const ContactDesc = styled.div`
  display: flex;
  align-items: center;
  gap: 60px;
  @media screen and (max-width: 900px) {
    gap: 10px;
  }
  @media screen and (max-width: 500px) {
    flex-direction: column;
    gap: 30px;
  }
`;

const QrImg = styled.span`
  width: 216px;
  height: 216px;
  background: url("/imgs/qr.jpg") center/cover no-repeat;
  @media screen and (max-width: 900px) and (min-width: 501px) {
    width: 150px;
    height: 150px;
  }
`;

const ContactInfos = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 30px;
  @media screen and (max-width: 900px) {
    gap: 20px;
  }
`;

const ContactInfo = styled.li`
  font-size: 1.25rem;
  letter-spacing: -1px;
  color: ${({ theme }) => theme.textColor};
  &::before {
    content: "";
    display: inline-block;
    width: 6px;
    height: 6px;
    margin-right: 10px;
    transform: translateY(-5px);
    border-radius: 3px;
    background: ${({ theme }) => theme.textColor};
  }
  @media screen and (max-width: 900px) {
    font-size: 1rem;
  }
`;

const IconGroup = styled.ul`
  display: flex;
  align-items: center;
  gap: 100px;
  position: relative;
  li {
    width: 100px;
    height: 100px;
    border: 5px solid #fff;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.5);
    position: relative;
    overflow: hidden;
    cursor: pointer;
    &::before {
      content: "";
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 0;
      background: #000;
      transition: all 0.5s;
    }
    &:nth-child(2) {
      background: #ffe812;
    }
    &:nth-child(3) {
      background: #662386;
    }
    &:nth-child(4) {
      background: #20c997;
    }
    &:hover::before {
      height: 100%;
    }

    svg {
      fill: #fff;
      transition: all 0.5s;
      &.kakao {
        fill: #000;
      }
    }
    &:hover svg {
      fill: #fff;
      transform: rotateY(360deg);
    }
  }
  @media screen and (max-width: 900px) {
    gap: 50px;
  }
  @media screen and (max-width: 420px) {
    width: 100%;
    justify-content: space-between;
    gap: 0;
    li {
      width: 80px;
      height: 80px;

      svg {
        width: 50px;
        height: 50px;
        &.vlog {
          width: 30px;
          height: 30px;
        }
      }
    }
  }
`;

const Heart = styled.svg`
  fill: ${({ theme }) => theme.textColor};
  position: absolute;
  top: -80%;
  right: -20%;
  @media screen and (max-width: 900px) {
    width: 100px;
    height: 100px;
    top: -65%;
    right: -15%;
  }
  @media screen and (max-width: 500px) {
    opacity: 0;
  }
`;

const Footer = styled.footer`
  width: fit-content;
  margin: 50px auto 0;
  font-size: 0.875rem;
  color: #999;
  text-align: center;
`;

const Contact = () => {
  const selectedIndex = useRecoilValue(selectedIndexAtom);

  const planeContainer = {
    hidden: { opacity: 0, y: 100, x: -100 },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        delay: 0.3,
        duration: 1,
      },
    },
  };

  const container = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.5,
      },
    },
  };

  return (
    <Wrapper style={{ background: "none" }}>
      <ContactTitle>
        <Title word={"CONTACT"} menuIdx={5} />
        <Plane
          version="1.0"
          width="71"
          height="62"
          viewBox="0 0 71 62"
          preserveAspectRatio="xMidYMid meet"
          variants={planeContainer}
          initial="hidden"
          animate={
            selectedIndex === -1 || selectedIndex === 5 ? "visible" : "hidden"
          }
        >
          <g transform="translate(0,62) scale(0.1,-0.1)" stroke="none">
            <path
              d="M540 602 c-49 -32 -366 -271 -389 -293 l-24 -23 47 -41 c42 -36 46
                -43 32 -54 -9 -8 -16 -17 -16 -22 0 -15 22 -10 43 8 18 17 20 16 45 -14 15
                -17 35 -43 45 -57 22 -32 44 -33 57 -3 91 222 164 392 184 428 36 66 41 89 19
                88 -10 0 -29 -7 -43 -17z m-66 -94 c-17 -18 -48 -55 -69 -83 -72 -93 -158
                -185 -171 -185 -7 0 -25 10 -40 23 l-26 23 93 72 c52 39 126 96 164 126 39 30
                72 55 74 55 3 1 -9 -14 -25 -31z m-32 -188 c-48 -110 -89 -200 -92 -200 -3 0
                -20 21 -39 45 -30 40 -32 47 -20 64 80 111 225 291 235 291 1 0 -37 -90 -84 -200z"
            />
          </g>
        </Plane>
      </ContactTitle>
      <Content
        style={{ marginTop: 0 }}
        as={motion.div}
        variants={container}
        initial="hidden"
        animate={
          selectedIndex === -1 || selectedIndex === 5 ? "visible" : "hidden"
        }
      >
        <Ment>Thank you for visiting my portfolio</Ment>
        <ContactDetail>
          <Effect
            version="1.0"
            width="107"
            height="87"
            viewBox="0 0 107 87"
            preserveAspectRatio="xMidYMid meet"
          >
            <g transform="translate(0,87) scale(0.1,-0.1)" stroke="none">
              <path
                d="M804 849 c-39 -11 -80 -52 -95 -94 -11 -30 -14 -32 -40 -23 -59 21
                -151 -29 -200 -109 -37 -59 -25 -148 36 -297 5 -11 -33 15 -84 57 -99 82 -190
                141 -233 152 -45 11 -33 1 45 -39 40 -20 84 -47 98 -59 13 -12 47 -40 74 -62
                28 -22 71 -62 97 -89 26 -27 50 -47 53 -45 2 3 -7 28 -20 57 -35 75 -75 207
                -75 246 0 76 103 176 180 176 41 0 49 -5 73 -42 20 -32 35 -36 44 -11 4 10 -2
                23 -15 34 -26 21 -27 30 -7 70 18 34 70 69 103 69 13 0 20 4 17 10 -7 11 -9 11 -51 -1z"
              />
              <path d="M260 583 c0 -5 15 -14 34 -21 18 -7 41 -21 51 -32 21 -24 37 -26 29 -5 -10 26 -114 79 -114 58z" />
              <path d="M345 255 c61 -13 81 -11 55 5 -8 6 -37 9 -65 9 l-50 -1 60 -13z" />
              <path d="M345 104 c-75 -38 -139 -83 -131 -91 2 -3 25 9 50 26 25 18 75 45 111 61 36 16 65 32 65 35 0 12 -29 2 -95 -31z" />
            </g>
          </Effect>
          <ContactDesc>
            <QrImg />
            <ContactInfos>
              <ContactInfo>E-MAIL : pra9128@naver.com</ContactInfo>
              <ContactInfo>GITHUB : https://github.com/park-ria</ContactInfo>
              <ContactInfo>VELOG : https://velog.io/@pra9128/posts</ContactInfo>
            </ContactInfos>
          </ContactDesc>
          <IconGroup>
            <Heart
              version="1.0"
              width="122"
              height="114"
              viewBox="0 0 122 114"
              preserveAspectRatio="xMidYMid meet"
            >
              <g transform="translate(0,114) scale(0.1,-0.1)" stroke="none">
                <path d="M325 893 c9 -70 16 -93 27 -93 6 0 7 7 4 16 -3 9 -9 40 -12 70 -4 30 -11 54 -16 54 -6 0 -7 -20 -3 -47z" />
                <path d="M410 876 c0 -31 4 -56 9 -56 11 0 11 99 -1 106 -4 3 -8 -20 -8 -50z" />
                <path d="M506 911 c-11 -17 -24 -101 -16 -101 10 0 34 99 27 106 -3 3 -8 1 -11 -5z" />
                <path d="M560 845 c-13 -27 -26 -53 -28 -57 -2 -5 1 -8 6 -8 13 0 55 86 50 102 -3 7 -15 -9 -28 -37z" />
                <path
                  d="M734 758 c-16 -12 -32 -28 -37 -35 -4 -6 -14 -19 -23 -27 -35 -35
                  -73 -167 -74 -253 0 -29 4 -53 9 -53 5 0 10 24 10 53 0 59 14 131 36 185 38
                  89 133 163 170 132 21 -18 18 -37 -15 -105 -31 -64 -30 -86 1 -45 11 14 27 33
                  34 43 19 22 93 24 101 2 12 -30 -8 -71 -57 -117 -51 -47 -162 -108 -198 -108
                  -11 0 -23 -5 -27 -12 -11 -18 56 -3 117 26 73 34 165 117 179 162 10 28 9 39
                  -4 58 -16 25 -65 38 -90 24 -13 -8 -16 -2 -16 35 0 32 -5 47 -16 51 -31 12 -72 6 -100 -16z"
                />
                <path
                  d="M339 662 c-20 -18 -35 -45 -44 -79 -12 -47 -11 -62 6 -145 30 -138
                  30 -138 44 -138 14 0 130 111 167 161 25 34 46 97 42 127 -1 6 -2 21 -3 31 -2
                  35 -29 52 -70 45 -27 -4 -40 -2 -50 10 -20 24 -57 19 -92 -12z m91 -12 c7 -14
                  8 -26 0 -39 -15 -29 -13 -71 4 -71 16 0 26 21 26 59 0 31 16 51 42 51 37 0 47
                  -72 19 -144 -12 -29 -147 -176 -162 -176 -15 0 -28 36 -45 124 -14 69 -15 93
                  -6 125 23 74 97 118 122 71z"
                />
              </g>
            </Heart>
            <li>
              <svg className="kakao" width="60" height="60" viewBox="0 0 60 60">
                <path d="M7.685 26.275L9.3225 27.4575L5.2975 32.5075L9.96 38.1L8.345 39.35L2.8425 32.62L7.685 26.275ZM2.0925 39.03H0V21.455L2.0925 21V39.03ZM54.45 28.075C53.3583 28.075 52.5208 28.4833 51.9375 29.3C51.3542 30.12 51.0625 31.3183 51.0625 32.895C51.0625 34.4567 51.3542 35.635 51.9375 36.43C52.5208 37.225 53.3583 37.6233 54.45 37.625C55.555 37.625 56.4 37.2267 56.985 36.43C57.5683 35.635 57.86 34.4567 57.86 32.895C57.86 31.3183 57.5683 30.1208 56.985 29.3025C56.4 28.4842 55.555 28.075 54.45 28.075ZM54.45 26.3925C56.1767 26.3925 57.5325 26.9533 58.5175 28.075C59.5042 29.195 59.9975 30.8017 59.9975 32.895C59.9975 34.9567 59.5083 36.54 58.53 37.645C57.5533 38.7533 56.1933 39.3075 54.45 39.3075C52.7217 39.3075 51.365 38.7542 50.38 37.6475C49.395 36.5392 48.9017 34.955 48.9 32.895C48.9 30.8017 49.3967 29.195 50.39 28.075C51.3833 26.9533 52.7367 26.3925 54.45 26.3925ZM40.615 37.555C40.9159 37.5534 41.2156 37.5157 41.5075 37.4425C41.8236 37.3645 42.1342 37.2659 42.4375 37.1475C42.7413 37.0279 43.0327 36.8789 43.3075 36.7025C43.5657 36.5392 43.8084 36.3526 44.0325 36.145V33.235H41.8575C40.7575 33.235 39.9542 33.425 39.4475 33.805C38.9425 34.1817 38.69 34.78 38.69 35.6C38.69 36.9033 39.3317 37.555 40.615 37.555ZM36.69 35.6925C36.69 34.4325 37.11 33.4742 37.95 32.8175C38.7917 32.1558 40.0158 31.825 41.6225 31.825H44.0325V31.03C44.0325 29.105 43.1833 28.1425 41.485 28.1425C40.94 28.1425 40.3683 28.2183 39.77 28.37C39.1717 28.5217 38.6217 28.7108 38.12 28.9375L37.5075 27.4625C38.1292 27.1125 38.8 26.8425 39.52 26.6525C40.2383 26.4642 40.9383 26.3692 41.62 26.3675C44.5633 26.3675 46.035 27.9367 46.035 31.075V39.0325H44.485L44.235 37.67C43.615 38.17 42.9525 38.5567 42.2475 38.83C41.5425 39.1017 40.8717 39.2375 40.235 39.2375C39.1267 39.2375 38.2592 38.9233 37.6325 38.295C37.0025 37.665 36.69 36.7975 36.69 35.6925ZM32.5625 26.2775L34.2 27.46L30.175 32.51L34.835 38.1025L33.2225 39.3525L27.72 32.6225L32.5625 26.2775ZM26.97 39.0325H24.8775V21.4575L26.97 21.0025V39.0325ZM15.735 37.5575C16.0217 37.5575 16.32 37.5192 16.63 37.4425C16.9444 37.3642 17.2534 37.2657 17.555 37.1475C17.8606 37.0282 18.1536 36.8792 18.43 36.7025C18.6882 36.5392 18.9309 36.3526 19.155 36.145V33.235H16.98C15.88 33.235 15.0758 33.425 14.5675 33.805C14.0625 34.1817 13.81 34.78 13.81 35.6C13.81 36.905 14.4517 37.5567 15.735 37.555M11.81 35.6925C11.81 34.4325 12.2308 33.4742 13.0725 32.8175C13.9125 32.1558 15.1358 31.825 16.7425 31.825H19.155V31.03C19.155 29.105 18.305 28.1425 16.605 28.1425C16.0617 28.1425 15.49 28.2183 14.89 28.37C14.29 28.5217 13.74 28.7108 13.24 28.9375L12.6275 27.4625C13.2492 27.1125 13.92 26.8425 14.64 26.6525C15.36 26.4642 16.0608 26.37 16.7425 26.37C19.6842 26.37 21.155 27.9383 21.155 31.075V39.0325H19.61L19.36 37.67C18.735 38.17 18.0717 38.5567 17.37 38.83C16.6667 39.1017 15.995 39.2375 15.355 39.2375C14.25 39.2375 13.3833 38.9233 12.755 38.295C12.125 37.665 11.81 36.7975 11.81 35.6925Z" />
              </svg>
            </li>
            <li>
              <svg width="60" height="60" viewBox="0 0 60 60">
                <g clipPath="url(#clip0_255_4)">
                  <path d="M30 1C26.0603 1 22.1593 1.77597 18.5195 3.28361C14.8797 4.79126 11.5726 7.00104 8.7868 9.7868C3.16071 15.4129 0 23.0435 0 31C0 44.26 8.61 55.51 20.52 59.5C22.02 59.74 22.5 58.81 22.5 58V52.93C14.19 54.73 12.42 48.91 12.42 48.91C11.04 45.43 9.09 44.5 9.09 44.5C6.36 42.64 9.3 42.7 9.3 42.7C12.3 42.91 13.89 45.79 13.89 45.79C16.5 50.35 20.91 49 22.62 48.28C22.89 46.33 23.67 45.01 24.51 44.26C17.85 43.51 10.86 40.93 10.86 29.5C10.86 26.17 12 23.5 13.95 21.37C13.65 20.62 12.6 17.5 14.25 13.45C14.25 13.45 16.77 12.64 22.5 16.51C24.87 15.85 27.45 15.52 30 15.52C32.55 15.52 35.13 15.85 37.5 16.51C43.23 12.64 45.75 13.45 45.75 13.45C47.4 17.5 46.35 20.62 46.05 21.37C48 23.5 49.14 26.17 49.14 29.5C49.14 40.96 42.12 43.48 35.43 44.23C36.51 45.16 37.5 46.99 37.5 49.78V58C37.5 58.81 37.98 59.77 39.51 59.5C51.42 55.48 60 44.26 60 31C60 27.0603 59.224 23.1593 57.7164 19.5195C56.2087 15.8797 53.999 12.5726 51.2132 9.7868C48.4274 7.00104 45.1203 4.79126 41.4805 3.28361C37.8407 1.77597 33.9397 1 30 1Z" />
                </g>
                <defs>
                  <clipPath id="clip0_255_4">
                    <rect width="60" height="60" />
                  </clipPath>
                </defs>
              </svg>
            </li>
            <li>
              <svg className="vlog" width="46" height="46" viewBox="0 0 60 60">
                <g clipPath="url(#clip0_259_18)">
                  <path d="M22.3285 1.13413C24.7311 2.89217 25.2077 5.13888 25.6601 7.90981C25.7576 8.46396 25.7576 8.46396 25.857 9.0293C26.0708 10.2518 26.2769 11.4755 26.4832 12.6992C26.6316 13.5551 26.7807 14.4108 26.9304 15.2664C27.2486 17.0894 27.564 18.9128 27.8775 20.7366C28.6515 25.2274 29.4543 29.713 30.2559 34.1989C30.5141 35.6469 30.7706 37.0953 31.0268 38.5437C31.1846 39.4323 31.3425 40.321 31.5004 41.2096C31.5723 41.6182 31.6442 42.0267 31.7183 42.4475C31.785 42.8212 31.8516 43.1949 31.9203 43.58C32.0067 44.0683 32.0067 44.0683 32.0949 44.5664C32.2618 45.4681 32.2618 45.4681 32.6545 46.5685C43.8812 31.887 43.8812 31.887 47.038 14.3028C46.0987 10.9873 42.4461 8.6362 39.6518 6.91669C40.9133 4.14153 43.6218 2.43214 46.3577 1.3042C49.3863 0.324352 52.5958 0.144615 55.5903 1.3285C57.6206 2.37902 59.0383 3.99665 59.8665 6.1392C61.1845 19.3886 52.4883 31.2992 44.972 41.4095C44.2858 42.3341 43.6053 43.2626 42.9258 44.192C33.6978 56.7987 33.6978 56.7987 31.4882 59.0083C30.8249 59.0971 30.1584 59.1619 29.4914 59.2164C29.0822 59.2502 28.673 59.284 28.2515 59.3189C27.8203 59.3527 27.3891 59.3865 26.9448 59.4214C26.3093 59.4744 26.3093 59.4744 25.6609 59.5284C23.7077 59.6865 21.7861 59.7931 19.8259 59.7858C18.8245 54.2032 17.8241 48.6204 16.8251 43.0374C16.361 40.4445 15.8967 37.8517 15.4315 35.2591C14.982 32.7538 14.5334 30.2483 14.0855 27.7427C13.915 26.7902 13.7443 25.8377 13.5731 24.8853C13.3322 23.5441 13.0925 22.2026 12.853 20.8612C12.7482 20.2798 12.7482 20.2798 12.6412 19.6867C12.1154 16.7303 11.699 13.7822 11.2736 10.8041C7.55329 10.8041 3.83301 10.8041 0 10.8041C0 9.13641 0 7.4687 0 5.75046C3.07571 4.43186 6.20534 3.46558 9.42675 2.58337C10.2761 2.34931 11.1228 2.10707 11.9698 1.86454C15.4121 0.902542 18.8243 -0.0126969 22.3285 1.13413Z" />
                </g>
                <defs>
                  <clipPath id="clip0_259_18">
                    <rect width="60" height="60" />
                  </clipPath>
                </defs>
              </svg>
            </li>
          </IconGroup>
        </ContactDetail>
        <Footer>
          Copyright 2025. parkria all rights reserved.
          <br />
          Typescript, Styled Components 기반으로 제작된 사이트입니다.
        </Footer>
      </Content>
    </Wrapper>
  );
};

export default Contact;
