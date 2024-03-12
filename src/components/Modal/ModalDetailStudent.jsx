import React, { useEffect, useState } from "react";
import { FaTimesCircle } from "react-icons/fa";
import Modal from "react-modal";
import PassportInformation from "../Information/PassportInformation";
import VisaInformation from "../Information/VisaInformation";
import AcademicInformation from "../Information/AcademicInformation";
import AccommodationInformation from "../Information/AccommodationInformation";
import { publicRequest } from "../../RequestMethod/Request";

const ModalDetailStudent = ({
  detailModalOpen,
  setDetailModalOpen,
  studentId,
}) => {
  // State to keep track of active tab
  const [activeTab, setActiveTab] = useState("passport");
  const [studentInfo, setStudentInfo] = useState(null);
  useEffect(() => {
    const fetchPassport = async () => {
      const res = await publicRequest.get(`/passports/v6/detail/${studentId}`);
      setStudentInfo(res.data);
    };
    fetchPassport();
  }, [studentId]);
  // Function to handle tab click
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  // Render content based on active tab
  const renderTabContent = () => {
    switch (activeTab) {
      case "passport":
        return <PassportInformation studentInfo={studentInfo} />;
      case "visa":
        return <VisaInformation studentInfo={studentInfo} />;
      case "academic":
        return <AcademicInformation />;
      case "accommodation":
        return <AccommodationInformation />;
      default:
        return null;
    }
  };

  return (
    <Modal
      ariaHideApp={false}
      isOpen={detailModalOpen}
      onRequestClose={() => setDetailModalOpen(false)}
      contentLabel="Detail Modal"
      style={{
        overlay: {
          zIndex: 1000,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        },
        content: {
          height: "100%",
          margin: "auto",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          background: "white",
          borderRadius: "8px",
          overflow: "auto",
          padding: "20px",
        },
      }}
    >
      <div>
        <div className="modal-header flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Detail Student</h2>
          <button
            onClick={() => setDetailModalOpen(false)}
            className="flex items-center"
          >
            <FaTimesCircle className="mr-1" size={20} color="red" />
          </button>
        </div>
        <div>
          <div className="mb-4 flex gap-3">
            <div
              className={`p-3 rounded-md bg-gray-200 cursor-pointer hover:bg-gray-300 transition duration-300 ${
                activeTab === "passport" ? "bg-gray-300" : ""
              }`}
              onClick={() => handleTabClick("passport")}
            >
              Passport Information
            </div>
            <div
              className={`p-3 rounded-md bg-gray-200 cursor-pointer hover:bg-gray-300 transition duration-300 ${
                activeTab === "visa" ? "bg-gray-300" : ""
              }`}
              onClick={() => handleTabClick("visa")}
            >
              Visa Information
            </div>
            <div
              className={`p-3 rounded-md bg-gray-200 cursor-pointer hover:bg-gray-300 transition duration-300 ${
                activeTab === "academic" ? "bg-gray-300" : ""
              }`}
              onClick={() => handleTabClick("academic")}
            >
              Academic Information
            </div>
            <div
              className={`p-3 rounded-md bg-gray-200 cursor-pointer hover:bg-gray-300 transition duration-300 ${
                activeTab === "accommodation" ? "bg-gray-300" : ""
              }`}
              onClick={() => handleTabClick("accommodation")}
            >
              Accommodation Information
            </div>
          </div>
          {renderTabContent()}
        </div>
      </div>
    </Modal>
  );
};

export default ModalDetailStudent;
