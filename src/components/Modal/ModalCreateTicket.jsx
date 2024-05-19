import React, { useState } from "react";
import Modal from "react-modal";
import { TokenRequest, publicRequest } from "../../RequestMethod/Request";
import { FaTimesCircle } from "react-icons/fa";

const ModalCreateTicket = ({
  programId,
  isModalCreateTicket,
  setIsModalOpenBuyTicket,
}) => {
  const [ticketData, setTicketData] = useState({
    date: "",
    typePayMoney: "",
    payMoney: "",
    numberOfTicket: "",
    userId: "",
    eventId: programId,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTicketData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await TokenRequest.post(
        `/ticketevents/v17/create`,
        ticketData
      );
    } catch (error) {
      console.error("Error creating ticket:", error);
    }
    // Reset form data
    setTicketData({
      date: "",
      typePayMoney: "",
      payMoney: "",
      numberOfTicket: "",
      userId: "",
      eventId: programId,
    });
    setIsModalOpenBuyTicket(false);
  };

  return (
    <Modal
      ariaHideApp={false}
      isOpen={isModalCreateTicket}
      onRequestClose={() => setIsModalOpenBuyTicket(false)}
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
        <h2 className="text-xl font-bold">Create Ticket</h2>
        <button
          onClick={() => setIsModalOpenBuyTicket(false)}
          className="text-blue-500 hover:text-blue-700"
        >
          <FaTimesCircle className="mr-1" size={20} color="red" />
        </button>
      </div>
      <div className="modal-content">
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-4">
            <label
              htmlFor="date"
              className="block text-sm font-medium text-gray-700"
            >
              UserId:
            </label>
            <input
              type="text"
              id="userId"
              name="userId"
              value={ticketData.userId}
              onChange={handleChange}
              required
              className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-blue-500 focus:border-blue-500"
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
              value={ticketData.date}
              onChange={handleChange}
              required
              className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="form-group mb-4">
            <label
              htmlFor="typePayMoney"
              className="block text-sm font-medium text-gray-700"
            >
              Type of Payment:
            </label>
            <input
              type="text"
              id="typePayMoney"
              name="typePayMoney"
              value={ticketData.typePayMoney}
              required
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="form-group mb-4">
            <label
              htmlFor="numberOfTicket"
              className="block text-sm font-medium text-gray-700"
            >
              Number of Tickets:
            </label>
            <input
              type="text"
              id="numberOfTicket"
              name="numberOfTicket"
              value={ticketData.numberOfTicket}
              required
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            Create Ticket
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default ModalCreateTicket;
