import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { FaTimesCircle, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { formatDateFromTimestamp } from "../../utils/formatDateFromTimestamp";
import { publicRequest } from "../../RequestMethod/Request";

const ModalReport = ({ isOpen, closeModal, roomId }) => {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [roomReports, setRoomReports] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchReport();
  }, [roomId]);

  const fetchReport = async () => {
    try {
      const res = await publicRequest.get(`/rooms/v3/report/${roomId}`);
      setRoomReports(res.data);
      setLoading(false);
    } catch (error) {
      setRoomReports([]);
      setLoading(false);
    }
  };

  const toggleExpand = (index) => {
    if (expandedIndex === index) {
      setExpandedIndex(null);
    } else {
      setExpandedIndex(index);
    }
  };

  const openFullImage = (image) => {
    setSelectedImage(image);
  };

  const closeFullImageModal = () => {
    setSelectedImage(null);
  };

  return (
    <Modal
      ariaHideApp={false}
      isOpen={isOpen}
      onRequestClose={() => {
        closeModal();
        setSelectedImage(null);
        setExpandedIndex(null);
      }}
      style={{
        overlay: {
          zIndex: 1000,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        },
        content: {
          maxWidth: "800px",
          width: "100%",
          maxHeight: "80vh",
          margin: "auto",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
          background: "white",
          borderRadius: "8px",
          overflow: "auto",
          padding: "20px",
        },
      }}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Report List</h2>
        <button
          onClick={closeModal}
          className="text-red-500 hover:text-red-700"
        >
          <FaTimesCircle className="mr-1" size={20} />
        </button>
      </div>
      <div className="modal-content">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="space-y-4">
            {roomReports.map((report, index) => (
              <div key={index} className="border-b pb-4">
                <div className="flex justify-between items-center">
                  <div className="text-lg font-semibold mb-4 flex items-center">
                    <p className="text-gray-500 mr-2">
                      {formatDateFromTimestamp(report.createAt)}
                    </p>
                    <span className="text-gray-500">From:</span>
                    <span className="ml-1 text-blue-600 font-medium">
                      {report.user.firstName} {report.user.lastName}
                    </span>
                  </div>

                  <button
                    onClick={() => toggleExpand(index)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    {expandedIndex === index ? (
                      <FaChevronUp size={20} />
                    ) : (
                      <FaChevronDown size={20} />
                    )}
                  </button>
                </div>
                {expandedIndex === index && (
                  <div className="flex flex-wrap gap-2">
                    {report.images.map((image, i) => (
                      <img
                        key={i}
                        src={image}
                        alt={`Image ${i + 1}`}
                        className="w-20 h-20 object-cover cursor-pointer"
                        onClick={() => openFullImage(image)}
                      />
                    ))}
                    <span> {report.issueDescription}</span>
                  </div>
                )}
              </div>
            ))}
            {roomReports.length === 0 && <p>No reports available</p>}
          </div>
        )}
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
    </Modal>
  );
};

export default ModalReport;
