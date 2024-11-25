import { useEffect, useRef, useMemo } from "react";
import styled, { useTheme } from "styled-components";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { useRecoilValue } from "recoil";
import { selectedIndexAtom } from "../atoms";
import datas from "../data.json";

const Wrapper = styled.div`
  width: 100%;
  position: relative;
  overflow: hidden;
`;

const svgs = `
  position: absolute;
  fill: transparent;
  stroke-width: 2;
  z-index: -1;
`;

const Cloud1 = styled(motion.svg)`
  ${svgs}
  top: 13%;
  left: 70%;
  stroke: ${({ theme }) => theme.textColor};
`;

const Cloud2 = styled(motion.svg)`
  ${svgs}
  top: 48%;
  left: 10%;
  stroke: ${({ theme }) => theme.textColor};
`;

const Cloud3 = styled(motion.svg)`
  ${svgs}
  bottom: 5%;
  right: 15%;
  stroke: ${({ theme }) => theme.textColor};
`;

const Title = styled.h1`
  width: fit-content;
  margin: 0 auto;
  padding-top: 100px;
  font: 700 80px/1 "Teko", serif;
  letter-spacing: -2px;
  color: ${({ theme }) => theme.textColor};
`;

const SkillGroup = styled.div`
  width: 1003px;
  margin: 0 auto;
  margin-top: 70px;
  margin-bottom: 100px;
`;

const SubTitle = styled.h3`
  margin-bottom: 30px;
  font: 500 2rem/1 "Teko", serif;
  letter-spacing: -2px;
  color: ${({ theme }) => theme.textColor};
`;

