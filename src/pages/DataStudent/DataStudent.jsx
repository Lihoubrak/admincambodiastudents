import { DataGrid } from "@mui/x-data-grid";
import React, { useCallback, useRef, useState } from "react";
import { FaDownload, FaFileImport, FaSave } from "react-icons/fa";
import { utils, writeFile } from "xlsx";
import * as XLSX from "xlsx";
import { publicRequest } from "../../RequestMethod/Request";
import { RiLockPasswordFill } from "react-icons/ri";

const DataStudent = () => {
  const importRef = useRef(null);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [rows, setRows] = React.useState([]);

  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "username", headerName: "Username", width: 150 },
    { field: "firstName", headerName: "First Name", width: 150 },
    { field: "lastName", headerName: "Last Name", width: 150 },
    { field: "age", headerName: "Age", width: 100 },
    { field: "nationality", headerName: "Nationality", width: 150 },
    { field: "gender", headerName: "Gender", width: 100 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "phoneNumber", headerName: "Phone Number", width: 150 },
    { field: "facebook", headerName: "Facebook", width: 200 },
    { field: "zalo", headerName: "Zalo", width: 200 },
    { field: "avatar", headerName: "Avatar", width: 200 },
    { field: "major", headerName: "Major", width: 150 },
    { field: "role", headerName: "Role", width: 150 },
    { field: "room", headerName: "Room", width: 150 },
  ];

  const exportFile = useCallback(() => {
    const ws = utils.json_to_sheet(rows);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, "Data");
    writeFile(wb, "student.xlsx");
  }, [rows]);
  const importFile = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(sheet);
      setRows(jsonData);
    };
    reader.readAsArrayBuffer(file);
  };

  const handleClickIconImport = () => {
    importRef.current.click();
  };
  const handleSave = async () => {
    const promises = rows.map(async (item) => {
      let { role, major, room, ...rest } = item;

      // If role is "Student", major is "Physics", and room is "101", change them to 1
      if (role === "Student" && major === "Physics" && room === "102") {
        role = 1;
        major = 1;
        room = 3;
      }

      const response = await publicRequest.post("/users/v1/register", {
        roleId: role,
        majorId: major,
        roomId: room,
        password: password,
        confirmPassword: confirmPassword,
        ...rest,
      });
      return response.data;
    });
  };
  const handleChangeInput = (e, field) => {
    const value = e.target.value;
    if (field === "password") {
      setPassword(value);
    } else if (field === "confirmPassword") {
      setConfirmPassword(value);
    }
  };
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <div
            onClick={rows.length > 0 ? exportFile : null}
            className="cursor-pointer p-2 rounded-md overflow-hidden shadow-md border border-yellow-600 flex items-center justify-center bg-yellow-600 hover:bg-yellow-700 transition duration-300"
          >
            <FaDownload className="text-white text-2xl" />
          </div>
          <div className="cursor-pointer p-2 rounded-md overflow-hidden shadow-md border border-green-600 flex items-center justify-center bg-green-600 hover:bg-green-700 transition duration-300">
            <FaFileImport
              onClick={handleClickIconImport}
              className="text-white text-2xl"
            />
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
          </div>
          <div
            onClick={rows.length > 0 ? handleSave : null}
            className="cursor-pointer p-2 rounded-md overflow-hidden shadow-md border border-blue-600 flex items-center justify-center bg-blue-600 hover:bg-blue-700 transition duration-300"
          >
            <FaSave className="text-white text-2xl" />
          </div>
          <div className="cursor-pointer rounded-md overflow-hidden shadow-md border border-blue-600 flex items-center justify-center transition duration-300">
            <RiLockPasswordFill className="text-blue-600 mx-2" size={25} />
            <input
              value={password}
              type="password"
              placeholder="Password..."
              className="bg-transparent outline-none border-none p-2 text-blue-600 placeholder-blue-600 w-full"
              style={{ borderRadius: "inherit" }}
              onChange={(e) => handleChangeInput(e, "password")}
            />
          </div>
          <div className="cursor-pointer rounded-md overflow-hidden shadow-md border border-blue-600 flex items-center justify-center transition duration-300">
            <RiLockPasswordFill className="text-blue-600 mx-2" size={25} />
            <input
              value={confirmPassword}
              type="password"
              placeholder="Confirm Password..."
              className="bg-transparent outline-none border-none p-2 text-blue-600 placeholder-blue-600 w-full"
              style={{ borderRadius: "inherit" }}
              onChange={(e) => handleChangeInput(e, "confirmPassword")}
            />
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
    </div>
  );
};

export default DataStudent;
