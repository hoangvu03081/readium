import React from "react";
import Body from "../common/components/Body";
import PopularPost from "../common/components/PopularPost";
import HorizontalLine from "../common/components/HorizontalLine";
import FollowingRecommendedBtn from "../common/components/Buttons/FollowingRecommendedBtn";
import Card from "../common/components/Card";
import TrendingTopics from "../common/components/TrendingTopics";
import RecommendedWriters from "../common/components/RecommendedWriters";

export default function Home() {
  return (
    <div>
      <Body
        contentLeft={
          <>
            <PopularPost />
            <HorizontalLine />
            <FollowingRecommendedBtn to="/write" />
            <Card />
            <Card />
            <Card />
          </>
        }
        contentRight={
          <>
            <TrendingTopics />
            <RecommendedWriters />
          </>
        }
      />
    </div>
  );
}
