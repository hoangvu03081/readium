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

const NotificationHeader = styled.h2`
  margin-top: 40px;
`;

const MockData = [
  {
    from: "61d7d7ca2d12f47c61d5f6a7",
    to: "61d7d6da2d12f47c61d5f644",
    content: "Hoàng Vũ commented on ABC",
    url: "unavailable",
    createdAt: "2022-01-07T06:12:45.293Z",
    id: "61d7d9dd2d12f47c61d5f86a",
  },
];

export default function NotificationPanel() {
  const { notifications } = useWs();
  console.log(notifications);
  return (
    <StyledPanel>
      <NotificationHeader>Notifications</NotificationHeader>
    </StyledPanel>
  );
}
