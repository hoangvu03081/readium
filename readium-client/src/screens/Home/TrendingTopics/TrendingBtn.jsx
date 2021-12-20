import styled from "styled-components";

const TrendingButton = styled.button`
  font-family: "Raleway";
  font-weight: bold;
  font-size: 15px;
  padding: 5px 10px;
  background-color: #e8edff;
  color: black;
  border: 1px solid black;
  border-radius: 31px;
  /* box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px; */
  position: relative;
  transition: all 0.5s;
  &:hover {
    cursor: pointer;
    transform: translateY(-5px);
    transition: all 0.3s;
  }
  &:after {
    content: "";
    width: 0;
    border: 1px solid #e8edff;
    opacity: 0;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0px;
    margin-left: auto;
    margin-right: auto;
    transform: translateY(5px);
    transition: all 0.3s;
  }
  &:hover::after {
    opacity: 1;
    width: 80%;
    transition: all 0.3s;
  }
`;

export default TrendingButton;
