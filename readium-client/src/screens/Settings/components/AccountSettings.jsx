import React from "react";
import { useResetPassword } from "../../../common/api/settingQuery";
import { Header, Note, OutlinedButton, InputLabel } from "./styles";

export default function AccountSettings({ profileId }) {
  const resetPassword = useResetPassword();
  return (
    <>
      <Header>Account settings</Header>

      <InputLabel className="mt-4">Reset password</InputLabel>
      <OutlinedButton
        width="165px"
        height="40px"
        onClick={resetPassword.mutate}
      >
        Reset password
      </OutlinedButton>
      {resetPassword.data && (
        <Note className="mt-2">
          An reset email password instruction has been sent to your email.
        </Note>
      )}

      <InputLabel className="mt-4">Delete account</InputLabel>
      <OutlinedButton width="165px" height="40px" color="red">
        Delete account
      </OutlinedButton>
    </>
  );
}
