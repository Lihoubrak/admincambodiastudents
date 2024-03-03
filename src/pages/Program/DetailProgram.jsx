import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { FaCheck, FaDownload, FaFileImport, FaPlus } from "react-icons/fa";
import Select from "react-select";
import { GiGlassCelebration } from "react-icons/gi";
const DetailProgram = () => {
  const [files, setFiles] = useState([]);
  const [selectedYear, setSelectedYear] = useState(null);
  const handleFileUpload = (event) => {
    const uploadedFiles = event.target.files;
    setFiles(uploadedFiles);
  };
  const handleYearChange = (selectedOption) => {
    setSelectedYear(selectedOption);
  };
  const yearOptions = [
    { value: 2022, label: "2022" },
    { value: 2023, label: "2023" },
  ];
  const rows = [
    {
      id: 1,
      name: "Product A",
      quantity: 10,
      price: 25,
      date: "2024-02-28",
      note: "Note for Product A",
    },
    {
      id: 2,
      name: "Product B",
      quantity: 20,
      price: 30,
      date: "2024-02-27",
      note: "Note for Product B",
    },
    {
      id: 3,
      name: "Product C",
      quantity: 15,
      price: 35,
      date: "2024-02-26",
      note: "Note for Product C",
    },
    // Add more rows as needed
  ];

  // Columns configuration
  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "name", headerName: "Product Name", width: 200 },
    { field: "quantity", headerName: "Quantity", width: 150 },
    { field: "price", headerName: "Price (per unit)", width: 200 },
    { field: "date", headerName: "Purchase Date", width: 200 },
    { field: "note", headerName: "Note", width: 300 }, // New "Note" column
  ];

  // Define rows for columnsSupport
  const rowsSupport = [
    { id: 1, name: "Support Staff A", support: "Support A" },
    { id: 2, name: "Support Staff B", support: "Support B" },
    { id: 3, name: "Support Staff C", support: "Support C" },
    // Add more rows as needed
  ];

  // Define rows for columnsJoinProgram
  const rowsJoinProgram = [
    { id: 1, name: "Participant A", support: "Support A" },
    { id: 2, name: "Participant B", support: "Support B" },
    { id: 3, name: "Participant C", support: "Support C" },
    // Add more rows as needed
  ];

  const columnsSupport = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "name", headerName: "Name", width: 100 },
    { field: "support", headerName: "Support", width: 100 },
  ];

  const columnsJoinProgram = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "name", headerName: "Name", width: 100 },
    { field: "support", headerName: "Support", width: 100 },
  ];

  return (
    <div>
      <h1 className="text-4xl gap-3 flex justify-center items-center font-bold mb-8 text-center text-blue-600">
        <GiGlassCelebration size={70} />
        <span>PROGRAM</span>
      </h1>
      <div className="flex justify-center">
        <Select
          value={selectedYear}
          onChange={handleYearChange}
          options={yearOptions}
          placeholder="Select Year"
          className="w-40"
        />
      </div>

      <div className="flex items-center justify-between my-4">
        <h2 className="text-2xl font-bold mb-2 text-blue-700">PRODUCTS</h2>
        <div className="flex items-center gap-4">
          <div className="cursor-pointer p-2 rounded-md overflow-hidden shadow-md border border-blue-600 flex items-center justify-center bg-blue-600 hover:bg-blue-700 transition duration-300">
            <FaPlus className="text-white text-2xl" />
          </div>
          <div className="cursor-pointer p-2 rounded-md overflow-hidden shadow-md border border-yellow-600 flex items-center justify-center bg-yellow-600 hover:bg-yellow-700 transition duration-300">
            <FaDownload className="text-white text-2xl" />
          </div>
          <div className="cursor-pointer p-2 rounded-md overflow-hidden shadow-md border border-green-600 flex items-center justify-center bg-green-600 hover:bg-green-700 transition duration-300">
            <FaFileImport className="text-white text-2xl" />
          </div>
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

      <div>
        <div className="flex items-center justify-between my-4">
          <h2 className="text-2xl font-bold mb-2 text-blue-700">
            SUPPORT STAFF
          </h2>
          <div className="flex items-center gap-4">
            <div className="cursor-pointer p-2 rounded-md overflow-hidden shadow-md border border-blue-600 flex items-center justify-center bg-blue-600 hover:bg-blue-700 transition duration-300">
              <FaPlus className="text-white text-2xl" />
            </div>
            <div className="cursor-pointer p-2 rounded-md overflow-hidden shadow-md border border-yellow-600 flex items-center justify-center bg-yellow-600 hover:bg-yellow-700 transition duration-300">
              <FaDownload className="text-white text-2xl" />
            </div>
            <div className="cursor-pointer p-2 rounded-md overflow-hidden shadow-md border border-green-600 flex items-center justify-center bg-green-600 hover:bg-green-700 transition duration-300">
              <FaFileImport className="text-white text-2xl" />
            </div>
          </div>
        </div>
        <div style={{ height: 400, width: "100%", overflow: "auto" }}>
          <DataGrid
            rows={rowsSupport}
            columns={columnsSupport}
            pageSize={5}
            rowsPerPageOptions={[5, 10, 20]}
            disableSelectionOnClick
            sx={{
              "& .MuiDataGrid-cell, & .MuiDataGrid-columnHeaderTitleContainer":
                {
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

      <div>
        <div className="flex items-center justify-between my-4">
          <h2 className="text-2xl font-bold mb-2 text-blue-700">
            JOIN PROGRAM PARTICIPANTS
          </h2>
          <div className="flex items-center gap-4">
            <div className="cursor-pointer p-2 rounded-md overflow-hidden shadow-md border border-blue-600 flex items-center justify-center bg-blue-600 hover:bg-blue-700 transition duration-300">
              <FaPlus className="text-white text-2xl" />
            </div>
            <div className="cursor-pointer p-2 rounded-md overflow-hidden shadow-md border border-yellow-600 flex items-center justify-center bg-yellow-600 hover:bg-yellow-700 transition duration-300">
              <FaDownload className="text-white text-2xl" />
            </div>
            <div className="cursor-pointer p-2 rounded-md overflow-hidden shadow-md border border-green-600 flex items-center justify-center bg-green-600 hover:bg-green-700 transition duration-300">
              <FaFileImport className="text-white text-2xl" />
            </div>
          </div>
        </div>
        <div style={{ height: 400, width: "100%", overflow: "auto" }}>
          <DataGrid
            rows={rowsJoinProgram}
            columns={columnsJoinProgram}
            pageSize={5}
            rowsPerPageOptions={[5, 10, 20]}
            disableSelectionOnClick
            sx={{
              "& .MuiDataGrid-cell, & .MuiDataGrid-columnHeaderTitleContainer":
                {
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
    </div>
  );
};

export default DetailProgram;
