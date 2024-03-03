import React, { useState } from "react";
import { ModalCreateDormitory } from "../../components";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";

const Dormitory = () => {
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
          <FaHome size={70} />
          <span>DORMITORY</span>
        </h1>
        <button
          onClick={openModal}
          className="min-w-[200px] font-bold text-white py-2 cursor-pointer rounded overflow-hidden shadow-md border-2 border-blue-600 mb-4 flex items-center justify-center bg-blue-600 hover:bg-blue-700 transition duration-300"
        >
          Create New Dormitory
        </button>
      </div>
      <div className="flex flex-wrap gap-8 justify-center">
        {/* Dormitory Card 1 */}
        <Link to={"/dormitory/1"} className="w-full max-w-[300px]">
          <div className="cursor-pointer rounded-lg overflow-hidden shadow-lg bg-white hover:shadow-xl transition duration-300">
            <img
              className="w-full h-48 object-cover"
              src="src/assets/image.jpg"
              alt=""
            />
            <div className="px-6 py-4">
              <div className="text-center">
                <h1 className="font-bold text-xl mb-2 text-blue-500">
                  HUST Dormitory
                </h1>
                <p className="text-gray-700">Hanoi</p>
                <p className="text-sm text-gray-500 mb-2">
                  Comfortable student living
                </p>
              </div>
            </div>
          </div>
        </Link>
      </div>
      <ModalCreateDormitory isOpen={isModalOpen} closeModal={closeModal} />
    </div>
  );
};

export default Dormitory;
