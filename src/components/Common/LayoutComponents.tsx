import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  padding-left: 120px;
  padding-right: 15px;
  background: ${({ theme }) => theme.accentColor};
  @media screen and (max-width: 600px) {
    padding-left: 15px;
    padding-right: 15px;
  }
`;

export const Content = styled.div`
  width: 1290px;
  margin: 0 auto;
  margin-top: 70px;
  padding-left: 100px;
  padding-bottom: 100px;
  @media screen and (max-width: 1400px) {
    margin-top: 50px;
  }
  @media screen and (max-width: 1150px) {
    width: 100%;
    padding-left: 0;
  }
  @media screen and (max-width: 420px) {
    width: 300px;
  }
`;
