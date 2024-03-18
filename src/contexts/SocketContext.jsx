import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext();
const SocketProvider = ({ children }) => {
  const socketRef = useRef(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const TOKEN = Cookies.get("tokenJwt");
  useEffect(() => {
    // Connect to the socket server when component mounts

    socketRef.current = io("http://localhost:3000");

    // Emit event to add current user to online users list
    socketRef.current.emit("addUser", jwtDecode(TOKEN).id);

    // Listen for changes in the list of online users
    socketRef.current.on("getUsers", (users) => {
      setOnlineUsers(users);
    });
    socketRef.current.on("newMessage", (newMessage) => {
      setMessages(newMessage);
    });
    // Clean up function to disconnect socket when component unmounts
    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider
      value={{
        socket: socketRef.current,
        onlineUsers,
        realtimeMessage: messages,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export { SocketProvider, SocketContext };
