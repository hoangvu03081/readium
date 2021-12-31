import styled from "styled-components";

const Love = styled.button`
  font-family: "Nunito";
  font-size: 18px;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.colors.InteractionsBackground};
  color: ${({ theme }) => theme.colors.LoveText};
  svg {
    fill: ${({ theme }) => theme.colors.LoveText};
    stroke: ${({ theme }) => theme.colors.LoveText};
    stroke-width: 0.8;
    font-size: 18px;
    > path {
      fill: ${({ theme }) => theme.colors.LoveText};
    }
    transition: all 0.4s;
  }
  span {
    padding-left: 8px;
  }
  display: flex;
  align-items: center;
  transition: all 0.4s;
  &:hover {
    background-color: ${({ theme }) => theme.colors.LoveText};
    color: ${({ theme }) => theme.colors.InteractionsBackground};
    svg {
      fill: ${({ theme }) => theme.colors.InteractionsBackground};
      stroke: ${({ theme }) => theme.colors.InteractionsBackground};
      stroke-width: 0.8;
      > path {
        fill: ${({ theme }) => theme.colors.InteractionsBackground};
      }
      transition: all 0.4s;
    }
    transition: all 0.4s;
  }
`;

export default Love;
