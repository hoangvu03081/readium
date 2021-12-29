import React from "react";
import { Header, Note, OutlinedButton, InputLabel } from "./styles";

export default function AccountSettings({ profileId }) {
  return (
    <>
      <Header>Account settings</Header>

      <InputLabel className="mt-4">Reset password</InputLabel>
      <OutlinedButton width="165px" height="40px">
        Reset password
      </OutlinedButton>

      <InputLabel className="mt-4">Delete account</InputLabel>
      <OutlinedButton width="165px" height="40px" color="red">
        Delete account
      </OutlinedButton>
    </>
  );
}
