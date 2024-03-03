import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ModalCreateUniversity } from "../../components";
import { FaUniversity } from "react-icons/fa";

const University = () => {
  // Static data for a university
  const universityData = {
    name: "List of University",
    location: "Hanoi",
    imageUrl: "src/assets/image.jpg",
    description: "Comfortable student living",
    establishmentYear: 1970,
  };
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-4xl gap-3 flex justify-center items-center font-bold mb-8 text-center text-blue-600">
          <FaUniversity size={50} />
          <span>UNIVERSITY</span>
        </h1>
        {/* Create New University Button */}
        <div
          onClick={openModal}
          className="min-w-[200px] py-2 cursor-pointer rounded overflow-hidden shadow-md border-2 border-blue-600 mb-4 flex items-center justify-center bg-blue-600 hover:bg-blue-700 transition duration-300"
        >
          <p className="text-white font-bold">Create New University</p>
        </div>
      </div>
      <div className="flex flex-wrap gap-8 justify-center">
        {/* University Card */}
        <Link to="/university/:universityId">
          {/* Replace "/some-route" with the appropriate route */}
          <div className="max-w-[300px] cursor-pointer rounded overflow-hidden shadow-lg bg-white hover:shadow-xl transition duration-300">
            <img
              className="w-full h-48 object-cover rounded-t"
              src={universityData.imageUrl}
              alt={universityData.name}
            />
            <div className="px-6 py-4">
              <div className="text-center">
                <h1 className="font-bold text-xl mb-2 text-blue-500">HUST</h1>
                <p className="text-gray-700">{universityData.location}</p>
                <p className="text-sm text-gray-500 mb-2">
                  {universityData.description}
                </p>
                {/* Additional Information */}
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">
                    Est. {universityData.establishmentYear}
                  </span>
                  <button className="px-3 py-1 text-sm text-white bg-blue-600 rounded-full hover:bg-blue-700 transition duration-300">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </div>
      <ModalCreateUniversity isOpen={isModalOpen} closeModal={closeModal} />
    </div>
  );
};

export default University;
