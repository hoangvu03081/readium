import styled from "styled-components";

const Comment = styled.button`
  font-family: "Raleway";
  font-size: 18px;
  font-weight: bold;
  border: none;
  background-color: ${({ theme }) => theme.colors.LoveCommentBackground};
  color: ${({ theme }) => theme.colors.LoveCommentText};
  display: flex;
  align-items: center;
  padding: 3px 5px;
  transition: all 0.3s;
  svg {
    fill: ${({ theme }) => theme.colors.LoveCommentText};
    font-size: 18px;
    transition: all 0.3s;
  }
  span {
    padding-left: 3px;
  }
  &:hover {
    color: ${({ theme }) => theme.colors.LoveCommentBackground};
    background-color: ${({ theme }) => theme.colors.LoveCommentText};
    border-radius: 4px;
    svg {
      fill: ${({ theme }) => theme.colors.LoveCommentBackground};
      transition: all 0.3s;
    }
    transition: all 0.3s;
  }
`;

export default Comment;
