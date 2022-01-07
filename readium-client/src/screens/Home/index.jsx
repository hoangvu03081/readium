import React, { useState } from "react";
import Body from "./Body";
import PopularPost from "./PopularPost";
import FollowingRecommendedBtn from "./FollowingRecommendedBtn";
import CardList from "./CardList";
import TrendingTopics from "./TrendingTopics";
import RecommendedWriters from "./RecommendedWriters";
import useInfinitePosts from "../../common/api/useInfinitePosts";
import useWs from "../../common/api/websocket";

export default function Home() {
  // const { notifications } = useWs();
  // console.log(notifications);

  const [recommend, setRecommend] = useState(true);
  const data = useInfinitePosts(recommend);

  return (
    <>
      <Body
        contentLeft={
          <>
            <PopularPost />
            <FollowingRecommendedBtn
              recommend={recommend}
              setRecommend={setRecommend}
            />
            <CardList data={data} />
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
