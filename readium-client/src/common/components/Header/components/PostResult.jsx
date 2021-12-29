import React from "react";
import { ReactComponent as DocumentIcon } from "../../../../assets/icons/document.svg";
import StyledResult from "./StyledResult";

export default function PostResult() {
  return (
    <StyledResult>
      <DocumentIcon size={28} className="me-2" />
      Coding is bad for your health
    </StyledResult>
  );
}
