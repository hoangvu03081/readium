import React from "react";
import styled from "styled-components";
import Writer from "./Writer";

const Background = styled.div`
  margin-top: 58px;
  p {
    font-family: "Raleway";
    font-size: 22px;
    text-align: center;
    margin: 0 0 35px 0;
  }
`;

export default function RecommendedWriters() {
  return (
    <Background>
      <p>RECOMMENDED WRITERS</p>
      <Writer
        name="Yasuo Brain Dog"
        type="Pick Lock/AFK/Pro Ngu"
        avatar="./src/assets/images/yasuo.png"
      />
      <Writer
        name="Son Dep"
        type="Teacher"
        avatar="./src/assets/images/yasuo.png"
      />
      <Writer
        name="Hai Xinh"
        type="Beautiful boy"
        avatar="./src/assets/images/yasuo.png"
      />
    </Background>
  );
}
