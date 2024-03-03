import React from "react";
import { FaPassport } from "react-icons/fa";
import { Link } from "react-router-dom";
import Select from "react-select";

const DetailPassport = () => {
  const yearOptions = [
    { value: "2022", label: "2022" },
    { value: "2023", label: "2023" },
    { value: "2024", label: "2024" },
  ];

  return (
    <div>
      <h1 className="text-4xl flex items-center justify-center text-blue-600 font-bold mb-8">
        <FaPassport className="inline-block mr-3" size={50} />
        <span>PASSPORT</span>
      </h1>
      <div className="mb-4 flex items-center justify-center">
        <Select
          options={yearOptions}
          placeholder="Select Year"
          className="w-40 mr-4"
        />
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Search..."
            className="border-[1px] focus:border-blue-500 rounded-md px-4 py-2 mr-2 outline-none"
          />
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
            Search
          </button>
        </div>
      </div>
      <div className="flex flex-wrap justify-center">
        {[...Array(6)].map((_, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md p-4 max-w-xs mx-auto text-center mb-4"
          >
            <h2 className="text-xl font-bold mb-4">Passport Information</h2>
            <div className="flex flex-col items-center mb-8">
              <div className="mb-6">
                <img
                  src="/src/assets/profile.jpg"
                  alt="Passport"
                  className="max-w-xs shadow-md"
                />
              </div>
              <div className="mb-4">
                <p className="font-bold">Brak Lihou</p>
              </div>
              <div className="flex justify-center">
                <Link to={`/passport/visa/1`} className="mx-2">
                  <button className="bg-blue-500 min-w-32 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                    Visa
                  </button>
                </Link>
                <Link to={`/passport/detailpassport/1`} className="mx-2">
                  <button className="bg-green-500 min-w-32 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                    Passport
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DetailPassport;
