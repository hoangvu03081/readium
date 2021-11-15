import React from "react";
import Body from "../common/components/Body";
// import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import Header from "../common/components/Header";
// import SignInModal from "../common/components/SignInModal";

function App() {
  return (
    <div>
      <Body
        ContentLeft={<div>"Left"</div>}
        ContentRight={<div>"Right"</div>}
      />
    </div>
  );
}

export default App;
