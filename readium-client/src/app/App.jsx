import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import ConfirmEmail from "../screens/ConfirmEmail";
import SignInModal from "../common/components/SignInModal";
import MobileNavbar from "../common/components/Header/MobileNavbar";
import Header from "../common/components/Header";
import Home from "../screens/Home";
import Profile from "../screens/Profile";
import Page404 from "../screens/Page404";
import WritePost from "../screens/WritePost";
import ResetPassword from "../screens/ResetPassword";
import "./App.css";

function App() {
  return (
    <Switch>
      <Route path="/auth/confirm">
        <ConfirmEmail />
      </Route>
      <Route path="/auth/reset">
        <ResetPassword />
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
            <Home />
          </Route>
          <Route path="/write">
            <WritePost />
          </Route>
          <Route path="/settings">settings</Route>
          <Route path="/profile/:profileId?">
            <Profile />
          </Route>
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
