import React, { useState, useEffect, useRef } from "react";
import Modal from "react-modal";
import { FaTimesCircle } from "react-icons/fa";
import { TokenRequest } from "../../RequestMethod/Request";
import { getDecodeToken } from "../../utils/getDecodeToken";

const ModalAddChat = ({
  isOpen,
  closeModal,
  messageInput,
  setMessageInput,
  setSelectedSender,
}) => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [nextPageToken, setNextPageToken] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const currentUserId = getDecodeToken().id;
  const userScrollData = useRef(null);

  const fetchMoreUsers = async () => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    try {
      const res = await TokenRequest.get(
        `/users/v1/all?limit=6${
          nextPageToken ? `&startAfter=${nextPageToken}` : ""
        }${searchQuery ? `&searchQuery=${searchQuery}` : ""}`
      );
      const newUsers = res.data.students;
      const newNextPageToken = res.data.nextPageToken;

      setUsers((prevUsers) => [...prevUsers, ...newUsers]);
      setNextPageToken(newNextPageToken);
      setHasMore(newUsers.length > 0);
    } catch (error) {
      console.error("Error fetching more users:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (userScrollData.current) {
        const { scrollTop, scrollHeight, clientHeight } =
          userScrollData.current;
        if (scrollTop + clientHeight >= scrollHeight - 10) {
          fetchMoreUsers();
        }
      }
    };

    if (userScrollData.current) {
      userScrollData.current.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (userScrollData.current) {
        userScrollData.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, [isLoading, hasMore]);

  useEffect(() => {
    const fetchInitialUsers = async () => {
      setIsLoading(true);
      try {
        const res = await TokenRequest.get(
          `/users/v1/all?limit=6${
            searchQuery ? `&searchQuery=${searchQuery}` : ""
          }`
        );
        const initialUsers = res.data.students;
        const initialNextPageToken = res.data.nextPageToken;

        setUsers(initialUsers);
        setNextPageToken(initialNextPageToken);
        setHasMore(initialUsers.length > 0);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInitialUsers();
  }, [currentUserId, searchQuery]);

  const handleUserSelect = (userId) => {
    const user = users.find((u) => u.id === userId);
    setSelectedUser(user);
  };

  const handleStartChat = async () => {
    if (selectedUser) {
      setSelectedSender(selectedUser.id);
      try {
        await TokenRequest.post("/messages/v16/create", {
          content: messageInput,
          receiverId: selectedUser.id,
        });
        setMessageInput("");
        closeModal();
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };

  return (
    <Modal
      ariaHideApp={false}
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={{
        overlay: {
          zIndex: 1000,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        },
        content: {
          maxWidth: "600px",
          width: "100%",
          maxHeight: "80vh",
          margin: "auto",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
          background: "white",
          borderRadius: "8px",
          overflow: "auto",
          padding: "20px",
        },
      }}
    >
      <div className="modal-header flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Start New Chat</h2>
        <button
          onClick={closeModal}
          className="text-red-500 hover:text-red-700"
        >
          <FaTimesCircle size={20} />
        </button>
      </div>
      <div className="modal-content">
        <div className="search-bar mb-4">
          <input
            type="text"
            placeholder="Search users"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none"
          />
        </div>
        {isLoading && users.length === 0 ? (
          <div className="text-center">Loading...</div>
        ) : (
          <>
            <div
              className="user-list max-h-64 overflow-y-auto"
              ref={userScrollData}
            >
              {users
                .filter((user) =>
                  `${user.firstName} ${user.lastName}`
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase())
                )
                .map((user) => (
                  <div
                    key={user.id}
                    className={`user-item cursor-pointer p-2 border-b border-gray-200 ${
                      selectedUser && selectedUser.id === user.id
                        ? "bg-blue-200"
                        : "hover:bg-gray-100"
                    }`}
                    onClick={() => handleUserSelect(user.id)}
                  >
                    <div className="flex items-center">
                      <img
                        src={user.avatar}
                        alt={`${user.firstName} ${user.lastName}`}
                        className="w-8 h-8 rounded-full mr-2"
                      />
                      {user.firstName} {user.lastName}
                    </div>
                  </div>
                ))}
              {isLoading && (
                <div className="text-center">Loading more users...</div>
              )}
            </div>

            <div className="mt-4">
              <input
                type="text"
                placeholder="Type your message here..."
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded mt-2 focus:outline-none"
              />
            </div>
            <div className="modal-actions mt-4 flex justify-end">
              <button
                onClick={handleStartChat}
                disabled={!selectedUser}
                className={`bg-blue-500 text-white py-2 px-4 rounded-md ${
                  !selectedUser
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-blue-600"
                }`}
              >
                Start Chat
              </button>
            </div>
          </>
        )}
      </div>
    </Modal>
  );
};

export default ModalAddChat;
