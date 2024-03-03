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
import { DataGrid } from "@mui/x-data-grid";
import { FaCheck, FaDownload, FaFileImport, FaPlus } from "react-icons/fa";
import Select from "react-select";
import { Link } from "react-router-dom";
import { ModalCreateMajor } from "../../components";

const DetailUniversity = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const [selectedYear, setSelectedYear] = useState(null);

  const handleYearChange = (selectedOption) => {
    setSelectedYear(selectedOption);
    // Add logic here to fetch and display students for the selected year
  };

  const yearOptions = [
    { value: 2022, label: "2022" },
    { value: 2023, label: "2023" },
    // Add more years as needed
  ];

  const rows = [
    {
      id: 1,
      university: "University 1",
      students: 2000,
      location: "Location 1",
      major: "Computer Science",
    },
    {
      id: 2,
      university: "University 2",
      students: 3000,
      location: "Location 2",
      major: "Electrical Engineering",
    },
    {
      id: 3,
      university: "University 3",
      students: 2500,
      location: "Location 3",
      major: "Mechanical Engineering",
    },
    {
      id: 4,
      university: "University 4",
      students: 3500,
      location: "Location 4",
      major: "Civil Engineering",
    },
    {
      id: 5,
      university: "University 5",
      students: 4000,
      location: "Location 5",
      major: "Chemical Engineering",
    },
    {
      id: 6,
      university: "University 6",
      students: 2800,
      location: "Location 6",
      major: "Aerospace Engineering",
    },
    {
      id: 7,
      university: "University 7",
      students: 3200,
      location: "Location 7",
      major: "Biomedical Engineering",
    },
    {
      id: 8,
      university: "University 8",
      students: 2700,
      location: "Location 8",
      major: "Industrial Engineering",
    },
    {
      id: 9,
      university: "University 9",
      students: 3800,
      location: "Location 9",
      major: "Software Engineering",
    },
    {
      id: 10,
      university: "University 10",
      students: 3500,
      location: "Location 10",
      major: "Environmental Engineering",
    },
    // Add more rows as needed
  ];

  // Columns configuration for the table
  const columns = [
    { field: "university", headerName: "University", width: 200 },
    { field: "students", headerName: "Students", width: 150 },
    { field: "location", headerName: "Location", width: 200 },
    { field: "major", headerName: "Major", width: 200 },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,

      renderCell: (params) => (
        <div className="flex items-center gap-4">
          <Link to={`/university/student/${params.row.id}`}>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-20">
              Detail
            </button>
          </Link>
          <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-20">
            Edit
          </button>
        </div>
      ),
    },
    // Add more columns as needed
  ];

  const majors = [
    {
      id: 1,
      name: "Computer Science",
      image: "/src/assets/download.png",
    },
    {
      id: 2,
      name: "Electrical Engineering",
      image: "/src/assets/download.png",
    },
    {
      id: 3,
      name: "Mechanical Engineering",
      image: "/src/assets/download.png",
    },
    {
      id: 4,
      name: "Civil Engineering",
      image: "/src/assets/download.png",
    },
    {
      id: 5,
      name: "Chemical Engineering",
      image: "/src/assets/download.png",
    },
    {
      id: 6,
      name: "Biomedical Engineering",
      image: "/src/assets/download.png",
    },
    // Add more majors as needed
  ];

  return (
    <div className="container mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-center text-blue-600">
        HUST UNIVERSITY
      </h1>

      <div className="flex justify-center mb-8">
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

      <div className="flex items-center mb-8 gap-4">
        <Select
          value={selectedYear}
          onChange={handleYearChange}
          options={yearOptions}
          placeholder="Select Year"
          className="w-40"
        />
        <div className="p-2 rounded-md overflow-hidden shadow-md border border-green-600 flex items-center justify-center bg-green-600 hover:bg-green-700 transition duration-300">
          <FaFileImport className="text-white text-2xl" />
        </div>
        <div className="p-2 rounded-md overflow-hidden shadow-md border border-yellow-600 flex items-center justify-center bg-yellow-600 hover:bg-yellow-700 transition duration-300">
          <FaDownload className="text-white text-2xl" />
        </div>
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

      <div className="flex justify-between items-center py-5">
        <h1 className="text-3xl font-bold mb-4 text-blue-600">LIST OF MAJOR</h1>
        {/* Create New University Button */}
        <div
          onClick={() => setIsModalOpen(!isModalOpen)}
          className="min-w-[200px] py-2 cursor-pointer rounded overflow-hidden shadow-md border-2 border-blue-600 mb-4 flex items-center justify-center bg-blue-600 hover:bg-blue-700 transition duration-300"
        >
          <p className="text-white font-bold">Create New Major</p>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-6">
        {majors.map((major) => (
          <Link to={`/university/major/${major.id}`} key={major.id}>
            <div className="flex flex-col items-center justify-center bg-white rounded-lg p-4 shadow-md">
              <img
                src={major.image}
                alt={major.name}
                className="w-16 h-16 object-cover rounded-full mb-4"
              />
              <span className="text-center font-medium text-lg">
                {major.name}
              </span>
            </div>
          </Link>
        ))}
      </div>
      <ModalCreateMajor isOpen={isModalOpen} closeModal={closeModal} />
    </div>
  );
};

export default DetailUniversity;
