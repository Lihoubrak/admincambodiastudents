import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  DetailInfoPassport,
  DetailMajor,
  DetailPassport,
  DetailRoom,
  DetailStudent,
  DetailUniversity,
  DetailInfoVisa,
  Dormitory,
  ElectricityLookup,
  ElectricityWater,
  Healthcare,
  Inbox,
  Passport,
  Scholarships,
  StudentRoom,
  StudentTasks,
  University,
  WaterLookup,
  Program,
  DetailProgram,
} from "./pages";
import GlobalLayout from "./layouts/GlobalLayout";
const App = () => {
  return (
    <BrowserRouter>
      <GlobalLayout>
        <Routes>
          <Route path="/university" element={<University />} />
          <Route
            path="/university/:universityId"
            element={<DetailUniversity />}
          />
          <Route path="/university/major/:majorId" element={<DetailMajor />} />
          <Route
            path="/university/student/:studentId"
            element={<DetailStudent />}
          />
          <Route path="/dormitory" element={<Dormitory />} />
          <Route path="/dormitory/:dormId" element={<StudentRoom />} />
          <Route path="/dormitory/room/:roomId" element={<DetailRoom />} />
          <Route path="/tasks" element={<StudentTasks />} />
          <Route path="/inbox" element={<Inbox />} />
          <Route path="/scholarships" element={<Scholarships />} />
          <Route path="/passport" element={<Passport />} />
          <Route path="/passport/:passportId" element={<DetailPassport />} />
          <Route path="/passport/visa/:visaId" element={<DetailInfoVisa />} />
          <Route
            path="/passport/detailpassport/:detailpassportId"
            element={<DetailInfoPassport />}
          />
          <Route path="/healthcare" element={<Healthcare />} />
          <Route path="/electricitywater" element={<ElectricityWater />} />
          <Route
            path="/electricity/:electricityId"
            element={<ElectricityLookup />}
          />
          <Route path="/water/:waterId" element={<WaterLookup />} />
          <Route path="/" element={<Program />} />
          <Route
            path="/detailProgram/:detailProgramId"
            element={<DetailProgram />}
          />
        </Routes>
      </GlobalLayout>
    </BrowserRouter>
  );
};

export default App;
