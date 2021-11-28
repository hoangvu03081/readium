import styled from "styled-components";

const Comment = styled.button`
  font-family: "Nunito";
  font-size: 18px;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.colors.InteractionsBackground};
  color: ${({ theme }) => theme.colors.CommentText};
  svg {
    fill: ${({ theme }) => theme.colors.CommentText};
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
    background-color: ${({ theme }) => theme.colors.CommentText};
    color: ${({ theme }) => theme.colors.InteractionsBackground};
    svg {
      fill: ${({ theme }) => theme.colors.InteractionsBackground};
      transition: all 0.4s;
    }
    transition: all 0.4s;
  }
`;

export default Comment;
