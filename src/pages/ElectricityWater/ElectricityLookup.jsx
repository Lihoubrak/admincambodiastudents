import { DataGrid } from "@mui/x-data-grid";
import React, { useState } from "react";
import {
  AiOutlineBarChart,
  AiOutlineDollarCircle,
  AiOutlinePercentage,
  AiOutlineUser,
} from "react-icons/ai";
import { TbSunElectricity } from "react-icons/tb";
const ElectricityLookup = () => {
  const [formData, setFormData] = useState({
    monthYear: "",
    room: "",
    fullName: "",
    oldIndex: "",
    newIndex: "",
    totalConsumption: "",
    support: "",
    exceedLimit: "",
    pricePerKwh: "",
    totalAmount: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  return (
    <div className="max-w-6xl mx-auto bg-white p-8 border border-gray-300 shadow-md rounded-md relative">
      <div className="text-7xl ml-20 font-semibold mb-6 text-blue-700">
        <TbSunElectricity />
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
            htmlFor="totalConsumption"
            className="block text-sm font-medium text-gray-700"
          >
            Total Consumption:
          </label>
          <div className="flex items-center">
            <AiOutlineBarChart className="mr-2" />
            <input
              type="text"
              id="totalConsumption"
              name="totalConsumption"
              value={formData.totalConsumption}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:border-blue-500"
              placeholder="Enter total consumption"
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
              htmlFor="monthYear"
              className="block text-sm font-medium text-gray-700"
            >
              Month/Year:
            </label>
            <select
              id="monthYear"
              name="monthYear"
              value={formData.monthYear}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:border-blue-500"
            >
              <option value="">Select month/year</option>
            </select>
          </div>

          <div className="mb-4">
            <label
              htmlFor="oldIndex"
              className="block text-sm font-medium text-gray-700"
            >
              Old Index:
            </label>
            <input
              type="text"
              id="oldIndex"
              name="oldIndex"
              value={formData.oldIndex}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:border-blue-500"
              placeholder="Enter old index"
              required
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
            </select>
          </div>

          <div className="mb-4">
            <label
              htmlFor="exceedLimit"
              className="block text-sm font-medium text-gray-700"
            >
              Exceed Limit:
            </label>
            <input
              type="text"
              id="exceedLimit"
              name="exceedLimit"
              value={formData.exceedLimit}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:border-blue-500"
              placeholder="Enter exceed limit"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="totalAmount"
              className="block text-sm font-medium text-gray-700"
            >
              Total Amount:
            </label>
            <input
              type="text"
              id="totalAmount"
              name="totalAmount"
              value={formData.totalAmount}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:border-blue-500"
              placeholder="Enter total amount"
              required
            />
          </div>
        </div>
        <button
          type="submit"
          className="col-span-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ElectricityLookup;
