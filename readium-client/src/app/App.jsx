import React from "react";
import { Switch, Route } from "react-router-dom";
import SignInModal from "../common/components/SignInModal";
import MobileNavbar from "../common/components/Header/MobileNavbar";
import Header from "../common/components/Header";
import Body from "../common/components/Body";
import FollowingRecommendedBtn from "../common/components/Buttons/FollowingRecommendedBtn";
import TrendingTopics from "../common/components/TrendingTopics";
import RecommendedWriters from "../common/components/RecommendedWriters";
import PopularPost from "../common/components/PopularPost";
import HorizontalLine from "../common/components/HorizontalLine";
import Card from "../common/components/Card";

function App() {
  return (
    <>
      <SignInModal />
      <MobileNavbar />
      <Header />
      <Body
        contentLeft={
          <>
            <PopularPost />
            <HorizontalLine />
            <FollowingRecommendedBtn />
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
    </>
  );
}

export default App;
