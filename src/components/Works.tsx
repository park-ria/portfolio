import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Title from "./Common/Title";
import { useRecoilValue } from "recoil";
import { workScrollTopAtom } from "../atoms";
import datas from "../data.json";
import Project from "./Project";

gsap.registerPlugin(ScrollTrigger);

const Wrapper = styled.div`
  width: 100%;
  overflow: hidden;
`;

const WorksWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 70px;
  margin-bottom: 100px;
  position: relative;
  @media screen and (max-width: 1150px) {
    display: none;
  }
`;

const WorksGroup = styled.ul`
  display: flex;
  gap: 10px;
  &:first-child {
    justify-self: flex-start;
  }
  &:last-child {
    justify-self: flex-end;
  }
`;

const Circle = styled.div`
  width: 400px;
  height: 400px;
  border-radius: 50%;
  background: ${({ theme }) => theme.accentColor};
  position: absolute;
  top: 50%;
  left: calc(100vw / 2);
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

const FixWrapper = styled.ul`
  width: 100%;
  margin: 70px 0 100px;
  display: none;
  li {
    width: calc(50% - 5px);
    min-width: 400px;
    height: 300px;
    @media screen and (max-width: 850px) {
      width: 100%;
    }
  }
  @media screen and (max-width: 1150px) {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }
  @media screen and (max-width: 850px) {
    margin-top: 50px;
    gap: 30px;
  }
`;

const ModalBg = styled.div<{ $isOpen: boolean }>`
  width: 98%;
  height: auto;
  max-height: 98%;
  padding: 20px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 10px;
  background: rgba(0, 0, 0, 0.9);
  opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
  display: ${({ $isOpen }) => ($isOpen ? "flex" : "none")};
  justify-content: center;
  flex-direction: column;
  align-items: center;
  color: #fff;
  transition: opacity 0.3s ease-in-out;
  z-index: 10;
  @media screen and (max-width: 800px) {
    align-items: flex-start;
  }
  @media screen and (max-width: 600px) {
    padding: 15px;
  }
`;

const ModalTop = styled.div`
  width: 100%;
  margin-bottom: 20px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  h1 {
    flex: 1;
    text-align: center;
    font-size: 50px;
    line-height: 1;
    padding-left: 40px;
  }
  @media screen and (max-width: 800px) {
    h1 {
      font-size: 30px;
    }
  }
`;

const CloseBtn = styled.span`
  height: fit-content;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px 10px;
  color: #fff;
  font-size: 16px;
  border: 1px solid #fff;
  border-radius: 5px;
  transition: all 0.3s ease-in-out;
  cursor: pointer;
  &:hover {
    background: #fff;
    color: #222;
  }
  @media screen and (max-width: 800px) {
    font-size: 14px;
    padding: 3px 5px;
  }
`;

const ModalWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  gap: 20px;
  padding-right: 10px;
  overflow-y: auto;
  scrollbar-gutter: stable both-edges;
  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #fff;
  }
  @media screen and (max-width: 1400px) {
    flex-direction: column;
  }
`;

const ModalSection = styled.div`
  &:first-child {
    flex: 2;
  }
  &:last-child {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    flex: 1;
  }
  @media screen and (max-width: 1400px) and (min-width: 801px) {
    &:last-child {
      flex-direction: row;
      align-items: flex-start;
    }
  }
  @media screen and (max-width: 800px) {
    &:first-child {
      flex: 1;
    }
    &:last-child {
      flex: 2;
    }
  }
`;

const ProjectImg = styled.span<{ $imgUrl: string }>`
  display: inline-block;
  width: 100%;
  height: 100%;
  min-height: 300px;
  background: ${({ $imgUrl }) => `url(${$imgUrl}) no-repeat center/cover`};
  @media screen and (max-width: 1400px) {
    background-position: top;
    border-radius: 10px;
  }
  @media screen and (max-width: 600px) {
    height: 200px;
  }
`;

const ProjectDesc = styled.ul`
  li {
    margin-top: 20px;
    &:first-child {
      margin-top: 0;
    }
    & > label {
      font-size: 20px;
      font-weight: 600;
      margin-right: 10px;
    }
    & > span {
      color: #bbb;
    }
    &.column {
      display: flex;
      flex-direction: column;
      gap: 4px;
      & > span {
        padding: 0 8px;
        &.stack {
          margin-top: 6px;
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 5px;
          row-gap: 10px;
          & > span {
            padding: 5px 10px;
            border-radius: 5px;
            background: rgba(255, 255, 255, 0.1);
            color: #ddd;
          }
        }
      }
    }
  }

  @media screen and (max-width: 1400px) {
    li {
      margin-top: 10px;
    }
  }
  @media screen and (max-width: 800px) {
    li {
      & > label {
        font-size: 16px;
      }
      & > span {
        font-size: 14px;
      }
      &.column {
        & > span {
          padding: 0;
        }
      }
    }
  }
  @media screen and (max-width: 450px) {
    flex: none;
  }
