import React from "react";
import Body from "./Body";
import PopularPost from "./PopularPost";
import HorizontalLine from "./HorizontalLine";
import FollowingRecommendedBtn from "../../common/components/Buttons/FollowingRecommendedBtn";
import CardList from "./CardList";
import TrendingTopics from "./TrendingTopics";
import RecommendedWriters from "./RecommendedWriters";
import useWs from "../../common/api/websocket";

export default function Home() {
  // const { notifications } = useWs();
  // console.log(notifications);
  return (
    <>
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
    </>
  );
}
