import React from "react";
import {
  Header,
  Input,
  InputLabel,
  Note,
  OutlinedButton,
  TextArea,
} from "./styles";

export default function ProfileSettings() {
  return (
    <>
      <Header>Profile settings</Header>
      <InputLabel>Display name</InputLabel>
      <Input width="350px" />
      <Note>This name appears wherever you shows up</Note>

      <InputLabel className="mt-3">Job</InputLabel>
      <Input width="350px" />
      <Note>Your job will be displayed inside your profile page.</Note>

      <InputLabel className="mt-3">Biography</InputLabel>
      <TextArea />
      <Note>Your biography will be displayed inside your profile page.</Note>

      <Header>Contact information</Header>

      <InputLabel className="mt-3">Facebook</InputLabel>
      <Input width="350px" />

      <InputLabel className="mt-3">Email</InputLabel>
      <Input width="350px" />

      <InputLabel className="mt-3">Twitter</InputLabel>
      <Input width="350px" />

      <InputLabel className="mt-3">Instagram</InputLabel>
      <Input width="350px" />

      <OutlinedButton className="mt-4">Update</OutlinedButton>
    </>
  );
}
