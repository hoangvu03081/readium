import React from "react";
import styled from "styled-components";
import TrendingBtn from "../../../common/components/Buttons/TrendingBtn";

const Background = styled.div`
  border-radius: 5px;
  padding: 30px 18px 12px 30px;
  background-color: ${({ theme }) => theme.colors.TrendingTopicsBackground};
  box-shadow: rgba(0, 0, 0, 0.07) 0px 1px 1px, rgba(0, 0, 0, 0.07) 0px 2px 2px,
    rgba(0, 0, 0, 0.07) 0px 4px 4px, rgba(0, 0, 0, 0.07) 0px 8px 8px,
    rgba(0, 0, 0, 0.07) 0px 16px 16px;
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
