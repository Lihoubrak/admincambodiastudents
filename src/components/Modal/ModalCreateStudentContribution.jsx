import React, { useState } from "react";
import Modal from "react-modal";

const ModalCreateStudentContribution = ({ isOpen, closeModal }) => {
  const [roomNumber, setRoomNumber] = useState("");

  const handleRoomNumberChange = (e) => {
    setRoomNumber(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can perform any actions with the room information,
    // such as submitting it to a server or storing it locally
    console.log("Room Number:", roomNumber);
    // Close the modal after submission
    closeModal();
  };

  return (
    <Modal
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
        <h2 className="text-xl font-bold">Create New Room</h2>
        <button
          onClick={closeModal}
          className="text-blue-500 hover:text-blue-700"
        >
          Close
        </button>
      </div>
      <div className="modal-content">
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-4">
            <label
              htmlFor="roomNumber"
              className="block text-sm font-medium text-gray-700"
            >
              Room Number:
            </label>
            <input
              type="text"
              id="roomNumber"
              value={roomNumber}
              onChange={handleRoomNumberChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            Create Room
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default ModalCreateStudentContribution;
