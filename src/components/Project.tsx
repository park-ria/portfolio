import styled from "styled-components";

const ProjectItem = styled.li<{ $projectImg: string }>`
  width: calc(100vw / 2.5);
  height: calc(100vh / 2 - 10px);
  background: ${({ $projectImg }) =>
    `url(${$projectImg}) center/cover no-repeat`};
  flex-shrink: 0;
  position: relative;

  &:hover {
    & > div {
      opacity: 1;
    }
  }

  @media screen and (max-width: 1600px) {
    width: calc(100vw / 2.3);
  }
  @media screen and (max-width: 1150px) {
    width: 100%;
  }
`;

const HoverBg = styled.div`
  width: inherit;
  height: inherit;
  background: rgba(0, 0, 0, 0.8);
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-size: 32px;
  font-weight: 600;
  opacity: 0;
  transition: opacity 0.4s;
  cursor: pointer;
`;

const Project = ({
  img,
  title,
  onClick,
}: {
  img: string;
  title: string;
  onClick: any;
}) => {
  return (
    <ProjectItem $projectImg={img} onClick={onClick}>
      <HoverBg>{title}</HoverBg>
    </ProjectItem>
  );
};

export default Project;
