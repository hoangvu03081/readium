import React from "react";
import Body from "../../common/components/Body";
import PopularPost from "../../common/components/PopularPost";
import HorizontalLine from "../../common/components/HorizontalLine";
import FollowingRecommendedBtn from "../../common/components/Buttons/FollowingRecommendedBtn";
import CardList from "../../common/components/CardList";
import TrendingTopics from "../../common/components/TrendingTopics";
import RecommendedWriters from "../../common/components/RecommendedWriters";

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
