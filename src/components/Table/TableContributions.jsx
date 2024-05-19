import { DataGrid } from "@mui/x-data-grid";
import React, { useCallback, useRef } from "react";
import { FaDownload, FaFileImport, FaPlus } from "react-icons/fa";
import { utils, writeFile } from "xlsx";
const TableContributions = ({
  openStudentContributionModal,
  formatStudentContributions,
  studentContributionsError,
  loading,
}) => {
  const studentColumns = [
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
    { field: "birthday", headerName: "Birthday", width: 100, editable: true },
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
  ];
  const exportFileOfContribution = useCallback(() => {
    const ws = utils.json_to_sheet(formatStudentContributions);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, "Contributions Data");
    writeFile(wb, "contributions.xlsx");
  }, [formatStudentContributions]);
  const totalStudentContribution = formatStudentContributions.reduce(
    (total, student) => total + parseFloat(student.payMoney),
    0
  );
  return (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold mb-2 text-blue-700">
          STUDENT CONTRIBUTIONS
        </h2>
        <div className="flex items-center gap-4">
          <div className="cursor-pointer p-2 rounded-md overflow-hidden shadow-md border border-blue-600 flex items-center justify-center bg-blue-600 hover:bg-blue-700 transition duration-300">
            <FaPlus
              onClick={openStudentContributionModal}
              className="text-white text-2xl"
            />
          </div>
          <button
            onClick={
              formatStudentContributions.length > 0
                ? exportFileOfContribution
                : null
            }
            className={`cursor-pointer p-2 rounded-md overflow-hidden shadow-md border border-yellow-600 flex items-center justify-center bg-yellow-600 ${
              formatStudentContributions.length > 0 && "hover:bg-yellow-700"
            } ${
              formatStudentContributions.length === 0 &&
              "opacity-50 cursor-not-allowed"
            } transition duration-300`}
            disabled={formatStudentContributions.length === 0}
          >
            <FaDownload className="text-white text-2xl" />
          </button>
        </div>
      </div>
      <div style={{ height: 400, width: "100%", overflow: "auto" }}>
        <DataGrid
          rows={formatStudentContributions}
          columns={studentColumns}
          pageSize={5}
          rowsPerPageOptions={[5, 10, 20]}
          disableSelectionOnClick
          loading={loading}
          localeText={{
            noRowsLabel: !studentContributionsError
              ? "No contributions events found for the given event"
              : "No data",
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
      <div className="mb-4">
        <h2 className="text-xl font-bold mb-2 text-red-700">
          Total Contribution
        </h2>
        <p className="font-bold">
          Total: {totalStudentContribution.toLocaleString()} dong
        </p>
      </div>
    </div>
  );
};

export default TableContributions;
