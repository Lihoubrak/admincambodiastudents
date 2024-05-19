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
  FaCcVisa,
  FaTimesCircle,
} from "react-icons/fa";
import { BsPencil } from "react-icons/bs";
import { ModalEditPassport } from "../../components";
import Modal from "react-modal";
import { useParams } from "react-router-dom";
import { TokenRequest, publicRequest } from "../../RequestMethod/Request";
import { GrVisa } from "react-icons/gr";
import { LoopCircleLoading } from "react-loadingg";

const DetailInfoPassport = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { userId } = useParams();
  const [passport, setPassport] = useState(null);
  const [validFromDate, setValidFromDate] = useState("");
  const [validUntilDate, setValidUntilDate] = useState("");
  const [loading, setIsLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleValidFromDateChange = (e) => {
    setValidFromDate(e.target.value);
  };

  const handleValidUntilDateChange = (e) => {
    setValidUntilDate(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const res = await TokenRequest.put(
        `/passports/v6/update/visa/${userId}`,
        {
          visaUntilDate: validUntilDate,
          visaValidityDate: validFromDate,
        }
      );
      setValidFromDate("");
      setValidUntilDate("");
      window.alert("Passport visa information updated successfully!");
    } catch (error) {
      console.error("Error updating passport visa information:", error);
      window.alert(
        "An error occurred while updating passport visa information. Please try again later."
      );
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    setIsLoading(true);
    const fetchPassport = async () => {
      try {
        const res = await TokenRequest.get(`/passports/v6/detail/${userId}`);
        setPassport(res.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching passport data:", error);
        setIsLoading(false);
      }
    };
    fetchPassport();
  }, [userId]);

  const openFullImageModal = (imageUrl) => {
    // Function to open full image modal
    setSelectedImage(imageUrl);
  };

  const closeFullImageModal = () => {
    // Function to close full image modal
    setSelectedImage(null);
  };
  const formatDate = (timestamp) => {
    if (!timestamp) return "";
    const date = new Date(timestamp._seconds * 1000);
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    return date.toLocaleDateString("en-GB", options); // 'en-GB' sets the locale to British English
  };

  return (
    <div>
      {loading ? (
        <div className="flex items-center justify-center translate-y-52 -translate-x-10">
          <LoopCircleLoading color="#007bff" />
        </div>
      ) : (
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
                  <p className="text-lg">{formatDate(passport?.dateofbirth)}</p>
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
                  <p className="text-lg">
                    {formatDate(passport?.dateofexpiry)}
                  </p>
                </div>
              </div>
              <div className="mb-4 flex  gap-3 ">
                <FaClock className="text-3xl text-blue-500" />
                <div>
                  <p className="font-semibold text-lg">Date of Issue:</p>
                  <p className="text-lg">{formatDate(passport?.dateofissue)}</p>
                </div>
              </div>
            </div>
            <div className="ml-10">
              <div
                className="mb-4 flex gap-3 cursor-pointer "
                onClick={() => openFullImageModal(passport?.image)}
              >
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
            {/* <button
       onClick={openModal}
       className="flex items-center justify-center bg-blue-500 min-w-32 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
     >
       <BsPencil className="mr-2" />
       Edit
     </button> */}
          </div>
          <ModalEditPassport isOpen={isModalOpen} closeModal={closeModal} />
          <div>
            <h1 className="text-4xl gap-3 flex justify-center items-center font-bold my-4 text-center text-blue-600">
              <GrVisa size={50} />
              <span className="ml-3">VISA</span>
            </h1>
            <div className="bg-white border border-gray-300 p-4 rounded-md flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <div className="mb-4 flex gap-3 ">
                  <FaUser className="text-3xl text-blue-500" />
                  <div>
                    <p className="font-semibold text-lg">No:</p>
                    <p className="text-lg">{passport?.passportNumber}</p>
                  </div>
                </div>
                {/* Other visa information fields */}
              </div>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex flex-col">
                  {/* Label and input field for valid from date */}
                  <label htmlFor="validFrom" className="font-semibold text-lg">
                    Valid From: {formatDate(passport?.visa?.validityDate)}
                  </label>
                  <input
                    type="date"
                    id="validFrom"
                    className="border border-gray-300 rounded-md p-2 outline-none focus:border-blue-400"
                    value={validFromDate}
                    onChange={handleValidFromDateChange}
                  />
                </div>
                <div className="flex flex-col">
                  {/* Label and input field for valid until date */}
                  <label htmlFor="validUntil" className="font-semibold text-lg">
                    Valid Until: {formatDate(passport?.visa?.untilDate)}
                  </label>
                  <input
                    type="date"
                    id="validUntil"
                    className="border border-gray-300 rounded-md p-2 outline-none focus:border-blue-400"
                    value={validUntilDate}
                    onChange={handleValidUntilDateChange}
                  />
                </div>

                {/* Button to submit dates */}
                <button
                  onClick={handleSubmit}
                  className="flex items-center justify-center bg-blue-500 min-w-32 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Submit Dates
                </button>
              </div>
            </div>
          </div>
          {/* Modal for displaying full-size image */}
          <Modal
            ariaHideApp={false}
            isOpen={selectedImage !== null}
            onRequestClose={closeFullImageModal}
            style={{
              overlay: {
                zIndex: 1100,
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              },
              content: {
                maxWidth: "90%",
                maxHeight: "90%",
                margin: "auto",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                background: "white",
                borderRadius: "8px",
                overflow: "hidden",
                padding: 0,
              },
            }}
          >
            <div className="flex justify-end">
              <button
                onClick={closeFullImageModal}
                className="text-red-500 hover:text-red-700 mr-4 mt-4"
              >
                <FaTimesCircle size={20} />
              </button>
            </div>
            <img
              src={selectedImage}
              alt="Full-size Image"
              className="w-full h-full object-contain"
            />
          </Modal>
        </div>
      )}
    </div>
  );
};

export default DetailInfoPassport;
