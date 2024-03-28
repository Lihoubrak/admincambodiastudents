import React, { useState } from "react";
import { FaTimesCircle } from "react-icons/fa";
import Modal from "react-modal";

const ModalCreateSport = ({ isOpen, closeModal, createSportEvent }) => {
  const [sportEvent, setSportEvent] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventImage, setEventImage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newSportEvent = {
      sportEvent,
      eventDate,
      eventLocation,
      eventDescription,
      eventImage,
    };
    createSportEvent(newSportEvent);
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
        <h2 className="text-2xl font-bold">Create Sport Event</h2>
        <button
          onClick={closeModal}
          className="text-blue-500 hover:text-blue-700 "
        >
          <FaTimesCircle className="mr-1" size={20} color="red" />
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="eventName" className="block mb-2">
            Sport Name:
          </label>
          <input
            type="text"
            id="sportEvent"
            value={sportEvent}
            onChange={(e) => setSportEvent(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="eventDate" className="block mb-2">
            Event Date:
          </label>
          <input
            type="date"
            id="eventDate"
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="eventLocation" className="block mb-2">
            Event Location:
          </label>
          <input
            type="text"
            id="eventLocation"
            value={eventLocation}
            onChange={(e) => setEventLocation(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="eventDescription" className="block mb-2">
            Event Description:
          </label>
          <textarea
            id="eventDescription"
            value={eventDescription}
            onChange={(e) => setEventDescription(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          ></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="eventImage" className="block mb-2">
            Event Image URL:
          </label>
          <input
            type="file"
            id="eventImage"
            value={eventImage}
            onChange={(e) => setEventImage(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <div className="flex justify-start">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Create Sport
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default ModalCreateSport;
