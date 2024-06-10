import React, { useEffect, useState } from "react";
import { ModalCreateDormitory } from "../../components";
import { Link } from "react-router-dom";
import { FaHome, FaTrash } from "react-icons/fa";
import { TokenRequest } from "../../RequestMethod/Request";
import { LoopCircleLoading } from "react-loadingg";
import { getDecodeToken } from "../../utils/getDecodeToken";
import { collection, doc, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../../firebase/firebase";

const ListDormitory = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dorm, setDorm] = useState([]);
  const userId = getDecodeToken().id;
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  useEffect(() => {
    const fetchAllDorm = async () => {
      try {
        const q = query(
          collection(db, "dormitories"),
          where("UserId", "==", userId)
        );
        const unsubscribe = onSnapshot(q, (snapshot) => {
          const dormData = [];
          snapshot.forEach((doc) => {
            const data = doc.data();
            dormData.push({
              id: doc.id,
              dormName: data.dormName,
              dormLocation: data.dormLocation,
              dormDescription: data.dormDescription,
              dormImage: data.dormImage,
            });
          });
          setDorm(dormData);
          setLoading(false);
        });
        return () => {
          unsubscribe();
        };
      } catch (error) {
        console.error("Error fetching dormitories: ", error);
      }
    };
    fetchAllDorm();
  }, [userId]);
  const handleDeleteDorm = async (dormId) => {
    const res = await TokenRequest.delete(`/dorms/v2/remove/${dormId}`);
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
            <h1 className="text-4xl gap-3 flex justify-center items-center font-bold mb-8 text-center text-blue-600">
              <FaHome size={70} />
              <span>DORMITORY</span>
            </h1>
            <button
              onClick={openModal}
              className="min-w-[200px] font-bold text-white py-2 cursor-pointer rounded overflow-hidden shadow-md border-2 border-blue-600 mb-4 flex items-center justify-center bg-blue-600 hover:bg-blue-700 transition duration-300"
            >
              Create New Dormitory
            </button>
          </div>
          <div className="flex flex-wrap gap-8 justify-center">
            {/* Dormitory Card 1 */}
            {dorm.map((item, index) => (
              <div
                className="relative w-full max-w-[300px] cursor-pointer"
                key={index}
              >
                <Link to={`/detaillistdormitory/${item.id}`}>
                  <div className="rounded-lg overflow-hidden shadow-lg bg-white hover:shadow-xl transition duration-300">
                    <img
                      className="w-full h-48 object-cover"
                      src={item.dormImage}
                      alt=""
                    />
                    <div className="px-6 py-4">
                      <div className="text-center">
                        <h1 className="font-bold text-xl mb-2 text-blue-500">
                          {item.dormName}
                        </h1>
                        <p className="text-gray-700">{item.dormLocation}</p>
                        <p className="text-sm text-gray-500 mb-2">
                          {item.dormDescription}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
                {/* Delete Icon */}
                {/* <FaTrash
                  className="absolute top-2 right-2 cursor-pointer text-red-500 hover:text-red-700 transition duration-300"
                  onClick={() => handleDeleteDorm(item.id)}
                /> */}
              </div>
            ))}
          </div>

          <ModalCreateDormitory isOpen={isModalOpen} closeModal={closeModal} />
        </div>
      )}
    </div>
  );
};

export default ListDormitory;
