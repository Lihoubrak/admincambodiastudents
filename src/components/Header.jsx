import React from "react";
import { TfiMenu } from "react-icons/tfi";
import { AiOutlineSearch } from "react-icons/ai";
import { IoIosNotifications } from "react-icons/io";
import { MdLanguage } from "react-icons/md";
const Header = ({ toggleSidebar }) => {
  return (
    <div className="p-5 bg-white border-b-2 flex items-center justify-between">
      <div className="flex items-center gap-5">
        <TfiMenu size={20} onClick={toggleSidebar} className="cursor-pointer" />
        <div className="w-[400px] rounded-2xl border flex items-center gap-2 p-1">
          <AiOutlineSearch size={20} className="ml-2" />
          <input
            type="text"
            placeholder="Search"
            className="bg-transparent w-full border-none outline-none"
          />
        </div>
      </div>
      <div className="flex items-center gap-5">
        {/* Notification Icon */}
        <IoIosNotifications
          size={25}
          className="text-gray-600 hover:text-gray-900 transition duration-300"
        />

        {/* Language Icon */}
        <MdLanguage
          size={25}
          className="text-gray-600 hover:text-gray-900 transition duration-300"
        />

        {/* Profile Image */}
        <div className="w-10 h-10 rounded-full border border-gray-400 overflow-hidden">
          <img
            src="/src/assets/profile.jpg"
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
