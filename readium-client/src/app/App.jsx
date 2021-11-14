import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "../common/components/Header";
import MobileNavbar from "../common/components/Header/MobileNavbar";
import SignInModal from "../common/components/SignInModal";

function App() {
  return (
    <Router>
      <SignInModal />
      <MobileNavbar />
      <Header />
    </Router>
  );
}

export default App;
