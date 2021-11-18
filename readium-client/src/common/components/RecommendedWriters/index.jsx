import React from "react";
import styled from "styled-components";
import Writer from "./Writer";

const Background = styled.div`
  margin-top: 58px;
  p {
    font-family: "Raleway";
    font-size: 24px;
    text-align: center;
    margin: 0 0 58px 0;
  }
`;

const Content = styled.div`
  background-color: white;
`;

export default function RecommendedWriters() {
  return (
    <Background>
      <p>RECOMMENDED WRITERS</p>
      <Content>
        <Writer Name="Yasuo" Type="Pick Lock/AFK" />
      </Content>
    </Background>
  );
}
