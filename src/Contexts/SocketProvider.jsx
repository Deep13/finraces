// src/context/SocketProvider.jsx
import { createContext, useContext, useEffect, useState } from "react";
import { connectSocket, disconnectSocket } from "../Utils/socket";

const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const ud = localStorage.getItem("fin_userDetails");
    const userDetails = ud && JSON.parse(atob(ud));
    const { userId } = userDetails || {};
    const token = localStorage.getItem("token");

    // if (!userId || !token) {
    //   console.error("User ID or token is missing");
    //   return;
    // }

    const s = connectSocket(userId, token);
    setSocket(s);

    return () => {
      disconnectSocket();
      setSocket(null);
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);
