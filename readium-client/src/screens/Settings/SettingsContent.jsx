import React from "react";
import { Switch, Route } from "react-router-dom";
import ProfileSettings from "./components/ProfileSettings";

export default function SettingsContent() {
  return (
    <div className="col-md-9">
      <Switch>
        <Route exact path="/settings">
          <ProfileSettings />
        </Route>
      </Switch>
    </div>
  );
}
