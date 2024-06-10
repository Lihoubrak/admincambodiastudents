import React, { useEffect, useState } from "react";
import Select from "react-select";
import { CircularProgress, IconButton } from "@mui/material";
import { MdEdit, MdInfo, MdOutlineReportGmailerrorred } from "react-icons/md";
import { MdBedroomChild } from "react-icons/md";
import { useParams } from "react-router-dom";
import {
  ModalCreateStudentToRoom,
  ModalDetailStudent,
  ModalEditStudent,
  ModalReport,
} from "../../components";
import { TokenRequest, publicRequest } from "../../RequestMethod/Request";
import { DataGrid } from "@mui/x-data-grid";
import { FaEdit, FaInfoCircle, FaPlus } from "react-icons/fa";
const DetailRoom = () => {
  const [selectedYear, setSelectedYear] = useState();
  const [editingRow, setEditingRow] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddStudent, setIsAddStudent] = useState(false);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [studentsInRoom, setStudentsInRoom] = useState([]);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(null);
  const { roomId } = useParams();
  const currentYear = new Date().getFullYear();
  const previousYears = Array.from(
    { length: 11 },
    (_, index) => currentYear - index
  );
  const handleYearChange = (selectedOption) => {
    setSelectedYear(selectedOption.value);
  };
  const handleEdit = (id) => {
    setEditingRow(id);
    setIsModalOpen(true);
  };
  const handleDetail = (id) => {
    setEditingRow(id);
    setDetailModalOpen(true);
  };
  const openReportModal = async () => {
    setIsReportModalOpen(true);
  };
  // Function to close the report modal
  const closeReportModal = () => {
    setIsReportModalOpen(false);
  };
  const columns = [
    { field: "id", headerName: "ID", width: 120, editable: true },
    { field: "firstName", headerName: "First Name", editable: true },
    { field: "lastName", headerName: "Last Name", editable: true },
    {
      field: "avatar",
      headerName: "Avatar",
      editable: true,
      renderCell: (params) => (
        <img
          src={params.value}
          alt="Avatar"
          style={{ width: 50, borderRadius: "50%" }}
        />
      ),
    },
    { field: "birthday", headerName: "Birthday", width: 100, editable: true },
    { field: "nationality", headerName: "Nationality", editable: true },
    { field: "gender", headerName: "Gender", width: 100 },
    { field: "email", headerName: "Email", editable: true },
    {
      field: "phoneNumber",
      headerName: "Phone Number",
      width: 150,
      editable: true,
    },
    { field: "facebook", headerName: "Facebook", width: 150, editable: true },
    { field: "zalo", headerName: "Zalo", width: 150, editable: true },
    { field: "room", headerName: "Room", width: 150, editable: true },
    { field: "degree", headerName: "Degree", width: 150, editable: true },
    { field: "year", headerName: "YearStudy", width: 150, editable: true },
    { field: "dormitory", headerName: "Dormitory", width: 150, editable: true },
    {
      field: "leftRoomYear",
      headerName: "Left Room Year",
      width: 150,
      renderCell: ({ row }) => {
        const [leftRoomYear, setLeftRoomYear] = useState(
          row.leftRoomYear || currentYear
        );

        const handleChange = async (event) => {
          const newLeftRoomYear = event.target.value;
          // Check if "Set Left Room" option is selected
          if (newLeftRoomYear === "") {
            try {
              // Send API request to update leftRoomYear to null
              await TokenRequest.put(`/rooms/v3/updateLeftRoomYear/${row.id}`, {
                newLeftRoomYear: null,
              });
              // Update local state
              setLeftRoomYear(null);
            } catch (error) {
              console.error("Error updating LeftRoomYear:", error);
            }
          } else {
            // If a specific year is selected, update local state
            setLeftRoomYear(newLeftRoomYear);
            // Send API request to update leftRoomYear
            try {
              await TokenRequest.put(`/rooms/v3/updateLeftRoomYear/${row.id}`, {
                newLeftRoomYear,
              });
            } catch (error) {
              console.error("Error updating LeftRoomYear:", error);
            }
          }
        };

        // Render the select element with conditional options
        return (
          <div className="flex items-center">
            <p className="mr-2 text-yellow-600 font-bold">Set</p>
            <select
              value={leftRoomYear || ""}
              onChange={handleChange}
              className="p-1 border rounded-md bg-gray-100 focus:outline-none focus:ring focus:border-blue-300"
            >
              {previousYears.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        );
      },
    },
    {
      field: "graduated",
      headerName: "Graduated",
      width: 150,
      renderCell: ({ row }) => {
        return (
          <span
            className={`text-sm font-medium ${
              row.graduated ? "text-green-600" : "text-red-600"
            }`}
          >
            {row.graduated ? "Graduated" : "Not Graduated"}
          </span>
        );
      },
    },

    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: ({ row }) => (
        <div>
          <button
            onClick={() => handleEdit(row.id)}
            className="p-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 mr-2"
          >
            <FaEdit />
          </button>
          <button
            onClick={() => handleDetail(row.id)}
            className="p-1 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            <FaInfoCircle />
          </button>
        </div>
      ),
    },
  ];

  const yearOptions = [
    {
      value: new Date().getFullYear().toString(),
      label: new Date().getFullYear().toString(),
    },
    { value: "2023", label: "2023" },
  ];

  const fetchStudentsInRoom = async () => {
    setLoading(true);
    try {
      const res = await publicRequest.get(
        `/rooms/v3/detail/${roomId}?year=${
          selectedYear ? selectedYear : new Date().getFullYear().toString()
        }`
      );
      setStudentsInRoom(res.data);
      setLoading(false);
      setError(null);
    } catch (error) {
      setStudentsInRoom([]);
      setError(error.response.data.error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudentsInRoom();
  }, [roomId, selectedYear]);
  const formattedData = studentsInRoom.map((item, index) => ({
    id: item.id,
    avatar: item.avatar,
    firstName: item.firstName,
    lastName: item.lastName,
    gender: item.gender,
    birthday: item.birthday,
    nationality: item.nationality,
    email: item.email,
    phoneNumber: item.phoneNumber,
    facebook: item.facebook,
    zalo: item.zalo,
    degree: item.degree,
    year: item.year,
    room: item.Room ? item.Room.roomNumber : "",
    dormitory: item.Room ? item.Room.Dormitory.dormName : "",
    leftRoomYear: item.leftRoomYear,
    graduated: item.graduated,
  }));
  return (
    <div>
      <div className="flex justify-center items-center">
        <h1 className="text-4xl gap-3 flex items-center font-bold mb-8 text-center text-blue-600">
          <MdBedroomChild size={70} />
          <span>ROOM {formattedData[0]?.room}</span>
        </h1>
      </div>
      <div className="flex items-center gap-4 mb-4">
        <Select
          value={yearOptions.find((option) => option.value === selectedYear)}
          onChange={handleYearChange}
          options={yearOptions}
          defaultValue={yearOptions[0]}
          placeholder="Select Year"
          className="w-40"
        />
        <button
          onClick={() => setIsAddStudent(true)}
          className={`cursor-pointer p-2 rounded-md overflow-hidden shadow-md border border-blue-600 flex items-center justify-center bg-blue-600 hover:bg-blue-700 transition duration-300`}
        >
          <FaPlus className="text-white text-2xl" />
        </button>
        <button
          onClick={openReportModal}
          className={`cursor-pointer p-2 rounded-md overflow-hidden shadow-md border border-red-600 flex items-center justify-center bg-red-600 hover:bg-red-700 transition duration-300`}
        >
          <MdOutlineReportGmailerrorred className="text-white text-2xl" />
        </button>
      </div>
      <div style={{ height: 300, width: "100%", overflow: "auto" }}>
        <DataGrid
          editMode="cell"
          rows={formattedData}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10, 20]}
          disableSelectionOnClick
          loading={loading}
          localeText={{ noRowsLabel: error }}
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
      <ModalEditStudent
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        studentId={editingRow}
        fetchStudentsInRoom={fetchStudentsInRoom}
      />

      <ModalDetailStudent
        detailModalOpen={detailModalOpen}
        setDetailModalOpen={setDetailModalOpen}
        studentId={editingRow}
      />

      <ModalCreateStudentToRoom
        setIsAddStudent={setIsAddStudent}
        isAddStudent={isAddStudent}
        roomId={roomId}
        fetchStudentsInRoom={fetchStudentsInRoom}
      />
      <ModalReport
        isOpen={isReportModalOpen}
        closeModal={closeReportModal}
        roomId={roomId}
      />
    </div>
  );
};

export default DetailRoom;
