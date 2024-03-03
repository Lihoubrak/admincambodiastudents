import React, { useState } from "react";
import { Header, Sidebar } from "../components";
const GlobalLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const sidebarWidth = isSidebarOpen ? "" : "w-20";
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <div
        className={`${
          isSidebarOpen ? "w-1/5" : sidebarWidth
        } overflow-y-auto transition-opacity duration-300 `}
      >
        <Sidebar isSidebarOpen={isSidebarOpen} />
      </div>
      <div className="flex flex-col w-full overflow-hidden">
        <Header toggleSidebar={toggleSidebar} />
        <div className="px-10 py-8 overflow-y-auto h-screen bg-[#fafafb]">
          {children}
        </div>
      </div>
    </div>
  );
};

export default GlobalLayout;
