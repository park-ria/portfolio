import { useEffect, useRef } from "react";
import styled from "styled-components";
import { selectedIndexAtom } from "../atoms";
import { useRecoilValue } from "recoil";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Wrapper = styled.div`
  width: 100%;
  height: 1080px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const HomeInner = styled.div`
  width: 1290px;
  height: 500px;
  display: flex;
  justify-content: space-between;
`;

const HomeTextSection = styled.div`
  width: 622px;
`;

const HomeTitle = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 40px;
  span {
    display: inline-block;
    min-width: 40px;
    font: 700 174px/1 "Teko", serif;
    letter-spacing: -2px;
    color: ${({ theme }) => theme.textColor};

    &:first-child {
      position: relative;
      .effect1 {
        position: absolute;
        top: -50px;
        left: -50px;
        fill: ${({ theme }) => theme.textColor};
      }
      .effect3 {
        position: absolute;
        top: 50px;
        right: 100px;
        fill: ${({ theme }) => theme.textColor};
      }
    }
    &.text3 {
      font-size: 150px;
    }
  }
`;

const HomeDesc = styled.p`
  font-size: 1.125rem;
  color: ${({ theme }) => theme.textColor};
`;

const HomeImgSection = styled.div`
  position: relative;
  height: 1500px;
  border: 1px solid #f00;

  .effect2 {
    position: absolute;
    top: 0;
    left: 0;
    fill: ${({ theme }) => theme.textColor};
  }

  .effect4 {
    position: absolute;
    top: 50px;
    right: -50px;
    fill: ${({ theme }) => theme.textColor};
  }
`;

const ImgWrapper = styled.div`
  position: sticky;
  top: 210px;
`;

const ImgCircle = styled.div`
  width: 502px;
  height: 500px;
  border-radius: 50%;
  position: relative;
  border: 1px solid #f00;
`;

const AboutCircle = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: url("/imgs/profile4.png") top/cover no-repeat;
  opacity: 0;
  overflow: hidden;
