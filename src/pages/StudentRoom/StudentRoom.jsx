import React, { useState } from "react";
import { FaPlus, FaCheck, FaDownload } from "react-icons/fa";
import { LiaBedSolid } from "react-icons/lia";
import { Link } from "react-router-dom";
import { GrRadialSelected } from "react-icons/gr";
import { ModalCreateRoom } from "../../components";
import { MdBedroomChild } from "react-icons/md";

const StudentRoom = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRooms, setSelectedRooms] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleRoomSelect = (roomId) => {
    setSelectedRooms((prevSelectedRooms) => {
      if (prevSelectedRooms.includes(roomId)) {
        // Deselect the room if it's already selected
        return prevSelectedRooms.filter((id) => id !== roomId);
      } else {
        // Select the room if it's not selected
        return [...prevSelectedRooms, roomId];
      }
    });
  };

  const handleSelectAllRooms = () => {
    if (selectedRooms.length === filteredRooms.length) {
      // If all rooms are selected, deselect all
      setSelectedRooms([]);
    } else {
      // Otherwise, select all rooms
      const allRoomIds = filteredRooms.map((room) => room.id);
      setSelectedRooms(allRoomIds);
    }
  };

  const exportRooms = () => {
    // Implement export logic (e.g., exporting to CSV or JSON)
    console.log("Exporting rooms:", selectedRooms);
    // You can add your export logic here
  };

  const filteredRooms = Array.from({ length: 20 }, (_, index) => ({
    id: index + 101,
    occupants: (index % 3) + 1,
  })).filter(
    (room) =>
      room.id.toString().includes(searchTerm) ||
      room.occupants.toString().includes(searchTerm)
  );

  return (
    <div>
      <div className="flex justify-center items-center">
        <h1 className="text-4xl gap-3 flex  items-center font-bold mb-8 text-center text-blue-600">
          <MdBedroomChild size={70} />
          <span>ROOM</span>
        </h1>
      </div>
      <div className="flex items-center mb-4 gap-4">
        <div className="">
          <input
            type="text"
            placeholder="Search by ID or Occupants"
            value={searchTerm}
            onChange={handleSearchChange}
            className="p-2 border border-gray-300 rounded-md outline-none"
          />
        </div>
        <div
          className={`cursor-pointer p-2 rounded-md overflow-hidden shadow-md border border-green-600 flex items-center justify-center bg-green-600 hover:bg-green-700 transition duration-300`}
          onClick={handleSelectAllRooms}
        >
          <FaCheck className="text-white text-2xl" />
        </div>
        <div
          onClick={openModal}
          className={`cursor-pointer p-2 rounded-md overflow-hidden shadow-md border border-blue-600 flex items-center justify-center bg-blue-600 hover:bg-blue-700 transition duration-300`}
        >
          <FaPlus className="text-white text-2xl" />
        </div>
        <div
          className={`cursor-pointer p-2 rounded-md overflow-hidden shadow-md border border-yellow-600 flex items-center justify-center bg-yellow-600 hover:bg-yellow-700 transition duration-300 ${
            selectedRooms.length === 0 ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={exportRooms}
          disabled={selectedRooms.length === 0}
        >
          <FaDownload className="text-white text-2xl" />
        </div>
      </div>
      <h2 className="text-2xl font-bold mb-4">List Of Rooms</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ">
        {filteredRooms.map((room, index) => (
          <div className="relative">
            <Link
              to={`/dormitory/room/${room.id}`}
              key={index}
              className={`bg-white p-4 cursor-pointer rounded-md shadow-md flex flex-col relative items-center space-y-2 ${
                room.occupants % 3 === 0
                  ? "bg-green-100"
                  : room.occupants % 3 === 1
                  ? "bg-yellow-100"
                  : "bg-red-100"
              }`}
            >
              <LiaBedSolid className="text-blue-600" />
              <span className="text-blue-600">Room {room.id}</span>
              <span
                className={`text-gray-500 ${
                  room.occupants % 3 === 0
                    ? "text-green-600"
                    : room.occupants % 3 === 1
                    ? "text-yellow-600"
                    : "text-red-600"
                }`}
              >
                Occupants: {room.occupants}
              </span>
            </Link>
            <button
              className={`absolute top-0 right-0 mt-2 mr-2 p-1 rounded-full hover:bg-blue-700 transition duration-300 ${
                selectedRooms.includes(room.id)
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-500"
              }`}
              onClick={(e) => {
                e.stopPropagation();
                handleRoomSelect(room.id);
              }}
            >
              {selectedRooms.includes(room.id) ? (
                <FaCheck className="text-white" />
              ) : (
                <GrRadialSelected className="text-gray-500" />
              )}
            </button>
          </div>
        ))}
      </div>
      <ModalCreateRoom isOpen={isModalOpen} closeModal={closeModal} />
    </div>
  );
};

export default StudentRoom;
