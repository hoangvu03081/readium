import React from "react";
import { Route } from "react-router-dom";
import useRequireAuth from "../hooks/useRequireAuth";

export default function SecureRoute(props) {
  useRequireAuth();
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Route {...props} />;
}
