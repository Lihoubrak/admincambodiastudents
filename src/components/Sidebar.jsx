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
  FaDatabase,
} from "react-icons/fa";
import { GiGlassCelebration, GiSoccerBall } from "react-icons/gi";
import logo from "../assets/logo.png";
import { useAuth } from "../contexts/AuthContext";
import { TbPlayFootball } from "react-icons/tb";
const Sidebar = ({ isSidebarOpen }) => {
  const { userRole } = useAuth();
  const getSidebarLinks = () => {
    if (userRole === "KTX") {
      return [
        { icon: <FaBed size={25} />, label: "Dormitory", to: "/" },
        { icon: <FaInbox size={25} />, label: "Inbox", to: "/inbox" },
        { icon: <FaTasks size={25} />, label: "Student Tasks", to: "/tasks" },
        {
          icon: <FaMoneyBill size={25} />,
          label: "Scholarships",
          to: "/scholarships",
        },

        { icon: <FaPassport size={25} />, label: "Passport", to: "/passport" },
        // {
        //   icon: <FaHospital size={25} />,
        //   label: "Healthcare",
        //   to: "/healthcare",
        // },
        {
          icon: <FaBolt size={25} />,
          label: "Electricity Water",
          to: "/electricitywater",
        },
        {
          icon: <GiGlassCelebration size={30} />,
          label: "Program",
          to: "/program",
        },
        {
          icon: <GiSoccerBall size={30} />,
          label: "Sport",
          to: "/sport",
        },
        {
          icon: <FaDatabase size={25} />,
          label: "Import & Export",
          to: "/data",
        },
      ];
    } else if (userRole === "SCH") {
      return [
        { icon: <FaUser size={25} />, label: "University", to: "/" },
        { icon: <FaInbox size={25} />, label: "Inbox", to: "/inbox" },
        { icon: <FaTasks size={25} />, label: "Student Tasks", to: "/tasks" },
        // {
        //   icon: <FaHospital size={25} />,
        //   label: "Healthcare",
        //   to: "/healthcare",
        // },
        {
          icon: <GiGlassCelebration size={30} />,
          label: "Program",
          to: "/program",
        },
        {
          icon: <GiSoccerBall size={30} />,
          label: "Sport",
          to: "/sport",
        },
        {
          icon: <FaDatabase size={25} />,
          label: "Import & Export",
          to: "/data",
        },
      ];
    } else {
      return [];
    }
  };

  const sidebarLinks = getSidebarLinks();
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
