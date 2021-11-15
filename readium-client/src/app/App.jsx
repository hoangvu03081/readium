import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Body from "../common/components/Body";
import Header from "../common/components/Header";
import MobileNavbar from "../common/components/Header/MobileNavbar";
import SignInModal from "../common/components/SignInModal";

function App() {
  return (
    <Router>
      <Body
          ContentLeft={<div>"Left"</div>}
          ContentRight={<div>"Right"</div>}
      />
      <SignInModal />
      <MobileNavbar />
      <Header />
    </Router>
  );
}

export default App;
