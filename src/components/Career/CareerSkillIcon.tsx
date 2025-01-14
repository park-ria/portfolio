import styled from "styled-components";

const SkillIcon = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  background: ${({ theme }) => theme.skillIconBg};
  border-radius: 8px;
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
    </SkillIcon>
  );
};

export default CareerSkillIcon;
