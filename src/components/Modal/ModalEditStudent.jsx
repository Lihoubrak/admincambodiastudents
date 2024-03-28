import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { FaTimesCircle } from "react-icons/fa";
import { TokenRequest, publicRequest } from "../../RequestMethod/Request";

const ModalEditStudent = ({
  isModalOpen,
  setIsModalOpen,
  studentId,
  fetchStudentsInRoom,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [students, setStudents] = useState([]);
  useEffect(() => {
    const fetchAllStudents = async () => {
      try {
        const res = await TokenRequest.get("/users/v1/all");
        const filteredStudents = res.data.filter(
          (student) => student.id !== studentId
        );
        setStudents(filteredStudents);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };
    fetchAllStudents();
  }, [studentId]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSelectClick = async (student) => {
    try {
      const switchRoom = await publicRequest.put("/rooms/v3/switchrooms", {
        userAId: studentId,
        userBId: student.id,
      });
      fetchStudentsInRoom();
      setIsModalOpen(false);
    } catch (error) {
      setIsModalOpen(false);
    }
  };
  const filteredStudents = students.filter(
    (student) =>
      student.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.lastName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Modal
      ariaHideApp={false}
      isOpen={isModalOpen}
      onRequestClose={() => setIsModalOpen(false)}
      contentLabel="Edit Modal"
      style={{
        overlay: {
          zIndex: 1000,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        },
        content: {
          width: "700px",
          margin: "auto",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          background: "white",
          borderRadius: "8px",
          overflow: "auto",
          maxHeight: "80vh",
          padding: "20px",
        },
      }}
    >
      <div>
        <div className="modal-header flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Edit Student</h2>
          <button
            onClick={() => setIsModalOpen(false)}
            className=" flex items-center"
          >
            <FaTimesCircle className="mr-1" size={20} color="red" />
          </button>
        </div>
        <input
          type="text"
          placeholder="Search students..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="border border-gray-300 rounded px-3 py-2 mb-4 w-full outline-none"
        />

        <ul className="divide-y divide-gray-200" style={{ overflowY: "auto" }}>
          {filteredStudents.map((student) => (
            <li
              key={student.id}
              className="flex items-center justify-between py-2"
            >
              <div>
                <p className="font-semibold">
                  {student.firstName} {student.lastName}
                </p>
                <p className="text-sm text-gray-500">
                  Dorm: {student.Room?.Dormitory?.dormName}
                </p>
                <p className="text-sm text-gray-500">
                  Room: {student.Room?.roomNumber}
                </p>
                <p className="text-sm text-gray-500">Age: {student.age}</p>
                <p className="text-sm text-gray-500">
                  Nationality: {student.nationality}
                </p>
                <p className="text-sm text-gray-500">
                  Gender: {student.gender}
                </p>
                <p className="text-sm text-gray-500">Email: {student.email}</p>
                <p className="text-sm text-gray-500">
                  Phone Number: {student.phoneNumber}
                </p>
              </div>
              <div>
                <button
                  className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
                  onClick={() => handleSelectClick(student)}
                >
                  Select
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Modal>
  );
};

export default ModalEditStudent;
