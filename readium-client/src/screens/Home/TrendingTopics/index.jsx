import React from "react";
import styled from "styled-components";
import TrendingBtn from "../../../common/components/Buttons/TrendingBtn";

const Background = styled.div`
  padding: 30px 18px 12px 30px;
  background: rgba(144, 144, 144, 0.1);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(0px);
  -webkit-backdrop-filter: blur(0px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  p {
    font-family: "Raleway";
    font-weight: bold;
    font-size: 22px;
    text-align: center;
    color: ${({ theme }) => theme.colors.TrendingTopicsText};
    margin: 0 0 25px 0;
  }
`;

const Content = styled.div`
  display: flex;
  flex-wrap: wrap;
  button {
    margin-right: 12px;
    margin-bottom: 28px;
  }
`;

export default function TrendingTopics() {
  return (
    <Background>
      <p>TRENDING TOPICS</p>
      <Content>
        <TrendingBtn>#Programming</TrendingBtn>
        <TrendingBtn>#Designing</TrendingBtn>
        <TrendingBtn>#NFT</TrendingBtn>
        <TrendingBtn>#Blockchain</TrendingBtn>
        <TrendingBtn>#Devops</TrendingBtn>
        <TrendingBtn>#Technique</TrendingBtn>
        <TrendingBtn>#Technique</TrendingBtn>
        <TrendingBtn>#Technique</TrendingBtn>
        <TrendingBtn>#Henry</TrendingBtn>
      </Content>
    </Background>
  );
}
