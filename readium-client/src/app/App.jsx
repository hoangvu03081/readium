import React from "react";
<<<<<<< HEAD
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
=======
import { Switch, Route, Redirect } from "react-router-dom";
>>>>>>> parent of 8cdc833 (Revert "Merge remote-tracking branch 'origin/frontend-authentication' into Body")
import SignInModal from "../common/components/SignInModal";
import MobileNavbar from "../common/components/Header/MobileNavbar";
import Header from "../common/components/Header";
import Home from "../screens/Home";
<<<<<<< HEAD
=======
import Page404 from "../screens/Page404";
>>>>>>> parent of 8cdc833 (Revert "Merge remote-tracking branch 'origin/frontend-authentication' into Body")
import WritePost from "../screens/WritePost";

function App() {
  return (
<<<<<<< HEAD
    <Router>
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
      </Switch>
    </Router>
=======
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
>>>>>>> parent of 8cdc833 (Revert "Merge remote-tracking branch 'origin/frontend-authentication' into Body")
  );
}

export default App;
