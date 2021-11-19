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
        Name="Yasuo Brain Dog"
        Type="Pick Lock/AFK/Pro Ngu"
        Avatar="./src/assets/images/yasuo.png"
      />
      <Writer
        Name="Son Dep"
        Type="Teacher"
        Avatar="./src/assets/images/yasuo.png"
      />
      <Writer
        Name="Hai Xinh"
        Type="Beautiful boy"
        Avatar="./src/assets/images/yasuo.png"
      />
    </Background>
  );
}
