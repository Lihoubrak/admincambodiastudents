import React, { useState } from "react";
import Modal from "react-modal";

const ModalCreateDormitory = ({ isOpen, closeModal }) => {
  const [dormInfo, setDormInfo] = useState({
    name: "",
    location: "",
    image: null,
  });

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setDormInfo((prevInfo) => ({
        ...prevInfo,
        image: e.target.files[0],
      }));
    } else {
      const { name, value } = e.target;
      setDormInfo((prevInfo) => ({
        ...prevInfo,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Dormitory info:", dormInfo);
    closeModal();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal} // Make sure closeModal is passed to onRequestClose
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
        <h2 className="text-xl font-bold">Create New Dormitory</h2>
        <button
          onClick={closeModal} // Ensure closeModal is called on click
          className="text-blue-500 hover:text-blue-700"
        >
          Close
        </button>
      </div>
      <div className="modal-content">
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={dormInfo.name}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="form-group mb-4">
            <label
              htmlFor="location"
              className="block text-sm font-medium text-gray-700"
            >
              Location:
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={dormInfo.location}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="form-group mb-4">
            <label
              htmlFor="image"
              className="block text-sm font-medium text-gray-700"
            >
              Image:
            </label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          {dormInfo.image && (
            <div className="form-group mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Preview:
              </label>
              <img
                src={URL.createObjectURL(dormInfo.image)}
                alt="Preview"
                className="mt-1 w-full"
              />
            </div>
          )}
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            Create Dormitory
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default ModalCreateDormitory;