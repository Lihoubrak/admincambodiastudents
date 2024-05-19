import React, { useState } from "react";
import Modal from "react-modal";
import { TokenRequest } from "../../RequestMethod/Request";
import { FaTimesCircle } from "react-icons/fa";

const ModalCreateTeamPlayer = ({
  isModalCreateTeamPlayer,
  setIsModalCreateTeamPlayer,
  teamId,
}) => {
  const [playerInfo, setPlayerInfo] = useState({
    userId: "",
    playerPosition: "",
    playerDescription: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPlayerInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const jsonData = {
      userId: playerInfo.userId,
      playerPosition: playerInfo.playerPosition,
      playerDescription: playerInfo.playerDescription,
      teamSportId: teamId,
    };

    try {
      const res = await TokenRequest.post(
        "/sportplayers/v20/create",
        jsonData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setPlayerInfo({
        userId: "",
        playerPosition: "",
        playerDescription: "",
      });
      setIsModalCreateTeamPlayer(false);
    } catch (error) {
      console.error("Error occurred:", error);
      window.alert(error.response.data.error);
    }
  };

  return (
    <Modal
      ariaHideApp={false}
      isOpen={isModalCreateTeamPlayer}
      onRequestClose={() => setIsModalCreateTeamPlayer(true)}
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
        <h2 className="text-xl font-bold">Create New Team Player</h2>

        <button
          onClick={() => setIsModalCreateTeamPlayer(false)} // Ensure closeModal is called on click
          className="text-blue-500 hover:text-blue-700"
        >
          <FaTimesCircle className="mr-1" size={20} color="red" />
        </button>
      </div>
      <div className="modal-content">
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-4">
            <label
              htmlFor="userId"
              className="block text-sm font-medium text-gray-700"
            >
              Player Id:
            </label>
            <input
              type="text"
              id="userId"
              name="userId"
              value={playerInfo.userId}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="form-group mb-4">
            <label
              htmlFor="playerPosition"
              className="block text-sm font-medium text-gray-700"
            >
              Position:
            </label>
            <input
              type="text"
              id="playerPosition"
              name="playerPosition"
              value={playerInfo.playerPosition}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="form-group mb-4">
            <label
              htmlFor="playerDescription"
              className="block text-sm font-medium text-gray-700"
            >
              Description:
            </label>
            <input
              type="text"
              id="playerDescription"
              name="playerDescription"
              value={playerInfo.playerDescription}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            Create Player
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default ModalCreateTeamPlayer;
