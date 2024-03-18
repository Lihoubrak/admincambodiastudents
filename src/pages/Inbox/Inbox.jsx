// Import các thư viện và biến React
import React, { useContext, useState, useEffect, useMemo, useRef } from "react";
import { MdForwardToInbox } from "react-icons/md";
import { TokenRequest, publicRequest } from "../../RequestMethod/Request";
import { SocketContext } from "../../contexts/SocketContext";
import { getDecodeToken } from "../../utils/getDecodeToken";
import { formatDateTime } from "../../utils/formatDateTime";
import { TiMediaRecord } from "react-icons/ti";
const Inbox = () => {
  const [selectedSender, setSelectedSender] = useState(null);
  const [messageInput, setMessageInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const { realtimeMessage, onlineUsers } = useContext(SocketContext);
  const userId = getDecodeToken().id;
  console.log(onlineUsers);
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const fetchMessage = async () => {
      if (selectedSender) {
        const res = await TokenRequest.get(
          `/messages/v16/all/${selectedSender}`
        );
        setMessages(res.data);
        scrollToBottom();
      }
    };
    fetchMessage();
  }, [selectedSender]);

  useEffect(() => {
    const fetchUser = async () => {
      if (userId) {
        const res = await publicRequest.get(`/users/v1/all/${userId}`);
        setUsers(res.data);
      }
    };

    fetchUser();
  }, []);
  useEffect(() => {
    if (realtimeMessage) {
      setMessages((prevMessages) => [...prevMessages, realtimeMessage]);
      scrollToBottom();
    }
  }, [realtimeMessage]);
  const handleSelectSender = (index) => {
    setSelectedSender(index);
  };
  const handleInputChange = (event) => {
    setMessageInput(event.target.value);
  };
  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSendMessage = async () => {
    const response = await TokenRequest.post("/messages/v16/create", {
      content: messageInput,
      receiverId: 2,
    });
    setMessages((prevMessages) => [...prevMessages, response.data]);
    scrollToBottom();
    setMessageInput("");
  };
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  };

  const filteredUsers = useMemo(() => {
    return users.filter(
      (user) =>
        user.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.lastName.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, users]);

  return (
    <div className="container mx-auto">
      <h1 className="text-4xl flex items-center justify-center font-bold mb-8 text-blue-600">
        <MdForwardToInbox size={70} className="mr-3" />
        <span>INBOX</span>
      </h1>
      <div className="flex">
        <div className="w-1/4 bg-gray-100 overflow-y-auto">
          <input
            type="text"
            placeholder="Search users"
            value={searchQuery}
            onChange={handleSearchInputChange}
            className="w-full mb-4 px-3 py-2 border border-gray-300 rounded focus:outline-none"
          />
          <ul>
            {filteredUsers.map((filteredUser) => (
              <li
                key={filteredUser.id}
                className={`py-2 cursor-pointer pl-2 transition-colors e relative ${
                  selectedSender === filteredUser.id ? "bg-blue-200" : ""
                }`}
                onClick={() => handleSelectSender(filteredUser.id)}
              >
                {onlineUsers.some(
                  (onlineUser) => onlineUser.userId === filteredUser.id
                ) && (
                  <TiMediaRecord
                    size={15}
                    color={"#4CAF50"}
                    style={{
                      position: "absolute",
                      top: 9,
                      left: 30,
                      zIndex: 10,
                    }}
                  />
                )}
                <div className="flex items-center">
                  <img
                    src={filteredUser.avatar}
                    alt={`${filteredUser.firstName} ${filteredUser.lastName}`}
                    className="w-8 h-8 rounded-full mr-2"
                  />
                  <span className="pl-2">
                    {filteredUser.firstName} {filteredUser.lastName}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex-1 bg-gray-200 p-4">
          <div className="mb-4 h-64 overflow-y-auto ">
            {selectedSender === null ? (
              <p className="text-gray-500 text-center">
                Select a user to start chatting.
              </p>
            ) : (
              <div className="flex flex-col gap-2 " ref={messagesEndRef}>
                {messages.length === 0 ? (
                  <p className="text-gray-500 self-center">No messages yet.</p>
                ) : (
                  messages.map((message, index) => (
                    <div key={index} className="flex flex-col ">
                      <span className="text-xs text-gray-500 mb-1 self-center">
                        {formatDateTime(message.createdAt)}
                      </span>
                      <div
                        className={`p-2 rounded-lg ${
                          message.sender_id === userId
                            ? "bg-blue-500 text-white self-end"
                            : "bg-gray-300 self-start"
                        }`}
                      >
                        <p>{message.content}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>

          <div className="flex mt-4">
            <input
              type="text"
              placeholder="Message"
              value={messageInput}
              onChange={handleInputChange}
              className="flex-1 bg-white border border-gray-300 rounded py-2 px-4 mr-2 focus:outline-none"
            />
            <button
              onClick={handleSendMessage}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Inbox;
