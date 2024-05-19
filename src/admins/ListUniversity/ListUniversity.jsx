import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ModalCreateUniversity } from "../../components";
import { FaTrash, FaUniversity } from "react-icons/fa";
import { getDecodeToken } from "../../utils/getDecodeToken";
import { collection, doc, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../../firebase/firebase";

const ListUniversity = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [universities, setUniversities] = useState([]);
  const userId = getDecodeToken().id;

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const fetchAllUniversities = async () => {
      try {
        const q = query(
          collection(db, "schools"),
          where("UserId", "==", userId)
        );

        const unsubscribe = onSnapshot(
          q,
          (snapshot) => {
            const universityData = [];
            snapshot.forEach((doc) => {
              const {
                schoolName,
                schoolLocation,
                schoolDescription,
                schoolImage,
              } = doc.data();
              universityData.push({
                id: doc.id,
                schoolName,
                schoolLocation,
                schoolDescription,
                schoolImage,
              });
            });
            setUniversities(universityData);
          },
          (error) => {
            console.error("Error fetching universities:", error);
          }
        );

        return () => unsubscribe();
      } catch (error) {
        console.error("Error fetching universities:", error);
      }
    };

    fetchAllUniversities();

    // Cleanup function
    // No need to unsubscribe again here, it's already handled in fetchAllUniversities
  }, [userId]);

  const handleDeleteUniversity = async (universityId) => {
    const res = await TokenRequest.delete(`/schools/v4/remove/${universityId}`);
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-4xl gap-3 flex justify-center items-center font-bold mb-8 text-center text-blue-600">
          <FaUniversity size={50} />
          <span>UNIVERSITY</span>
        </h1>
        <div
          onClick={openModal}
          className="min-w-[200px] py-2 cursor-pointer rounded overflow-hidden shadow-md border-2 border-blue-600 mb-4 flex items-center justify-center bg-blue-600 hover:bg-blue-700 transition duration-300"
        >
          <p className="text-white font-bold">Create New University</p>
        </div>
      </div>
      <div className="flex flex-wrap gap-8 justify-center">
        {universities.map((university, index) => (
          <div
            className="relative w-full max-w-[300px] cursor-pointer"
            key={index}
          >
            <Link to={`/detaillistuniversity/${university.id}`}>
              <div className="cursor-pointer rounded-lg overflow-hidden shadow-lg bg-white hover:shadow-xl transition duration-300">
                <img
                  className="w-full h-48 object-cover"
                  src={university.schoolImage}
                  alt={university.schoolName}
                />
                <div className="px-6 py-4">
                  <div className="text-center">
                    <h1 className="font-bold text-xl mb-2 text-blue-500">
                      {university.schoolName}
                    </h1>
                    <p className="text-gray-700">{university.schoolLocation}</p>
                    <p className="text-sm text-gray-500 mb-2">
                      {university.schoolDescription}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
            <FaTrash
              className="absolute top-2 right-2 cursor-pointer text-red-500 hover:text-red-700 transition duration-300"
              onClick={() => handleDeleteUniversity(university.id)}
            />
          </div>
        ))}
      </div>
      <ModalCreateUniversity isOpen={isModalOpen} closeModal={closeModal} />
    </div>
  );
};

export default ListUniversity;
