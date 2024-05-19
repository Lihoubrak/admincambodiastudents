import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ModalCreateUniversity } from "../../components";
import { FaUniversity } from "react-icons/fa";
import { getDecodeToken } from "../../utils/getDecodeToken";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebase";

const University = () => {
  const [university, setUniversity] = useState([]);
  const userId = getDecodeToken().id;
  const rolesArray = [
    { id: 4, roleName: "Economics Leader" },
    { id: 5, roleName: "Sports Leader" },
    { id: 6, roleName: "Technical Leader" },
    { id: 7, roleName: "Cultural Leader" },
    { id: 8, roleName: "Communication Leader" },
    { id: 9, roleName: "Leader" },
  ];

  useEffect(() => {
    const fetchAllUniversity = async () => {
      try {
        const queries = rolesArray.map((role) =>
          query(
            collection(db, "schools"),
            where("managers", "array-contains", {
              userId,
              role: role.roleName,
            })
          )
        );

        const universityData = [];
        for (const q of queries) {
          const querySnapshot = await getDocs(q);
          querySnapshot.forEach((doc) => {
            const data = doc.data();
            universityData.push({
              id: doc.id,
              schoolName: data.schoolName,
              schoolLocation: data.schoolLocation,
              schoolDescription: data.schoolDescription,
              schoolImage: data.schoolImage,
            });
          });
        }

        setUniversity(universityData);
      } catch (error) {
        console.error("Error fetching universities:", error);
      }
    };

    fetchAllUniversity();
  }, [userId, rolesArray]);

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-4xl gap-3 flex justify-center items-center font-bold mb-8 text-center text-blue-600">
          <FaUniversity size={50} />
          <span>UNIVERSITY</span>
        </h1>
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
      {/* <ModalCreateUniversity isOpen={isModalOpen} closeModal={closeModal} /> */}
    </div>
  );
};

export default University;
