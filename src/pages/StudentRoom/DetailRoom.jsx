import React, { useEffect, useState } from "react";
import Select from "react-select";
import { CircularProgress, IconButton } from "@mui/material";
import { MdEdit, MdInfo } from "react-icons/md";
import { MdBedroomChild } from "react-icons/md";
import { useParams } from "react-router-dom";
import {
  ModalCreateStudentToRoom,
  ModalDetailStudent,
  ModalEditStudent,
} from "../../components";
import { publicRequest } from "../../RequestMethod/Request";
import { DataGrid } from "@mui/x-data-grid";
import { FaEdit, FaInfoCircle, FaPlus } from "react-icons/fa";
const DetailRoom = () => {
  const [selectedYear, setSelectedYear] = useState();
  const [editingRow, setEditingRow] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddStudent, setIsAddStudent] = useState(false);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [studentsInRoom, setStudentsInRoom] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { roomId } = useParams();
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

  const columns = [
    { field: "id", headerName: "ID", width: 120, editable: true },
    { field: "firstName", headerName: "First Name", editable: true },
    { field: "lastName", headerName: "Last Name", editable: true },
    { field: "age", headerName: "Age", width: 100 },
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
    { field: "dormitory", headerName: "Dormitory", width: 150, editable: true },
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
    age: item.age,
    nationality: item.nationality,
    email: item.email,
    phoneNumber: item.phoneNumber,
    facebook: item.facebook,
    zalo: item.zalo,
    room: item.Room ? item.Room.roomNumber : "",
    dormitory: item.Room ? item.Room.Dormitory.dormName : "",
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
        <div
          onClick={() => setIsAddStudent(true)}
          className={`cursor-pointer p-2 rounded-md overflow-hidden shadow-md border border-blue-600 flex items-center justify-center bg-blue-600 hover:bg-blue-700 transition duration-300`}
        >
          <FaPlus className="text-white text-2xl" />
        </div>
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
    </div>
  );
};

export default DetailRoom;
