import React, { useEffect, useState } from "react";
import { MdFactory } from "react-icons/md";
import { TbWindElectricity } from "react-icons/tb";
import { Link } from "react-router-dom";
import { TokenRequest, publicRequest } from "../../RequestMethod/Request";

const ElectricityWater = () => {
  const [dormitories, setDormitories] = useState([]);
  useEffect(() => {
    const fetchDorm = async () => {
      const res = await TokenRequest.get(`/dorms/v2/all`);
      setDormitories(res.data);
    };
    fetchDorm();
  }, []);
  return (
    <div>
      <h1 className="text-4xl gap-3 flex justify-center items-center font-bold mb-8 text-center text-blue-600">
        <MdFactory size={70} />
        <span> ELECTRICITYWATER</span>
      </h1>
      <div className="flex justify-center flex-wrap gap-8 ">
        {/* Mapping over the dormitories array to generate dormitory cards */}
        {dormitories.map((dormitory) => (
          <div key={dormitory.id} className="w-full max-w-[300px]">
            <div className="rounded-lg overflow-hidden shadow-lg bg-white hover:shadow-xl transition duration-300">
              <img
                className="w-full h-44 object-cover"
                src={dormitory.dormImage}
                alt={dormitory.dormName}
              />
              <div className="px-6 py-4">
                <div className="text-center">
                  <h1 className="font-bold text-xl mb-2 text-blue-500">
                    {dormitory.dormName}
                  </h1>
                  <p className="text-gray-700">{dormitory.dormLocation}</p>
                  <p className="text-sm text-gray-500 mb-2">
                    {dormitory.dormDescription}
                  </p>
                </div>
              </div>
              <div className="flex justify-center mb-4">
                {/* Button for water */}
                <Link to={`/water/${dormitory.id}`} className="mx-2">
                  <button className="bg-green-500 min-w-32 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                    Water
                  </button>
                </Link>
                {/* Button for electricity */}
                <Link to={`/electricity/${dormitory.id}`} className="mx-2">
                  <button className="bg-blue-500 min-w-32 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                    Electricity
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

export default ElectricityWater;
