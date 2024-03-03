import React, { useState } from "react";
import { MdFactory } from "react-icons/md";
import { TbWindElectricity } from "react-icons/tb";
import { Link } from "react-router-dom";

const ElectricityWater = () => {
  // Dummy data for dormitories (replace with actual data from API or state)
  const [dormitories, setDormitories] = useState([
    {
      id: 1,
      name: "HUST Dormitory",
      location: "Hanoi",
      description: "Comfortable student living",
      image: "/src/assets/image.jpg", // Fixed image source path
    },
    {
      id: 1,
      name: "HUST Dormitory",
      location: "Hanoi",
      description: "Comfortable student living",
      image: "/src/assets/image.jpg", // Fixed image source path
    },
    {
      id: 1,
      name: "HUST Dormitory",
      location: "Hanoi",
      description: "Comfortable student living",
      image: "/src/assets/image.jpg", // Fixed image source path
    },
    {
      id: 1,
      name: "HUST Dormitory",
      location: "Hanoi",
      description: "Comfortable student living",
      image: "/src/assets/image.jpg", // Fixed image source path
    },
    {
      id: 1,
      name: "HUST Dormitory",
      location: "Hanoi",
      description: "Comfortable student living",
      image: "/src/assets/image.jpg", // Fixed image source path
    },
    {
      id: 1,
      name: "HUST Dormitory",
      location: "Hanoi",
      description: "Comfortable student living",
      image: "/src/assets/image.jpg", // Fixed image source path
    },
  ]);

  return (
    <div>
      <h1 className="text-4xl gap-3 flex justify-center items-center font-bold mb-8 text-center text-blue-600">
        <MdFactory size={70} />
        <span> ELECTRICITYWATER</span>
      </h1>
      <div className="flex flex-wrap gap-8 justify-center">
        {/* Mapping over the dormitories array to generate dormitory cards */}
        {dormitories.map((dormitory) => (
          <div key={dormitory.id} className="w-full max-w-[300px]">
            <div className="rounded-lg overflow-hidden shadow-lg bg-white hover:shadow-xl transition duration-300">
              <img
                className="w-full h-48 object-cover"
                src={dormitory.image}
                alt=""
              />
              <div className="px-6 py-4">
                <div className="text-center">
                  <h1 className="font-bold text-xl mb-2 text-blue-500">
                    {dormitory.name}
                  </h1>
                  <p className="text-gray-700">{dormitory.location}</p>
                  <p className="text-sm text-gray-500 mb-2">
                    {dormitory.description}
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
