import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { FaTimesCircle } from "react-icons/fa";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { TokenRequest } from "../../RequestMethod/Request";

const ModalCreateManagerDormitory = ({ isOpen, closeModal, dormId }) => {
  const [userIDInput, setUserIDInput] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [managersData, setManagersData] = useState([]);
  const rolesArray = [
    { id: 4, roleName: "Economics Leader" },
    { id: 5, roleName: "Sports Leader" },
    { id: 6, roleName: "Technical Leader" },
    { id: 7, roleName: "Cultural Leader" },
    { id: 8, roleName: "Communication Leader" },
    { id: 9, roleName: "Leader" },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await TokenRequest.put(
        `/dorms/v2/update/${dormId}/managers`,
        { userId: userIDInput.trim(), role: selectedRole }
      );

      if (response.status === 200) {
        window.alert("Managers updated successfully.");
        setUserIDInput("");
        setSelectedRole("");
      }
    } catch (error) {
      window.alert(error.response.data.error);
    }
  };
  const handleRemoveManager = async (managerId, role) => {
    try {
      const response = await TokenRequest.put(
        `/dorms/v2/remove/${dormId}/manager`,
        { userId: managerId, role }
      );
      if (response.status === 200) {
        window.alert("Manager removed successfully.");
      }
    } catch (error) {
      console.error("Error removing manager:", error);
    }
  };
  useEffect(() => {
    const fetchDormitoryData = async () => {
      try {
        const dormitoryRef = doc(db, "dormitories", dormId);
        const unsubscribe = onSnapshot(dormitoryRef, async (dormitorySnap) => {
          if (dormitorySnap.exists()) {
            const dormitoryData = dormitorySnap.data();
            const managers = dormitoryData.managers;

            const managersDataPromises = managers.map(async (manager) => {
              const { userId, role } = manager;
              const managerRef = doc(db, "users", userId);
              const managerSnap = await getDoc(managerRef);
              if (managerSnap.exists()) {
                const managerData = managerSnap.data();
                delete managerData.password;
                delete managerData.expo_push_token;

                const sanitizedManagerData = {
                  id: managerSnap.id,
                  avatar: managerData.avatar,
                  firstName: managerData.firstName,
                  lastName: managerData.lastName,
                  role: role,
                };
                return sanitizedManagerData;
              } else {
                console.log(`User with reference ${managerRef} does not exist`);
                return null;
              }
            });
            const fetchedManagersData = await Promise.all(managersDataPromises);
            setManagersData(fetchedManagersData.filter(Boolean));
          } else {
            console.log("Dormitory document does not exist");
          }
        });

        return () => unsubscribe();
      } catch (error) {
        console.error("Error fetching dormitory document:", error);
      }
    };

    fetchDormitoryData();
  }, [dormId]);

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
        <h2 className="text-xl font-bold">Add Manager to Dormitory</h2>
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
              htmlFor="userID"
              className="block text-sm font-medium text-gray-700"
            >
              Enter User ID:
            </label>
            <input
              type="text"
              id="userID"
              name="userID"
              value={userIDInput}
              onChange={(e) => setUserIDInput(e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="form-group mb-4">
            <label
              htmlFor="role"
              className="block text-sm font-medium text-gray-700"
            >
              Select Role:
            </label>
            <select
              id="role"
              name="role"
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select Role</option>
              {rolesArray.map((role) => (
                <option key={role.id} value={role.roleName}>
                  {role.roleName}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            Add Manager
          </button>
        </form>
        <div className="mt-4">
          <h2 className="text-xl font-bold mb-4 pl-1">Current Managers:</h2>
          <ul>
            {managersData.map((manager, index) => (
              <li key={index}>
                <div className="flex items-center justify-between px-10">
                  <div className="flex items-center mb-4">
                    <img
                      src={manager.avatar}
                      alt={`Avatar of ${manager.firstName} ${manager.lastName}`}
                      className="w-8 h-8 rounded-full mr-2"
                    />
                    <div>
                      <span className="font-bold">
                        {manager.firstName} - {manager.lastName}
                      </span>
                      <span className="text-gray-500 text-sm ml-1">
                        ({manager.role})
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() =>
                      handleRemoveManager(manager.id, manager.role)
                    } // Pass both managerId and role
                    className="text-red-500 hover:text-red-700 ml-2 px-2 py-2 bg-gray-200 hover:bg-gray-300 rounded-md"
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Modal>
  );
};

export default ModalCreateManagerDormitory;
