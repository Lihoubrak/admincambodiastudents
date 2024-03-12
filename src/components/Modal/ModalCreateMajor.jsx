import React, { useState } from "react";
import Modal from "react-modal";
import { publicRequest } from "../../RequestMethod/Request";
import { FaTimesCircle } from "react-icons/fa";

const ModalCreateMajor = ({ isOpen, closeModal, schoolId, fetchMajor }) => {
  const [majorInfo, setMajorInfo] = useState({
    name: "",
    desc: "",
    dateForStudying: "",
    image: null,
    schoolId,
  });

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setMajorInfo((prevInfo) => ({
        ...prevInfo,
        image: e.target.files[0],
      }));
    } else {
      const { name, value } = e.target;
      setMajorInfo((prevInfo) => ({
        ...prevInfo,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("majorName", majorInfo.name);
    formData.append("majorDescription", majorInfo.desc);
    formData.append("majorImage", majorInfo.image);
    formData.append("dateForStudying", majorInfo.dateForStudying);
    formData.append("schoolId", majorInfo.schoolId);

    try {
      const res = await publicRequest.post("/majors/v5/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setMajorInfo({
        name: "",
        desc: "",
        dateForStudying: "",
        image: null,
        schoolId,
      });
      closeModal();
      fetchMajor();
    } catch (error) {
      console.error("Error occurred:", error);
    }
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
        <h2 className="text-xl font-bold">Create New Major</h2>
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
              Major Name:
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
              htmlFor="desc"
              className="block text-sm font-medium text-gray-700"
            >
              Description:
            </label>
            <input
              type="text"
              id="desc"
              name="desc"
              value={majorInfo.desc}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="form-group mb-4">
            <label
              htmlFor="dateForStudying"
              className="block text-sm font-medium text-gray-700"
            >
              DateForStudying:
            </label>
            <input
              type="text"
              id="dateForStudying"
              name="dateForStudying"
              value={majorInfo.dateForStudying}
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
            Create Major
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default ModalCreateMajor;
