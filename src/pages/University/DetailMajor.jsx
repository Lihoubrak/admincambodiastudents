import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Select from "react-select";
import { Link, useNavigate, useParams } from "react-router-dom";
import { publicRequest } from "../../RequestMethod/Request";
import { FaInfoCircle, FaPlus, FaTrash } from "react-icons/fa";
import { ModalCreateStudentToMajor } from "../../components";
import { doc } from "firebase/firestore";
import { db } from "../../firebase/firebase";

const DetailMajor = () => {
  const [selectedYear, setSelectedYear] = useState(null);
  const [student, setStudent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAddStudent, setIsAddStudent] = useState(false);
  const { majorId } = useParams();
  const navigation = useNavigate();

  useEffect(() => {
    const fetchAllStudent = async () => {
      setLoading(true);
      try {
        const res = await publicRequest.get(
          `/majors/v5/detail/${majorId}?year=${
            selectedYear ? selectedYear : new Date().getFullYear().toString()
          }`
        );
        setStudent(res.data);
        setLoading(false);
      } catch (error) {
        setStudent([]);
        setError(error.response.data.error);
        setLoading(false);
      }
    };
    fetchAllStudent();
  }, [majorId, selectedYear]);

  const chartData = [
    { name: "2020", pv: 2400 },
    { name: "2021", pv: 1398 },
    { name: "2022", pv: 9800 },
    { name: "2023", pv: 3908 },
    { name: "2024", pv: 4800 },
  ];

  const handleYearChange = (selectedOption) => {
    setSelectedYear(selectedOption.value);
  };

  const yearOptions = [
    {
      value: new Date().getFullYear().toString(),
      label: new Date().getFullYear().toString(),
    },
    { value: 2023, label: "2023" },
    // Add more years as needed
  ];

  const handleDelete = async (id) => {
    try {
      await publicRequest.put(`/majors/v5/removemajor/${id}`);
      setStudent((prevStudents) => {
        return prevStudents.filter((student) => student.id !== id);
      });
      alert("Major removed from the student successfully.");
    } catch (error) {
      console.error("Error removing major from student:", error);
    }
  };

  const handleDetail = (id) => {
    navigation(`/university/student/${id}`);
  };

  const handleGraduatedChange = async (e, id) => {
    const newValue = e.target.value === "Yes" ? true : false;
    try {
      await publicRequest.put(`/majors/v5/updategraduated`, {
        studentId: id,
        graduated: newValue,
      });
      setStudent((prevStudent) =>
        prevStudent.map((student) =>
          student.id === id ? { ...student, graduated: newValue } : student
        )
      );
    } catch (error) {
      console.error("Error updating graduated status:", error);
    }
  };

  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    {
      field: "avatar",
      headerName: "Profile",
      width: 150,
      renderCell: (params) => (
        <img
          src={params.value}
          alt="Profile"
          className="w-9 h-9 rounded-full"
        />
      ),
    },
    {
      field: "firstName",
      headerName: "First Name",
      width: 200,
      editable: true,
    },
    { field: "lastName", headerName: "Last Name", width: 200, editable: true },
    { field: "gender", headerName: "Gender", width: 150, editable: true },
    { field: "birthday", headerName: "Birthday", width: 150, editable: true },
    { field: "email", headerName: "Email", width: 150, editable: true },
    {
      field: "phoneNumber",
      headerName: "Phone Number",
      width: 150,
      editable: true,
    },
    { field: "facebook", headerName: "Facebook", width: 150, editable: true },
    { field: "zalo", headerName: "Zalo", width: 150, editable: true },
    {
      field: "majorName",
      headerName: "Major",
      width: 150,
      editable: true,
    },
    {
      field: "graduated",
      headerName: "Graduated",
      width: 150,
      renderCell: (params) => (
        <select
          value={params.value ? "Yes" : "No"}
          onChange={(e) => handleGraduatedChange(e, params.row.id)}
          className="bg-white border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      ),
    },
    {
      field: "delete",
      headerName: "Action",
      width: 120,
      renderCell: (params) => (
        <div>
          <button
            onClick={() => handleDetail(params.row.id)}
            className="p-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 mr-2"
          >
            <FaInfoCircle />
          </button>
          <button
            onClick={() => handleDelete(params.row.id)}
            className="p-1 bg-red-500 text-white rounded-md hover:bg-red-600"
          >
            <FaTrash />
          </button>
        </div>
      ),
    },
  ];

  const formattedData = student.map((item, index) => ({
    id: item.id,
    avatar: item.avatar,
    firstName: item.firstName,
    lastName: item.lastName,
    gender: item.gender,
    birthday: item.birthday,
    email: item.email,
    phoneNumber: item.phoneNumber,
    facebook: item.facebook,
    zalo: item.zalo,
    majorName: item.majorName,
    graduated: item.graduated,
  }));

  return (
    <div className="container mx-auto">
      <h1 className="text-4xl font-bold mb-4 text-center text-blue-600">
        Computer Science
      </h1>

      <div className="flex justify-center mb-4">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="pv" fill="#8884d8" barSize={60} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="flex items-center gap-4 mb-4">
        <Select
          value={yearOptions.find((option) => option.value === selectedYear)}
          defaultValue={yearOptions[0]}
          onChange={handleYearChange}
          options={yearOptions}
          placeholder="Select Year"
          className="w-40"
        />

        <div
          onClick={() => setIsAddStudent(true)}
          className="cursor-pointer p-2 rounded-md overflow-hidden shadow-md border border-blue-600 flex items-center justify-center bg-blue-600 hover:bg-blue-700 transition duration-300"
        >
          <FaPlus className="text-white text-2xl" />
        </div>
      </div>

      <div style={{ height: 400, width: "100%", overflow: "auto" }}>
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
      <ModalCreateStudentToMajor
        setIsAddStudent={setIsAddStudent}
        isAddStudent={isAddStudent}
        majorId={majorId}
      />
    </div>
  );
};

export default DetailMajor;
