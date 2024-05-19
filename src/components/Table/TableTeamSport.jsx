import { DataGrid } from "@mui/x-data-grid";
import React, { useCallback, useRef, useState } from "react";
import {
  FaDownload,
  FaFileImport,
  FaInfoCircle,
  FaPlus,
  FaSave,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import * as XLSX from "xlsx";
import { TokenRequest } from "../../RequestMethod/Request";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import ModalCreateManagerSport from "../Modal/ModalCreateManagerSport";
const TableTeamSport = ({
  setIsModalCreateTeam,
  formatTeam,
  setTeam,
  sportId,
  loading,
}) => {
  const [editingRowId, setEditingRowId] = useState(null);
  const [addManager, setAddManager] = useState(false);
  const openModal = () => {
    setAddManager(true);
  };
  const closeModal = () => {
    setAddManager(false);
  };
  const handleSelectChange = async (e, row) => {
    const { value } = e.target;
    const updatedFormatTeam = formatTeam.map((team) =>
      team.id === row.id ? { ...team, rank: value } : team
    );
    setTeam(updatedFormatTeam);
    setEditingRowId(null); // Exit edit mode after changing the value

    // Make API request to update rank
    try {
      await TokenRequest.put(`/teamsports/v19/rank/${row.id}`, { rank: value });
    } catch (error) {
      console.error("Error updating rank:", error);
      // Handle error (e.g., show error message to user)
    }
  };

  const columnsTeam = [
    { field: "no", headerName: "ID", width: 100 },
    { field: "teamName", headerName: "Team Name", width: 150 },
    {
      field: "logo",
      headerName: "Logo",
      width: 100,
      renderCell: (params) => (
        <img
          src={params.value}
          alt="logo"
          style={{ width: 50, borderRadius: "50%" }}
        />
      ),
    },
    { field: "representative", headerName: "Representative For", width: 150 },
    { field: "location", headerName: "Location", width: 100 },
    { field: "numberOfMember", headerName: "Number of Members", width: 100 },
    { field: "phoneNumber", headerName: "Phone Number", width: 100 },
    {
      field: "rank",
      headerName: "Rank",
      width: 150,
      renderCell: ({ row }) =>
        editingRowId === row.id ? (
          <select
            value={row.rank}
            onChange={(e) => handleSelectChange(e, row)}
            onBlur={() => setEditingRowId(null)}
            className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
        ) : (
          <div onClick={() => setEditingRowId(row.id)}>{row.rank}</div>
        ),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 100,
      renderCell: ({ row }) => (
        <Link to={`/detailTeam/${row.id}`}>
          <button className="p-1 bg-green-500 text-white rounded-md hover:bg-green-600">
            <FaInfoCircle />
          </button>
        </Link>
      ),
    },
  ];
  const importRef = useRef(null);
  const exportFile = useCallback(() => {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(formatTeam);
    XLSX.utils.book_append_sheet(wb, ws, "Data");
    XLSX.writeFile(wb, "Team.xlsx");
  }, [formatTeam]);
  const handleClickIconImport = () => {
    importRef.current.click();
  };
  const importFile = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(sheet);
      setTeam(jsonData);
    };
    reader.readAsArrayBuffer(file);
  };
  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const savePromises = formatTeam.map((teamInfo) => {
        const formData = new FormData();

        formData.append("teamName", teamInfo.teamName);
        formData.append("representative", teamInfo.representative);
        formData.append("location", teamInfo.location);
        formData.append("numberOfMember", teamInfo.numberOfMember);
        formData.append("phoneNumber", teamInfo.phoneNumber);
        formData.append("sportId", sportId);
        formData.append("logo", teamInfo.logo);

        return TokenRequest.post("/teamsports/v19/create", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      });

      const responses = await Promise.all(savePromises);

      // If all teams were saved successfully, show an alert
      if (responses.every((response) => response.status === 201)) {
        alert("Teams saved successfully!");
      } else {
        // If any of the requests failed, handle it accordingly
        console.error("Some teams failed to save.");
      }
    } catch (error) {
      console.error("Error occurred while saving teams:", error);
    }
  };

  return (
    <div className="">
      <div className="flex items-center justify-end gap-4 mb-4">
        <div
          onClick={() => setIsModalCreateTeam(true)}
          className="cursor-pointer p-2 rounded-md overflow-hidden shadow-md border border-blue-600 flex items-center justify-center bg-blue-600 hover:bg-blue-700 transition duration-300"
        >
          <FaPlus className="text-white text-2xl" />
        </div>
        <button
          onClick={formatTeam.length > 0 ? exportFile : null}
          className={`cursor-pointer p-2 rounded-md overflow-hidden shadow-md border border-yellow-600 flex items-center justify-center bg-yellow-600 ${
            formatTeam.length > 0 && "hover:bg-yellow-700"
          } ${
            formatTeam.length === 0 && "opacity-50 cursor-not-allowed"
          } transition duration-300`}
          disabled={formatTeam.length === 0}
        >
          <FaDownload className="text-white text-2xl" />
        </button>
        <div className="cursor-pointer p-2 rounded-md overflow-hidden shadow-md border border-green-600 flex items-center justify-center bg-green-600 hover:bg-green-700 transition duration-300">
          <input
            type="file"
            ref={importRef}
            accept=".xlsx, .xls"
            style={{ display: "none" }}
            onChange={(e) => {
              const file = e.target.files[0];
              importFile(file);
            }}
          />
          <FaFileImport
            onClick={handleClickIconImport}
            className="text-white text-2xl"
          />
        </div>
        <button
          onClick={formatTeam.length > 0 ? handleSave : null}
          className={`cursor-pointer p-2 rounded-md overflow-hidden shadow-md border border-blue-600 flex items-center justify-center bg-blue-600 ${
            formatTeam.length > 0
              ? "hover:bg-blue-700"
              : "opacity-50 cursor-not-allowed"
          } transition duration-300`}
        >
          <FaSave className="text-white text-2xl" />
        </button>
        <button
          onClick={openModal}
          className="p-2 rounded-md overflow-hidden shadow-md border border-green-600 flex items-center justify-center bg-green-600 hover:bg-green-700 transition duration-300"
        >
          <MdOutlineAdminPanelSettings className="text-white text-2xl" />
        </button>
      </div>
      <div style={{ height: 400, width: "100%", overflow: "auto" }}>
        <DataGrid
          rows={formatTeam}
          columns={columnsTeam}
          pageSize={5}
          rowsPerPageOptions={[5, 10, 20]}
          loading={loading}
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
      <ModalCreateManagerSport
        isOpen={addManager}
        closeModal={closeModal}
        sportId={sportId}
      />
    </div>
  );
};

export default TableTeamSport;
