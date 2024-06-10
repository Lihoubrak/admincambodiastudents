import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa"; // Import FaTrash for delete icon
import {
  getDocs,
  query,
  where,
  collection,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { getDecodeToken } from "../../utils/getDecodeToken";

const Dormitory = () => {
  const [dorm, setDorm] = useState([]);
  const [loading, setLoading] = useState(false);
  const userId = getDecodeToken().id;

  useEffect(() => {
    const unsubscribeFunctions = [];

    const fetchAllDorm = async () => {
      try {
        setLoading(true);
        const dormData = [];
        const rolesArray = [
          { id: 4, roleName: "Economics Leader" },
          { id: 5, roleName: "Sports Leader" },
          { id: 6, roleName: "Technical Leader" },
          { id: 7, roleName: "Cultural Leader" },
          { id: 8, roleName: "Communication Leader" },
          { id: 9, roleName: "Leader" },
        ];

        for (const role of rolesArray) {
          const q = query(
            collection(db, "dormitories"),
            where("managers", "array-contains", { userId, role: role.roleName })
          );

          const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const data = [];
            querySnapshot.forEach((doc) => {
              const dormInfo = doc.data();
              data.push({
                id: doc.id,
                dormName: dormInfo.dormName,
                dormLocation: dormInfo.dormLocation,
                dormDescription: dormInfo.dormDescription,
                dormImage: dormInfo.dormImage,
              });
            });
            setDorm((prevDorm) => [...prevDorm, ...data]);
          });
          unsubscribeFunctions.push(unsubscribe);
        }
      } catch (error) {
        console.error("Error fetching dormitories: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllDorm();

    // Clean up function to unsubscribe from queries when component unmounts
    return () => {
      unsubscribeFunctions.forEach((unsubscribe) => {
        unsubscribe();
      });
    };
  }, [userId]);

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
