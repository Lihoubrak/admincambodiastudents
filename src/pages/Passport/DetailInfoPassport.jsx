import React, { useState } from "react";
import {
  FaUser,
  FaCalendarAlt,
  FaVenusMars,
  FaIdCard,
  FaFlag,
  FaMapMarkerAlt,
  FaClock,
  FaPassport,
} from "react-icons/fa";
import { BsPencil } from "react-icons/bs";
import { ModalEditPassport } from "../../components";
const DetailInfoPassport = () => {
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
        <FaPassport size={50} />
        <span className="ml-3">PASSPORT</span>
      </h1>
      <div className="bg-white border border-gray-300 p-4 rounded-md flex items-center gap-20">
        <div>
          <div className="mb-4 flex  gap-3 ">
            <FaUser className="text-3xl text-blue-500" />
            <div>
              <p className="font-semibold text-lg">Full Name:</p>
              <p className="text-lg">Brak Lihou</p>
            </div>
          </div>
          <div className="mb-4 flex  gap-3 ">
            <FaCalendarAlt className="text-3xl text-green-500" />
            <div>
              <p className="font-semibold text-lg">Date of Birth:</p>
              <p className="text-lg">January 1, 1990</p>
            </div>
          </div>
          <div className="mb-4 flex  gap-3 ">
            <FaVenusMars className="text-3xl text-pink-500" />
            <div>
              <p className="font-semibold text-lg">Sex:</p>
              <p className="text-lg">Male</p>
            </div>
          </div>
          <div className="mb-4 flex  gap-3 ">
            <FaIdCard className="text-3xl text-purple-500" />
            <div>
              <p className="font-semibold text-lg">Type:</p>
              <p className="text-lg">Regular</p>
            </div>
          </div>
          <div className="mb-4 flex  gap-3 ">
            <FaIdCard className="text-3xl text-purple-500" />
            <div>
              <p className="font-semibold text-lg">Code:</p>
              <p className="text-lg">123456</p>
            </div>
          </div>
        </div>
        <div>
          <div className="mb-4 flex  gap-3 ">
            <FaFlag className="text-3xl text-red-500" />
            <div>
              <p className="font-semibold text-lg">Nationality:</p>
              <p className="text-lg">Country</p>
            </div>
          </div>
          <div className="mb-4 flex  gap-3 ">
            <FaMapMarkerAlt className="text-3xl text-yellow-500" />
            <div>
              <p className="font-semibold text-lg">Place of Birth:</p>
              <p className="text-lg">City, Country</p>
            </div>
          </div>
          <div className="mb-4 flex  gap-3 ">
            <FaMapMarkerAlt className="text-3xl text-yellow-500" />
            <div>
              <p className="font-semibold text-lg">Place of Issue:</p>
              <p className="text-lg">City, Country</p>
            </div>
          </div>
          <div className="mb-4 flex  gap-3 ">
            <FaClock className="text-3xl text-blue-500" />
            <div>
              <p className="font-semibold text-lg">Date of Expiry:</p>
              <p className="text-lg">December 31, 2025</p>
            </div>
          </div>
          <div className="mb-4 flex  gap-3 ">
            <FaClock className="text-3xl text-blue-500" />
            <div>
              <p className="font-semibold text-lg">Date of Issue:</p>
              <p className="text-lg">January 1, 2020</p>
            </div>
          </div>
        </div>
        <div className="ml-10">
          <div className="mb-4 flex gap-3 ">
            <img
              src="/src/assets/profile.jpg"
              alt="Passport Profile"
              className="rounded-lg w-56 h-56"
            />
          </div>
          <div className="mb-4 flex  gap-3 ">
            <FaIdCard className="text-3xl text-purple-500" />
            <div>
              <p className="font-semibold text-lg">Passport Number:</p>
              <p className="text-lg">ABC123456</p>
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
      <ModalEditPassport isOpen={isModalOpen} closeModal={closeModal} />
    </div>
  );
};

export default DetailInfoPassport;
