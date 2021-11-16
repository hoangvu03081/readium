import styled from "styled-components";

const TagBtn = styled.button`
  font-family: "Raleway";
  font-weight: bold;
  font-size: 13px;
  padding: 5px 10px;
  background-color: ${({ theme }) => theme.colors.TagBtnBackground};
  color: ${({ theme }) => theme.colors.TagBtnText};
  border: none;
  border-radius: 41px;
`;

export default TagBtn;
