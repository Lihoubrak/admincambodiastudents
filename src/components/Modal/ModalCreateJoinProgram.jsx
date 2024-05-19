import React, { useState } from "react";
import Modal from "react-modal";
import axios from "axios"; // Import axios for making HTTP requests
import { publicRequest } from "../../RequestMethod/Request";
import { FaTimesCircle } from "react-icons/fa";

const ModalCreateJoinProgram = ({
  programId,
  isModalOpenCreateJoinProgram,
  setIsModalOpenCreateJoinProgram,
  fetchParticipant,
}) => {
  const [participantData, setParticipantData] = useState({
    date: "",
    typePayMoney: "",
    userId: "",
    eventId: programId,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setParticipantData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Make a POST request to your backend endpoint
      const response = await publicRequest.post(
        "/participantevents/v11/create",
        {
          date: participantData.date,
          typePayMoney: participantData.typePayMoney,
          userId: participantData.userId,
          eventId: participantData.eventId,
        }
      );
      fetchParticipant();
      setIsModalOpenCreateJoinProgram(false);
      setParticipantData({
        date: "",
        typePayMoney: "",

        userId: 1,
        eventId: programId,
      });
    } catch (error) {
      console.error("Error:", error);
      // Handle errors here (e.g., show error message to the user)
    }
  };

  return (
    <Modal
      ariaHideApp={false}
      isOpen={isModalOpenCreateJoinProgram}
      onRequestClose={() => setIsModalOpenCreateJoinProgram(false)}
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
        <h2 className="text-xl font-bold"> Create Join Program</h2>
        <button
          onClick={() => setIsModalOpenCreateJoinProgram(false)}
          className="text-blue-500 hover:text-blue-700"
        >
          <FaTimesCircle className="mr-1" size={20} color="red" />
        </button>
      </div>
      <div className="modal-content">
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-4">
            <label
              htmlFor="userId"
              className="block text-sm font-medium text-gray-700"
            >
              UserId:
            </label>
            <input
              type="text"
              id="userId"
              name="userId"
              value={participantData.userId}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div className="form-group mb-4">
            <label
              htmlFor="date"
              className="block text-sm font-medium text-gray-700"
            >
              Date:
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={participantData.date}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div className="form-group mb-4">
            <label
              htmlFor="typePayMoney"
              className="block text-sm font-medium text-gray-700"
            >
              Payment Type:
            </label>
            <input
              type="text"
              id="typePayMoney"
              name="typePayMoney"
              value={participantData.typePayMoney}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            Create Participant Event
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default ModalCreateJoinProgram;
