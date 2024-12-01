import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Wrapper = styled.div`
  width: 100%;
  overflow: hidden;
`;

const Title = styled.h1`
  width: fit-content;
  margin: 0 auto;
  padding-top: 100px;
  font: 700 80px/1 "Teko", serif;
  letter-spacing: -2px;
  color: ${({ theme }) => theme.textColor};
`;

const WorksWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 70px;
  margin-bottom: 100px;
  position: relative;
`;

const WorksGroup = styled.ul`
  display: flex;
  gap: 10px;
  li {
    //width: 556px;
    //height: 566px;
    width: 450px;
    height: calc(100vh / 2 - 10px);
    background: #ddd;
    flex-shrink: 0;
  }
`;

const Circle = styled.div`
  width: 400px;
  height: 400px;
  border-radius: 50%;
  background: ${({ theme }) => theme.accentColor};
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
  svg {
    fill: none;
    stroke-width: 3px;
    stroke: rgba(0, 0, 0, 0.3);
    transition: stroke-dashoffset 0.1s ease;
  }
`;

const CircleText = styled.span`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  h3 {
    font-size: 50px;
    font-weight: 600;
  }
  p {
    font-size: 30px;
  }
`;

const Works = () => {
  const [circleScroll, setCircleScroll] = useState(0);

  const firstGroupRef = useRef<HTMLUListElement>(null);
  const secondGroupRef = useRef<HTMLUListElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (
      triggerRef.current &&
      firstGroupRef.current &&
      secondGroupRef.current &&
      pathRef.current
    ) {
      const firstGroupWidth = firstGroupRef.current.scrollWidth;
      const secondGroupWidth = secondGroupRef.current.scrollWidth;
      const viewportWidth = window.innerWidth;
      const pathLength = pathRef.current.getTotalLength();

      // 첫 번째 그룹의 스크롤에 따라 path가 그려지는 애니메이션
      gsap.set(pathRef.current, {
        strokeDasharray: pathLength,
        strokeDashoffset: pathLength, // 처음에 path가 그려지지 않도록 설정
      });

      // ScrollTrigger 타임라인 설정
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top top", // trigger가 화면 상단에 도달할 때
          end: `+=${firstGroupWidth + secondGroupWidth - viewportWidth}`, // 전체 애니메이션 범위
          scrub: 0.7,
          pin: true,
          onUpdate: (self) => {
            const progress = Number(self.progress.toFixed(2)); // 스크롤 진행률 (0 ~ 1)
            setCircleScroll(Math.floor(progress * 100));
            const offset = pathLength * (1 - progress); // 진행률에 따라 strokeDashoffset 값 계산
            gsap.to(pathRef.current, {
              strokeDashoffset: offset,
              ease: "none",
            });
          },
        },
      });

      // 첫 번째 그룹의 애니메이션
      timeline.fromTo(
        firstGroupRef.current,
        { x: 0 },
        {
          x: -firstGroupWidth + viewportWidth,
          ease: "power3.inOut",
        }
      );

      // 두 번째 그룹의 애니메이션
      timeline.fromTo(
        secondGroupRef.current,
        { x: -secondGroupWidth + viewportWidth },
        {
          x: 0,
          ease: "power3.inOut",
        },
        0 // 두 애니메이션을 동시에 실행하려면 0을 설정
      );

      return () => {
        timeline.kill();
      };
    }
  }, []);

  return (
    <Wrapper>
      <Title>WORKS</Title>
      <WorksWrapper ref={triggerRef}>
        <WorksGroup ref={firstGroupRef}>
          <li>1</li>
          <li>2</li>
          <li>3</li>
          <li>4</li>
          <li>5</li>
        </WorksGroup>
        <WorksGroup ref={secondGroupRef}>
          <li>6</li>
          <li>7</li>
          <li>8</li>
          <li>9</li>
          <li>10</li>
        </WorksGroup>
        <Circle>
          <svg width="360" height="360" viewBox="0 0 360 360">
            <path ref={pathRef} d="M180,1.5 A178.5,178.5 0 1,1 179.9,1.5" />
          </svg>
          <CircleText>
            <h3 className="teko">PROJECT</h3>
            <p className="teko">{circleScroll}%</p>
          </CircleText>
        </Circle>
      </WorksWrapper>
    </Wrapper>
  );
};

export default Works;
