import React, { useState } from "react";
import { FaTimesCircle } from "react-icons/fa";
import Modal from "react-modal";

const ModalEditPassport = ({ isOpen, closeModal }) => {
  const [majorInfo, setMajorInfo] = useState({
    name: "",
    dateOfBirth: "",
    sex: "",
    regular: "",
    code: "",
    nationality: "",
    placeOfBirth: "",
    placeOfIssue: "",
    dateOfExpiry: "",
    dateOfIssue: "",
    passportNumber: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setMajorInfo((prevInfo) => ({
      ...prevInfo,
      [name]: name === "image" ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Major info:", majorInfo);
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
        <h2 className="text-xl font-bold">Edit Passport</h2>
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
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Full Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={majorInfo.name}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="form-group mb-4">
            <label
              htmlFor="dateOfBirth"
              className="block text-sm font-medium text-gray-700"
            >
              Date of Birth:
            </label>
            <input
              type="text"
              id="dateOfBirth"
              name="dateOfBirth"
              value={majorInfo.dateOfBirth}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="form-group mb-4">
            <label
              htmlFor="sex"
              className="block text-sm font-medium text-gray-700"
            >
              Sex:
            </label>
            <input
              type="text"
              id="sex"
              name="sex"
              value={majorInfo.sex}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="form-group mb-4">
            <label
              htmlFor="regular"
              className="block text-sm font-medium text-gray-700"
            >
              Regular:
            </label>
            <input
              type="text"
              id="regular"
              name="regular"
              value={majorInfo.regular}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="form-group mb-4">
            <label
              htmlFor="code"
              className="block text-sm font-medium text-gray-700"
            >
              Code:
            </label>
            <input
              type="text"
              id="code"
              name="code"
              value={majorInfo.code}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="form-group mb-4">
            <label
              htmlFor="nationality"
              className="block text-sm font-medium text-gray-700"
            >
              Nationality:
            </label>
            <input
              type="text"
              id="nationality"
              name="nationality"
              value={majorInfo.nationality}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="form-group mb-4">
            <label
              htmlFor="placeOfBirth"
              className="block text-sm font-medium text-gray-700"
            >
              Place of Birth:
            </label>
            <input
              type="text"
              id="placeOfBirth"
              name="placeOfBirth"
              value={majorInfo.placeOfBirth}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="form-group mb-4">
            <label
              htmlFor="placeOfIssue"
              className="block text-sm font-medium text-gray-700"
            >
              Place of Issue:
            </label>
            <input
              type="text"
              id="placeOfIssue"
              name="placeOfIssue"
              value={majorInfo.placeOfIssue}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="form-group mb-4">
            <label
              htmlFor="dateOfExpiry"
              className="block text-sm font-medium text-gray-700"
            >
              Date of Expiry:
            </label>
            <input
              type="text"
              id="dateOfExpiry"
              name="dateOfExpiry"
              value={majorInfo.dateOfExpiry}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="form-group mb-4">
            <label
              htmlFor="dateOfIssue"
              className="block text-sm font-medium text-gray-700"
            >
              Date of Issue:
            </label>
            <input
              type="text"
              id="dateOfIssue"
              name="dateOfIssue"
              value={majorInfo.dateOfIssue}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="form-group mb-4">
            <label
              htmlFor="passportNumber"
              className="block text-sm font-medium text-gray-700"
            >
              Passport Number:
            </label>
            <input
              type="text"
              id="passportNumber"
              name="passportNumber"
              value={majorInfo.passportNumber}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="form-group mb-4">
            <label
              htmlFor="image"
              className="block text-sm font-medium text-gray-700"
            >
              Profile Image:
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
          {majorInfo.image && (
            <div className="form-group mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Preview:
              </label>
              <img
                src={URL.createObjectURL(majorInfo.image)}
                alt="Preview"
                className="mt-1 w-full"
              />
            </div>
          )}
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            Save Passport
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default ModalEditPassport;
