import React, { useState } from "react";
import Modal from "react-modal";
import { TokenRequest } from "../../RequestMethod/Request";
import { FaTimesCircle } from "react-icons/fa";

const ModalCreateProgram = ({ isOpen, closeModal }) => {
  const [event, setEvent] = useState({
    eventName: "",
    eventLocation: "",
    eventDescription: "",
    eventDate: "",
    eventExpiry: "",
    eventImage: null,
    foodMenu: [{ name: "" }],
    eventsInProgram: [{ eventName: "" }],
    ticketPrice: "",
    paymentPerStudent: "",
    numberOfTicket: "",
  });
  const handleFoodMenuChange = (e, index) => {
    const { value } = e.target;
    const updatedFoodMenu = [...event.foodMenu];
    updatedFoodMenu[index] = { name: value };
    setEvent({ ...event, foodMenu: updatedFoodMenu });
  };

  const handleEventsInProgramChange = (e, index) => {
    const { value } = e.target;
    const updatedEventsInProgram = [...event.eventsInProgram];
    updatedEventsInProgram[index] = { eventName: value };
    setEvent({ ...event, eventsInProgram: updatedEventsInProgram });
  };

  const handleAddFoodMenuItem = () => {
    const updatedFoodMenu = [...event.foodMenu, { name: "" }];
    setEvent({ ...event, foodMenu: updatedFoodMenu });
  };

  const handleAddEventInProgram = () => {
    const updatedEventsInProgram = [
      ...event.eventsInProgram,
      { eventName: "" },
    ];
    setEvent({ ...event, eventsInProgram: updatedEventsInProgram });
  };

  const handleRemoveFoodMenuItem = (index) => {
    const updatedFoodMenu = [...event.foodMenu];
    updatedFoodMenu.splice(index, 1);
    setEvent({ ...event, foodMenu: updatedFoodMenu });
  };

  const handleRemoveEventInProgram = (index) => {
    const updatedEventsInProgram = [...event.eventsInProgram];
    updatedEventsInProgram.splice(index, 1);
    setEvent({ ...event, eventsInProgram: updatedEventsInProgram });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("eventName", event.eventName);
      formData.append("eventImage", event.eventImage);
      formData.append("eventLocation", event.eventLocation);
      formData.append("eventDescription", event.eventDescription); // Ensure eventDescription is included
      formData.append("eventDate", event.eventDate);
      formData.append("eventExpiry", event.eventExpiry);
      formData.append("foodMenu", JSON.stringify(event.foodMenu));
      formData.append("eventsInProgram", JSON.stringify(event.eventsInProgram));
      formData.append("ticketPrice", event.ticketPrice);
      formData.append("paymentPerStudent", event.paymentPerStudent);
      formData.append("numberOfTicket", event.numberOfTicket);

      const res = await TokenRequest.post(`/events/v9/create`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setEvent({
        eventName: "",
        eventLocation: "",
        eventDate: "",
        eventExpiry: "",
        eventImage: null,
        foodMenu: [{ name: "" }],
        eventsInProgram: [{ eventName: "" }],
        eventDescription: "",
        ticketPrice: "",
        paymentPerStudent: "",
        numberOfTicket: "",
      });
    } catch (error) {
      console.error(error);
    }

    closeModal();
  };

  return (
    <Modal
      isOpen={isOpen}
      ariaHideApp={false}
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
        <h2 className="text-xl font-bold">Edit Program</h2>{" "}
        <button
          onClick={closeModal}
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
              onChange={(e) =>
                setEvent({ ...event, eventName: e.target.value })
              }
              required
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
              onChange={(e) =>
                setEvent({ ...event, eventLocation: e.target.value })
              }
              required
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
              onChange={(e) =>
                setEvent({ ...event, eventDescription: e.target.value })
              }
              required
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
              onChange={(e) =>
                setEvent({ ...event, eventDate: e.target.value })
              }
              required
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
              onChange={(e) =>
                setEvent({ ...event, eventExpiry: e.target.value })
              }
              required
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
              onChange={(e) =>
                setEvent({ ...event, eventImage: e.target.files[0] })
              }
              required
              className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          {/* Food Menu inputs */}
          {event.foodMenu.map((item, index) => (
            <div key={index} className="form-group mb-4">
              <label
                htmlFor={`foodName${index}`}
                className="block text-sm font-medium text-gray-700"
              >
                Food Name:
              </label>
              <input
                type="text"
                id={`foodName${index}`}
                name="name"
                value={item.name}
                onChange={(e) => handleFoodMenuChange(e, index)}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
              {index > 0 && (
                <button
                  type="button"
                  onClick={() => handleRemoveFoodMenuItem(index)}
                  className="text-red-500 ml-2"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddFoodMenuItem}
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            Add Food Item
          </button>

          {/* Events in Program inputs */}
          {event.eventsInProgram.map((item, index) => (
            <div key={index} className="form-group mb-4">
              <label
                htmlFor={`eventName${index}`}
                className="block text-sm font-medium text-gray-700"
              >
                Event Name:
              </label>
              <input
                type="text"
                id={`eventName${index}`}
                name="eventName"
                value={item.eventName}
                onChange={(e) => handleEventsInProgramChange(e, index)}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
              {index > 0 && (
                <button
                  type="button"
                  onClick={() => handleRemoveEventInProgram(index)}
                  className="text-red-500 ml-2"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddEventInProgram}
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            Add Event
          </button>

          <div className="form-group mb-4">
            <label
              htmlFor="ticketPrice"
              className="block text-sm font-medium text-gray-700"
            >
              Ticket Price:
            </label>
            <input
              type="number"
              id="ticketPrice"
              name="ticketPrice"
              value={event.ticketPrice}
              onChange={(e) =>
                setEvent({ ...event, ticketPrice: e.target.value })
              }
              required
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
              type="number"
              id="paymentPerStudent"
              name="paymentPerStudent"
              value={event.paymentPerStudent}
              onChange={(e) =>
                setEvent({ ...event, paymentPerStudent: e.target.value })
              }
              required
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
              type="number"
              id="numberOfTicket"
              name="numberOfTicket"
              value={event.numberOfTicket}
              onChange={(e) =>
                setEvent({ ...event, numberOfTicket: e.target.value })
              }
              required
              className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            Create Program
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default ModalCreateProgram;
