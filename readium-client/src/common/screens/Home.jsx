import React from "react";
import SignInModal from "../components/SignInModal";
import MobileNavbar from "../components/Header/MobileNavbar";
import Header from "../components/Header";
import Body from "../components/Body";
import PopularPost from "../components/PopularPost";
import HorizontalLine from "../components/HorizontalLine";
import FollowingRecommendedBtn from "../components/Buttons/FollowingRecommendedBtn";
import Card from "../components/Card";
import TrendingTopics from "../components/TrendingTopics";
import RecommendedWriters from "../components/RecommendedWriters";

export default function Home() {
  return (
    <div>
      <SignInModal />
      <MobileNavbar />
      <Header />
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
