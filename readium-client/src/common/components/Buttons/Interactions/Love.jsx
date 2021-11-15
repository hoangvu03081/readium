import styled from "styled-components";

const Love = styled.button`
  font-family: "Nunito";
  font-size: 18px;
  font-weight: bold;
  border: none;
  background-color: ${({ theme }) => theme.colors.InteractionsBackground};
  color: ${({ theme }) => theme.colors.LoveText};
  svg {
    fill: ${({ theme }) => theme.colors.LoveText};
    stroke: ${({ theme }) => theme.colors.LoveText};
    stroke-width: 0.8;
    font-size: 18px;
  }
  span {
    padding-left: 8px;
  }
  display: flex;
  align-items: center;
`;

export default Love;
