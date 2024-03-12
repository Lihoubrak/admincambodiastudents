import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ModalCreateUniversity } from "../../components";
import { FaUniversity } from "react-icons/fa";
import { publicRequest } from "../../RequestMethod/Request";

const University = () => {
  // Static data for a university
  const item = {
    name: "List of University",
    location: "Hanoi",
    imageUrl: "src/assets/image.jpg",
    description: "Comfortable student living",
    establishmentYear: 1970,
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [university, setUniveresity] = useState([]);
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const fetchAllUniversity = async () => {
    const res = await publicRequest.get("/schools/v4/all");
    setUniveresity(res.data);
  };
  useEffect(() => {
    fetchAllUniversity();
  }, []);
  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-4xl gap-3 flex justify-center items-center font-bold mb-8 text-center text-blue-600">
          <FaUniversity size={50} />
          <span>UNIVERSITY</span>
        </h1>
        {/* Create New University Button */}
        <div
          onClick={openModal}
          className="min-w-[200px] py-2 cursor-pointer rounded overflow-hidden shadow-md border-2 border-blue-600 mb-4 flex items-center justify-center bg-blue-600 hover:bg-blue-700 transition duration-300"
        >
          <p className="text-white font-bold">Create New University</p>
        </div>
      </div>
      <div className="flex flex-wrap gap-8 justify-center">
        {university.map((item, index) => (
          <Link
            to={`/university/${item.id}`}
            className="w-full max-w-[300px]"
            key={item.id}
          >
            <div className="cursor-pointer rounded-lg overflow-hidden shadow-lg bg-white hover:shadow-xl transition duration-300">
              <img
                className="w-full h-48 object-cover"
                src={item.schoolImage}
                alt={item.schoolName}
              />
              <div className="px-6 py-4">
                <div className="text-center">
                  <h1 className="font-bold text-xl mb-2 text-blue-500">
                    {item.schoolName}
                  </h1>
                  <p className="text-gray-700">{item.schoolLocation}</p>
                  <p className="text-sm text-gray-500 mb-2">
                    {item.schoolDescription}
                  </p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <ModalCreateUniversity
        isOpen={isModalOpen}
        closeModal={closeModal}
        fetchAllUniversity={fetchAllUniversity}
      />
    </div>
  );
};

export default University;
