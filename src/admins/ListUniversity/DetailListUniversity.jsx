import React, { useCallback, useEffect, useState } from "react";
import Select from "react-select";
import { MdBedroomChild, MdOutlineAdminPanelSettings } from "react-icons/md";
import { useParams } from "react-router-dom";
import * as XLSX from "xlsx";
import { TokenRequest, publicRequest } from "../../RequestMethod/Request";
import { DataGrid } from "@mui/x-data-grid";
import {
  FaDownload,
  FaEdit,
  FaInfoCircle,
  FaPlus,
  FaUniversity,
} from "react-icons/fa";
import { ModalCreateManagerUniversity } from "../../components";
const DetailListUniversity = () => {
  const [selectedYear, setSelectedYear] = useState();
  const [listStudent, setListStudent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { universityId } = useParams();
  const [addManager, setAddManager] = useState(false);
  const openModal = () => {
    setAddManager(true);
  };
  const closeModal = () => {
    setAddManager(false);
  };
  const handleYearChange = (selectedOption) => {
    setSelectedYear(selectedOption.value);
  };

  const handleEdit = (id) => {
    setEditingRow(id);
    setIsModalOpen(true);
  };

  const handleDetail = (id) => {
    setEditingRow(id);
    setDetailModalOpen(true);
  };

  const columns = [
    { field: "id", headerName: "ID", width: 120, editable: true },
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
    { field: "birthday", headerName: "Birthday", width: 100 },
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
    { field: "major", headerName: "Major", width: 150, editable: true },
    { field: "school", headerName: "School", width: 150, editable: true },
    { field: "degree", headerName: "Degree", width: 150, editable: true },
    { field: "year", headerName: "YearStudy", width: 150, editable: true },
    {
      field: "graduated",
      headerName: "Graduated",
      width: 150,
      renderCell: ({ row }) => {
        return (
          <span
            className={`text-sm font-medium ${
              row.graduated ? "text-green-600" : "text-red-600"
            }`}
          >
            {row.graduated ? "Graduated" : "Not Graduated"}
          </span>
        );
      },
    },
    // {
    //   field: "actions",
    //   headerName: "Actions",
    //   width: 150,
    //   renderCell: ({ row }) => (
    //     <div>
    //       <button
    //         onClick={() => handleEdit(row.id)}
    //         className="p-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 mr-2"
    //       >
    //         <FaEdit />
    //       </button>
    //       <button
    //         onClick={() => handleDetail(row.id)}
    //         className="p-1 bg-green-500 text-white rounded-md hover:bg-green-600"
    //       >
    //         <FaInfoCircle />
    //       </button>
    //     </div>
    //   ),
    // },
  ];

  const yearOptions = [
    {
      value: new Date().getFullYear().toString(),
      label: new Date().getFullYear().toString(),
    },
    { value: "2023", label: "2023" },
  ];
  const fetchStudents = async () => {
    setLoading(true);
    try {
      const res = await TokenRequest.get(
        `/schools/v4/all/student/${universityId}?year=${
          selectedYear ? selectedYear : new Date().getFullYear().toString()
        }`
      );

      setListStudent(res.data);
      setLoading(false);
      setError(null);
    } catch (error) {
      setListStudent([]);
      setError(error.response.data.error);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchStudents();
  }, [universityId, selectedYear]);
  const formattedData = listStudent.map((item, index) => ({
    id: item.id,
    avatar: item.avatar,
    firstName: item.firstName,
    lastName: item.lastName,
    gender: item.gender,
    birthday: item.birthday,
    nationality: item.nationality,
    email: item.email,
    phoneNumber: item.phoneNumber,
    facebook: item.facebook,
    zalo: item.zalo,
    degree: item.degree,
    year: item.year,
    major: item.Major ? item.Major.majorName : "",
    school: item.Major ? item.Major.School.schoolName : "",
    graduated: item.graduated,
  }));
  const exportFile = useCallback(() => {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(formattedData);
    XLSX.utils.book_append_sheet(wb, ws, "Data");
    XLSX.writeFile(wb, "ListStudent.xlsx");
  }, [formattedData]);

  return (
    <div>
      <div className="flex justify-center items-center">
        <h1 className="text-4xl gap-3 flex items-center font-bold mb-8 text-center text-blue-600">
          <FaUniversity size={70} />
          <span>LIST STUDENT IN UNIVERSITY</span>
        </h1>
      </div>
      <div className="flex items-center gap-4 mb-4">
        <Select
          value={yearOptions.find((option) => option.value === selectedYear)}
          onChange={handleYearChange}
          options={yearOptions}
          defaultValue={yearOptions[0]}
          placeholder="Select Year"
          className="w-40"
        />
        <button
          onClick={formattedData.length > 0 ? exportFile : null}
          className={`cursor-pointer p-2 rounded-md overflow-hidden shadow-md border border-yellow-600 flex items-center justify-center bg-yellow-600 ${
            formattedData.length > 0 && "hover:bg-yellow-700"
          } ${
            formattedData.length === 0 && "opacity-50 cursor-not-allowed"
          } transition duration-300`}
          disabled={formattedData.length === 0}
        >
          <FaDownload className="text-white text-2xl" />
        </button>
        <button
          onClick={openModal}
          className="p-2 rounded-md overflow-hidden shadow-md border border-green-600 flex items-center justify-center bg-green-600 hover:bg-green-700 transition duration-300"
        >
          <MdOutlineAdminPanelSettings className="text-white text-2xl" />
        </button>
      </div>

      <div style={{ height: 350, width: "100%", overflow: "auto" }}>
        <DataGrid
          editMode="cell"
          rows={formattedData}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10, 20]}
          disableSelectionOnClick
          loading={loading}
          localeText={{ noRowsLabel: error }}
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
      <ModalCreateManagerUniversity
        isOpen={addManager}
        closeModal={closeModal}
        universityId={universityId}
      />
    </div>
  );
};

export default DetailListUniversity;
