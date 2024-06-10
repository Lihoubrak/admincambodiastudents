import React, { useEffect, useState } from "react";
import { GiGlassCelebration } from "react-icons/gi";
import { Link } from "react-router-dom";
import { ModalCreateProgram } from "../../components";
import { LoopCircleLoading } from "react-loadingg";
import { formatDateFromTimestamp } from "../../utils/formatDateFromTimestamp";
import { getDecodeToken } from "../../utils/getDecodeToken";
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { getUserRole } from "../../utils/getUserRole";
import { db } from "../../firebase/firebase";
import { FaTrash } from "react-icons/fa";

const Program = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [programs, setPrograms] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [loading, setLoading] = useState(false);
  const userId = getDecodeToken().id;
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        let q;
        if (selectedYear) {
          q = query(
            collection(db, "events"),
            where("managers", "array-contains", userId),
            where("eventDate", ">=", new Date(`${selectedYear}-01-01`)),
            where("eventDate", "<=", new Date(`${selectedYear}-12-31`)),
            orderBy("eventDate", "asc")
          );
        } else {
          q = query(
            collection(db, "events"),
            where("managers", "array-contains", userId),
            orderBy("eventDate", "asc")
          );
        }
        const unsubscribe = onSnapshot(q, (snapshot) => {
          const eventsData = [];
          snapshot.forEach((doc) => {
            eventsData.push({ id: doc.id, ...doc.data() });
          });
          setPrograms(eventsData);
          setLoading(false);
        });

        return () => {
          unsubscribe();
        };
      } catch (error) {
        setPrograms([]);
        setLoading(false);
        console.log(error);
      }
    };

    fetchData();
  }, [userId, selectedYear]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleFilterByYear = (year) => {
    setSelectedYear(year);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredPrograms = programs.filter((program) =>
    program.eventName.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const handleDeleteUniversity = async (universityId) => {
    // Implement logic to delete the university
    console.log("Deleting university with ID:", universityId);
  };
  return (
    <div>
      {loading ? (
        <div className="flex items-center justify-center translate-y-52 -translate-x-3">
          <LoopCircleLoading color="#007bff" />
        </div>
      ) : (
        <div>
          <div className="flex justify-between items-center">
            <h1 className="text-4xl gap-3 flex justify-center items-center font-bold mb-5 text-center text-blue-600">
              <GiGlassCelebration size={70} />
              <span>PROGRAM</span>
            </h1>
            <div className="flex gap-4">
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleSearch}
                className="p-2 border border-gray-300 rounded outline-none"
                required // Added required attribute
              />
              <button
                // onClick={handleSearch}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Search
              </button>
            </div>
          </div>
          <div className="flex justify-between items-center mb-4">
            <div>
              <span className="text-blue-700 font-bold"> Filter by Year:</span>
              <select
                value={selectedYear}
                onChange={(e) => handleFilterByYear(e.target.value)}
                className="p-2 border border-gray-300 rounded ml-2 outline-none w-32"
              >
                <option value="">All</option>
                <option value="2024">2024</option>
                <option value="2023">2023</option>
                <option value="2022">2022</option>
              </select>
            </div>
            <button
              onClick={openModal}
              className="min-w-[200px] font-bold text-white py-2 cursor-pointer rounded overflow-hidden shadow-md border-2 border-blue-600 flex items-center justify-center bg-blue-600 hover:bg-blue-700 transition duration-300"
            >
              Create New Program
            </button>
          </div>
          {filteredPrograms.length < 1 ? (
            <div className="flex items-center justify-center translate-y-28 -translate-x-3 text-blue-600 font-bold text-xl">
              <p>No events found.</p>
            </div>
          ) : (
            <div className="flex flex-wrap gap-8 justify-center">
              {filteredPrograms.map((program) => (
                <div className="w-full max-w-[300px] relative" key={program.id}>
                  <Link to={`/detailProgram/${program.id}`}>
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
                          <p className="text-gray-700">
                            {formatDateFromTimestamp(program.eventDate)}
                          </p>
                          <p className="text-gray-700">
                            {program.eventLocation}
                          </p>
                          <p className="text-sm text-gray-500 mb-2">
                            {program.eventDescription}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                  {/* <FaTrash
                    className="absolute top-2 right-2 cursor-pointer text-red-500 hover:text-red-700 transition duration-300"
                    onClick={() => handleDeleteUniversity(university.id)}
                  /> */}
                </div>
              ))}
            </div>
          )}

          <ModalCreateProgram isOpen={isModalOpen} closeModal={closeModal} />
        </div>
      )}
    </div>
  );
};

export default Program;
