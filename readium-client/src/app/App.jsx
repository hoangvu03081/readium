import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "../common/screens/Home";
import WritePost from "../common/screens/WritePost";

function App() {
  return (
    <Router>
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
