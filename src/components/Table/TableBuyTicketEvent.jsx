import { DataGrid } from "@mui/x-data-grid";
import React, { useCallback } from "react";
import {
  FaDownload,
  FaFileImport,
  FaPlus,
  FaSave,
  FaTrash,
} from "react-icons/fa";
import * as XLSX from "xlsx";
import { TokenRequest } from "../../RequestMethod/Request";
const TableBuyTicketEvent = ({
  setIsModalOpenBuyTicket,
  formatTicket,
  loading,
  ticketError,
  setTicket,
  ticket,
}) => {
  const columnsTicket = [
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
    {
      field: "phoneNumber",
      headerName: "Phone Number",
      width: 150,
      editable: true,
    },
    { field: "zalo", headerName: "Zalo", width: 150, editable: true },
    { field: "room", headerName: "Room", width: 150, editable: true },
    { field: "dormitory", headerName: "Dormitory", width: 150, editable: true },
    {
      field: "price",
      headerName: "Price Per Student",
      width: 150,
      editable: true,
    },
    {
      field: "number",
      headerName: "Number Of Ticket",
      width: 150,
      editable: true,
    },
    { field: "payMoney", headerName: "PayMoney", width: 150, editable: true },
    {
      field: "typePayMoney",
      headerName: "TypePayMoney",
      width: 150,
      editable: true,
    },
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
  const exportFile = useCallback(() => {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(formatTicket);
    XLSX.utils.book_append_sheet(wb, ws, "Data");
    XLSX.writeFile(wb, "Ticket.xlsx");
  }, [formatTicket]);
  const totalMoney = formatTicket.reduce((accumulator, currentItem) => {
    const payMoney = parseFloat(currentItem.payMoney);
    if (!isNaN(payMoney)) {
      return accumulator + payMoney;
    } else {
      return accumulator;
    }
  }, 0);
  const handleDelete = async (id) => {
    try {
      const response = await TokenRequest.delete(
        `/ticketevents/v17/delete/${id}`
      );
      if (response.status === 200) {
        setTicket(ticket.filter((tickets) => tickets.id !== id));
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div className="flex items-center justify-between my-4">
        <h2 className="text-2xl font-bold mb-2 text-blue-700">
          TICKET IN PROGRAM
        </h2>
        <div className="flex items-center gap-4">
          <div
            onClick={() => setIsModalOpenBuyTicket(true)}
            className="cursor-pointer p-2 rounded-md overflow-hidden shadow-md border border-blue-600 flex items-center justify-center bg-blue-600 hover:bg-blue-700 transition duration-300"
          >
            <FaPlus className="text-white text-2xl" />
          </div>
          <button
            onClick={formatTicket.length > 0 ? exportFile : null}
            className={`cursor-pointer p-2 rounded-md overflow-hidden shadow-md border border-yellow-600 flex items-center justify-center bg-yellow-600 ${
              formatTicket.length > 0 && "hover:bg-yellow-700"
            } ${
              formatTicket.length === 0 && "opacity-50 cursor-not-allowed"
            } transition duration-300`}
            disabled={formatTicket.length === 0}
          >
            <FaDownload className="text-white text-2xl" />
          </button>
        </div>
      </div>
      <div style={{ height: 400, width: "100%", overflow: "auto" }}>
        <DataGrid
          rows={formatTicket}
          columns={columnsTicket}
          pageSize={5}
          rowsPerPageOptions={[5, 10, 20]}
          disableSelectionOnClick
          loading={loading}
          localeText={{
            noRowsLabel: !ticketError
              ? "No ticket events found for the given event"
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
          TOTAL BUY TICKET
        </h2>
        <p className="font-bold">Total: {totalMoney} dong</p>
      </div>
    </div>
  );
};

export default TableBuyTicketEvent;
