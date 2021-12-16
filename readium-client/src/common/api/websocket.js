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

  ws.onmessage = function (evt) {
    const action = JSON.parse(evt.data);
    switch (action.type) {
      case "notification": {
        setNotifications(action.payload);
        break;
      }
    }
  };

  ws.onopen = function (evt) {};

  return { notifications, authenticateWs, sendNotification };
}

export default useWs;
