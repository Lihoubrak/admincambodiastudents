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
import { publicRequest } from "../../RequestMethod/Request";

const TableProductProgram = ({
  formatProduct,
  setIsModalOpenCreate,
  setProducts,
  loading,
  programId,
  productError,
}) => {
  const handleDelete = (id) => {};
  const columnsProduct = [
    { field: "id", headerName: "No", width: 100, editable: true },
    {
      field: "productName",
      headerName: "Product Name",
      width: 200,
      editable: true,
    },
    {
      field: "productQuantity",
      headerName: "Quantity",
      width: 150,
      editable: true,
    },
    {
      field: "productPriceUnit",
      headerName: "Price (per unit)",
      width: 200,
      editable: true,
    },
    {
      field: "total",
      headerName: "Total",
      width: 150,
      editable: true,
    },
    {
      field: "dateBuy",
      headerName: "Purchase Date",
      width: 200,
      editable: true,
    },
    { field: "note", headerName: "Note", width: 300, editable: true },
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
    const ws = XLSX.utils.json_to_sheet(formatProduct);
    XLSX.utils.book_append_sheet(wb, ws, "Data");
    XLSX.writeFile(wb, "Product.xlsx");
  }, [formatProduct]);
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
      setProducts(jsonData);
    };
    reader.readAsArrayBuffer(file);
  };
  const handleSave = async () => {
    try {
      const promises = formatProduct.map(async (productEvent) => {
        const res = await publicRequest.post("/productevents/v10/create", {
          productName: productEvent.productName,
          productQuantity: productEvent.productQuantity,
          productPriceUnit: productEvent.productPriceUnit,
          dateBuy: productEvent.dateBuy,
          note: productEvent.note,
          eventId: programId,
        });
        return res.data;
      });
      const responses = await Promise.all(promises);
    } catch (error) {
      console.error("Error saving product events:", error);
    }
  };
  const totalMoney = formatProduct.reduce((accumulator, current) => {
    const total = parseFloat(current.total);
    if (!isNaN(total)) {
      // Add the total value to the accumulator
      return accumulator + total;
    } else {
      // Return the accumulator unchanged if total is not a valid number
      return accumulator;
    }
  }, 0); // Initial value of the accumulator is set to 0
  return (
    <div>
      <div className="flex items-center justify-between my-4">
        <h2 className="text-2xl font-bold mb-2 text-blue-700">PRODUCTS</h2>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <div
              onClick={() => setIsModalOpenCreate(true)}
              className="cursor-pointer p-2 rounded-md overflow-hidden shadow-md border border-blue-600 flex items-center justify-center bg-blue-600 hover:bg-blue-700 transition duration-300"
            >
              <FaPlus className="text-white text-2xl" />
            </div>
            <button
              onClick={formatProduct.length > 0 ? exportFile : null}
              className={`cursor-pointer p-2 rounded-md overflow-hidden shadow-md border border-yellow-600 flex items-center justify-center bg-yellow-600 ${
                formatProduct.length > 0 && "hover:bg-yellow-700"
              } ${
                formatProduct.length === 0 && "opacity-50 cursor-not-allowed"
              } transition duration-300`}
              disabled={formatProduct.length === 0}
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
              onClick={formatProduct.length > 0 ? handleSave : null}
              className={`cursor-pointer p-2 rounded-md overflow-hidden shadow-md border border-blue-600 flex items-center justify-center bg-blue-600 ${
                formatProduct.length > 0
                  ? "hover:bg-blue-700"
                  : "opacity-50 cursor-not-allowed"
              } transition duration-300`}
            >
              <FaSave className="text-white text-2xl" />
            </button>
          </div>
        </div>
      </div>
      <div style={{ height: 400, width: "100%", overflow: "auto" }}>
        <DataGrid
          rows={formatProduct}
          columns={columnsProduct}
          pageSize={5}
          rowsPerPageOptions={[5, 10, 20]}
          disableSelectionOnClick
          loading={loading}
          localeText={{
            noRowsLabel: productError,
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
          TOTAL SUPPORT IN PROGRAM
        </h2>
        <p className="font-bold">Total: {totalMoney} dong</p>
      </div>
    </div>
  );
};

export default TableProductProgram;
