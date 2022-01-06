import React from "react";
import styled from "styled-components";
import useWs from "../../common/api/websocket";

const StyledPanel = styled.div`
  display: flex;
  flex-direction: column;
  border: solid 1px #c4c4c4;
  border-radius: 5px;
  height: 85vh;
  width: 40%;
  position: absolute;
  bottom: 0;
  background-color: ${({ theme }) => theme.colors.Notification};
  overflow: hidden;

  h2 {
    text-align: center;
  }
`;

export default function NotificationPanel() {
  const { notifications } = useWs();
  console.log(notifications);
  return (
    <StyledPanel>
      <h2 className="mt-5">Notifications</h2>
    </StyledPanel>
  );
}
