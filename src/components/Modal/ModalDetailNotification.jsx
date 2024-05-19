import React from "react";
import Modal from "react-modal";
import { FaTimesCircle } from "react-icons/fa";
const ModalDetailNotification = ({ isOpen, closeModal, notification }) => {
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
          maxWidth: "90%",
          maxHeight: "90%",
          margin: "auto",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
          background: "white",
          borderRadius: "8px",
          overflow: "auto",
          padding: "20px",
        },
      }}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Notification Details</h2>
        <button
          onClick={closeModal}
          className="text-red-500 hover:text-red-700"
        >
          <FaTimesCircle className="mr-1" size={20} />
        </button>
      </div>
      <div className="modal-content">
        {notification && (
          <div
            dangerouslySetInnerHTML={{
              __html: notification.content,
            }}
          ></div>
        )}
      </div>
    </Modal>
  );
};

export default ModalDetailNotification;
