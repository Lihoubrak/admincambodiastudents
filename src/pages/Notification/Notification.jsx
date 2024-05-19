import React, { useEffect, useState } from "react";
import { AiOutlineDelete, AiOutlineInfoCircle } from "react-icons/ai";
import { IoIosNotifications } from "react-icons/io";
import { TokenRequest } from "../../RequestMethod/Request";
import { ModalDetailNotification } from "../../components";
import { LoopCircleLoading } from "react-loadingg";

const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNotification = async () => {
      try {
        const res = await TokenRequest.get(
          "/notifications/v15/allnotification"
        );
        setNotifications(res.data);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchNotification();
  }, []);

  const handleDelete = async (id) => {
    try {
      await TokenRequest.delete(`/notifications/v15/delete/${id}`);
      setNotifications(
        notifications.filter((notification) => notification.id !== id)
      );
    } catch (error) {
      console.error("Error deleting notification:", error);
    }
  };

  const handleViewDetails = (notification) => {
    setSelectedNotification(notification);
    setIsModalOpen(true);
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-center items-center">
        <h1 className="text-4xl gap-3 flex items-center font-bold mb-8 text-center text-blue-600">
          <IoIosNotifications size={70} />
          <span>NOTIFICATION</span>
        </h1>
      </div>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        {isLoading ? (
          <div className="flex items-center justify-center translate-y-52 -translate-x-3">
            <LoopCircleLoading color="#007bff" />
          </div>
        ) : notifications.length === 0 ? (
          <p className="p-4 text-center text-gray-500">
            No notifications found.
          </p>
        ) : (
          <ul>
            {notifications.map((notification) => (
              <li key={notification.id} className="border-b last:border-b-0">
                <div className="px-6 py-4 flex justify-between items-center">
                  <div className="font-bold">{notification.description}</div>
                  <div className="text-sm text-gray-500">
                    {new Date(
                      notification.sentAt._seconds * 1000
                    ).toLocaleString()}
                  </div>
                  <div className="flex gap-4">
                    <button
                      onClick={() => handleViewDetails(notification)}
                      className="focus:outline-none"
                    >
                      <AiOutlineInfoCircle
                        className="text-blue-500 hover:text-blue-600"
                        size={20}
                      />
                    </button>
                    <button
                      onClick={() => handleDelete(notification.id)}
                      className="focus:outline-none"
                    >
                      <AiOutlineDelete
                        className="text-red-500 hover:text-red-600"
                        size={20}
                      />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <ModalDetailNotification
        isOpen={isModalOpen}
        closeModal={() => setIsModalOpen(false)}
        notification={selectedNotification}
      />
    </div>
  );
};

export default Notification;
