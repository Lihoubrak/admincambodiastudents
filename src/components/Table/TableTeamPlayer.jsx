import { DataGrid } from "@mui/x-data-grid";
import React, { useCallback, useRef } from "react";
import {
  FaDownload,
  FaFileImport,
  FaInfoCircle,
  FaPlus,
  FaSave,
  FaTrash,
} from "react-icons/fa";
import * as XLSX from "xlsx";
import { TokenRequest } from "../../RequestMethod/Request";
const TableTeamPlayer = ({
  formatPlayer,
  teamId,
  loading,
  setIsModalCreateTeamPlayer,
  setPlayer,
}) => {
  const columns = [
    { field: "no", headerName: "ID", width: 120, editable: true },
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
    { field: "nationality", headerName: "Nationality", editable: true },
    { field: "degree", headerName: "Degree", width: 150, editable: true },
    {
      field: "phoneNumber",
      headerName: "Phone Number",
      width: 150,
      editable: true,
    },
    {
      field: "playerPosition",
      headerName: "playerPosition",
      width: 150,
      editable: true,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: ({ row }) => (
        <button
          onClick={() => handleDelete(row.id)}
          className="p-1 bg-red-500 text-white rounded-md hover:bg-red-600"
        >
          <FaTrash />
        </button>
      ),
    },
  ];
  const handleDelete = async (playerId) => {
    try {
      await TokenRequest.delete(`/sportplayers/v20/delete/${playerId}`);
      setPlayer((prevPlayers) =>
        prevPlayers.filter((player) => player.id !== playerId)
      );
    } catch (error) {
      console.error("Error deleting player:", error);
    }
  };
  const exportFile = useCallback(() => {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(formatPlayer);
    XLSX.utils.book_append_sheet(wb, ws, "Data");
    XLSX.writeFile(wb, "Player.xlsx");
  }, [formatPlayer]);
  return (
    <div>
      <div className="flex items-center gap-4 justify-end mb-4">
        <div
          onClick={() => setIsModalCreateTeamPlayer(true)}
          className="cursor-pointer p-2 rounded-md overflow-hidden shadow-md border border-blue-600 flex items-center justify-center bg-blue-600 hover:bg-blue-700 transition duration-300"
        >
          <FaPlus className="text-white text-2xl" />
        </div>
        <button
          onClick={formatPlayer.length > 0 ? exportFile : null}
          className={`cursor-pointer p-2 rounded-md overflow-hidden shadow-md border border-yellow-600 flex items-center justify-center bg-yellow-600 ${
            formatPlayer.length > 0 && "hover:bg-yellow-700"
          } ${
            formatPlayer.length === 0 && "opacity-50 cursor-not-allowed"
          } transition duration-300`}
          disabled={formatPlayer.length === 0}
        >
          <FaDownload className="text-white text-2xl" />
        </button>
      </div>
      <div style={{ height: 300, width: "100%", overflow: "auto" }}>
        <DataGrid
          editMode="cell"
          rows={formatPlayer}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10, 20]}
          disableSelectionOnClick
          loading={loading}
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

export default TableTeamPlayer;
