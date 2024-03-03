import React, { useState } from "react";
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
import {
  FaCheck,
  FaDownload,
  FaFileImport,
  FaPlus,
  FaUser,
} from "react-icons/fa"; // Added FaUser icon
import Select from "react-select";
import { Link } from "react-router-dom";
import { ModalCreateMajor } from "../../components";

const DetailMajor = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedYear, setSelectedYear] = useState(null);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Sample data for the chart
  const chartData = [
    { name: "2020", pv: 2400 },
    { name: "2021", pv: 1398 },
    { name: "2022", pv: 9800 },
    { name: "2023", pv: 3908 },
    { name: "2024", pv: 4800 },
  ];

  const handleYearChange = (selectedOption) => {
    setSelectedYear(selectedOption);
    // Add logic here to fetch and display students for the selected year
  };

  const yearOptions = [
    { value: 2022, label: "2022" },
    { value: 2023, label: "2023" },
    // Add more years as needed
  ];

  // Dummy rows for the data grid
  const rows = [
    {
      id: 1,
      profile: "/src/assets/Student.jpg",
      firstName: "John",
      lastName: "Doe",
      age: 25,
      GPA: 3.5,
      status: "Active",
    },
    {
      id: 2,
      profile: "/src/assets/Student.jpg",
      firstName: "Jane",
      lastName: "Smith",
      age: 22,
      GPA: 3.9,
      status: "Active",
    },
    {
      id: 3,
      profile: "/src/assets/Student.jpg",
      firstName: "Tom",
      lastName: "Brown",
      age: 24,
      GPA: 3.2,
      status: "Inactive",
    },
    {
      id: 4,
      profile: "/src/assets/Student.jpg",
      firstName: "Emily",
      lastName: "Johnson",
      age: 23,
      GPA: 3.7,
      status: "Active",
    },
    {
      id: 5,
      profile: "/src/assets/Student.jpg",
      firstName: "Michael",
      lastName: "Williams",
      age: 21,
      GPA: 3.6,
      status: "Active",
    },
  ];

  // Columns configuration for the data grid
  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    {
      field: "profile",
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
    { field: "firstName", headerName: "First Name", width: 200 },
    { field: "lastName", headerName: "Last Name", width: 200 },
    { field: "age", headerName: "Age", width: 150 },
    { field: "GPA", headerName: "GPA", width: 150 },
    { field: "status", headerName: "Status", width: 150 },
  ];

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
          value={selectedYear}
          onChange={handleYearChange}
          options={yearOptions}
          placeholder="Select Year"
          className="w-40"
        />
      </div>

      <div style={{ height: 400, width: "100%", overflow: "auto" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10, 20]}
          disableSelectionOnClick
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
