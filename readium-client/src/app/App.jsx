import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SignInModal from "../common/components/SignInModal";
import MobileNavbar from "../common/components/Header/MobileNavbar";
import Header from "../common/components/Header";
import Home from "../screens/Home";
import WritePost from "../screens/WritePost";

function App() {
  return (
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
  );
}

export default App;
