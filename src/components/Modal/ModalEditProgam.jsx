import React, { useState } from "react";
import Modal from "react-modal";
import { publicRequest } from "../../RequestMethod/Request";
import { FaTimesCircle } from "react-icons/fa";

const ModalEditProgram = ({
  isModalOpenEdit,
  setIsModalOpenEdit,
  programId,
  fetchEvent,
}) => {
  const [event, setEvent] = useState({
    eventName: "",
    eventLocation: "",
    eventDescription: "",
    eventDate: "",
    eventExpiry: "",
    eventImage: null,
    foodMenu: "",
    eventsInProgram: "",
    ticketPrice: "",
    paymentPerStudent: "",
    numberOfTicket: "",
    userId: 1,
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    const newValue = type === "file" ? files[0] : value;
    setEvent((prevEvent) => ({
      ...prevEvent,
      [name]: newValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("eventImage", event.eventImage);
      formData.append("eventName", event.eventName);
      formData.append("eventLocation", event.eventLocation);
      formData.append("eventDescription", event.eventDescription);
      formData.append("eventDate", event.eventDate);
      formData.append("eventExpiry", event.eventExpiry);
      formData.append("foodMenu", event.foodMenu);
      formData.append("eventsInProgram", event.eventsInProgram);
      formData.append("ticketPrice", event.ticketPrice);
      formData.append("paymentPerStudent", event.paymentPerStudent);
      formData.append("numberOfTicket", event.numberOfTicket);
      formData.append("userId", event.userId);
      const res = await publicRequest.put(
        `/events/v9/${programId}/update`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      fetchEvent();
      setEvent({
        eventName: "",
        eventLocation: "",
        eventDescription: "",
        eventDate: "",
        eventExpiry: "",
        eventImage: null,
        foodMenu: "",
        eventsInProgram: "",
        ticketPrice: "",
        paymentPerStudent: "",
        numberOfTicket: "",
        userId: 1,
      });
    } catch (error) {
      console.error(error);
    }
    setIsModalOpenEdit(false);
  };

  return (
    <Modal
      isOpen={isModalOpenEdit}
      ariaHideApp={false}
      onRequestClose={() => setIsModalOpenEdit(false)}
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
        <h2 className="text-xl font-bold">Edit Program</h2>{" "}
        <button
          onClick={() => setIsModalOpenEdit(false)}
          className="text-blue-500 hover:text-blue-700"
        >
          <FaTimesCircle className="mr-1" size={20} color="red" />
        </button>
      </div>
      <div className="modal-content">
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-4">
            <label
              htmlFor="eventName"
              className="block text-sm font-medium text-gray-700"
            >
              Event Name:
            </label>
            <input
              type="text"
              id="eventName"
              name="eventName"
              value={event.eventName}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="form-group mb-4">
            <label
              htmlFor="eventLocation"
              className="block text-sm font-medium text-gray-700"
            >
              Event Location:
            </label>
            <input
              type="text"
              id="eventLocation"
              name="eventLocation"
              value={event.eventLocation}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="form-group mb-4">
            <label
              htmlFor="eventDescription"
              className="block text-sm font-medium text-gray-700"
            >
              Event Description:
            </label>
            <input
              type="text"
              id="eventDescription"
              name="eventDescription"
              value={event.eventDescription}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="form-group mb-4">
            <label
              htmlFor="eventDate"
              className="block text-sm font-medium text-gray-700"
            >
              Event Date:
            </label>
            <input
              type="date"
              id="eventDate"
              name="eventDate"
              value={event.eventDate}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="form-group mb-4">
            <label
              htmlFor="eventExpiry"
              className="block text-sm font-medium text-gray-700"
            >
              Event Expiry:
            </label>
            <input
              type="date"
              id="eventExpiry"
              name="eventExpiry"
              value={event.eventExpiry}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="form-group mb-4">
            <label
              htmlFor="eventImage"
              className="block text-sm font-medium text-gray-700"
            >
              Event Image:
            </label>
            <input
              type="file"
              id="eventImage"
              name="eventImage"
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="form-group mb-4">
            <label
              htmlFor="foodMenu"
              className="block text-sm font-medium text-gray-700"
            >
              Food Menu:
            </label>
            <input
              type="text"
              id="foodMenu"
              name="foodMenu"
              value={event.foodMenu}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="form-group mb-4">
            <label
              htmlFor="eventsInProgram"
              className="block text-sm font-medium text-gray-700"
            >
              Events in Program:
            </label>
            <input
              type="text"
              id="eventsInProgram"
              name="eventsInProgram"
              value={event.eventsInProgram}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="form-group mb-4">
            <label
              htmlFor="ticketPrice"
              className="block text-sm font-medium text-gray-700"
            >
              Ticket Price:
            </label>
            <input
              type="text"
              id="ticketPrice"
              name="ticketPrice"
              value={event.ticketPrice}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="form-group mb-4">
            <label
              htmlFor="paymentPerStudent"
              className="block text-sm font-medium text-gray-700"
            >
              Payment per Student:
            </label>
            <input
              type="text"
              id="paymentPerStudent"
              name="paymentPerStudent"
              value={event.paymentPerStudent}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="form-group mb-4">
            <label
              htmlFor="numberOfTicket"
              className="block text-sm font-medium text-gray-700"
            >
              Number of Ticket:
            </label>
            <input
              type="text"
              id="numberOfTicket"
              name="numberOfTicket"
              value={event.numberOfTicket}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            Save Changes
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default ModalEditProgram;
