import React from "react";
import Body from "../Home/Body";
import TrendingTopics from "../Home/TrendingTopics";
import RecommendedWriters from "../Home/RecommendedWriters";
import useWs from "../../common/api/websocket";
import useRouter from "../../common/hooks/useRouter";
import SearchBody from "./SearchBody";

export default function SearchPage() {
  const { query } = useRouter();
  return (
    <>
      <Body
        contentLeft={<SearchBody query={query} />}
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
