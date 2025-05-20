// src/socket.js
import { io } from "socket.io-client";
import { globalUrl } from "../Config";

let socket;

export const connectSocket = (userId, token) => {
  if (!socket && userId && token) {
    socket = io(globalUrl, {
      auth: { token },
      query: { userId },
      reconnection: true,
      reconnectionAttempts: Infinity,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      transports: ["websocket"],
    });

    socket.on("connect", () => console.log("Connected to WebSocket Server"));
    socket.on("connect_error", (err) =>
      console.error(" Connection Error:", err)
    );
    socket.on("disconnect", (reason) =>
      console.warn("Disconnected from server:", reason)
    );
  }

  return socket;
};

export const getSocket = () => socket;
export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};
