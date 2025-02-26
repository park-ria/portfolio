import styled from "styled-components";
import datas from "../data.json";
import { Content, Wrapper } from "./Common/LayoutComponents";
import Title from "./Common/Title";
import { motion } from "framer-motion";
import { useRecoilValue } from "recoil";
import { selectedIndexAtom } from "../atoms";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";

const SkillWrapper = styled(Wrapper)`
  position: relative;
  background: none;
`;

const SkillContent = styled(Content)`
  @media screen and (max-width: 1450px) {
    width: 100%;
  }
`;

const SkillGroup = styled(motion.div)`
  width: 1003px;
  margin: 0 auto;
  margin-bottom: 100px;
  @media screen and (max-width: 1150px) {
    width: 80%;
  }
`;

const SubTitle = styled.h3`
  margin-bottom: 30px;
  font: 500 2rem/1 "Teko", serif;
  letter-spacing: -2px;
  color: ${({ theme }) => theme.textColor};
`;

const Skills = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fill, 100px);
  justify-content: space-between;
  grid-gap: 30px;
`;

const SkillDesc = styled.li`
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: center;
`;

const SkillImgSpan = styled.span`
  width: 100px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  background: ${({ theme }) => theme.skillIconBg};
  box-shadow: 4px 6px 6px rgba(0, 0, 0, 0.4);
`;

const SkillImg = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
`;

const SkillName = styled.p`
  font-size: 1.25rem;
  text-align: center;
  letter-spacing: -1px;
  color: ${({ theme }) => theme.textColor};
`;

const Wave = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 5px;
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;
  transform: translate3d(0, 0, 0);
  z-index: -1;

  &::before {
    content: "";
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      to bottom,
      transparent,
      rgba(221, 238, 255, 0) 20%,
      ${({ theme }) => theme.accentColor}
    );
    transform: translate3d(0, 0, 0);
  }

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100px;
    background: linear-gradient(
      to bottom,
      transparent 50%,
      ${({ theme }) => theme.bgColor}
    );
  }

  .wave {
    opacity: 0.4;
    position: absolute;
    top: 5%;
    left: -340px;
    background: #0af;
    width: 2500px;
    height: 2500px;
    border-radius: 42%;
    z-index: -1;
    animation: drift 4s infinite linear;

    &:nth-child(2) {
      animation: drift 8s infinite linear;
      opacity: 0.1;
      background: #1aff00;
    }

    &:last-child {
      animation: drift 5s infinite linear;
    }

    @media screen and (max-width: 1400px) {
      left: -500px;
    }
    @media screen and (max-width: 1150px) {
      left: -700px;
      border-radius: 45%;
    }
    @media screen and (max-width: 850px) {
      top: 4%;
      left: -800px;
    }
    @media screen and (max-width: 600px) {
      width: 3500px;
      height: 3500px;
      top: 2%;
      left: -1500px;
      border-radius: 48%;
    }
  }

  @keyframes drift {
    from {
      transform: rotate(0deg);
    }
    from {
      transform: rotate(360deg);
    }
  }
`;

const Skill = () => {
  const selectedIndex = useRecoilValue(selectedIndexAtom);

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.5,
        delayChildren: 0.5,
      },
    },
  };

  const child = {
    hidden: {
      y: 50,
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  useEffect(() => {
    const proxy = { skew: 0 },
      skewSetter = gsap.quickSetter(".skewElem", "skewY", "deg"),
      clamp = gsap.utils.clamp(-50, 50);

    ScrollTrigger.create({
      onUpdate: (self) => {
        let skew = clamp(self.getVelocity() / -150);
        if (Math.abs(skew) > Math.abs(proxy.skew)) {
          proxy.skew = skew;
          gsap.to(proxy, {
            skew: 0,
            duration: 0.8,
            ease: "power3",
            overwrite: true,
            onUpdate: () => skewSetter(proxy.skew),
          });
        }
      },
    });

    gsap.set(".skewElem", { transformOrigin: "right center", force3D: true });
  }, []);

  return (
    <SkillWrapper>
      <Title word={"SKILL"} menuIdx={3} />
      <SkillContent
        as={motion.div}
        variants={container}
        initial="hidden"
        animate={
          selectedIndex === -1 || selectedIndex === 3 ? "visible" : "hidden"
        }
      >
        {datas.skill.map((list) => (
          <SkillGroup key={list.title} variants={child}>
            <SubTitle>{list.title}</SubTitle>
            <Skills>
              {list.skills.map((skill) => (
                <SkillDesc key={skill.name} className="skewElem">
                  <SkillImgSpan>
                    <SkillImg src={`/imgs/${skill.img}.png`} alt={skill.name} />
                  </SkillImgSpan>
                  <SkillName className="teko">{skill.name}</SkillName>
                </SkillDesc>
              ))}
            </Skills>
          </SkillGroup>
        ))}
      </SkillContent>
      <Wave>
        <div className="wave"></div>
        <div className="wave"></div>
        <div className="wave"></div>
      </Wave>
    </SkillWrapper>
  );
};

export default Skill;
