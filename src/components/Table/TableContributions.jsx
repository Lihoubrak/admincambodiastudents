import { DataGrid } from "@mui/x-data-grid";
import React from "react";

const TableContributions = ({ rows, columns }) => {
  return (
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
  );
};

export default TableContributions;
