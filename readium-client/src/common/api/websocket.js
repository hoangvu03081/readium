import { useEffect } from "react";
import { WEBSOCKET } from "./apiConstant";

const ws = new WebSocket(WEBSOCKET);

function useWs() {
  // useEffect();
  const authenticateWs = (token) => {
    const action = {
      payload: { token },
      type: "setAuth",
    };
    ws.send(JSON.stringify(action));
  };

  const sendNotification = (to, message) => {
    const action = {
      payload: { to, message },
      type: "setNotification",
    };
    ws.send(JSON.stringify(action));
  };

  ws.onmessage = function (evt) {
    const action = JSON.parse(evt.data);
    switch (action.type) {
      case "notification": {
        console.log(action.payload);
        break;
      }
    }
  };
}

export default { useWS };
