import { DataGrid } from "@mui/x-data-grid";
import React, { useCallback, useRef } from "react";
import {
  FaDownload,
  FaFileImport,
  FaPlus,
  FaSave,
  FaTrash,
} from "react-icons/fa";
import * as XLSX from "xlsx"; // Add this import
import { TokenRequest, publicRequest } from "../../RequestMethod/Request";
const TableSupportProgram = ({
  formatSupport,
  setIsModalOpenCreateSupport,
  loading,
  programId,
  setSupport,
  supportError,
  support,
}) => {
  const handleDelete = async (id) => {
    try {
      const response = await TokenRequest.delete(
        `/supportevents/v14/delete/${id}`
      );
      if (response.status === 200) {
        setSupport(support.filter((supporta) => supporta.id !== id));
      }
    } catch (error) {
      console.log(error);
    }
  };
  const columnsSupport = [
    { field: "no", headerName: "No", width: 100, editable: true },
    { field: "supportName", headerName: "Name", width: 100, editable: true },
    {
      field: "supportSpecific",
      headerName: "Support",
      width: 100,
      editable: true,
    },
    { field: "typePay", headerName: "typePay", width: 100, editable: true },
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
  const importRef = useRef(null);
  const exportFile = useCallback(() => {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(formatSupport);
    XLSX.utils.book_append_sheet(wb, ws, "Data");
    XLSX.writeFile(wb, "Support.xlsx");
  }, [formatSupport]);
  const importFile = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(sheet);
      setSupport(jsonData);
    };
    reader.readAsArrayBuffer(file);
  };
  const handleClickIconImport = () => {
    importRef.current.click();
  };
  const handleSave = async () => {
    try {
      const promises = formatSupport.map(async (item, index) => {
        const res = await publicRequest.post(`/supportevents/v14/create`, {
          supportName: item.supportName,
          supportSpecific: item.supportSpecific,
          date: item.date,
          typePay: item.typePay,
          eventId: programId,
        });
        return res.data;
      });

      await Promise.all(promises);
    } catch (error) {}
  };
  const totalMoney = formatSupport.reduce((accumulator, current) => {
    const supportSpecific = parseFloat(current.supportSpecific);
    if (!isNaN(supportSpecific)) {
      // Add the total value to the accumulator
      return accumulator + supportSpecific;
    } else {
      // Return the accumulator unchanged if total is not a valid number
      return accumulator;
    }
  }, 0);
  return (
    <div>
      <div className="flex items-center justify-between my-4">
        <h2 className="text-2xl font-bold mb-2 text-blue-700">
          SUPPORT IN PROGRAM
        </h2>
        <div className="flex items-center gap-4">
          <div
            onClick={() => setIsModalOpenCreateSupport(true)}
            className="cursor-pointer p-2 rounded-md overflow-hidden shadow-md border border-blue-600 flex items-center justify-center bg-blue-600 hover:bg-blue-700 transition duration-300"
          >
            <FaPlus className="text-white text-2xl" />
          </div>
          <button
            onClick={formatSupport.length > 0 ? exportFile : null}
            className={`cursor-pointer p-2 rounded-md overflow-hidden shadow-md border border-yellow-600 flex items-center justify-center bg-yellow-600 ${
              formatSupport.length > 0 && "hover:bg-yellow-700"
            } ${
              formatSupport.length === 0 && "opacity-50 cursor-not-allowed"
            } transition duration-300`}
            disabled={formatSupport.length === 0}
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
            onClick={formatSupport.length > 0 ? handleSave : null}
            className={`cursor-pointer p-2 rounded-md overflow-hidden shadow-md border border-blue-600 flex items-center justify-center bg-blue-600 ${
              formatSupport.length > 0
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
          rows={formatSupport}
          columns={columnsSupport}
          pageSize={5}
          rowsPerPageOptions={[5, 10, 20]}
          disableSelectionOnClick
          loading={loading}
          localeText={{
            noRowsLabel: !supportError
              ? "No support events found for the given event"
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
      <div className="mt-4">
        <h2 className="text-lg font-bold mb-2 text-red-700">
          TOTAL PRODUCTS IN PROGRAM
        </h2>
        <p className="font-bold">Total: {totalMoney} dong</p>
      </div>
    </div>
  );
};

export default TableSupportProgram;
