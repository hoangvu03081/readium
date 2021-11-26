import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
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
import Page404 from "../screens/Page404";
import ConfirmEmail from "../screens/ConfirmEmail";

function App() {
  return (
    <Switch>
      <Route path="/auth">
        <Switch>
          <Route path="/auth/confirm">
            <ConfirmEmail />
          </Route>
        </Switch>
      </Route>
      <Route path="/404">
        <Page404 />
      </Route>
      <Route>
        <SignInModal />
        <MobileNavbar />
        <Header />
        <Switch>
          <Route exact path="/">
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
          </Route>
          <Route path="/write">write</Route>
          <Route path="/settings">settings</Route>
          <Route path="/profile">profile</Route>
          <Route path="/post">post</Route>
          <Route path="/notifications">notifications</Route>
          <Route path="/collections">collections</Route>
          <Route path="/tag">tag</Route>
          <Route path="*">
            <Redirect to="/404" />
          </Route>
        </Switch>
      </Route>
    </Switch>
  );
}

export default App;
