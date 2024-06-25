import React, { useState, useEffect, useCallback } from "react";
import Modal from "react-modal";
import { FaTimesCircle } from "react-icons/fa";
import { TokenRequest, publicRequest } from "../../RequestMethod/Request";
import debounce from "debounce";

const ModalCreateStudentToMajor = ({
  setIsAddStudent,
  isAddStudent,
  majorId,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // State for loading indicator

  const fetchAllStudents = useCallback(
    debounce(async (query) => {
      setIsLoading(true); // Set loading state to true when fetching starts
      try {
        const res = await TokenRequest.get(
          `/users/v1/all?limit=10&searchQuery=${query}`
        );
        if (res.data && res.data.students) {
          setStudents(res.data.students);
        } else {
          console.error("Unexpected response format:", res.data);
        }
      } catch (error) {
        console.error("Error fetching students:", error);
      } finally {
        setIsLoading(false); // Set loading state to false when fetching completes
      }
    }, 500), // Adjust the debounce delay as needed
    []
  );

  useEffect(() => {
    fetchAllStudents(searchQuery);
  }, [searchQuery, fetchAllStudents]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSelectClick = async (student) => {
    try {
      await publicRequest.put(`/majors/v5/addmajor`, {
        majorId: majorId,
        userId: student.id,
      });
      setIsAddStudent(false);
    } catch (error) {
      setIsAddStudent(false);
    }
  };

  return (
    <Modal
      ariaHideApp={false}
      isOpen={isAddStudent}
      onRequestClose={() => setIsAddStudent(false)}
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
          <h2 className="text-xl font-bold">Add Student</h2>
          <button
            onClick={() => setIsAddStudent(false)}
            className="flex items-center"
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

        {/* Loading indicator */}
        {isLoading && <p className="text-center text-gray-500">Loading...</p>}

        <ul className="divide-y divide-gray-200" style={{ overflowY: "auto" }}>
          {students.map((student) => (
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
                <p className="text-sm text-gray-500">
                  School: {student.Major?.School?.schoolName}
                </p>
                <p className="text-sm text-gray-500">
                  Major: {student.Major?.majorName}
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
                  Add
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Modal>
  );
};

export default ModalCreateStudentToMajor;
