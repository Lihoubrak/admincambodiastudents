import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { FaTimes, FaTimesCircle } from "react-icons/fa";
import { BsCup, BsBook, BsHouseDoorFill } from "react-icons/bs";
import { AiOutlineTable } from "react-icons/ai";
import { FaBed } from "react-icons/fa";
import { LuLamp } from "react-icons/lu";
import { GiPillow } from "react-icons/gi";
import { TokenRequest } from "../../RequestMethod/Request";

// Define mapping object for item names to icons
const iconMap = {
  cup: <BsCup />,
  pillow: <GiPillow />,
  lamp: <LuLamp />,
  table: <AiOutlineTable />,
  pillowcase: <BsBook />,
  mattress: <FaBed />,
};

const ModalDetailStudent = ({
  detailModalOpen,
  setDetailModalOpen,
  studentId,
}) => {
  const [checkedItems, setCheckedItems] = useState({});
  const [error, setError] = useState(null); // State for error message

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await TokenRequest.get(
          `rooms/v3/usermaterials/${studentId}`
        );
        const materialsData = response.data;
        setCheckedItems(materialsData);
        setError(null); // Clear error if successful
      } catch (error) {
        console.error("Error fetching materials:", error);
        setError("Materials Not Found"); // Set error message
      }
    };

    if (detailModalOpen) {
      fetchData();
    }
  }, [detailModalOpen, studentId]);

  const handleToggleItem = (item) => {
    setCheckedItems((prevState) => ({
      ...prevState,
      [item]: !prevState[item],
    }));
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
          maxWidth: "600px",
          width: "100%",
          maxHeight: "80vh",
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
        <div className="text-gray-800">
          <p className="font-bold mb-4">Supply:</p>
          {error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <ul className="list-none p-0">
              {Object.entries(checkedItems).map(([key, value]) => (
                <ItemWithCheckbox
                  key={key}
                  icon={iconMap[key]} // Use icon mapping based on item name
                  item={key}
                  text={key}
                  checked={value}
                  handleToggleItem={handleToggleItem}
                />
              ))}
            </ul>
          )}
        </div>
      </div>
    </Modal>
  );
};

const ItemWithCheckbox = ({ icon, text, item, checked, handleToggleItem }) => {
  const handleToggle = () => {
    handleToggleItem(item);
  };

  return (
    <div className="border p-2 rounded-md mb-2 flex justify-between items-center">
      <li className="flex items-center">
        {icon}
        <span className="ml-2">{text}</span>
      </li>
      <input
        type="checkbox"
        checked={checked}
        style={{
          cursor: "not-allowed",
        }}
      />
    </div>
  );
};

export default ModalDetailStudent;
