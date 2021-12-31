import React from "react";
import { ReactComponent as DocumentIcon } from "../../../../assets/icons/document.svg";
import StyledResult from "./StyledResult";
import StyledLink from "../../StyledLink";

export default function PostResult({ title, url }) {
  return (
    <StyledLink to={`${url}/reload`}>
      <StyledResult>
        <DocumentIcon size={28} className="me-2 d-inline-block" />
        {title.length < 30 ? title : `${title.substring(0, 37)}...`}
      </StyledResult>
    </StyledLink>
  );
}
