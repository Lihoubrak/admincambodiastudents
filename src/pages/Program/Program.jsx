import React, { useEffect, useState } from "react";
import { GiGlassCelebration } from "react-icons/gi";
import { Link } from "react-router-dom";
import { TokenRequest } from "../../RequestMethod/Request";
import { ModalCreateProgram } from "../../components";

const Program = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [programs, setPrograms] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedYear, setSelectedYear] = useState("");

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const fetchPrograms = async () => {
    try {
      const res = await TokenRequest.get("/events/v9/all");
      setPrograms(res.data);
    } catch (error) {
      console.error("Error fetching programs:", error);
    }
  };

  useEffect(() => {
    fetchPrograms();
  }, []);

  // Function to handle filtering by year
  const handleFilterByYear = (year) => {
    setSelectedYear(year);
  };

  // Function to handle searching
  const handleSearch = () => {
    // Implement search logic here
    // For now, let's just log the search term
    console.log("Searching for:", searchTerm);
  };

  // Filter programs based on selected year
  const filteredPrograms = selectedYear
    ? programs.filter((program) => program.eventDate.startsWith(selectedYear))
    : programs;

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-4xl gap-3 flex justify-center items-center font-bold mb-8 text-center text-blue-600">
          <GiGlassCelebration size={70} />
          <span>PROGRAM</span>
        </h1>
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 border border-gray-300 rounded outline-none"
          />
          <button
            onClick={handleSearch}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Search
          </button>
        </div>
      </div>
      <div className="flex justify-between items-center mb-4">
        <div>
          Filter by Year:
          <select
            value={selectedYear}
            onChange={(e) => handleFilterByYear(e.target.value)}
            className="p-2 border border-gray-300 rounded ml-2 outline-none"
          >
            <option value="">All</option>
            <option value="2024">2024</option>
          </select>
        </div>
        <button
          onClick={openModal}
          className="min-w-[200px] font-bold text-white py-2 cursor-pointer rounded overflow-hidden shadow-md border-2 border-blue-600 flex items-center justify-center bg-blue-600 hover:bg-blue-700 transition duration-300"
        >
          Create New Program
        </button>
      </div>
      <div className="flex flex-wrap gap-8 justify-center">
        {/* Display program cards */}
        {filteredPrograms.map((program) => (
          <Link
            to={`/detailProgram/${program.id}`}
            key={program.id}
            className="w-full max-w-[300px]"
          >
            <div className="cursor-pointer rounded-lg overflow-hidden shadow-lg bg-white hover:shadow-xl transition duration-300">
              <img
                className="w-full h-48 object-cover"
                src={program.eventImage}
                alt={program.eventName}
              />
              <div className="px-6 py-4">
                <div className="text-center">
                  <h1 className="font-bold text-xl mb-2 text-blue-500">
                    {program.eventName}
                  </h1>
                  <p className="text-gray-700">{program.eventDate}</p>
                  <p className="text-gray-700">{program.eventLocation}</p>
                  <p className="text-sm text-gray-500 mb-2">
                    {program.eventDescription}
                  </p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <ModalCreateProgram
        isOpen={isModalOpen}
        closeModal={closeModal}
        fetchPrograms={fetchPrograms}
      />
    </div>
  );
};

export default Program;
