import React, { useState } from "react";
import Modal from "react-modal";

const ModalCreateProgram = ({ isOpen, closeModal }) => {
  const [programName, setProgramName] = useState("");
  const [programDate, setProgramDate] = useState("");
  const [programLocation, setProgramLocation] = useState("");
  const [programDescription, setProgramDescription] = useState("");
  const [programImage, setProgramImage] = useState(null);

  const handleProgramNameChange = (e) => {
    setProgramName(e.target.value);
  };

  const handleProgramDateChange = (e) => {
    setProgramDate(e.target.value);
  };

  const handleProgramLocationChange = (e) => {
    setProgramLocation(e.target.value);
  };

  const handleProgramDescriptionChange = (e) => {
    setProgramDescription(e.target.value);
  };

  const handleProgramImageChange = (e) => {
    setProgramImage(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can perform any actions with the program information,
    // such as submitting it to a server or storing it locally
    const programData = {
      name: programName,
      date: programDate,
      location: programLocation,
      description: programDescription,
      image: programImage,
    };
    console.log("Program Data:", programData);
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
        <h2 className="text-xl font-bold">Create New Program</h2>{" "}
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
              htmlFor="programName"
              className="block text-sm font-medium text-gray-700"
            >
              Program Name:
            </label>
            <input
              type="text"
              id="programName"
              value={programName}
              onChange={handleProgramNameChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="form-group mb-4">
            <label
              htmlFor="programDate"
              className="block text-sm font-medium text-gray-700"
            >
              Program Date:
            </label>
            <input
              type="date"
              id="programDate"
              value={programDate}
              onChange={handleProgramDateChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="form-group mb-4">
            <label
              htmlFor="programLocation"
              className="block text-sm font-medium text-gray-700"
            >
              Program Location:
            </label>
            <input
              type="text"
              id="programLocation"
              value={programLocation}
              onChange={handleProgramLocationChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="form-group mb-4">
            <label
              htmlFor="programDescription"
              className="block text-sm font-medium text-gray-700"
            >
              Program Description:
            </label>
            <textarea
              id="programDescription"
              value={programDescription}
              onChange={handleProgramDescriptionChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            ></textarea>
          </div>
          <div className="form-group mb-4">
            <label
              htmlFor="programImage"
              className="block text-sm font-medium text-gray-700"
            >
              Program Image:
            </label>
            <input
              type="file"
              id="programImage"
              onChange={handleProgramImageChange}
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
