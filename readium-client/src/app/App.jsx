import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SignInModal from "../common/components/SignInModal";
import MobileNavbar from "../common/components/Header/MobileNavbar";
import Header from "../common/components/Header";
import Body from "../common/components/Body";
import FollowingRecommendedBtn from "../common/components/Buttons/FollowingRecommendedBtn";
import TrendingTopics from "../common/components/TrendingTopics";
import RecommendedWriters from "../common/components/RecommendedWriters";

function App() {
  return (
    <Router>
      <SignInModal />
      <MobileNavbar />
      <Header />
      <Body
        ContentLeft={<FollowingRecommendedBtn />}
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
