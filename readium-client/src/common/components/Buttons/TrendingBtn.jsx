import styled from "styled-components";

const TrendingButton = styled.button`
  font-family: "Raleway";
  font-weight: bold;
  font-size: 18px;
  padding: 5px 10px;
  background-color: ${({ theme }) => theme.colors.TrendingBtnBackground};
  color: ${({ theme }) => theme.colors.TrendingBtnText};
  border: none;
  border-radius: 31px;
`;

export default TrendingButton;
