import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SignInModal from "../common/components/SignInModal";
import MobileNavbar from "../common/components/Header/MobileNavbar";
import Header from "../common/components/Header";
import Body from "../common/components/Body";
import FollowingRecommendedBtn from "../common/components/Buttons/FollowingRecommendedBtn";
import TrendingTopics from "../common/components/TrendingTopics";
import RecommendedWriters from "../common/components/RecommendedWriters";
import PopularPost from "../common/components/PopularPost";
import Card from "../common/components/Card";

function App() {
  return (
    <Router>
      <SignInModal />
      <MobileNavbar />
      <Header />
      <Body
        ContentLeft={
          <>
            <PopularPost />
            <hr
              style={{
                color: "#000000",
                backgroundColor: "#000000",
                width: 692,
                height: 0.5,
                borderColor: "#000000",
                margin: 0,
              }}
            />
            <FollowingRecommendedBtn />
            <Card />
            <Card />
            <Card />
          </>
        }
        ContentRight={
          <>
            <TrendingTopics />
            <RecommendedWriters />
          </>
        }
      />
    </Router>
  );
}

export default App;
