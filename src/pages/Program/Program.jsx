import React, { useEffect, useState } from "react";
import { GiGlassCelebration } from "react-icons/gi";
import { ModalCreateProgram } from "../../components";
import { Link } from "react-router-dom";
import { TokenRequest } from "../../RequestMethod/Request";

const Program = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [programs, setPrograms] = useState([]);
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

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-4xl gap-3 flex justify-center items-center font-bold mb-8 text-center text-blue-600">
          <GiGlassCelebration size={70} />
          <span>PROGRAM</span>
        </h1>
        <button
          onClick={openModal}
          className="min-w-[200px] font-bold text-white py-2 cursor-pointer rounded overflow-hidden shadow-md border-2 border-blue-600 mb-4 flex items-center justify-center bg-blue-600 hover:bg-blue-700 transition duration-300"
        >
          Create New Program
        </button>
      </div>
      <div className="flex flex-wrap gap-8 justify-center">
        {/* Display program cards */}
        {programs.map((program) => (
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
