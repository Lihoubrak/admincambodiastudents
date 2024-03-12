import { DataGrid } from "@mui/x-data-grid";
import React, { useCallback, useRef } from "react";
import {
  FaDownload,
  FaFileImport,
  FaPlus,
  FaSave,
  FaTrash,
} from "react-icons/fa";
import * as XLSX from "xlsx";

const TableJoinProgram = ({
  formatParticipant,
  setIsModalOpenCreateJoinProgram,
  loading,
  participantEventError,
}) => {
  const handleDelete = (id) => {};
  const columnsJoinProgram = [
    { field: "id", headerName: "No", width: 120, editable: true },
    {
      field: "avatar",
      headerName: "Profile",
      width: 120,
      renderCell: (params) => (
        <img
          src={params.value}
          alt="Avatar"
          style={{ width: 50, borderRadius: "50%" }}
        />
      ),
    },
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
    { field: "payMoney", headerName: "PayMoney", width: 150, editable: true },
    {
      field: "typePayMoney",
      headerName: "TypePayMoney",
      width: 150,
      editable: true,
    },
    { field: "date", headerName: "Date", width: 150, editable: true },
    {
      field: "delete",
      headerName: "Action",
      width: 120,
      renderCell: (params) => (
        <button
          onClick={() => handleDelete(params.row.id)}
          className="p-1 bg-red-500 text-white rounded-md hover:bg-red-600"
        >
          <FaTrash />
        </button>
      ),
    },
  ];
  const handleExportFile = useCallback(() => {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(formatParticipant);
    XLSX.utils.book_append_sheet(wb, ws, "Data");
    XLSX.writeFile(wb, "Join Program.xlsx");
  }, [formatParticipant]);
  const totalMoney = formatParticipant.reduce((accumulator, currentItem) => {
    const payMoney = parseFloat(currentItem.payMoney);
    if (!isNaN(payMoney)) {
      return accumulator + payMoney;
    } else {
      return accumulator;
    }
  }, 0); // Initial value of the accumulator is set to 0

  return (
    <div>
      <div className="flex items-center justify-between my-4">
        <h2 className="text-2xl font-bold mb-2 text-blue-700">
          JOIN PROGRAM PARTICIPANTS
        </h2>
        <div className="flex items-center gap-4">
          <div
            onClick={() => setIsModalOpenCreateJoinProgram(true)}
            className="cursor-pointer p-2 rounded-md overflow-hidden shadow-md border border-blue-600 flex items-center justify-center bg-blue-600 hover:bg-blue-700 transition duration-300"
          >
            <FaPlus className="text-white text-2xl" />
          </div>
          <button
            onClick={formatParticipant.length > 0 ? handleExportFile : null}
            className={`cursor-pointer p-2 rounded-md overflow-hidden shadow-md border border-yellow-600 flex items-center justify-center bg-yellow-600 ${
              formatParticipant.length > 0 && "hover:bg-yellow-700"
            } ${
              formatParticipant.length === 0 && "opacity-50 cursor-not-allowed"
            } transition duration-300`}
            disabled={formatParticipant.length === 0}
          >
            <FaDownload className="text-white text-2xl" />
          </button>
        </div>
      </div>
      <div style={{ height: 400, width: "100%", overflow: "auto" }}>
        <DataGrid
          rows={formatParticipant}
          columns={columnsJoinProgram}
          pageSize={5}
          rowsPerPageOptions={[5, 10, 20]}
          disableSelectionOnClick
          loading={loading}
          localeText={{
            noRowsLabel: participantEventError,
          }}
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
      <div className="mt-4">
        <h2 className="text-lg font-bold mb-2 text-red-700">
          TOTAL JOIN PROGRAM PARTICIPANTS
        </h2>
        <p className="font-bold">Total: {totalMoney} dong</p>
      </div>
    </div>
  );
};

export default TableJoinProgram;
