import styled from "styled-components";

const Comment = styled.button`
  font-family: "Raleway";
  font-size: 18px;
  font-weight: bold;
  border: none;
  background-color: ${({ theme }) => theme.colors.LoveCommentBackground};
  color: ${({ theme }) => theme.colors.LoveCommentText};
  svg {
    fill: ${({ theme }) => theme.colors.LoveCommentText};
    font-size: 18px;
  }
  span {
    padding-left: 3px;
  }
  display: flex;
  align-items: center;
  &:hover {
    cursor: pointer;
  }
`;

export default Comment;
