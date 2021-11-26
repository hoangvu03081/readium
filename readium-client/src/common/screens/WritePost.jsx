import React from "react";
import Header from "../components/Header";
import MobileNavbar from "../components/Header/MobileNavbar";
import SignInModal from "../components/SignInModal";
import TextEditor from "../components/TextEditor";

export default function WritePost() {
  return (
    <div>
      <SignInModal />
      <MobileNavbar />
      <Header />
      <TextEditor />
    </div>
  );
}
