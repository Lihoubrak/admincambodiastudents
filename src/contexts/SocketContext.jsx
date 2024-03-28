import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext();
const SocketProvider = ({ children }) => {
  const socketRef = useRef(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const TOKEN = Cookies.get("tokenJwt");

  useEffect(() => {
    if (TOKEN) {
      // Create socket connection only if TOKEN exists
      const socket = io("http://localhost:3000");
      socketRef.current = socket;

      // Emit addUser event and listen for userList event
      socket.emit("addUser", jwtDecode(TOKEN).id);
      socket.on("userList", (users) => {
        setOnlineUsers(users);
      });

      // Clean up socket connection on component unmount
      return () => {
        socket.disconnect();
      };
    }
  }, [TOKEN]);
  return (
    <SocketContext.Provider
      value={{
        socket: socketRef.current,
        onlineUsers,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export { SocketProvider, SocketContext };
