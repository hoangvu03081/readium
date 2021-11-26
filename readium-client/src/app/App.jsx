import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import SignInModal from "../common/components/SignInModal";
import MobileNavbar from "../common/components/Header/MobileNavbar";
import Header from "../common/components/Header";
import Home from "../screens/Home";
import Page404 from "../screens/Page404";
import WritePost from "../screens/WritePost";

function App() {
  return (
    <Switch>
      <Route path="/auth">123</Route>
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
