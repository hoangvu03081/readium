import styled from "styled-components";

const Watch = styled.button`
  font-family: "Nunito";
  font-size: 18px;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.colors.InteractionsBackground};
  color: ${({ theme }) => theme.colors.WatchText};
  svg {
    fill: ${({ theme }) => theme.colors.WatchText};
    font-size: 18px;
    transition: all 0.4s;
  }
  span {
    padding-left: 8px;
  }
  display: flex;
  align-items: center;
  transition: all 0.4s;
  &:hover {
    background-color: ${({ theme }) => theme.colors.WatchText};
    color: ${({ theme }) => theme.colors.InteractionsBackground};
    svg {
      fill: ${({ theme }) => theme.colors.InteractionsBackground};
      transition: all 0.4s;
    }
    transition: all 0.4s;
  }
`;

export default Watch;
