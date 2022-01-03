import React from "react";
import Body from "./Body";
import PopularPost from "./PopularPost";
import FollowingRecommendedBtn from "./FollowingRecommendedBtn";
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
