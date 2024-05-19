import React, { useState } from "react";
import Modal from "react-modal";
import { FaTimesCircle } from "react-icons/fa";
import { TokenRequest } from "../../RequestMethod/Request";

const ModalCreateTeamSport = ({
  isModalCreateTeam,
  setIsModalCreateTeam,
  sportId,
}) => {
  const [teamInfo, setTeamInfo] = useState({
    teamName: "",
    representative: "",
    location: "",
    numberOfMember: "",
    phoneNumber: "",
    logo: null,
  });

  const handleChange = (e) => {
    if (e.target.name === "logo") {
      setTeamInfo((prevInfo) => ({
        ...prevInfo,
        logo: e.target.files[0],
      }));
    } else {
      const { name, value } = e.target;
      setTeamInfo((prevInfo) => ({
        ...prevInfo,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("teamName", teamInfo.teamName);
    formData.append("representative", teamInfo.representative);
    formData.append("location", teamInfo.location);
    formData.append("numberOfMember", teamInfo.numberOfMember);
    formData.append("phoneNumber", teamInfo.phoneNumber);
    formData.append("sportId", sportId);
    formData.append("logo", teamInfo.logo);
    try {
      const response = await TokenRequest.post(
        "/teamsports/v19/create",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setTeamInfo({
        teamName: "",
        representative: "",
        location: "",
        numberOfMember: "",
        phoneNumber: "",
        logo: null,
      });
      setIsModalCreateTeam(false);
    } catch (error) {
      console.error("Error occurred:", error);
    }
  };

  return (
    <Modal
      ariaHideApp={false}
      isOpen={isModalCreateTeam}
      onRequestClose={() => setIsModalCreateTeam(false)}
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
        <h2 className="text-xl font-bold">Create New Team</h2>

        <button
          onClick={() => setIsModalCreateTeam(false)}
          className="text-blue-500 hover:text-blue-700"
        >
          <FaTimesCircle className="mr-1" size={20} color="red" />
        </button>
      </div>
      <div className="modal-content">
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-4">
            <label
              htmlFor="teamName"
              className="block text-sm font-medium text-gray-700"
            >
              Team Name:
            </label>
            <input
              type="text"
              id="teamName"
              name="teamName"
              value={teamInfo.teamName}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Input fields for additional team information */}
          <div className="form-group mb-4">
            <label
              htmlFor="representative"
              className="block text-sm font-medium text-gray-700"
            >
              Representative:
            </label>
            <input
              type="text"
              id="representative"
              name="representative"
              value={teamInfo.representative}
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
              value={teamInfo.location}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="form-group mb-4">
            <label
              htmlFor="numberOfMember"
              className="block text-sm font-medium text-gray-700"
            >
              Number of Members:
            </label>
            <input
              type="number"
              id="numberOfMember"
              name="numberOfMember"
              value={teamInfo.numberOfMember}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="form-group mb-4">
            <label
              htmlFor="phoneNumber"
              className="block text-sm font-medium text-gray-700"
            >
              Phone Number:
            </label>
            <input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              value={teamInfo.phoneNumber}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="form-group mb-4">
            <label
              htmlFor="logo"
              className="block text-sm font-medium text-gray-700"
            >
              Logo:
            </label>
            <input
              type="file"
              id="logo"
              name="logo"
              accept="image/*"
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          {teamInfo.logo && (
            <div className="form-group mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Logo Preview:
              </label>
              <img
                src={URL.createObjectURL(teamInfo.logo)}
                alt="Logo Preview"
                className="mt-1 w-full"
              />
            </div>
          )}

          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            Create Team
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default ModalCreateTeamSport;
