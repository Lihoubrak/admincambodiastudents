import React, { useCallback, useState } from "react";
import { FaCheck, FaDownload, FaFileImport, FaPlus } from "react-icons/fa";
import Select from "react-select";
import {
  ModalCreatePatient,
  ModalCreateStudentContribution,
  TableContributions,
  TablePatient,
} from "../../components";
import { PieChart, Pie, Cell, Legend, Tooltip } from "recharts";
import { MdHealthAndSafety } from "react-icons/md";
import { utils, writeFile } from "xlsx";
import * as XLSX from "xlsx";
import { useRef } from "react";
const Healthcare = () => {
  const importRef = useRef(null);
  const patients = [
    { id: 1, name: "Patient 1", condition: "Cold", cost: 250000 },
    { id: 2, name: "Patient 2", condition: "Fever", cost: 500000 },
    { id: 3, name: "Patient 3", condition: "Injury", cost: 800000 },
  ];

  const studentContributions = [
    { id: 1, name: "Student 1", amount: 20000 },
    { id: 2, name: "Student 2", amount: 20000 },
    { id: 3, name: "Student 3", amount: 20000 },
  ];

  const patientColumns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "name", headerName: "Name", width: 150 },
    { field: "condition", headerName: "Condition", width: 150 },
    { field: "cost", headerName: "Cost", width: 150 },
  ];

  const studentColumns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "name", headerName: "Name", width: 150 },
    { field: "amount", headerName: "Amount", width: 150 },
  ];
  const calculateSupportAmount = (cost) => {
    if (cost < 300000) {
      return 0;
    } else if (cost >= 300000 && cost < 1000000) {
      return cost * 0.7;
    } else if (cost >= 1000000 && cost < 5000000) {
      return cost * 0.6;
    } else if (cost >= 5000000 && cost < 10000000) {
      return cost * 0.5;
    } else {
      return 5000000;
    }
  };

  const totalSupportAmount = patients.reduce(
    (total, patient) => total + calculateSupportAmount(patient.cost),
    0
  );

  const totalStudentContribution = studentContributions.reduce(
    (total, student) => total + student.amount,
    0
  );

  const data = [
    { name: "Students", value: totalStudentContribution },
    { name: "Patients Support", value: totalSupportAmount },
  ];

  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#AF19FF",
    "#FF0000",
  ];
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [isPatientModalOpen, setIsPatientModalOpen] = useState(false);
  const [isStudentContributionModalOpen, setIsStudentContributionModalOpen] =
    useState(false);

  const openPatientModal = () => {
    setIsPatientModalOpen(true);
  };

  const closePatientModal = () => {
    setIsPatientModalOpen(false);
  };

  const openStudentContributionModal = () => {
    setIsStudentContributionModalOpen(true);
  };

  const closeStudentContributionModal = () => {
    setIsStudentContributionModalOpen(false);
  };

  const handleYearChange = (selectedOption) => {
    setSelectedYear(selectedOption);
  };

  const handleMonthChange = (selectedOption) => {
    setSelectedMonth(selectedOption);
  };

  const yearOptions = [
    { value: 2022, label: "2022" },
    { value: 2023, label: "2023" },
  ];

  const monthOptions = [
    { value: 1, label: "January" },
    { value: 2, label: "February" },
    { value: 3, label: "March" },
    { value: 4, label: "April" },
    { value: 5, label: "May" },
    { value: 6, label: "June" },
    { value: 7, label: "July" },
    { value: 8, label: "August" },
    { value: 9, label: "September" },
    { value: 10, label: "October" },
    { value: 11, label: "November" },
    { value: 12, label: "December" },
  ];
  const exportFileOfPatient = useCallback(() => {
    const ws = utils.json_to_sheet(patients);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, "Patients Data");
    writeFile(wb, "patients.xlsx");
  }, [patients]);

  const exportFileOfContribution = useCallback(() => {
    const ws = utils.json_to_sheet(studentContributions);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, "Contributions Data");
    writeFile(wb, "contributions.xlsx");
  }, [studentContributions]);
  const importFileOfPatient = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0]; // Assuming you want the first sheet
      const sheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
      console.log(jsonData); // Here you get the data from the Excel file
    };
    reader.readAsArrayBuffer(file);
  };
  const importFileOfContribution = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0]; // Assuming you want the first sheet
      const sheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
      console.log(jsonData); // Here you get the data from the Excel file
    };
    reader.readAsArrayBuffer(file);
  };
  const handleClickIconImport = () => {
    importRef.current.click();
  };
  return (
    <div>
      <h1 className="text-4xl gap-3 flex justify-center items-center font-bold mb-8 text-center text-blue-600">
        <MdHealthAndSafety size={70} />
        <span> HEALTHCARE</span>
      </h1>
      <div className="mb-4 flex justify-center space-x-4">
        <Select
          value={selectedMonth}
          onChange={handleMonthChange}
          options={monthOptions}
          placeholder="Select Month"
          className="w-40"
        />
        <Select
          value={selectedYear}
          onChange={handleYearChange}
          options={yearOptions}
          placeholder="Select Year"
          className="w-40"
        />
      </div>
      <div className="flex justify-center gap-4 mb-4">
        <div className="w-1/2  bg-gray-100 rounded-lg p-4">
          <div className="mb-4">
            <h2 className="text-2xl font-bold mb-2 text-blue-700">
              IMPORTANT NOTES
            </h2>
            <ul className="list-disc pl-5">
              <li>
                Every month, each student contributes 20,000 dong to support
                patients.
              </li>
              <li>
                Patients whose expenses are less than 300,000 dong do not
                receive support.
              </li>
              <li>
                Patients with expenses between 300,000 and 1,000,000 dong
                receive 70% support.
              </li>
              <li>
                Patients with expenses between 1,000,000 and 5,000,000 dong
                receive 60% support.
              </li>
              <li>
                Patients with expenses between 5,000,000 and 10,000,000 dong
                receive 50% support.
              </li>
              <li>
                Patients with expenses over 10,000,000 dong receive a fixed
                support amount of 5,000,000 dong.
              </li>
            </ul>
          </div>
        </div>

        <div className="w-1/2  bg-gray-100 rounded-lg p-4">
          <div className="mb-4">
            <h2 className="text-2xl font-bold mb-2 text-blue-700">
              MONEY OVERVIEW
            </h2>
            <PieChart width={400} height={300}>
              <Pie
                dataKey="value"
                isAnimationActive={true}
                data={data}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                label
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Legend />
              <Tooltip />
            </PieChart>
          </div>
        </div>
      </div>

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
            <div
              onClick={exportFileOfPatient}
              className="cursor-pointer p-2 rounded-md overflow-hidden shadow-md border border-yellow-600 flex items-center justify-center bg-yellow-600 hover:bg-yellow-700 transition duration-300"
            >
              <FaDownload className="text-white text-2xl" />
            </div>
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
          </div>
        </div>
        <TablePatient rows={patients} columns={patientColumns} />
        <div className="mb-4">
          <h2 className="text-xl font-bold mb-2 text-red-700">
            Total Support Provided
          </h2>
          <p className="font-bold">
            Total: {totalSupportAmount.toLocaleString()} dong
          </p>
        </div>
      </div>
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
            <div
              onClick={exportFileOfContribution}
              className="cursor-pointer p-2 rounded-md overflow-hidden shadow-md border border-yellow-600 flex items-center justify-center bg-yellow-600 hover:bg-yellow-700 transition duration-300"
            >
              <FaDownload className="text-white text-2xl" />
            </div>
            <div className="cursor-pointer p-2 rounded-md overflow-hidden shadow-md border border-green-600 flex items-center justify-center bg-green-600 hover:bg-green-700 transition duration-300">
              <input
                type="file"
                ref={importRef}
                accept=".xlsx, .xls"
                style={{ display: "none" }}
                onChange={(e) => {
                  const file = e.target.files[0];
                  importFileOfContribution(file);
                }}
              />
              <FaFileImport
                onClick={handleClickIconImport}
                className="text-white text-2xl"
              />
            </div>
          </div>
        </div>
        <TableContributions
          rows={studentContributions}
          columns={studentColumns}
        />
        <div className="mb-4">
          <h2 className="text-xl font-bold mb-2 text-red-700">
            Total Contribution
          </h2>
          <p className="font-bold">
            Total: {totalStudentContribution.toLocaleString()} dong
          </p>
        </div>
      </div>
      {/* Patient modal */}
      <ModalCreatePatient
        isOpen={isPatientModalOpen}
        closeModal={closePatientModal}
      />

      {/* Student Contribution modal */}
      <ModalCreateStudentContribution
        isOpen={isStudentContributionModalOpen}
        closeModal={closeStudentContributionModal}
      />
    </div>
  );
};

export default Healthcare;
