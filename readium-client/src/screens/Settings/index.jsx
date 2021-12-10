import React from "react";
import styled from "styled-components";
import HeaderPadding from "../../common/components/HeaderPadding";
import SettingsNav from "./SettingsNav";
import SettingsContent from "./SettingsContent";

const SettingsContainer = styled.div`
  max-width: 1012px;
`;

export default function Settings() {
  return (
    <HeaderPadding>
      <SettingsContainer className="container-lg pt-4 pb-5">
        <div className="d-flex flex-md-row flex-column px-md-0 px-3">
          <SettingsNav />
          <SettingsContent />
        </div>
      </SettingsContainer>
    </HeaderPadding>
  );
}
