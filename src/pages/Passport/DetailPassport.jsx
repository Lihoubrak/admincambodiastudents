import React, { useEffect, useState } from "react";
import { FaPassport } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { TokenRequest, publicRequest } from "../../RequestMethod/Request";
import { LoopCircleLoading } from "react-loadingg";

const DetailPassport = () => {
  const { year } = useParams();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await TokenRequest.get(`/passports/v6/list?year=${year}`);
        setStudents(res.data);
        setLoading(false);
      } catch (error) {
        setError(error.response.data.error);
        console.error("Error fetching students:", error);
        setLoading(false);
      }
    };
    fetchStudents();
  }, [year]);

  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredStudents = students.filter(
    (student) =>
      student.firstName.includes(searchQuery) ||
      student.lastName.includes(searchQuery)
  );

  return (
    <div>
      {loading ? (
        <div className="flex items-center justify-center translate-y-52 -translate-x-10">
          <LoopCircleLoading color="#007bff" />
        </div>
      ) : (
        <div>
          <h1 className="text-4xl flex items-center justify-center text-blue-600 font-bold mb-8">
            <FaPassport className="inline-block mr-3" size={50} />
            <span>PASSPORT</span>
          </h1>
          <div className="flex justify-center mb-4">
            <div className="flex items-center">
              <input
                type="text"
                placeholder="Search..."
                onChange={(e) => handleChange(e)}
                className="border border-blue-500 rounded-md px-4 py-2 mr-2 outline-none"
              />
              <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                Search
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {filteredStudents.map((student, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                {student.Passport ? (
                  <img
                    src={student.Passport.image}
                    alt="Passport"
                    className="w-full h-56 object-cover"
                  />
                ) : (
                  <div className="w-full h-56 flex items-center justify-center bg-gray-200 text-gray-600">
                    No Passport
                  </div>
                )}
                <div className="p-4">
                  <h2 className="text-xl text-center font-bold mb-2">
                    {student.firstName} {student.lastName}
                  </h2>
                  <div className="flex justify-center">
                    <Link to={`/passport/visa/1`} className="mx-2">
                      <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                        Visa
                      </button>
                    </Link>
                    <Link
                      to={`/passport/detailpassport/${student.id}`}
                      className="mx-2"
                    >
                      <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                        Passport
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailPassport;
