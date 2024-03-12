import React, { useCallback, useEffect, useState } from "react";
import Select from "react-select";
import { LoopCircleLoading } from "react-loadingg";
import {
  ModalCreatePatient,
  ModalCreateStudentContribution,
  TableContributions,
  TablePatient,
} from "../../components";
import { PieChart, Pie, Cell, Legend, Tooltip } from "recharts";
import { MdHealthAndSafety } from "react-icons/md";
import { publicRequest } from "../../RequestMethod/Request";

const Healthcare = () => {
  const [patients, setPatients] = useState([]);
  const [studentContributions, setStudentContributions] = useState([]);
  const [loading, setLoading] = useState(false); // State to track loading state
  const data = [
    { name: "Students", value: 3000 },
    { name: "Patients Support", value: 3000 },
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
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [isPatientModalOpen, setIsPatientModalOpen] = useState(false);
  const [isStudentContributionModalOpen, setIsStudentContributionModalOpen] =
    useState(false);
  const [patientError, setPatientError] = useState();
  const [studentContributionsError, setStudentContributionsError] = useState();
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
    setSelectedYear(selectedOption.value);
  };

  const handleMonthChange = (selectedOption) => {
    setSelectedMonth(selectedOption.value);
  };

  const yearOptions = [
    {
      value: new Date().getFullYear().toString(),
      label: new Date().getFullYear().toString(),
    },
    { value: "2023", label: "2023" },
  ];
  const monthOptions = [
    {
      value: new Date().getMonth() + 1,
      label: new Date().toLocaleString("en-US", { month: "long" }),
    },
    { value: "01", label: "January" },
    { value: "02", label: "February" },
    { value: "03", label: "March" },
    { value: "04", label: "April" },
    { value: "05", label: "May" },
    { value: "06", label: "June" },
    { value: "07", label: "July" },
    { value: "08", label: "August" },
    { value: "09", label: "September" },
    { value: "10", label: "October" },
    { value: "11", label: "November" },
    { value: "12", label: "December" },
  ];
  const fetchPatients = async () => {
    try {
      const resPatient = await publicRequest.get(
        `/heathcares/v12/all?year=${
          selectedYear ? selectedYear : new Date().getFullYear().toString()
        }&month=${
          selectedMonth ? selectedMonth : new Date().getMonth().toString()
        }`
      );
      setPatients(resPatient.data);
    } catch (error) {
      setPatients([]);
      setPatientError(error.response.data.error);
    }
  };
  const fetchContribution = async () => {
    try {
      const resContribution = await publicRequest.get(
        `/contributionhealthcares/v13/all?year=${
          selectedYear ? selectedYear : new Date().getFullYear().toString()
        }&month=${
          selectedMonth ? selectedMonth : new Date().getMonth().toString()
        }`
      );
      setStudentContributions(resContribution.data);
    } catch (error) {
      setStudentContributions([]);
      setStudentContributionsError(error.response.data.error);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        await Promise.all([fetchPatients(), fetchContribution()]);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedYear, selectedMonth]);

  const formatStudentContributions = studentContributions.map(
    (item, index) => ({
      id: index + 1,
      avatar: item.User?.avatar,
      firstName: item.User?.firstName,
      lastName: item.User?.lastName,
      gender: item.User?.gender,
      age: item.User?.age,
      nationality: item.User?.nationality,
      email: item.User?.email,
      phoneNumber: item.User?.phoneNumber,
      facebook: item.User?.facebook,
      zalo: item.User?.zalo,
      room: item.User?.Room ? item.User?.Room.roomNumber : "",
      dormitory: item.User?.Room ? item.User.Room?.Dormitory.dormName : "",
      typePayMoney: item?.typePayMoney,
      payMoney: item?.payMoney,
      date: item?.date,
    })
  );
  const formatPatient = patients.map((item, index) => ({
    id: index + 1,
    avatar: item.User?.avatar,
    firstName: item.User?.firstName,
    lastName: item.User?.lastName,
    gender: item.User?.gender,
    age: item.User?.age,
    phoneNumber: item.User?.phoneNumber,
    room: item.User?.Room ? item.User?.Room.roomNumber : "",
    dormitory: item.User?.Room ? item.User.Room?.Dormitory.dormName : "",
    typeofDisease: item.typeofDisease,
    cost: item.cost,
    note: item.note,
    date: item.date,
    discount: item.discount,
    totalPatientPay: item.totalPatientPay,
    hospital: item.hospital,
  }));
  return (
    <div>
      {loading ? (
        <div className="flex items-center justify-center translate-y-52 -translate-x-10">
          <LoopCircleLoading color="#007bff" />
        </div>
      ) : (
        <div>
          <h1 className="text-4xl gap-3 flex justify-center items-center font-bold mb-8 text-center text-blue-600">
            <MdHealthAndSafety size={70} />
            <span> HEALTHCARE</span>
          </h1>
          <div className="mb-4 flex justify-center space-x-4">
            <Select
              value={monthOptions.find(
                (option) => option.value === selectedMonth
              )}
              onChange={handleMonthChange}
              options={monthOptions}
              defaultValue={monthOptions[0]}
              placeholder="Select Month"
              className="w-40"
            />

            <Select
              value={yearOptions.find(
                (option) => option.value === selectedYear
              )}
              onChange={handleYearChange}
              options={yearOptions}
              defaultValue={yearOptions[0]}
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
          <TablePatient
            formatPatient={formatPatient}
            openPatientModal={openPatientModal}
            setPatients={setPatients}
            patientError={patientError}
            loading={loading}
          />
          <TableContributions
            formatStudentContributions={formatStudentContributions}
            openStudentContributionModal={openStudentContributionModal}
            setStudentContributions={setStudentContributions}
            studentContributionsError={studentContributionsError}
            loading={loading}
          />
          <ModalCreatePatient
            isOpen={isPatientModalOpen}
            closeModal={closePatientModal}
            fetchPatients={fetchPatients}
          />
          <ModalCreateStudentContribution
            isOpen={isStudentContributionModalOpen}
            closeModal={closeStudentContributionModal}
            fetchContribution={fetchContribution}
          />
        </div>
      )}
    </div>
  );
};

export default Healthcare;
