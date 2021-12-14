import { useEffect, useState } from "react";
import { WEBSOCKET } from "./apiConstant";

const ws = new WebSocket(WEBSOCKET);

function useWs() {
  const [notifications, setNotifications] = useState([]);

  const authenticateWs = (token) => {
    const action = {
      payload: { token },
      type: "setAuth",
    };
    if (ws.readyState === 1) ws.send(JSON.stringify(action));
    else setTimeout(() => authenticateWs(token), 1000);
  };

  const sendNotification = (to, content) => {
    const action = {
      payload: { to, content },
      type: "setNotification",
    };
    ws.send(JSON.stringify(action));
  };

  ws.onmessage = function (evt) {
    const action = JSON.parse(evt.data);
    switch (action.type) {
      case "notification": {
        setNotifications(action.payload);
        console.log(action);
        break;
      }
    }
  };

  ws.onopen = function (evt) {
    console.log("connected");
  };

  return { notifications, authenticateWs, sendNotification };
}

export default useWs;
