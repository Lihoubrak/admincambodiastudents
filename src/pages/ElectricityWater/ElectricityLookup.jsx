import { DataGrid } from "@mui/x-data-grid";
import React, { useCallback, useEffect, useState } from "react";
import { AiOutlineDollarCircle, AiOutlineUser } from "react-icons/ai";
import { FaDownload, FaHandHoldingWater } from "react-icons/fa";
import { TokenRequest, publicRequest } from "../../RequestMethod/Request";
import { utils, writeFile } from "xlsx";
import Select from "react-select";
import { GiElectricalResistance } from "react-icons/gi";
import { useParams } from "react-router-dom";

const ElectricityLookup = () => {
  const [room, setRoom] = useState([]);
  const [electricity, setElectricity] = useState([]);
  const [selectedYear, setSelectedYear] = useState();
  const [selectedMonth, setSelectedMonth] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { dormId } = useParams();
  const currentYear = new Date().getFullYear();
  const month = new Date().getMonth() + 1;
  const today = new Date();
  const formattedDate = today.toISOString().split("T")[0];
  const [formData, setFormData] = useState({
    date: formattedDate,
    room: 0,
    newIndex: "",
    support: 60,
    pricePerKwh: 2120.0,
  });

  const fetchElectrical = async () => {
    try {
      setLoading(true);
      const electricalRes = await TokenRequest.get(
        `/electricals/v7/all?month=${selectedMonth || month}&year=${
          selectedYear || currentYear
        }`
      );
      setElectricity(electricalRes.data);
      setLoading(false);
      setError(null);
    } catch (error) {
      setElectricity([]);
      setLoading(false);
      setError(error.response?.data?.error || "Error fetching data");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const roomRes = await TokenRequest.get(`/rooms/v3/all/${dormId}`);
        setRoom(roomRes.data);
        setLoading(false);
        setError(null);
      } catch (error) {
        setLoading(false);
        setError(error.response?.data?.error || "Error fetching data");
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    fetchElectrical();
  }, [selectedMonth, selectedYear]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { room, newIndex } = formData;
    const formDataToSend = {
      newIndex: parseInt(newIndex),
      pricePerKwh: formData.pricePerKwh,
      support: formData.support,
      date: formData.date,
      roomId: parseInt(room),
    };

    try {
      await publicRequest.post(`/electricals/v7/create`, {
        formDataToSend,
      });
      fetchElectrical();
      setFormData({
        date: formattedDate,
        room: "",
        newIndex: "",
        support: 60,
        pricePerKwh: 2120.0,
      });
    } catch (error) {
      setError(error.response?.data?.error || "Error submitting data");
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "date", headerName: "Month/Year", width: 150 },
    { field: "room", headerName: "Room", width: 120 },
    { field: "oldIndex", headerName: "Old Index", width: 130 },
    { field: "newIndex", headerName: "New Index", width: 130 },
    { field: "totalConsumption", headerName: "Total Consumption", width: 180 },
    { field: "support", headerName: "Support", width: 130 },
    { field: "exceedLimit", headerName: "Exceed Limit", width: 150 },
    { field: "pricePerKwh", headerName: "Price Per Kwh", width: 160 },
    { field: "totalAmount", headerName: "Total Amount", width: 150 },
  ];

  const formattedData = electricity.map((item, index) => ({
    id: index + 1,
    date: item.date,
    room: item.Room.roomNumber,
    oldIndex: item.oldIndex,
    newIndex: item.newIndex,
    totalConsumption: item.totalConsumption,
    support: item.support,
    exceedLimit: item.exceedLimit,
    pricePerKwh: item.pricePerKwh,
    totalAmount: item.totalAmount,
  }));

  const exportFile = useCallback(() => {
    const ws = utils.json_to_sheet(formattedData);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, "Data");
    writeFile(wb, "Water.xlsx");
  }, [formattedData]);

  const yearOptions = [
    {
      value: currentYear.toString(),
      label: currentYear.toString(),
    },
    { value: "2023", label: "2023" },
  ];

  const handleYearChange = (selectedOption) => {
    setSelectedYear(selectedOption.value);
  };

  const monthOptions = [
    {
      value: month.toString(),
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

  const handleMonthChange = (selectedOption) => {
    setSelectedMonth(selectedOption.value);
  };

  return (
    <div className="max-w-6xl mx-auto bg-white p-8 border border-gray-300 shadow-md rounded-md relative">
      <div className="text-7xl ml-20 font-semibold mb-6 text-blue-700">
        <GiElectricalResistance />
      </div>
      <div className="absolute top-8 flex gap-3 right-8">
        <div className="mb-4">
          <label
            htmlFor="support"
            className="block text-sm font-medium text-gray-700"
          >
            Support:
          </label>
          <div className="flex items-center">
            <AiOutlineUser className="text-gray-400 mr-2" />
            <input
              type="text"
              id="support"
              name="support"
              value={formData.support}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:border-blue-500"
              placeholder="Enter support"
              required
            />
          </div>
        </div>

        <div className="mb-4">
          <label
            htmlFor="pricePerKwh"
            className="block text-sm font-medium text-gray-700"
          >
            Price Per Kwh:
          </label>
          <div className="flex items-center">
            <AiOutlineDollarCircle className="text-gray-400 mr-2" />
            <input
              type="text"
              id="pricePerKwh"
              name="pricePerKwh"
              value={formData.pricePerKwh}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:border-blue-500"
              placeholder="Enter price per Kwh"
              required
            />
          </div>
        </div>
      </div>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 gap-4 md:grid-cols-2"
      >
        <div>
          <div className="mb-4">
            <label
              htmlFor="date"
              className="block text-sm font-medium text-gray-700"
            >
              Month/Year:
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="newIndex"
              className="block text-sm font-medium text-gray-700"
            >
              New Index:
            </label>
            <input
              type="text"
              id="newIndex"
              name="newIndex"
              value={formData.newIndex}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:border-blue-500"
              placeholder="Enter new index"
              required
            />
          </div>
        </div>

        <div>
          <div className="mb-4">
            <label
              htmlFor="room"
              className="block text-sm font-medium text-gray-700"
            >
              Room:
            </label>
            <select
              id="room"
              name="room"
              value={formData.room}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:border-blue-500"
            >
              <option value="">Select room number</option>
              {room.map((option, index) => (
                <option key={index} value={option.id}>
                  {option.roomNumber}
                </option>
              ))}
            </select>
          </div>
        </div>
        <button
          type="submit"
          className="col-span-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        >
          Submit
        </button>
      </form>
      <div className="flex items-center gap-4  my-4">
        <Select
          value={monthOptions.find((option) => option.value === selectedMonth)}
          onChange={handleMonthChange}
          options={monthOptions}
          defaultValue={monthOptions[0]}
          placeholder="Select Month"
          className="w-40"
        />

        <Select
          value={yearOptions.find((option) => option.value === selectedYear)}
          onChange={handleYearChange}
          options={yearOptions}
          defaultValue={yearOptions[0]}
          placeholder="Select Year"
          className="w-40"
        />
        <div
          onClick={formattedData.length > 0 ? exportFile : null}
          className="cursor-pointer p-2 rounded-md overflow-hidden shadow-md border border-yellow-600 flex items-center justify-center bg-yellow-600 hover:bg-yellow-700 transition duration-300"
        >
          <FaDownload className="text-white text-2xl" />
        </div>
      </div>

      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={formattedData}
          columns={columns}
          pageSize={5}
          loading={loading}
          localeText={{ noRowsLabel: error ? error : "No rows found" }}
        />
      </div>
    </div>
  );
};

export default ElectricityLookup;
