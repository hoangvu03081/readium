import React from "react";
import { Switch, Route } from "react-router-dom";
import ProfileSettings from "./components/ProfileSettings";
import { useAuth } from "../../common/hooks/useAuth";
import AccountSettings from "./components/AccountSettings";

export default function SettingsContent() {
  const { auth } = useAuth();
  return (
    <div className="col-md-9">
      <Switch>
        <Route exact path="/settings">
          <ProfileSettings profileId={auth.profileId} />
        </Route>
        <Route exact path="/settings/account">
          <AccountSettings profileId={auth.profileId} />
        </Route>
      </Switch>
    </div>
  );
}
