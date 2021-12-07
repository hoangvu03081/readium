import React from "react";
import Body from "./Body";
import PopularPost from "./PopularPost";
import HorizontalLine from "./HorizontalLine";
import FollowingRecommendedBtn from "../../common/components/Buttons/FollowingRecommendedBtn";
import CardList from "./CardList";
import TrendingTopics from "./TrendingTopics";
import RecommendedWriters from "./RecommendedWriters";

export default function Home() {
  return (
    <div>
      <Body
        contentLeft={
          <>
            <PopularPost />
            <HorizontalLine />
            <FollowingRecommendedBtn to="/write" />
            <CardList />
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
