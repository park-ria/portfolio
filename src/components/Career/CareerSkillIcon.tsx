import styled from "styled-components";

const SkillIcon = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  background: ${({ theme }) => theme.skillIconBg};
  border-radius: 8px;
  position: relative;
  cursor: pointer;
  .name {
    position: absolute;
    bottom: -18px;
    left: 50%;
    font-size: 14px;
    opacity: 0;
    transform: translateX(-50%);
    transition: opacity 0.2s;
  }
  &:hover .name {
    opacity: 1;
  }
  @media screen and (max-width: 450px) {
    width: 30px;
    height: 30px;
  }
  img {
    width: 30px;
    height: 30px;
    object-fit: cover;
    @media screen and (max-width: 450px) {
      width: 20px;
      height: 20px;
    }
  }
`;

interface CareerSkillIconType {
  icon: string;
}

const CareerSkillIcon = ({ icon }: CareerSkillIconType) => {
  return (
    <SkillIcon>
      <img src={`/imgs/${icon}.png`} alt={icon} />
      <span className="name">{icon}</span>
    </SkillIcon>
  );
};

export default CareerSkillIcon;
