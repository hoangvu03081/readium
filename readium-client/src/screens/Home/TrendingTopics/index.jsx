/* eslint-disable react/no-array-index-key */
import React from "react";
import styled from "styled-components";
import { useGetTrendingTopics } from "../../../common/api/otherQuery";
import PuffLoader from "../../../common/components/PuffLoader";
import TrendingBtn from "./TrendingBtn";
import StyledLink from "../../../common/components/StyledLink";
import CustomBackground from "./CustomBackground";

const Background = styled.div`
  padding: 30px;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(0px);
  border-radius: 10px;
  p {
    font-family: "Raleway";
    font-weight: bold;
    font-size: 22px;
    text-align: center;
    margin: 0 0 25px 0;
    color: #e8edff;
    /* background: -webkit-linear-gradient(white, #38495a);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent; */
  }
`;

const Content = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px 10px;
`;

export default function TrendingTopics() {
  const getTrendingTopics = useGetTrendingTopics();
  if (getTrendingTopics.isFetching) {
    return <PuffLoader />;
  }
  if (!getTrendingTopics.data || getTrendingTopics.isError) {
    return <div />;
  }
  // const trendingTopics = getTrendingTopics.data.data;
  const trendingTopics = ["#son dep trai"];

  return (
    <Background>
      <p>TRENDING TOPICS</p>
      <Content>
        {trendingTopics.map((item, index) => (
          <StyledLink key={index} to={`search?q=${encodeURIComponent(item)}`}>
            <TrendingBtn>{item}</TrendingBtn>
          </StyledLink>
        ))}
      </Content>
      <CustomBackground />
    </Background>
  );
}

/* <TrendingBtn>#Programming</TrendingBtn>
<TrendingBtn>#Designing</TrendingBtn>
<TrendingBtn>#NFT</TrendingBtn>
<TrendingBtn>#Blockchain</TrendingBtn>
<TrendingBtn>#Devops</TrendingBtn>
<TrendingBtn>#Technique</TrendingBtn>
<TrendingBtn>#Technique</TrendingBtn>
<TrendingBtn>#Technique</TrendingBtn>
<TrendingBtn>#Henry</TrendingBtn> */
