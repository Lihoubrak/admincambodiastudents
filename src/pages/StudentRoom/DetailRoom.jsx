import React, { useState } from "react";
import Select from "react-select";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { ModalDetailStudent, ModalEditStudent } from "../../components";
import { MdBedroomChild } from "react-icons/md";
const DetailRoom = () => {
  const [selectedYear, setSelectedYear] = useState(null);
  const [editingRow, setEditingRow] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedData, setEditedData] = useState(initialEditedData());
  const [detailModalOpen, setDetailModalOpen] = useState(false);

  function initialEditedData() {
    return {
      id: null,
      firstName: "",
      lastName: "",
      gender: "",
      dateOfBirth: "",
      school: "",
      major: "",
      country: "",
      class: "",
    };
  }

  const handleYearChange = (selectedOption) => {
    setSelectedYear(selectedOption);
    // Add logic here to fetch and display students for the selected year
  };

  const handleEdit = (row) => {
    setEditingRow(row.id);
    setEditedData({ ...row });
    setIsModalOpen(true);
  };

  const handleDetail = (row) => {
    setDetailModalOpen(true);
  };

  const handleSaveEdit = () => {
    // Implement logic to save the edited data and update the state
    console.log("Edited Data:", editedData);

    setEditingRow(null);
    setIsModalOpen(false);
  };

  const generateMockData = () => {
    const mockData = [];

    for (let i = 1; i <= 3; i++) {
      mockData.push({
        id: i,
        firstName: `FirstName${i}`,
        lastName: `LastName${i}`,
        gender: i % 2 === 0 ? "Male" : "Female",
        dateOfBirth: `DOB${i}`,
        school: `School${i}`,
        major: `Major${i}`,
        country: `Country${i}`,
        class: `Class${(i % 3) + 1}`,
      });
    }

    return mockData;
  };

  const columns = [
    { id: "id", label: "ID", minWidth: 120 },
    { id: "firstName", label: "First Name" },
    { id: "lastName", label: "Last Name" },
    { id: "gender", label: "Gender" },
    { id: "dateOfBirth", label: "Date Of Birth" },
    { id: "school", label: "School" },
    { id: "major", label: "Major" },
    { id: "country", label: "Country" },
    { id: "class", label: "Class" },
  ];

  const yearOptions = [
    { value: 2022, label: "2022" },
    { value: 2023, label: "2023" },
    // Add more years as needed
  ];

  return (
    <div>
      <div className="flex justify-center items-center">
        <h1 className="text-4xl gap-3 flex items-center font-bold mb-8 text-center text-blue-600">
          <MdBedroomChild size={70} />
          <span>ROOM 101</span>
        </h1>
      </div>
      <div className="flex items-center gap-4 mb-4">
        <Select
          value={selectedYear}
          onChange={handleYearChange}
          options={yearOptions}
          placeholder="Select Year"
          className="w-40"
        />
      </div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align="left"
                  className="font-bold bg-gray-200 text-sm"
                >
                  {column.label}
                </TableCell>
              ))}
              <TableCell align="left" className="font-bold bg-gray-200 text-sm">
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {generateMockData().map((row) => (
              <TableRow key={row.id}>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align="left"
                    className="border p-2 text-sm"
                  >
                    {row[column.id]}
                  </TableCell>
                ))}
                <TableCell align="left" className="border p-2 space-x-1">
                  <button
                    className="bg-blue-500 text-white px-2 py-1 rounded"
                    onClick={() => handleEdit(row)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-green-500 text-white px-2 py-1 rounded"
                    onClick={() => handleDetail(row)}
                  >
                    Detail
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <ModalEditStudent
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
      <ModalDetailStudent
        detailModalOpen={detailModalOpen}
        setDetailModalOpen={setDetailModalOpen}
      />
    </div>
  );
};
export default DetailRoom;