`;

const ProjectLink = styled.ul`
  width: 100%;
  text-align: center;
  li {
    width: 100%;
    margin-top: 16px;
    padding: 10px;
    border: 1px solid #fff;
    border-radius: 5px;
    transition: all 0.3s ease-in-out;
    &:hover {
      background: #fff;
      border: 1px solid transparent;
      color: #222;
    }
  }
  @media screen and (max-width: 1400px) {
    li {
      margin-top: 10px;
      padding: 5px;
    }
  }
`;

interface ProjectType {
  id: number;
  title: string;
  tech_stack: string[];
  type: string;
  layout: string;
  implementation: string[];
  description: string;
  figma_url: string;
  github_url: string;
  site_url: string;
  img: string;
}

const Works = () => {
  const workTop = useRecoilValue(workScrollTopAtom);
  const [isOpen, setIsOpen] = useState(false);
  const [projectContent, setProjectContent] = useState<ProjectType | null>(
    null
  );
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
        strokeDashoffset: pathLength,
      });

      // ScrollTrigger 타임라인 설정
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: triggerRef.current,
          start: `top+=${workTop / 50} top`,
          end: `+=${firstGroupWidth + secondGroupWidth - viewportWidth}`,
          scrub: 3,
          pin: true,
          //markers: true,
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
  }, [workTop]);

  return (
    <Wrapper>
      <Title word={"WORKS"} menuIdx={4} />
      <WorksWrapper ref={triggerRef}>
        <WorksGroup ref={firstGroupRef}>
          {datas.project.slice(0, 3).map((project) => (
            <Project
              key={project.id}
              img={project.img}
              title={project.title}
              onClick={() => {
                setIsOpen(true);
                setProjectContent(project);
              }}
            />
          ))}
        </WorksGroup>
        <WorksGroup ref={secondGroupRef}>
          {datas.project.slice(3, 6).map((project) => (
            <Project
              key={project.id}
              img={project.img}
              title={project.title}
              onClick={() => {
                setIsOpen(true);
                setProjectContent(project);
              }}
            />
          ))}
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
      <FixWrapper>
        {datas.project.map((project) => (
          <Project
            key={project.id}
            img={project.img}
            title={project.title}
            onClick={() => {
              setIsOpen(true);
              setProjectContent(project);
            }}
          />
        ))}
      </FixWrapper>
      <ModalBg $isOpen={isOpen}>
        <ModalTop>
          <h1 className="teko">PROJECT</h1>
          <CloseBtn
            onClick={() => {
              setIsOpen(false);
              setProjectContent(null);
            }}
          >
            Close
          </CloseBtn>
        </ModalTop>
        {projectContent && (
          <ModalWrapper>
            <ModalSection>
              <ProjectImg $imgUrl={projectContent?.img} />
            </ModalSection>
            <ModalSection>
              <ProjectDesc>
                <li>
                  <label>Title</label>
                  <span>{projectContent.title}</span>
                </li>
                <li>
                  <label>Type</label>
                  <span>{projectContent.type}</span>
                </li>
                <li>
                  <label>Layout</label>
                  <span>{projectContent.layout}</span>
                </li>
                <li className="column">
                  <label>Tech Stack</label>
                  <span className="stack">
                    {projectContent.tech_stack.map((stack, idx) => (
                      <span key={idx}>{stack}</span>
                    ))}
                  </span>
                </li>
                <li
                  className={
                    projectContent.implementation.length > 1 ? "column" : ""
                  }
                >
                  <label>Implementation</label>
                  <span>{projectContent.implementation.join(", ")}</span>
                </li>
                <li className="column">
                  <label>Description</label>
                  <span>{projectContent.description}</span>
                </li>
              </ProjectDesc>
              <ProjectLink>
                {projectContent.figma_url && (
                  <a href={projectContent.figma_url} target="_blank">
                    <li>Figma</li>
                  </a>
                )}
                <a href={projectContent.github_url} target="_blank">
                  <li>Git hub</li>
                </a>
                <a href={projectContent.github_url} target="_blank">
                  <li>Site</li>
                </a>
              </ProjectLink>
            </ModalSection>
          </ModalWrapper>
        )}
      </ModalBg>
    </Wrapper>
  );
};

export default Works;
