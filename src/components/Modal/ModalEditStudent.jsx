import React, { useState } from "react";
import Modal from "react-modal";
import { FaTimesCircle } from "react-icons/fa";

const ModalEditStudent = ({ isModalOpen, setIsModalOpen }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);

  // Dummy student data
  const students = [
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Smith" },
    { id: 3, name: "Alice Johnson" },
    { id: 4, name: "Bob Brown" },
    { id: 5, name: "Emily Davis" },
    { id: 6, name: "Michael Wilson" },
    { id: 7, name: "Sophia Martinez" },
    { id: 8, name: "William Taylor" },
    { id: 9, name: "Olivia Anderson" },
    { id: 10, name: "Daniel Thomas" },
  ];

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSelectClick = (student) => {
    console.log("Select student:", student);
  };

  const handleSelectChange = (event, student) => {
    setSelectedStudent(student);
    console.log("Selected student:", student);
  };

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Modal
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
                <span>{student.name}</span>
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
