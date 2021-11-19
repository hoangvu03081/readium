import styled from "styled-components";

const TagBtn = styled.button`
  font-family: "PT Sans";
  font-weight: bold;
  font-size: 13px;
  padding: 5px 10px;
  background-color: ${({ theme }) => theme.colors.TagBtnBackground};
  color: ${({ theme }) => theme.colors.TagBtnText};
  border: none;
  border-radius: 41px;
  transition: all 0.3s;
  &:hover {
    cursor: pointer;
    background-color: ${({ theme }) => theme.colors.TagBtnHover};
    transition: all 0.3s;
  }
`;

export default TagBtn;