const Skills = styled.ul`
  width: 100%;
  display: flex;
  column-gap: 50px;
  row-gap: 30px;
  flex-wrap: wrap;
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

const Skill = () => {
  const selectedIndex = useRecoilValue(selectedIndexAtom);
  const isSelected: boolean = useMemo(
    () => selectedIndex === 3,
    [selectedIndex]
  );

  const pathRef = useRef<SVGPathElement | null>(null);
  const cloudRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (pathRef.current && cloudRef.current && selectedIndex === 3) {
      const pathLength = pathRef.current.getTotalLength();
      gsap.set(pathRef.current, {
        strokeDasharray: pathLength,
        strokeDashoffset: isSelected ? pathLength : 0,
      });
      gsap.to(pathRef.current, {
        strokeDashoffset: isSelected ? 0 : pathLength,
        duration: isSelected ? 3 : 0,
        ease: "power1.inOut",
      });

      //gsap.set(cloudRef.current, { left: "100%", opacity: 0 });
      gsap
        .timeline()
        .from(cloudRef.current, {
          left: "70%",
          opacity: 1,
          duration: 2,
          delay: 3,
        })
        .to(cloudRef.current, {
          left: "100%",
          opacity: 0,
        })
        .to(cloudRef.current, {
          left: "-50%",
          opacity: 0,
        })
        .to(cloudRef.current, {
          opacity: 1,
        })
        .to(cloudRef.current, {
          left: "100%",
          duration: 15,
          repeat: -1,
          ease: "easeInOut",
        });
    }
  }, [selectedIndex]);

  return (
    <Wrapper>
      <Title>SKILL</Title>
      {datas.skill.map((list) => (
        <SkillGroup key={list.title}>
          <SubTitle>{list.title}</SubTitle>
          <Skills>
            {list.skills.map((skill) => (
              <SkillDesc key={skill.name}>
                <SkillImgSpan>
                  <SkillImg src={`/imgs/${skill.img}.png`} alt={skill.name} />
                </SkillImgSpan>
                <SkillName className="teko">{skill.name}</SkillName>
              </SkillDesc>
            ))}
          </Skills>
        </SkillGroup>
      ))}
      <Cloud1
        className="cloud1"
        width="337"
        height="194"
        viewBox="0 0 337 194"
        ref={cloudRef}
      >
        <path
          ref={pathRef}
          // initial={{ pathLength: 0 }}
          // animate={{
          //   pathLength: isSelected ? 1 : 0,
          // }}
          // transition={{
          //   pathLength: {
          //     duration: isSelected ? 3 : 0,
          //     ease: "easeInOut",
          //   },
          // }}
          d="M281.112 106.216L280.93 107.008L281.719 106.813C285.102 105.979 288.635 105.529 292.274 105.529C316.537 105.529 336.207 125.198 336.207 149.461C336.207 173.725 316.537 193.395 292.274 193.395H58.2255C26.3443 193.395 0.5 167.55 0.5 135.669C0.5 103.788 26.345 77.9436 58.2255 77.9436H58.7255V77.4436C58.7255 34.9491 93.1746 0.5 135.669 0.5C171.467 0.5 201.554 24.9473 210.148 58.0579L210.327 58.7481L210.915 58.3445C218.495 53.1401 227.476 50.3603 236.671 50.3732H236.671C261.86 50.3732 282.28 70.7929 282.28 95.9814C282.277 99.4259 281.886 102.859 281.112 106.216Z"
        />
      </Cloud1>
      <Cloud2 width="283" height="221" viewBox="0 0 283 221">
        <motion.path
          initial={{ pathLength: 0 }}
          animate={{
            pathLength: isSelected ? 1 : 0,
          }}
          transition={{
            pathLength: {
              delay: isSelected ? 3 : 0,
              duration: isSelected ? 2.5 : 0,
              ease: "easeInOut",
            },
          }}
          d="M248.472 101.928L248.361 102.318L248.72 102.507C260.999 108.976 270.758 119.371 276.438 132.034C282.118 144.697 283.393 158.898 280.058 172.37C276.724 185.843 268.972 197.81 258.041 206.361C247.11 214.913 233.629 219.556 219.75 219.55H71.0749C52.5296 219.55 34.7439 212.183 21.6305 199.07C8.51698 185.956 1.14991 168.17 1.14991 149.625C1.14464 134.992 5.73004 120.726 14.2602 108.837C22.7904 96.9477 34.8355 88.0341 48.6989 83.3516L49.1019 83.2155L49.0321 82.7959C46.3616 66.7261 49.3854 50.2282 57.5817 36.1502C65.778 22.0722 78.6323 11.2976 93.9256 5.68649C109.219 0.0753831 125.991 -0.0201053 141.348 5.41651C156.704 10.8531 169.68 21.4806 178.036 35.4644L178.244 35.812L178.627 35.6811C188.011 32.4746 198.093 31.8972 207.782 34.0115C217.47 36.1257 226.395 40.851 233.59 47.6753C240.785 54.4996 245.976 63.1627 248.599 72.726C251.222 82.2893 251.178 92.3882 248.472 101.928Z"
        />
      </Cloud2>
      <Cloud3 width="360" height="253" viewBox="0 0 360 253">
        <motion.path
          initial={{ pathLength: 0 }}
          animate={{
            pathLength: isSelected ? 1 : 0,
          }}
          transition={{
            pathLength: {
              delay: isSelected ? 5 : 0,
              duration: isSelected ? 3 : 0,
              ease: "easeInOut",
            },
          }}
          d="M303.443 110.188L303.335 110.673L303.82 110.784C320.946 114.687 336.036 124.757 346.212 139.075C356.388 153.392 360.938 170.955 358.993 188.412C357.049 205.869 348.746 222 335.669 233.727C322.591 245.455 305.655 251.958 288.09 251.996H90.0907H90.0901C67.895 252.019 46.4834 243.793 30.0118 228.917C13.5402 214.04 3.18391 193.574 0.953325 171.491C-1.27726 149.408 4.77702 127.284 17.9409 109.414C31.1047 91.5443 50.4389 79.203 72.1902 74.7863L72.5907 74.705V74.2963V72.4963V72.4957C72.5794 63.0641 75.0617 53.7971 79.786 45.634C84.5102 37.4709 91.3085 30.7017 99.4919 26.0126C107.675 21.3234 116.953 18.881 126.384 18.9328C135.816 18.9845 145.066 21.5287 153.197 26.3074L153.529 26.5021L153.802 26.232C166.362 13.8214 182.325 5.42072 199.667 2.09523C217.008 -1.23026 234.946 0.669317 251.206 7.55304C267.466 14.4368 281.316 25.9945 290.998 40.7604C300.68 55.5263 305.759 72.8351 305.591 90.4915V90.4963C305.591 97.2999 304.875 103.744 303.443 110.188Z"
        />
      </Cloud3>
    </Wrapper>
  );
};

export default Skill;
