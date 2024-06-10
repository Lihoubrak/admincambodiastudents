import React, { useEffect, useState } from "react";
import { FaPlus, FaCheck, FaDownload } from "react-icons/fa";
import { LiaBedSolid } from "react-icons/lia";
import { Link, useParams } from "react-router-dom";
import { GrRadialSelected } from "react-icons/gr";
import { ModalCreateRoom } from "../../components";
import { MdBedroomChild } from "react-icons/md";
import { publicRequest } from "../../RequestMethod/Request";
import { LoopCircleLoading } from "react-loadingg";

const StudentRoom = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRooms, setSelectedRooms] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rooms, setRooms] = useState([]);
  const { dormId } = useParams();
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
        return prevSelectedRooms.filter((id) => id !== roomId);
      } else {
        return [...prevSelectedRooms, roomId];
      }
    });
  };

  const handleSelectAllRooms = () => {
    if (selectedRooms.length === rooms.length) {
      setSelectedRooms([]);
    } else {
      const allRoomIds = rooms.map((room) => room.id);
      setSelectedRooms(allRoomIds);
    }
  };

  const exportRooms = () => {
    console.log("Exporting rooms:", selectedRooms);
    // Add your export logic here
  };

  const filteredRooms = rooms.filter((room) => {
    return (
      room.roomNumber.includes(searchTerm) ||
      room.numberOfStudents.toString().includes(searchTerm)
    );
  });
  const fetchAllRooms = async () => {
    try {
      const res = await publicRequest.get(`/rooms/v3/all/${dormId}`);
      setRooms(res.data);
    } catch (error) {
      console.error("Error fetching rooms:", error);
    }
  };
  useEffect(() => {
    fetchAllRooms();
  }, [dormId]);

  return (
    <div>
      <div>
        <div className="flex justify-center items-center">
          <h1 className="text-4xl gap-3 flex items-center font-bold mb-8 text-center text-blue-600">
            <MdBedroomChild size={70} />
            <span>ROOM</span>
          </h1>
        </div>
        <div className="flex items-center mb-4 gap-4">
          <div className="">
            <input
              type="text"
              placeholder="Search by Room"
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
          >
            <FaDownload className="text-white text-2xl" />
          </div>
        </div>
        <h2 className="text-2xl font-bold mb-4 text-blue-600">List Of Rooms</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredRooms
            .sort((a, b) =>
              a.roomNumber.localeCompare(b.roomNumber, undefined, {
                numeric: true,
              })
            )
            .map((room) => (
              <div className="relative" key={room.id}>
                <Link
                  to={`/dormitory/room/${room.id}`}
                  className={`bg-white p-4 cursor-pointer rounded-md shadow-md flex flex-col relative items-center space-y-2 ${
                    room.numberOfStudents === 0
                      ? "bg-green-100"
                      : room.numberOfStudents === 1
                      ? "bg-yellow-100"
                      : room.numberOfStudents === 3 ||
                        room.numberOfStudents === 4
                      ? "bg-red-100"
                      : room.numberOfStudents === 2
                      ? "bg-orange-100"
                      : "bg-blue-100"
                  }`}
                >
                  <LiaBedSolid className="text-blue-600" />
                  <span className="text-blue-600">Room {room.roomNumber}</span>
                  <span
                    className={`text-gray-500 ${
                      room.numberOfStudents === 0
                        ? "text-green-600"
                        : room.numberOfStudents === 1
                        ? "text-yellow-600"
                        : room.numberOfStudents === 3 ||
                          room.numberOfStudents === 4
                        ? "text-red-600"
                        : room.numberOfStudents === 2
                        ? "text-orange-600"
                        : "text-blue-600"
                    }`}
                  >
                    numberOfStudents: {room.numberOfStudents}
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
        <ModalCreateRoom
          isOpen={isModalOpen}
          closeModal={closeModal}
          dormId={dormId}
          fetchAllRooms={fetchAllRooms}
        />
      </div>
    </div>
  );
};

export default StudentRoom;
