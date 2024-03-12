import React, { useEffect, useState } from "react";
import { FaPassport } from "react-icons/fa";
import { PiStudentBold } from "react-icons/pi";
import { Link } from "react-router-dom";
import { publicRequest } from "../../RequestMethod/Request";

const Passport = () => {
  const [years, setYear] = useState([]);
  useEffect(() => {
    const fetchYear = async () => {
      const res = await publicRequest.get("/passports/v6/year");
      setYear(res.data);
    };
    fetchYear();
  }, []);
  return (
    <div>
      <h1 className="text-4xl gap-3 flex justify-center items-center font-bold mb-8 text-center text-blue-600">
        <FaPassport size={50} />
        <span className="ml-3">PASSPORT</span>
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 cursor-pointer">
        {years.map((year, index) => (
          <Link key={index} to={`/passport/list/${year}`}>
            <div className="p-4 bg-blue-100 rounded-lg shadow-md">
              <div className="flex items-center justify-between mb-2">
                <PiStudentBold size={50} className="text-indigo-600" />
                <span className="ml-2 text-xl font-semibold text-blue-800">
                  Students
                </span>
              </div>
              <span className="text-gray-500">{year}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Passport;
