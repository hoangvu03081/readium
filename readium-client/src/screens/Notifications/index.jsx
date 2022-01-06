import React from "react";
import styled from "styled-components";
import HeaderPadding from "../../common/components/HeaderPadding";
import NotificationPanel from "./NotificationPanel";

const NotificationLayout = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  overflow: hidden;
`;

export default function Notifications() {
  return (
    <>
      <HeaderPadding />
      <NotificationLayout>
        <NotificationPanel />
      </NotificationLayout>
    </>
  );
}
