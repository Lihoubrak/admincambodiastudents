import React, { useState, useEffect, useCallback } from "react";
import Select from "react-select";
import {
  FaUniversity,
  FaDownload,
  FaEdit,
  FaInfoCircle,
  FaPlus,
} from "react-icons/fa";
import { TokenRequest } from "../../RequestMethod/Request";
import { useParams } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import * as XLSX from "xlsx";
import { ModalUpdateRole } from "../../components";
import { db } from "../../firebase/firebase";
import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { MdOutlineAdminPanelSettings } from "react-icons/md";

const ManagerUser = () => {
  const [selectedRole, setSelectedRole] = useState("");
  const [listStudent, setListStudent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [roleOptions, setRoleOptions] = useState([]);
  const { universityId } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userId, setUserId] = useState(null);

  const openModal = (userId) => {
    setUserId(userId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleRoleChange = (selectedOption) => {
    setSelectedRole(selectedOption.value);
  };

  const formattedData = listStudent.map((item, index) => ({
    id: item.id,
    avatar: item.avatar,
    studentname: item.firstName + item.lastName,
    username: item.username,
    gender: item.gender,
    birthday: item.birthday,
    nationality: item.nationality,
    role: item.Role?.roleName,
    status: item.status,
  }));
  const exportFile = useCallback(() => {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(formattedData);
    XLSX.utils.book_append_sheet(wb, ws, "Data");
    XLSX.writeFile(wb, "ListStudent.xlsx");
  }, [formattedData]);

  const columns = [
    { field: "id", headerName: "ID", width: 100, editable: true },
    { field: "username", headerName: "Username", editable: true },
    { field: "studentname", headerName: "Student Name", editable: true },

    {
      field: "avatar",
      headerName: "Avatar",
      width: 100,
      renderCell: (params) => (
        <img
          src={params.value}
          alt="avatar"
          style={{ width: 50, borderRadius: "50%" }}
        />
      ),
    },
    { field: "birthday", headerName: "Birthday", width: 100, editable: true },
    { field: "nationality", headerName: "Nationality", editable: true },
    { field: "gender", headerName: "Gender", width: 100 },
    {
      field: "role",
      headerName: "Role",
      width: 100,
      renderCell: (params) => {
        return (
          <div className="bg-red-700 text-white rounded-lg shadow-md p-2">
            {params.value}
          </div>
        );
      },
    },
    {
      field: "status",
      headerName: "Status",
      width: 120,
      renderCell: (params) => {
        const { value: status, row } = params;
        const userId = row.id;

        const handleChange = async (event) => {
          const newStatus = event.target.value === "active" ? true : false;
          try {
            await TokenRequest.put(`users/v1/update/status/${userId}`, {
              status: newStatus,
            });
            // Optionally, you can update the local state to reflect the change immediately
            const updatedList = listStudent.map((student) => {
              if (student.id === userId) {
                return {
                  ...student,
                  status: newStatus,
                };
              }
              return student;
            });
            setListStudent(updatedList);
          } catch (error) {
            console.error("Error updating status:", error);
            // Handle error if necessary
          }
        };

        return (
          <select
            value={status ? "active" : "inactive"}
            onChange={handleChange}
            className={`p-2 rounded-lg border border-gray-300 outline-none bg-${
              status ? "green-500" : "red-500"
            } text-white cursor-pointer`}
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        );
      },
    },

    {
      field: "actions",
      headerName: "Actions",
      width: 100,
      renderCell: ({ row }) => (
        <div>
          <button
            onClick={() => openModal(row.id)}
            className="p-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 mr-2"
          >
            <FaEdit />
          </button>
        </div>
      ),
    },
  ];
  const fetchRoles = async () => {
    try {
      const res = await TokenRequest.get("/users/v1/all/role");
      const options = res.data.map((role) => ({
        value: role.id,
        label: role.roleName,
      }));
      setRoleOptions(options);
      if (options.length > 0) {
        setSelectedRole(options[0].value);
      }
    } catch (error) {
      console.error("Error fetching roles:", error);
    }
  };
  const fetchStudents = async () => {
    try {
      const roleRef = doc(db, "roles", selectedRole);
      const roleDoc = await getDoc(roleRef);
      const roleData = roleDoc.data();

      const q = query(
        collection(db, "users"),
        where("RoleId", "==", selectedRole)
      );
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const students = [];
        snapshot.forEach((doc) => {
          const userData = doc.data();
          delete userData.password;
          delete userData.expo_push_token;
          const studentWithRole = {
            id: doc.id,
            ...userData,
            Role: roleData,
          };
          students.push(studentWithRole);
        });
        setListStudent(students);
        setLoading(false);
      });
      // Cleanup function to unsubscribe from snapshot listener
      return () => unsubscribe();
    } catch (error) {
      console.error("Error fetching students:", error);
      setListStudent([]);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  useEffect(() => {
    if (selectedRole !== "") {
      fetchStudents();
    }
  }, [universityId, selectedRole]);
  return (
    <div>
      <div className="flex justify-center items-center">
        <h1 className="text-4xl gap-3 flex items-center font-bold mb-8 text-center text-blue-600">
          <MdOutlineAdminPanelSettings size={70} />
          <span>MANAGER USER</span>
        </h1>
      </div>
      <div className="flex items-center gap-4 mb-4">
        <Select
          value={roleOptions.find((option) => option.value === selectedRole)}
          onChange={handleRoleChange}
          options={roleOptions}
          placeholder="Select Role"
          className="w-40"
        />

        <button
          onClick={exportFile}
          className={`cursor-pointer p-2 rounded-md overflow-hidden shadow-md border border-yellow-600 flex items-center justify-center bg-yellow-600 ${
            listStudent.length > 0 && "hover:bg-yellow-700"
          } ${
            listStudent.length === 0 && "opacity-50 cursor-not-allowed"
          } transition duration-300`}
          disabled={listStudent.length === 0}
        >
          <FaDownload className="text-white text-2xl" />
        </button>
        <button
          className={`cursor-pointer p-2 rounded-md overflow-hidden shadow-md border border-blue-600 flex items-center justify-center bg-blue-600 hover:bg-blue-700 transition duration-300`}
        >
          <FaPlus className="text-white text-2xl" />
        </button>
      </div>
      <div style={{ height: 350, width: "100%", overflow: "auto" }}>
        <DataGrid
          editMode="cell"
          rows={formattedData}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10, 20]}
          disableSelectionOnClick
          loading={loading}
          // localeText={{ noRowsLabel: error }}

          sx={{
            "& .MuiDataGrid-cell, & .MuiDataGrid-columnHeaderTitleContainer": {
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            },
            "& .MuiDataGrid-cell": {
              paddingLeft: "30px",
            },
          }}
        />
      </div>
      <ModalUpdateRole
        isOpen={isModalOpen}
        closeModal={closeModal}
        userId={userId}
      />
    </div>
  );
};

export default ManagerUser;
