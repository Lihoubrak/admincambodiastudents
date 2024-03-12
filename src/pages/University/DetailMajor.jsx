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
import { FaInfoCircle, FaTrash } from "react-icons/fa";

const DetailMajor = () => {
  const [selectedYear, setSelectedYear] = useState(null);
  const [student, setStudent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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

  // Sample data for the chart
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
  const handleDelete = (id) => {};
  const handleDetail = (id) => {
    console.log(id);
    navigation(`/university/student/${id}`);
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
          style={{ width: 45, height: 45, borderRadius: "50%" }}
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
    { field: "age", headerName: "Age", width: 150, editable: true },
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
      field: "Major.majorName",
      headerName: "Major",
      width: 150,
      editable: true,
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
    id: index + 1,
    avatar: item.avatar,
    firstName: item.firstName,
    lastName: item.lastName,
    gender: item.gender,
    age: item.age,
    email: item.email,
    phoneNumber: item.phoneNumber,
    facebook: item.facebook,
    zalo: item.zalo,
    "Major.majorName": item.Major ? item.Major.majorName : "",
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

      <div className="flex items-center  mb-4">
        <Select
          value={yearOptions.find((option) => option.value === selectedYear)}
          defaultValue={yearOptions[0]}
          onChange={handleYearChange}
          options={yearOptions}
          placeholder="Select Year"
          className="w-40"
        />
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
    </div>
  );
};

export default DetailMajor;
