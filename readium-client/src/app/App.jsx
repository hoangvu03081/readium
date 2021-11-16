import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SignInModal from "../common/components/SignInModal";
import MobileNavbar from "../common/components/Header/MobileNavbar";
import Header from "../common/components/Header";
import Body from "../common/components/Body";
import TrendingTopics from "../common/components/TrendingTopics";

function App() {
  return (
    <Router>
      <SignInModal />
      <MobileNavbar />
      <Header />
      <Body ContentLeft={<div>Left</div>} ContentRight={<TrendingTopics />} />
    </Router>
  );
}

export default App;
