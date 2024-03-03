import React from "react";
import { Link } from "react-router-dom";
import {
  FaHome,
  FaUser,
  FaBed,
  FaInbox,
  FaMoneyBill,
  FaTasks,
  FaPassport,
  FaHospital,
  FaBolt,
  FaTint,
  FaArchive,
} from "react-icons/fa";
import { GiGlassCelebration } from "react-icons/gi";
import logo from "../assets/logo.png"; // Import the logo image

const sidebarLinks = [
  { icon: <FaUser size={25} />, label: "University", to: "/university" },
  { icon: <FaBed size={25} />, label: "Dormitory", to: "/dormitory" },
  { icon: <FaInbox size={25} />, label: "Inbox", to: "/inbox" },
  {
    icon: <FaMoneyBill size={25} />,
    label: "Scholarships",
    to: "/scholarships",
  },
  { icon: <FaTasks size={25} />, label: "Student Tasks", to: "/tasks" },
  { icon: <FaPassport size={25} />, label: "Passport", to: "/passport" },
  { icon: <FaHospital size={25} />, label: "Healthcare", to: "/healthcare" },
  {
    icon: <FaBolt size={25} />,
    label: "Electricity Water",
    to: "/electricitywater",
  },
  { icon: <GiGlassCelebration size={30} />, label: "Program", to: "/" },
];

const Sidebar = ({ isSidebarOpen }) => {
  return (
    <div
      className={`py-5 bg-gray-900 min-h-screen flex flex-col border-r-2 overflow-hidden `}
    >
      <h1 className="text-center mb-5">
        <img
          src={logo}
          alt="Logo"
          className={`${isSidebarOpen ? "w-20" : "w-10"} h-auto mx-auto`}
        />
      </h1>
      <ul className="overflow-hidden">
        {sidebarLinks.map((link, index) => (
          <Link key={index} to={link.to} className="text-gray-300">
            <li
              className={`flex items-center pl-5 rounded py-3 cursor-pointer transition duration-300 ease-in-out hover:bg-blue-700 hover:text-white `}
            >
              <div className="flex items-center gap-3">
                {link.icon}
                {isSidebarOpen && (
                  <span className="text-base">{link.label}</span>
                )}
              </div>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
