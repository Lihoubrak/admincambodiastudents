import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { DataGrid } from "@mui/x-data-grid";
import {
  FaCheck,
  FaDownload,
  FaFileImport,
  FaInfoCircle,
  FaPlus,
  FaTrash,
} from "react-icons/fa";
import Select from "react-select";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ModalCreateMajor } from "../../components";
import { publicRequest } from "../../RequestMethod/Request";
import { LoopCircleLoading } from "react-loadingg";

const DetailUniversity = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [majors, setMajors] = useState([]);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const { universityId } = useParams();
  const [selectedYear, setSelectedYear] = useState(null);
  const [error, setError] = useState("");
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const navigation = useNavigate();
  // Sample data for the chart
  const chartData = [
    { name: "2020", pv: 2400 },
    { name: "2021", pv: 1398 },
    { name: "2022", pv: 9800 },
    { name: "2023", pv: 3908 },
    { name: "2024", pv: 4800 },
  ];

  const handleYearChange = (selectedOption) => {
    setSelectedYear(selectedOption.value);
  };
  const handleDelete = (id) => {};
  const handleDetail = (id) => {
    navigation(`/university/student/${id}`);
  };
  const yearOptions = [
    {
      value: new Date().getFullYear().toString(),
      label: new Date().getFullYear().toString(),
    },
    { value: 2023, label: "2023" },
    // Add more years as needed
  ];

  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    {
      field: "avatar",
      headerName: "Profile",
      width: 150,
      renderCell: (params) => (
        <img
          src={params.value}
          alt="Profile"
          style={{ width: 45, height: 45, borderRadius: "50%" }}
        />
      ),
    },
    {
      field: "firstName",
      headerName: "First Name",
      width: 200,
      editable: true,
    },
    { field: "lastName", headerName: "Last Name", width: 200, editable: true },
    { field: "gender", headerName: "Gender", width: 150, editable: true },
    { field: "age", headerName: "Age", width: 150, editable: true },
    { field: "email", headerName: "Email", width: 150, editable: true },
    {
      field: "phoneNumber",
      headerName: "Phone Number",
      width: 150,
      editable: true,
    },
    { field: "facebook", headerName: "Facebook", width: 150, editable: true },
    { field: "zalo", headerName: "Zalo", width: 150, editable: true },
    { field: "majorName", headerName: "Major", width: 150, editable: true },
    {
      field: "delete",
      headerName: "Action",
      width: 120,
      renderCell: (params) => (
        <div>
          <button
            onClick={() => handleDetail(params.row.id)}
            className="p-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 mr-2"
          >
            <FaInfoCircle />
          </button>
          <button
            onClick={() => handleDelete(params.row.id)}
            className="p-1 bg-red-500 text-white rounded-md hover:bg-red-600"
          >
            <FaTrash />
          </button>
        </div>
      ),
    },
  ];

  const formattedData = students.map((item, index) => ({
    id: index + 1,
    avatar: item.avatar,
    firstName: item.firstName,
    lastName: item.lastName,
    gender: item.gender,
    age: item.age,
    email: item.email,
    phoneNumber: item.phoneNumber,
    facebook: item.facebook,
    zalo: item.zalo,
    majorName: item.Major ? item.Major.majorName : "",
  }));
  const fetchMajor = async () => {
    try {
      const majorsRes = await publicRequest.get(
        `/majors/v5/all/${universityId}`
      );
      setMajors(majorsRes.data);
    } catch (error) {}
  };
  const fetchStudent = async () => {
    try {
      const studentsRes = await publicRequest.get(
        `/schools/v4/detail/${universityId}?year=${
          selectedYear ? selectedYear : new Date().getFullYear().toString()
        }`
      );
      setStudents(studentsRes.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setStudents([]);

      setError(error.response.data.error);
    }
  };
  useEffect(() => {
    fetchMajor();
    fetchStudent();
  }, [universityId, selectedYear]);

  return (
    <div>
      {loading ? (
        <div className="flex items-center justify-center translate-y-52 -translate-x-10">
          <LoopCircleLoading color="#007bff" />
        </div>
      ) : (
        <div className="container mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center text-blue-600">
            HUST UNIVERSITY
          </h1>

          <div className="flex justify-center mb-8">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="pv" fill="#8884d8" barSize={60} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="flex items-center mb-8 gap-4">
            <Select
              value={yearOptions.find(
                (option) => option.value === selectedYear
              )}
              defaultValue={yearOptions[0]}
              onChange={handleYearChange}
              options={yearOptions}
              placeholder="Select Year"
              className="w-40"
            />

            <div className="p-2 rounded-md overflow-hidden shadow-md border border-green-600 flex items-center justify-center bg-green-600 hover:bg-green-700 transition duration-300">
              <FaFileImport className="text-white text-2xl" />
            </div>
            <div className="p-2 rounded-md overflow-hidden shadow-md border border-yellow-600 flex items-center justify-center bg-yellow-600 hover:bg-yellow-700 transition duration-300">
              <FaDownload className="text-white text-2xl" />
            </div>
          </div>

          <div style={{ height: 400, width: "100%", overflow: "auto" }}>
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
                "& .MuiDataGrid-cell, & .MuiDataGrid-columnHeaderTitleContainer":
                  {
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

          <div className="flex justify-between items-center py-5">
            <h1 className="text-3xl font-bold mb-4 text-blue-600">
              LIST OF MAJOR
            </h1>
            {/* Create New University Button */}
            <div
              onClick={openModal}
              className="min-w-[200px] py-2 cursor-pointer rounded overflow-hidden shadow-md border-2 border-blue-600 mb-4 flex items-center justify-center bg-blue-600 hover:bg-blue-700 transition duration-300"
            >
              <p className="text-white font-bold">Create New Major</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-6">
            {majors.map((major) => (
              <Link to={`/university/major/${major.id}`} key={major.id}>
                <div className="flex flex-col items-center justify-center bg-white rounded-lg p-4 shadow-md">
                  <img
                    src={major.majorImage}
                    alt={major.majorName}
                    className="w-16 h-16 object-cover rounded-full mb-4"
                  />
                  <span className="text-center font-medium text-lg">
                    {major.majorName}
                  </span>
                </div>
              </Link>
            ))}
          </div>
          <ModalCreateMajor
            isOpen={isModalOpen}
            closeModal={closeModal}
            schoolId={universityId}
            fetchMajor={fetchMajor}
          />
        </div>
      )}
    </div>
  );
};

export default DetailUniversity;
