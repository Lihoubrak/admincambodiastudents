import React, { useState } from "react";
import { FaTimesCircle } from "react-icons/fa";
import Modal from "react-modal";
import { TokenRequest } from "../../RequestMethod/Request";

const ModalCreateSport = ({ isOpen, closeModal, createSportEvent }) => {
  const [sportName, setSportName] = useState("");
  const [sportDate, setSportDate] = useState("");
  const [sportLocation, setSportLocation] = useState("");
  const [sportDescription, setSportDescription] = useState("");
  const [top1, setTop1] = useState("");
  const [top2, setTop2] = useState("");
  const [top3, setTop3] = useState("");
  const [sportImage, setSportImage] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("sportName", sportName);
      formData.append("sportDate", sportDate);
      formData.append("sportLocation", sportLocation);
      formData.append("sportDescription", sportDescription);
      formData.append("top1", top1);
      formData.append("top2", top2);
      formData.append("top3", top3);
      formData.append("sportImage", sportImage);
      const response = await TokenRequest.post("/sports/v18/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Sport event created:", response.data);
      closeModal();
    } catch (error) {
      console.error("Error creating sport event:", error);
      // Handle error
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      ariaHideApp={false}
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
          <label htmlFor="sportName" className="block mb-2">
            Sport Name:
          </label>
          <input
            type="text"
            id="sportName"
            value={sportName}
            onChange={(e) => setSportName(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="sportDate" className="block mb-2">
            Sport Date:
          </label>
          <input
            type="date"
            id="sportDate"
            value={sportDate}
            onChange={(e) => setSportDate(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="sportLocation" className="block mb-2">
            Sport Location:
          </label>
          <input
            type="text"
            id="sportLocation"
            value={sportLocation}
            onChange={(e) => setSportLocation(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="sportDescription" className="block mb-2">
            Event Description:
          </label>
          <input
            type="text"
            id="sportDescription"
            name="sportDescription"
            value={sportDescription}
            onChange={(e) => setSportDescription(e.target.value)}
            required
            className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="top1" className="block mb-2">
            Team Top 1 Gift:
          </label>
          <input
            type="number"
            id="top1"
            name="top1"
            value={top1}
            onChange={(e) => setTop1(e.target.value)}
            required
            className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="top2" className="block mb-2">
            Team Top 2 Gift:
          </label>
          <input
            type="number"
            id="top2"
            name="top2"
            value={top2}
            onChange={(e) => setTop2(e.target.value)}
            required
            className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="top3" className="block mb-2">
            Team Top 3 Gift:
          </label>
          <input
            type="number"
            id="top3"
            name="top3"
            value={top3}
            onChange={(e) => setTop3(e.target.value)}
            required
            className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="sportImage" className="block mb-2">
            Sport Image:
          </label>
          <input
            type="file"
            id="sportImage"
            onChange={(e) => setSportImage(e.target.files[0])}
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