`;

const FrontCircle = styled.span`
  display: inline-block;
  width: 250px;
  height: 500px;
  border-radius: 250px 0 0 250px;
  background: ${({ theme }) => theme.accentColor};
  position: relative;
  transform: translateY(30%);
  filter: drop-shadow(5px 5px 5px rgba(0, 0, 0, 0.4));
  overflow: hidden;

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
      transparent 15%,
      rgba(0, 0, 0, 0.3) 75%
    );
  }

  &::after {
    content: "Front";
    position: absolute;
    left: 60%;
    bottom: 70px;
    transform: translateX(-30%);
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
  position: relative;
  transform: translateY(-20%);
  filter: drop-shadow(5px 5px 5px rgba(0, 0, 0, 0.4));
  overflow: hidden;

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
  const selectedIndex = useRecoilValue(selectedIndexAtom);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const imgCircleRef = useRef<HTMLDivElement | null>(null);
  const aboutCircleRef = useRef<HTMLSpanElement | null>(null);
  const frontCircleRef = useRef<HTMLSpanElement | null>(null);
  const backCircleRef = useRef<HTMLSpanElement | null>(null);
  const text1Ref = useRef<HTMLSpanElement | null>(null);
  const text2Ref = useRef<HTMLSpanElement | null>(null);
  const text3Ref = useRef<HTMLSpanElement | null>(null);
  const effect1Ref = useRef<SVGSVGElement | null>(null);
  const effect2Ref = useRef<SVGSVGElement | null>(null);
  const effect3Ref = useRef<SVGSVGElement | null>(null);
  const effect4Ref = useRef<SVGSVGElement | null>(null);
  const imgSectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (
      wrapperRef.current &&
      text1Ref.current &&
      text2Ref.current &&
      effect1Ref.current &&
      effect2Ref.current &&
      imgCircleRef.current &&
      imgSectionRef.current &&
      frontCircleRef.current &&
      backCircleRef.current &&
      aboutCircleRef.current
    ) {
      // 공통 scrollTrigger 설정
      const scrollTrigger = {
        trigger: wrapperRef.current, // 트리거 요소
        start: "top center", // 트리거가 화면 중앙에 올 때 시작
        end: "bottom center", // 트리거가 화면 바깥으로 나갈 때까지 유지
        toggleActions: "play reverse play reverse", // 스크롤 상태에 따라 애니메이션 동작
      };

      const imgCircleTop = imgCircleRef.current.getBoundingClientRect().top;
      const imgSectionTop = imgSectionRef.current.getBoundingClientRect().top;
      if (imgCircleTop - imgSectionTop <= 40) {
        const timeline1 = gsap.timeline({
          scrollTrigger: {
            ...scrollTrigger,
            toggleActions: "play none none none",
          },
        });

        timeline1 // imgCircleRef 공이 튀는 효과 추가
          .fromTo(
            imgCircleRef.current,
            { y: "50%" }, // 시작 위치
            { y: "0%", duration: 0.3, ease: "bounce.out" }
          )
          .to(imgCircleRef.current, {
            y: "10%",
            duration: 0.2,
            ease: "power1.out",
          })
          .to(imgCircleRef.current, {
            y: "0%",
            duration: 0.3,
            ease: "bounce.out",
          })
          .to(imgCircleRef.current, {
            y: "1.5%",
            duration: 0.15,
            ease: "power1.out",
          })
          .to(imgCircleRef.current, {
            y: "0%",
            duration: 0.2,
            ease: "bounce.out",
          });
      }

      const timeline2 = gsap.timeline({ scrollTrigger });
      timeline2
        .addLabel("start")
        .fromTo(
          text1Ref.current,
          { x: 200 }, // 시작 위치
          { x: 0, duration: 0.8, ease: "power1.out" }, // 종료 위치
          "start" // 동시에 시작
        )
        .fromTo(
          text2Ref.current.children, // text2Ref의 각 글자에 대해 애니메이션
          { x: 30, opacity: 0 }, // 시작 상태
          {
            x: 0,
            opacity: 1,
            duration: 0.5,
            ease: "power1.out",
            stagger: 0.1, // 순차적으로 0.1초 간격으로 애니메이션
          },
          "start" // 동시에 시작
        )
        .fromTo(
          effect2Ref.current,
          {
            opacity: 0,
            y: 20,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
          },
          "start" // 동시에 시작
        )
        .fromTo(
          effect1Ref.current,
          { opacity: 0 }, // 시작 상태
          { opacity: 1, duration: 0.2 }, // 종료 상태
          "+=0.2" // 이전 애니메이션 완료 후 0.2초 뒤에 시작
        );

      // Parallax 효과: frontCircleRef와 backCircleRef가 다르게 이동하도록 설정
      gsap.to(frontCircleRef.current, {
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: "top top", // 스크롤이 시작되었을 때
          end: "center top", // center top에 도달할 때
          scrub: true, // 스크롤에 따라 애니메이션을 동기화
          toggleActions: "play reverse play reverse", // 스크롤 방향에 따라 애니메이션 동작
          markers: true, // 디버깅용 마커 활성화
          onEnter: () => {
            // frontCircleRef가 center top에 도달했을 때 opacity를 1로 설정
            gsap.to(frontCircleRef.current, { opacity: 1, duration: 0.3 });
          },
          onLeave: () => {
            // frontCircleRef가 화면을 벗어날 때 opacity를 0으로 설정
            gsap.to(frontCircleRef.current, { opacity: 0, duration: 0.3 });
          },
          onEnterBack: () => {
            // 스크롤을 위로 올렸을 때 다시 보이도록 설정
            gsap.to(frontCircleRef.current, { opacity: 1, duration: 0.3 });
          },
          onLeaveBack: () => {
            // 화면을 벗어났을 때 opacity를 다시 0으로 설정
            gsap.to(frontCircleRef.current, { opacity: 0, duration: 0.3 });
          },
        },
        y: "0%", // frontCircleRef는 0%로 이동
        duration: 0.5,
        ease: "power1.out", // 이징 효과
      });

      gsap.to(backCircleRef.current, {
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: "top top", // 스크롤이 시작되었을 때
          end: "center top", // center top에 도달할 때
          scrub: true, // 스크롤에 따라 애니메이션을 동기화
          toggleActions: "play reverse play reverse", // 스크롤 방향에 따라 애니메이션 동작
          markers: true, // 디버깅용 마커 활성화
          onEnter: () => {
            // backCircleRef가 center top에 도달했을 때 opacity를 1로 설정
            gsap.to(backCircleRef.current, { opacity: 1, duration: 0.3 });
          },
          onLeave: () => {
            // backCircleRef가 화면을 벗어날 때 opacity를 0으로 설정
            gsap.to(backCircleRef.current, { opacity: 0, duration: 0.3 });
          },
          onEnterBack: () => {
            // 스크롤을 위로 올렸을 때 다시 보이도록 설정
            gsap.to(frontCircleRef.current, { opacity: 1, duration: 0.3 });
          },
          onLeaveBack: () => {
            // 화면을 벗어났을 때 opacity를 다시 0으로 설정
            gsap.to(frontCircleRef.current, { opacity: 0, duration: 0.3 });
          },
        },
        y: "0%", // backCircleRef는 0%로 이동
        duration: 1,
        ease: "power2.out", // 이징 효과
      });

      // aboutCircleRef의 opacity 설정
      gsap.to(aboutCircleRef.current, {
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: "center top", // aboutCircleRef가 화면의 중앙에 도달할 때
          end: "bottom top", // 끝까지 스크롤
          scrub: true, // 스크롤에 따라 애니메이션을 동기화
          toggleActions: "play reverse play reverse", // 스크롤 방향에 따라 애니메이션 동작
          markers: true, // 디버깅용 마커 활성화
        },
        opacity: 1, // aboutCircleRef의 opacity를 1로 변경
        duration: 0.5, // 속도 설정
      });
    }
  }, []);

  return (
    <Wrapper ref={wrapperRef}>
      <HomeInner>
        <HomeTextSection>
          <HomeTitle>
            <span>
              <svg
                ref={effect1Ref}
                className="effect1"
                width="88"
                height="73"
                viewBox="0 0 88 73"
              >
                <path d="M50.8001 14C51.5001 17.3 52.6001 20 53.3001 20.1C54.0001 20.1 57.4001 20.1 61.0001 20C67.8001 19.9 73.5001 21.3 72.5001 22.9C72.2001 23.5 70.7001 23.5 68.7001 22.9C65.1001 21.9 57.0001 21.7 54.6001 22.6C53.4001 23.1 53.1001 24.1 53.6001 27.1C54.4001 31.6 52.4001 32.7 51.4001 28.2C51.1001 26.7 50.7001 24.9 50.5001 24.3C50.0001 22.8 35.8001 29.7 32.1001 33.1L29.7001 35.3L32.4001 37.3C35.8001 39.8 34.7001 41.4 30.9001 39.5C29.3001 38.6 27.6001 38.2 27.1001 38.5C25.9001 39.2 21.0001 51.6 21.0001 54C21.0001 55.1 20.5001 56 20.0001 56C18.0001 56 19.1001 49.9 22.2001 42.9L25.4001 35.7L23.0001 34.1C18.6001 31.1 16.5001 29.2 17.2001 28.5C17.5001 28.2 19.5001 28.9 21.7001 30.2C23.8001 31.6 26.0001 33 26.7001 33.3C27.4001 33.7 29.4001 32.7 31.3001 31C33.2001 29.4 38.2001 26.4 42.4001 24.4C46.6001 22.4 50.0001 20.5 50.0001 20.1C50.0001 19.8 49.4001 17.2 48.6001 14.3C47.3001 9.5 47.4001 8 49.0001 8C49.3001 8 50.2001 10.7 50.8001 14Z" />
                <path d="M75.3 38.6C76.8 40.2 74.4 41 68.3 41C61.3 41 54.2 43.7 47.3 48.8C43.3 51.8 36 62.7 36 65.7C36 68.4 34.2 69.7 33.4 67.5C32.4 64.9 38.9 53.2 43.9 48.8C50.4 43 59 39.3 67.6 38.6C71.5 38.3 75 38.3 75.3 38.6Z" />
              </svg>
              <span ref={text1Ref}>I CAN</span>
              <svg
                ref={effect3Ref}
                className="effect3"
                width="71"
                height="62"
                viewBox="0 0 71 62"
              >
                <path d="M39 11.5C9.79999 33.3 9.79999 33.2 17.1 38.4C20.8 41 21 41.4 19.6 42.9C16.2 46.6 19.4 48.7 23.2 45.3C24.2 44.4 25.1 43.9 25.3 44.1C28.6 48.7 34.5 55 35.6 55C36.9 55 38.3 52.5 42.3 43C51.5 21.2 55.3 12.8 57.4 9C60.9 2.9 60.8 -8.19564e-07 57.2 -8.19564e-07C55.3 -8.19564e-07 50 3.4 39 11.5ZM47.4 11.2C45.7 13 42.6 16.7 40.5 19.5C33.3 28.8 24.7 38 23.4 38C22.7 38 20.9 37 19.4 35.7L16.7 33.4L33.1 20.8C42.1 13.9 49.7 8.1 49.9 8.1C50.2 8 49 9.5 47.4 11.2ZM50.2 15.7C48.6 18.9 46 24.6 44.5 28.5C42.3 34.3 36.6 46.2 35.3 48C35.1 48.2 33.3 46.7 31.4 44.6C28.4 41.3 28.1 40.5 29.2 39C36.3 29.1 51.8 10 52.6 10C52.8 10 51.7 12.6 50.2 15.7Z" />
              </svg>
            </span>
            <span ref={text2Ref}>
              {"DO BOTH".split("").map((char, index) => (
                <span key={index}>{char}</span>
              ))}
            </span>
            <span className="text3" ref={text3Ref}>
              EFFECTIVELY
            </span>
          </HomeTitle>
          <HomeDesc>
            프론트엔드의 세련된 인터페이스부터 백엔드의 견고한 시스템 설계까지,
            웹 개발자로서 웹의 모든 단계를 책임집니다. 직관적인 사용자 경험과
            효율적인 데이터 처리로 아이디어를 완벽한 디지털 솔루션으로
            구현합니다.
          </HomeDesc>
        </HomeTextSection>
        <HomeImgSection ref={imgSectionRef}>
          <svg
            ref={effect2Ref}
            className="effect2"
            width="137"
            height="82"
            viewBox="0 0 137 82"
          >
            <g clipPath="url(#clip0_156_15)">
              <path d="M115.491 2.59667C113.162 4.10001 110.696 6.28667 109.874 7.51667C108.778 9.70334 108.23 9.56667 103.024 6.97C92.0641 1.36667 77.4051 4.10001 67.2671 13.53C62.4721 18.04 59.3211 28.0167 58.0881 42.64L57.1291 53.4367L50.1421 40.0433C38.3601 17.63 26.1671 2.05001 23.0161 5.19334C21.7831 6.42334 22.7421 8.2 26.9891 12.71C30.1401 15.8533 34.7981 21.8667 37.4011 25.9667C43.8401 36.08 54.8001 58.22 56.8551 64.78C60.0061 75.1667 61.2391 71.75 62.0611 50.9767C62.7461 29.2467 64.1161 23.37 69.7331 17.22C80.8301 5.05667 106.175 5.33001 106.586 17.7667C106.723 22.96 107.819 24.6 110.97 24.6C114.395 24.6 115.354 21.0467 113.025 16.4C111.244 12.8467 111.244 12.3 114.258 9.15667C118.368 4.64667 126.04 2.59667 131.931 4.23667C137.411 5.74001 137 5.87667 137 3.55334C137 -0.819994 122.204 -1.50333 115.491 2.59667Z" />
              <path d="M38.3601 6.01337C38.3601 6.97004 39.8671 8.88337 41.6481 10.1134C43.4291 11.2067 46.0321 14.6234 47.4021 17.7667C49.5941 22.6867 53.4301 25.2834 53.4301 21.8667C53.4301 18.86 47.8131 9.70337 44.3881 6.97004C40.1411 3.69004 38.3601 3.28004 38.3601 6.01337Z" />
              <path d="M24.6602 51.1134C24.6602 52.3434 25.4822 53.3001 26.4412 53.3001C27.5372 53.3001 31.0992 55.0767 34.3872 57.2634C39.8672 61.0901 42.4702 61.5001 42.4702 58.9034C42.4702 57.2634 32.3322 50.8401 28.2222 49.7467C25.4822 49.0634 24.6602 49.4734 24.6602 51.1134Z" />
              <path d="M6.98708 76.9433C-0.547917 78.9933 -3.01392 82.9567 4.24708 81.3167C6.85008 80.77 15.6181 79.95 23.8381 79.4033C33.9761 78.8567 39.0451 78.0367 39.4561 76.8067C40.1411 74.62 15.6181 74.7567 6.98708 76.9433Z" />
            </g>
            <defs>
              <clipPath id="clip0_156_15">
                <rect width="137" height="82" />
              </clipPath>
            </defs>
          </svg>

          <svg
            ref={effect4Ref}
            className="effect4"
            width="74"
            height="73"
            viewBox="0 0 74 73"
          >
            <path d="M28 16.9001C28 20.2001 23.6 29.0001 21.2 30.5001C20.2 31.0001 18.2 31.7001 16.5 32.0001C14.5 32.3001 13.4 33.1001 13.2 34.5001C13 36.2001 13.8 36.8001 17.4 37.8001C21.2 38.8001 22.3 39.7001 24 42.9001C25.1 45.1001 26.1 49.0001 26.2 51.7001C26.5 55.8001 26.8 56.5001 28.8 56.8001C30.5 57.1001 31 56.6001 31 55.0001C31 53.8001 31.7 50.3001 32.6 47.2001C34.6 40.3001 38.6 36.0001 43 36.0001C45.7 36.0001 46.1 35.7001 45.8 33.7001C45.6 31.9001 44.7 31.4001 41 31.0001C38.5 30.7001 35.9 30.1001 35.2 29.6001C33.1 28.3001 31.8 23.9001 31.9 18.7001C32 14.6001 31.8 14.0001 30 14.0001C28.5 14.0001 28 14.7001 28 16.9001ZM33.7 33.0001C35.4 33.0001 35.4 34.7001 33.6 35.7001C32.9 36.1001 31.3 38.0001 30.2 39.8001L28.2 43.1001L27.2 40.1001C26.6 38.4001 25.4 36.7001 24.5 36.4001C23.3 35.9001 23.5 35.2001 25.7 32.6001C28.4 29.5001 28.6 29.5001 30.4 31.2001C31.5 32.2001 33 33.0001 33.7 33.0001Z" />
            <path d="M48.5001 37.7C47.7001 39.6 47.0001 42 47.0001 43C47.0001 45.3 45.3001 46.6 41.3001 47.5C37.7001 48.2 36.9001 50.7 39.8001 51.6C46.0001 53.6 48.0001 56.4 48.0001 62.9C48.0001 67.6 50.3001 70.1 51.9001 67.1C52.5001 66 53.0001 64 53.0001 62.5C53.0001 58.3 55.7001 54.2 60.0001 52C64.0001 50 64.6001 47.5 61.2001 47.3C55.6001 46.9 53.0001 44.2 53.0001 39C53.0001 33.7 50.5001 32.9 48.5001 37.7ZM52.7001 48.8C53.5001 49.3 53.5001 49.9 52.6001 51.2C51.1001 53.2 48.4001 51.9 49.3001 49.6C50.0001 47.9 50.9001 47.6 52.7001 48.8Z" />
          </svg>
          <ImgWrapper>
            <ImgCircle ref={imgCircleRef}>
              <AboutCircle ref={aboutCircleRef} />
              <FrontCircle ref={frontCircleRef}>
                <span />
              </FrontCircle>
              <BackCircle ref={backCircleRef}>
                <span />
              </BackCircle>
            </ImgCircle>
          </ImgWrapper>
        </HomeImgSection>
      </HomeInner>
    </Wrapper>
  );
};

export default Home;
