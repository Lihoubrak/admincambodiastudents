import React, { useState } from "react";
import {
  FaUser,
  FaCalendarAlt,
  FaVenusMars,
  FaFlag,
  FaMapMarkerAlt,
  FaClock,
} from "react-icons/fa";
import { BsPencil } from "react-icons/bs";
import { ModalEditVisa } from "../../components"; // Assuming you have a ModalEditVisa component

const DetailInfoVisa = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <h1 className="text-4xl gap-3 flex justify-center items-center font-bold mb-4 text-center text-blue-600">
        Visa Information
      </h1>
      <div className="bg-white border border-gray-300 p-4 rounded-md flex items-center gap-20">
        <div>
          <div className="mb-4 flex  gap-3 ">
            <FaUser className="text-3xl text-blue-500" />
            <div>
              <p className="font-semibold text-lg">No:</p>
              <p className="text-lg">Brak Lihou</p>
            </div>
          </div>
          <div className="mb-4 flex  gap-3 ">
            <FaCalendarAlt className="text-3xl text-green-500" />
            <div>
              <p className="font-semibold text-lg">Issued at:</p>
              <p className="text-lg">January 1, 1990</p>
            </div>
          </div>
          <div className="mb-4 flex  gap-3 ">
            <FaVenusMars className="text-3xl text-pink-500" />
            <div>
              <p className="font-semibold text-lg">Ngày nhập cảnh:</p>
              <p className="text-lg">Male</p>
            </div>
          </div>
          <div className="mb-4 flex  gap-3 ">
            <FaFlag className="text-3xl text-red-500" />
            <div>
              <p className="font-semibold text-lg">Category:</p>
              <p className="text-lg">Country</p>
            </div>
          </div>
          <div className="mb-4 flex  gap-3 ">
            <FaMapMarkerAlt className="text-3xl text-yellow-500" />
            <div>
              <p className="font-semibold text-lg">Valid from:</p>
              <p className="text-lg">City, Country</p>
            </div>
          </div>
          <div className="mb-4 flex  gap-3 ">
            <FaMapMarkerAlt className="text-3xl text-yellow-500" />
            <div>
              <p className="font-semibold text-lg">Until:</p>
              <p className="text-lg">City, Country</p>
            </div>
          </div>
          <div className="mb-4 flex  gap-3 ">
            <FaClock className="text-3xl text-blue-500" />
            <div>
              <p className="font-semibold text-lg">On:</p>
              <p className="text-lg">December 31, 2025</p>
            </div>
          </div>
          <div className="mb-4 flex  gap-3 ">
            <FaClock className="text-3xl text-blue-500" />
            <div>
              <p className="font-semibold text-lg">Cửa khẩu:</p>
              <p className="text-lg">January 1, 2020</p>
            </div>
          </div>
        </div>
        <button
          onClick={openModal}
          className="flex items-center justify-center bg-blue-500 min-w-32 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          <BsPencil className="mr-2" />
          Edit
        </button>
      </div>
      <ModalEditVisa isOpen={isModalOpen} closeModal={closeModal} />
    </div>
  );
};

export default DetailInfoVisa;
