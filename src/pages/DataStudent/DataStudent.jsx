import { DataGrid } from "@mui/x-data-grid";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  FaBed,
  FaDownload,
  FaFileImport,
  FaSave,
  FaUser,
} from "react-icons/fa";
import { utils, writeFile } from "xlsx";
import * as XLSX from "xlsx";
import { TokenRequest, publicRequest } from "../../RequestMethod/Request";
import { RiLockPasswordFill } from "react-icons/ri";

const DataStudent = () => {
  const importRef = useRef(null);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [rows, setRows] = useState([]);
  const [selectedSchool, setSelectedSchool] = useState("");
  const [selectedDormitory, setSelectedDormitory] = useState("");
  const [schools, setSchools] = useState([]);
  const [dormitories, setDormitories] = useState([]);
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
    { field: "room", headerName: "Room", width: 150 },
  ];
  useEffect(() => {
    const fetchAllDorm = async () => {
      const res = await TokenRequest.get(`/dorms/v2/all`);
      setDormitories(res.data);
    };
    const fetchAllSchool = async () => {
      const res = await publicRequest.get(`/schools/v4/allschool`);
      setSchools(res.data);
    };
    fetchAllSchool();
    fetchAllDorm();
  }, []);

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
    try {
      const promises = rows.map(async (item) => {
        console.log(item);
        const {
          username,
          firstName,
          lastName,
          age,
          nationality,
          gender,
          email,
          phoneNumber,
          facebook,
          zalo,
          // avatar,
          room,
          major,
        } = item;
        const response = await publicRequest.post("/users/v1/register", {
          username,
          password,
          confirmPassword,
          firstName,
          lastName,
          age,
          nationality,
          gender,
          email,
          phoneNumber,
          facebook,
          zalo,
          // avatar,
          room,
          major,
          schoolId: selectedSchool,
          dormitoryId: selectedDormitory,
        });

        return response.data;
      });

      const results = await Promise.all(promises);
      console.log(results);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChangeInput = (e, field) => {
    const value = e.target.value;
    if (field === "password") {
      setPassword(value);
    } else if (field === "confirmPassword") {
      setConfirmPassword(value);
    } else if (field === "selectedSchool") {
      setSelectedSchool(value);
    } else if (field === "selectedDormitory") {
      setSelectedDormitory(value);
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
          <div className="cursor-pointer rounded-md overflow-hidden shadow-md border border-blue-600 flex items-center justify-center transition duration-300">
            <FaUser className="text-blue-600 mx-2" size={25} />
            <select
              value={selectedSchool}
              onChange={(e) => handleChangeInput(e, "selectedSchool")}
              className="bg-transparent outline-none border-none p-2 text-blue-600 placeholder-blue-600 w-full"
              style={{ borderRadius: "inherit" }}
            >
              <option value="">Select a School...</option>
              {schools.map((school) => (
                <option key={school.id} value={school.id}>
                  {school.schoolName}
                </option>
              ))}
            </select>
          </div>
          <div className="cursor-pointer rounded-md overflow-hidden shadow-md border border-blue-600 flex items-center justify-center transition duration-300">
            <FaBed className="text-blue-600 mx-2" size={25} />
            <select
              value={selectedDormitory}
              onChange={(e) => handleChangeInput(e, "selectedDormitory")}
              className="bg-transparent outline-none border-none p-2 text-blue-600 placeholder-blue-600 w-full"
              style={{ borderRadius: "inherit" }}
            >
              <option value="">Select a Dormitory...</option>
              {dormitories.map((dormitory) => (
                <option key={dormitory.id} value={dormitory.id}>
                  {dormitory.dormName}
                </option>
              ))}
            </select>
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
