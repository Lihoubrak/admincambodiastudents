import React, { useEffect, useState } from "react";
import { ModalCreateDormitory } from "../../components";
import { Link } from "react-router-dom";
import { FaHome, FaTrash } from "react-icons/fa"; // Import FaTrash for delete icon
import { TokenRequest, publicRequest } from "../../RequestMethod/Request";
import { LoopCircleLoading } from "react-loadingg";
import { getDecodeToken } from "../../utils/getDecodeToken";
import {
  collection,
  doc,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { configRouter } from "../../config/route";

const Dormitory = () => {
  const [dorm, setDorm] = useState([]);
  const userId = getDecodeToken().id;

  const rolesArray = [
    { id: 4, roleName: "Economics Leader" },
    { id: 5, roleName: "Sports Leader" },
    { id: 6, roleName: "Technical Leader" },
    { id: 7, roleName: "Cultural Leader" },
    { id: 8, roleName: "Communication Leader" },
    { id: 9, roleName: "Leader" },
  ];
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  useEffect(() => {
    const fetchAllDorm = async () => {
      try {
        const dormData = [];
        const dormQueries = rolesArray.map((role) =>
          query(
            collection(db, "dormitories"),
            where("managers", "array-contains", { userId, role: role.roleName })
          )
        );

        for (const q of dormQueries) {
          const querySnapshot = await getDocs(q);
          querySnapshot.forEach((doc) => {
            const data = doc.data();
            dormData.push({
              id: doc.id,
              dormName: data.dormName,
              dormLocation: data.dormLocation,
              dormDescription: data.dormDescription,
              dormImage: data.dormImage,
            });
          });
        }

        setDorm(dormData);
      } catch (error) {
        console.error("Error fetching dormitories: ", error);
      }
    };
    fetchAllDorm();
  }, [userId, rolesArray]);

  return (
    <div>
      <div>
        <div className="flex justify-between items-center">
          <h1 className="text-4xl gap-3 flex justify-center items-center font-bold mb-8 text-center text-blue-600">
            <FaHome size={70} />
            <span>DORMITORY</span>
          </h1>
        </div>
        <div className="flex flex-wrap gap-8 justify-center">
          {/* Dormitory Card 1 */}
          {dorm.map((item, index) => (
            <div className="w-full max-w-[300px]" key={item.id}>
              <div className="cursor-pointer rounded-lg overflow-hidden shadow-lg bg-white hover:shadow-xl transition duration-300">
                <Link to={`/dormitory/${item.id}`}>
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
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dormitory;
