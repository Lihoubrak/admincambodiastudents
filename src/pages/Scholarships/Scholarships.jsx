import React, { useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { FaCheck, FaDownload, FaFileImport, FaPlus } from "react-icons/fa";
import Select from "react-select";
import { Link } from "react-router-dom";
import { SiSemanticscholar } from "react-icons/si";

const Scholarships = () => {
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const handleYearChange = (selectedOption) => {
    setSelectedYear(selectedOption);
  };

  const handleMonthChange = (selectedOption) => {
    setSelectedMonth(selectedOption);
  };

  const yearOptions = [
    { value: 2022, label: "2022" },
    { value: 2023, label: "2023" },
  ];

  const monthOptions = [
    { value: 1, label: "January" },
    { value: 2, label: "February" },
    { value: 3, label: "March" },
    { value: 4, label: "April" },
    { value: 5, label: "May" },
    { value: 6, label: "June" },
    { value: 7, label: "July" },
    { value: 8, label: "August" },
    { value: 9, label: "September" },
    { value: 10, label: "October" },
    { value: 11, label: "November" },
    { value: 12, label: "December" },
  ];

  const scholarships = [
    {
      id: 1,
      name: "Full Scholarship",
      amount: "$10,000",
      deadline: "2024-08-31",
      criteria: "GPA > 3.5",
      status: "Open",
    },
    {
      id: 2,
      name: "Merit Scholarship",
      amount: "$5,000",
      deadline: "2024-07-15",
      criteria: "Extracurricular activities",
      status: "Closed",
    },
    // Add more scholarships as needed
  ];

  // Columns configuration for the table
  const columns = [
    { field: "name", headerName: "Name", width: 200 },
    { field: "amount", headerName: "Amount", width: 150 },
    { field: "deadline", headerName: "Deadline", width: 200 },
    { field: "criteria", headerName: "Criteria", width: 200 },
    { field: "status", headerName: "Status", width: 150 },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,

      renderCell: (params) => (
        <div className="flex items-center gap-4">
          <Link to={`/scholarship/detail/${params.row.id}`}>
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

  return (
    <div>
      <h1 className="text-4xl gap-3 flex justify-center items-center font-bold mb-8 text-center text-blue-600">
        <SiSemanticscholar size={70} />
        <span>SCHOLASHIP</span>
      </h1>
      <div className="flex items-center mb-8 gap-4">
        <Select
          value={selectedMonth}
          onChange={handleMonthChange}
          options={monthOptions}
          placeholder="Select Month"
          className="w-40"
        />
        <Select
          value={selectedYear}
          onChange={handleYearChange}
          options={yearOptions}
          placeholder="Select Year"
          className="w-40"
        />
        <div className="flex items-center gap-2">
          <div className="p-2 cursor-pointer rounded-md overflow-hidden shadow-md border border-green-600 flex items-center justify-center bg-green-600 hover:bg-green-700 transition duration-300">
            <FaFileImport className="text-white text-2xl" />
          </div>
          <div className="p-2 cursor-pointer rounded-md overflow-hidden shadow-md border border-yellow-600 flex items-center justify-center bg-yellow-600 hover:bg-yellow-700 transition duration-300">
            <FaDownload className="text-white text-2xl" />
          </div>
        </div>
        <div className="text-white gap-3 flex-1  p-2 rounded-md overflow-hidden shadow-md border border-green-600 flex items-center justify-center bg-blue-600 hover:bg-blue-700 transition duration-300">
          <span className="font-bold">(Under): 4,700,000 dong/month</span>
          <span className="font-bold">(Master's): 6,000,000 dong/month</span>
        </div>
      </div>

      <div style={{ height: 400, width: "100%", overflow: "auto" }}>
        <DataGrid
          rows={scholarships}
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

export default Scholarships;
