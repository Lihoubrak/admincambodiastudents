import React, { useEffect, useState } from "react";
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
import { useParams } from "react-router-dom";
import { publicRequest } from "../../RequestMethod/Request";
const DetailInfoPassport = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { userId } = useParams();
  const [passport, setPassport] = useState(null);
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  useEffect(() => {
    const fetchPassport = async () => {
      const res = await publicRequest.get(`/passports/v6/detail/${userId}`);
      setPassport(res.data);
    };
    fetchPassport();
  }, [userId]);
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
              <p className="text-lg">
                {passport?.firstName} {passport?.lastName}
              </p>
            </div>
          </div>
          <div className="mb-4 flex  gap-3 ">
            <FaCalendarAlt className="text-3xl text-green-500" />
            <div>
              <p className="font-semibold text-lg">Date of Birth:</p>
              <p className="text-lg">{passport?.dateofbirth}</p>
            </div>
          </div>
          <div className="mb-4 flex  gap-3 ">
            <FaVenusMars className="text-3xl text-pink-500" />
            <div>
              <p className="font-semibold text-lg">Sex:</p>
              <p className="text-lg">{passport?.gender}</p>
            </div>
          </div>
          <div className="mb-4 flex  gap-3 ">
            <FaIdCard className="text-3xl text-purple-500" />
            <div>
              <p className="font-semibold text-lg">Type:</p>
              <p className="text-lg">{passport?.type}</p>
            </div>
          </div>
          <div className="mb-4 flex  gap-3 ">
            <FaIdCard className="text-3xl text-purple-500" />
            <div>
              <p className="font-semibold text-lg">Code:</p>
              <p className="text-lg">{passport?.code}</p>
            </div>
          </div>
        </div>
        <div>
          <div className="mb-4 flex  gap-3 ">
            <FaFlag className="text-3xl text-red-500" />
            <div>
              <p className="font-semibold text-lg">Nationality:</p>
              <p className="text-lg">{passport?.nationality}</p>
            </div>
          </div>
          <div className="mb-4 flex  gap-3 ">
            <FaMapMarkerAlt className="text-3xl text-yellow-500" />
            <div>
              <p className="font-semibold text-lg">Place of Birth:</p>
              <p className="text-lg">{passport?.placeofbirth}</p>
            </div>
          </div>
          <div className="mb-4 flex  gap-3 ">
            <FaMapMarkerAlt className="text-3xl text-yellow-500" />
            <div>
              <p className="font-semibold text-lg">Place of Issue:</p>
              <p className="text-lg">{passport?.placeofissue}</p>
            </div>
          </div>
          <div className="mb-4 flex  gap-3 ">
            <FaClock className="text-3xl text-blue-500" />
            <div>
              <p className="font-semibold text-lg">Date of Expiry:</p>
              <p className="text-lg">{passport?.dateofexpiry}</p>
            </div>
          </div>
          <div className="mb-4 flex  gap-3 ">
            <FaClock className="text-3xl text-blue-500" />
            <div>
              <p className="font-semibold text-lg">Date of Issue:</p>
              <p className="text-lg">{passport?.dateofissue}</p>
            </div>
          </div>
        </div>
        <div className="ml-10">
          <div className="mb-4 flex gap-3 ">
            <img
              src={passport?.image}
              alt="Passport Profile"
              className="rounded-lg w-56 h-56"
            />
          </div>
          <div className="mb-4 flex  gap-3 ">
            <FaIdCard className="text-3xl text-purple-500" />
            <div>
              <p className="font-semibold text-lg">Passport Number:</p>
              <p className="text-lg">{passport?.passportNumber}</p>
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
