import styled from "styled-components";

export const Layout = styled.div`
  width: 100%;
  padding-top: 13px;
  border-top: 1px solid #d7d7d7;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  gap: 15px;
  @media (max-width: 500px) {
    flex-direction: column;
  }
`;

export const Left = styled.div`
  width: calc(80%-110px);
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  &.w-100 {
    width: 100%;
  }
  @media (max-width: 500px) {
    width: 100%;
  }
`;

export const Right = styled.div`
  width: 120px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  gap: 15px;
  svg {
    font-size: 30px;
    transition: all 0.25s;
    &:hover {
      cursor: pointer;
      transform: scale(1.2);
      transition: all 0.25s;
    }
  }
  &.w-0 {
    width: 0 !important;
  }
  @media (max-width: 500px) {
    width: 100%;
  }
`;

export const RightLeft = styled.div`
  position: relative;
  width: 75px;
  height: 30px;
  svg {
    position: absolute;
    top: 0;
  }
  svg:first-child,
  svg:nth-child(2) {
    left: 0;
  }
  svg:nth-child(3),
  svg:nth-child(4) {
    right: 0;
  }
`;

export const RightRight = styled.div`
  width: 30px;
  height: 30px;
`;
