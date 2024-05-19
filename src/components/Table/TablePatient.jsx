import { DataGrid } from "@mui/x-data-grid";
import React, { useCallback, useRef, useState } from "react";
import {
  FaDownload,
  FaEdit,
  FaFileImport,
  FaInfoCircle,
  FaPlus,
  FaSave,
} from "react-icons/fa";
import { utils, writeFile } from "xlsx";
import * as XLSX from "xlsx";
import ModalDeatilPatients from "../Modal/ModalDeatilPatients";
import ModalEditPatients from "../Modal/ModalEditPatients";
const TablePatient = ({
  formatPatient,
  openPatientModal,
  setPatients,
  patientError,
  loading,
  patients,
}) => {
  const [healthcareId, setHealthcare] = useState(null);
  const [isModalDetail, setIsModalDetail] = useState(false);
  const [isModalEdit, setIsModalEdit] = useState(false);
  const handleDetail = (id) => {
    setHealthcare(id);
    setIsModalDetail(true);
  };
  const handleEdit = (id) => {
    setHealthcare(id);
    setIsModalEdit(true);
  };
  const patientColumns = [
    { field: "no", headerName: "No", width: 120, editable: true },
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
    { field: "birthday", headerName: "Birthday", width: 100, editable: true },
    { field: "gender", headerName: "Gender", width: 100, editable: true },
    {
      field: "phoneNumber",
      headerName: "Phone Number",
      width: 150,
      editable: true,
    },
    { field: "room", headerName: "Room", width: 150, editable: true },
    { field: "dormitory", headerName: "Dormitory", width: 150, editable: true },
    {
      field: "typeofDisease",
      headerName: "Type of Disease",
      width: 150,
      editable: true,
    },
    { field: "cost", headerName: "Cost", width: 150, editable: true },
    { field: "discount", headerName: "Discount", width: 150, editable: true },
    {
      field: "totalPatientPay",
      headerName: "Total Patient Pay",
      width: 200,
      editable: true,
    },
    { field: "date", headerName: "Date", width: 150, editable: true },
    { field: "hospital", headerName: "Hospital", width: 150, editable: true },
    { field: "note", headerName: "Note", width: 150, editable: true },
    {
      field: "delete",
      headerName: "Action",
      width: 120,
      renderCell: (params) => (
        <>
          <button
            onClick={() => handleEdit(params.row.id)}
            className="p-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 mr-2"
          >
            <FaEdit />
          </button>
          <button
            onClick={() => handleDetail(params.row.id)}
            className="p-1 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            <FaInfoCircle />
          </button>
        </>
      ),
    },
  ];
  const importRef = useRef(null);
  const exportFileOfPatient = useCallback(() => {
    const ws = utils.json_to_sheet(formatPatient);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, "Patients Data");
    writeFile(wb, "patients.xlsx");
  }, [formatPatient]);
  const importFileOfPatient = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0]; // Assuming you want the first sheet
      const sheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(sheet);
      setPatients(jsonData);
    };
    reader.readAsArrayBuffer(file);
  };
  const handleClickIconImport = () => {
    importRef.current.click();
  };
  const totalDiscount = formatPatient.reduce(
    (total, patient) => total + parseFloat(patient.discount),
    0
  );
  const handleSave = () => {};
  return (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold mb-2 text-blue-700">PATIENTS</h2>
        <div className="flex items-center gap-4">
          <div
            onClick={openPatientModal}
            className="cursor-pointer p-2 rounded-md overflow-hidden shadow-md border border-blue-600 flex items-center justify-center bg-blue-600 hover:bg-blue-700 transition duration-300"
          >
            <FaPlus className="text-white text-2xl" />
          </div>
          <button
            onClick={formatPatient.length > 0 ? exportFileOfPatient : null}
            className={`cursor-pointer p-2 rounded-md overflow-hidden shadow-md border border-yellow-600 flex items-center justify-center bg-yellow-600 ${
              formatPatient.length > 0 && "hover:bg-yellow-700"
            } ${
              formatPatient.length === 0 && "opacity-50 cursor-not-allowed"
            } transition duration-300`}
            disabled={formatPatient.length === 0}
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
                importFileOfPatient(file);
              }}
            />
            <FaFileImport
              onClick={handleClickIconImport}
              className="text-white text-2xl"
            />
          </div>
          <button
            onClick={formatPatient.length > 0 ? handleSave : null}
            className={`cursor-pointer p-2 rounded-md overflow-hidden shadow-md border border-blue-600 flex items-center justify-center bg-blue-600 ${
              formatPatient.length > 0
                ? "hover:bg-blue-700"
                : "opacity-50 cursor-not-allowed"
            } transition duration-300`}
          >
            <FaSave className="text-white text-2xl" />
          </button>
        </div>
      </div>
      <div style={{ height: 400, width: "100%", overflow: "auto" }}>
        <DataGrid
          rows={formatPatient}
          columns={patientColumns}
          pageSize={5}
          rowsPerPageOptions={[5, 10, 20]}
          disableSelectionOnClick
          loading={loading}
          // localeText={{ noRowsLabel: patientError }}
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
      <div className="mb-4">
        <h2 className="text-xl font-bold mb-2 text-red-700">
          Total Support Provided
        </h2>
        <p className="font-bold">
          Total: {totalDiscount.toLocaleString()} dong
        </p>
      </div>
      <ModalDeatilPatients
        healthcareId={healthcareId}
        isModalDetail={isModalDetail}
        setIsModalDetail={setIsModalDetail}
      />
      <ModalEditPatients
        healthcareId={healthcareId}
        isModalEdit={isModalEdit}
        setIsModalEdit={setIsModalEdit}
        setPatients={setPatients}
        patients={patients}
      />
    </div>
  );
};

export default TablePatient;
