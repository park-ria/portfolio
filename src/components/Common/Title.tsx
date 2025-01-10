import styled from "styled-components";
import { motion } from "framer-motion";
import { useRecoilValue } from "recoil";
import { selectedIndexAtom } from "../../atoms";

const Wrapper = styled.div`
  padding-top: 100px;
`;

const TitleDesc = styled(motion.h1)`
  width: fit-content;
  margin: 0 auto;
  font: 700 80px/1 "Teko", serif;
  letter-spacing: -2px;
  color: ${({ theme }) => theme.textColor};
  overflow: hidden;
  @media screen and (max-width: 450px) {
    font-size: 50px;
  }
`;

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0 },
  },
};

const child = {
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      damping: 12,
      stiffness: 200,
    },
  },
  hidden: {
    opacity: 0,
    y: 20,
    transition: {
      type: "spring",
      damping: 12,
      stiffness: 200,
    },
  },
};

const Title = ({ word }: { word: string }) => {
  const seletedIndex = useRecoilValue(selectedIndexAtom);
  return (
    <Wrapper className="rotatingHeader">
      <TitleDesc
        variants={container}
        initial="hidden"
        animate={
          seletedIndex === -1 || seletedIndex === 1 ? "visible" : "hidden"
        }
      >
        {word.split("").map((char, index) => (
          <motion.span
            key={index}
            variants={child}
            style={{ display: "inline-block" }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </TitleDesc>
    </Wrapper>
  );
};

export default Title;
