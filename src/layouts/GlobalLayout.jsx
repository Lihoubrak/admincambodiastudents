import React, { useEffect, useState } from "react";
import { Header, Sidebar } from "../components";
import { TokenRequest } from "../RequestMethod/Request";
const GlobalLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [user, setUser] = useState(null);
  const sidebarWidth = isSidebarOpen ? "" : "w-20";
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await TokenRequest.get("/users/v1/profile");
        setUser(res.data);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };
    fetchUser();
  }, []);
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
        <Header toggleSidebar={toggleSidebar} user={user} />
        <div className="px-10 py-8 overflow-y-auto h-screen bg-[#fafafb]">
          {children}
        </div>
      </div>
    </div>
  );
};

export default GlobalLayout;
