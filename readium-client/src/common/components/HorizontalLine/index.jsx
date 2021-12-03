import styled from "styled-components";

const HorizontalLine = styled.hr`
  color: #000000;
  background-color: #000000;
  width: 79%;
  height: 0.5px;
  border-color: #000000;
  margin: 0;
  @media (max-width: 650px) {
    display: none;
  }
`;

export default HorizontalLine;
