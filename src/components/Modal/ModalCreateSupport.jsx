import React, { useState } from "react";
import Modal from "react-modal";
import { publicRequest } from "../../RequestMethod/Request";
import { FaTimesCircle } from "react-icons/fa";

const ModalCreateSupport = ({
  programId,
  isModalOpenCreateSupport,
  setIsModalOpenCreateSupport,
  fetchSupport,
}) => {
  const [supportEvent, setSupportEvent] = useState({
    supportName: "",
    supportSpecific: "",
    typePay: "",
    date: null,
    EventId: programId,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSupportEvent((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await publicRequest.post(`/supportevents/v14/create`, {
        supportName: supportEvent.supportName,
        supportSpecific: supportEvent.supportSpecific,
        date: supportEvent.date,
        typePay: supportEvent.typePay,
        eventId: supportEvent.EventId,
      });
    } catch (error) {}
    setSupportEvent({
      supportName: "",
      supportSpecific: "",
      typePay: "",
      EventId: programId,
    });
    fetchSupport();
    setIsModalOpenCreateSupport(false);
  };

  return (
    <Modal
      ariaHideApp={false}
      isOpen={isModalOpenCreateSupport}
      onRequestClose={() => setIsModalOpenCreateSupport(false)}
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
        <h2 className="text-xl font-bold">Create Support</h2>
        <button
          onClick={() => setIsModalOpenCreateSupport(false)}
          className="text-blue-500 hover:text-blue-700"
        >
          <FaTimesCircle className="mr-1" size={20} color="red" />
        </button>
      </div>
      <div className="modal-content">
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-4">
            <label
              htmlFor="supportName"
              className="block text-sm font-medium text-gray-700"
            >
              Support Name:
            </label>
            <input
              type="text"
              id="supportName"
              name="supportName"
              value={supportEvent.supportName}
              onChange={handleChange}
              required
              className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="form-group mb-4">
            <label
              htmlFor="supportSpecific"
              className="block text-sm font-medium text-gray-700"
            >
              Support Specific:
            </label>
            <input
              type="text"
              id="supportSpecific"
              name="supportSpecific"
              value={supportEvent.supportSpecific}
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
              value={supportEvent.date}
              onChange={handleChange}
              required
              className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="form-group mb-4">
            <label
              htmlFor="typePay"
              className="block text-sm font-medium text-gray-700"
            >
              typePay:
            </label>
            <input
              type="text"
              id="typePay"
              name="typePay"
              value={supportEvent.typePay}
              required
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            Create Support
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default ModalCreateSupport;
