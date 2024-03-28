import { DataGrid } from "@mui/x-data-grid";
import React from "react";
import { GiSoccerBall, GiTrophyCup } from "react-icons/gi";
const DetailSport = () => {
  const sportEvent = {
    eventName: "Football Match",
    eventDate: "2024-03-25",
    eventLocation: "Stadium ABC",
    eventDescription: "Exciting football match between Team A and Team B",
    createdBy: "John Doe",
  };

  const { eventName, eventDate, eventLocation, eventDescription, createdBy } =
    sportEvent;
  const rows = [{ id: 1, team: "HUST", location: "Ha Noi" }];
  const columnsTeam = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "team", headerName: "Team Name", width: 150 },
    { field: "location", headerName: "Location", width: 150 },
  ];
  return (
    <div>
      <h1 className="text-4xl flex justify-center items-center font-bold mb-8 text-center text-blue-600">
        <GiSoccerBall size={50} className="mr-3" />
        SPORT
      </h1>
      <div className="max-w-md">
        <ul>
          <li className="mb-4">
            <span className="text-gray-700 font-bold">Event Name:</span>
            <span className="text-gray-900">{eventName}</span>
          </li>
          <li className="mb-4">
            <span className="text-gray-700 font-bold">Event Date:</span>
            <span className="text-gray-900">{eventDate}</span>
          </li>
          <li className="mb-4">
            <span className="text-gray-700 font-bold">Event Location:</span>
            <span className="text-gray-900">{eventLocation}</span>
          </li>
          <li className="mb-4">
            <span className="text-gray-700 font-bold">Event Description:</span>
            <span className="text-gray-900">{eventDescription}</span>
          </li>
          <li className="mb-4">
            <span className="text-gray-700 font-bold">Created By:</span>
            <span className="text-gray-900">{createdBy}</span>
          </li>
        </ul>
      </div>
      <div className="flex justify-center items-center border-t mb-4">
        <div className="mt-4">
          <div className="text-center">
            <GiTrophyCup
              className="w-16 h-16 mx-auto text-gold"
              color="#FFD700"
            />
            <p className="text-red-600 font-bold ">Team 1</p>
          </div>
          <div className="flex justify-center space-x-96">
            <div className="text-center">
              <GiTrophyCup
                className="w-16 h-16 mx-auto text-gold"
                color="#FFD700"
              />
              <p className="text-green-600 font-bold">Team 1</p>
            </div>
            <div className="text-center">
              <GiTrophyCup
                className="w-16 h-16 mx-auto text-gold"
                color="#FFD700"
              />
              <p className="text-blue-600 font-bold">Team 1</p>
            </div>
          </div>
        </div>
      </div>

      <div style={{ height: 400, width: "100%", overflow: "auto" }}>
        <DataGrid
          rows={rows}
          columns={columnsTeam}
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

export default DetailSport;
