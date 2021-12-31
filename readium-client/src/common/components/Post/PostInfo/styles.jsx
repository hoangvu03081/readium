import styled from "styled-components";

export const Layout = styled.div`
  width: 100%;
  margin: 0 auto 20px auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  position: relative;
  @media (max-width: 550px) {
    margin-bottom: 57px;
  }
`;

export const Left = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
export const Avatar = styled.img`
  display: inline-block;
  height: 34px;
  width: 34px;
  border-radius: 50%;
  margin-right: 11px;
  &:hover {
    cursor: pointer;
  }
`;
export const Info = styled.div`
  display: inline-block;
  margin-right: 15px;
`;
export const Author = styled.p`
  margin: 0;
  font-family: "Nunito";
  font-weight: bold;
  font-size: 18px;
  &:hover {
    cursor: pointer;
  }
`;
export const Time = styled.p`
  margin: 0;
  font-family: "Lato";
  font-size: 12px;
  color: #888888;
  white-space: pre;
`;
export const FollowBtn = styled.button`
  font-family: "Lato";
  font-size: 15px;
  border-radius: 16px;
  border: 1px solid black;
  color: black;
  background-color: white;
  padding: 4px 12px;
  transition: all 0.3s;
  &:hover {
    cursor: pointer;
    background-color: black;
    color: white;
    transition: all 0.3s;
  }
  @media (max-width: 550px) {
    display: none !important;
  }
`;
export const Right = styled.div`
  width: 80px;
  height: 32px;
  position: relative;
  svg {
    font-size: 32px;
    position: absolute;
    top: 0;
    transition: all 0.25s;
    &:hover {
      cursor: pointer;
      transform: scale(1.2);
      transition: all 0.25s;
    }
  }
  svg:first-child,
  svg:nth-child(2) {
    ${(props) => (props.isMyself ? `right: 0;` : `left: 0;`)}
  }
  svg:nth-child(3) {
    right: 0;
    ${(props) => (props.isMyself ? `display: none;` : `display: block;`)}
  }
  @media (max-width: 550px) {
    display: none !important;
  }
`;

export const AdditionRow = styled.div`
  width: 100%;
  position: absolute;
  bottom: -45px;
  left: 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  > .opacity-0 {
    opacity: 0;
    pointer-events: none;
  }
  > .opacity-1 {
    opacity: 1;
  }
  @media (min-width: 551px) {
    display: none;
  }
`;
export const AdditionLeft = styled.div`
  font-family: "Lato";
  font-size: 15px;
  border-radius: 16px;
  border: 1px solid black;
  color: black;
  background-color: white;
  padding: 4px 12px;
  transition: all 0.3s;
  &:hover {
    cursor: pointer;
    background-color: black;
    color: white;
    transition: all 0.3s;
  }
`;
export const AdditionRight = styled.div`
  width: 80px;
  height: 32px;
  position: relative;
  svg {
    font-size: 32px;
    position: absolute;
    top: 0;
    transition: all 0.25s;
    &:hover {
      cursor: pointer;
      transform: scale(1.2);
      transition: all 0.25s;
    }
  }
  svg:first-child,
  svg:nth-child(2) {
    ${(props) => (props.isMyself ? `right: 0;` : `left: 0;`)}
  }
  svg:nth-child(3) {
    right: 0;
    ${(props) => (props.isMyself ? `display: none;` : `display: block;`)}
  }
  @media (max-width: 550px) {
    display: block;
    width: 70px;
    svg {
      font-size: 28px;
    }
  }
`;
