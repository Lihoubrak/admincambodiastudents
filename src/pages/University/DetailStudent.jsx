import React, { useEffect, useState } from "react";
import { IoPerson, IoBookOutline, IoCalendarOutline } from "react-icons/io5";
import { FaGraduationCap, FaFacebook, FaRegAddressCard } from "react-icons/fa";
import { RiInboxArchiveFill } from "react-icons/ri";
import { FiMapPin, FiPhone } from "react-icons/fi";
import { TokenRequest } from "../../RequestMethod/Request";
import { useParams } from "react-router-dom";
import { LoopCircleLoading } from "react-loadingg";
const DetailStudent = () => {
  const [student, setStudent] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // State to manage loading
  const { studentId } = useParams();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await TokenRequest.get(`/users/v1/detail/${studentId}`);
        setStudent(res.data);
        setIsLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.error("Error fetching student:", error);
        setIsLoading(false); // Set loading to false in case of error
      }
    };
    fetchUser();
  }, [studentId]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center translate-y-52 -translate-x-3">
        <LoopCircleLoading color="#007bff" />
      </div>
    );
  }

  return (
    <div>
      {/* Student Information */}
      <div className="flex flex-col items-center">
        <div className="flex gap-5 justify-center items-center">
          {/* Student Details */}
          <div className="space-y-2">
            <h1 className="text-3xl font-extralight text-gray-800">
              {student?.gender === "Male" || student?.gender === "ប្រុស"
                ? "MR."
                : "MS."}
            </h1>
            <div className="w-10 border-b-2 border-black"></div>
            <h1 className="text-5xl text-[#0067b4] font-bold text-center">
              {student?.firstName} {student?.lastName}
            </h1>
            <div className="flex items-center justify-center">
              <div className="w-10 border-b-2 border-black"></div>
              <div className="mx-2 text-black">*</div>
              <div className="w-10 border-b-2 border-black"></div>
            </div>
            <h1 className="text-3xl font-extralight text-gray-800 text-center">
              Major: {student?.Major?.majorName}
            </h1>
          </div>

          {/* Student Image */}
          <div className="w-[200px] h-[200px] rounded-full overflow-hidden">
            <img
              src={student?.avatar}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Student Details */}
      <div className="mt-8 bg-gray-100 rounded-lg p-8">
        {/* Student Information */}
        <div className="text-lg text-gray-800">
          {/* Name Section */}
          <div className="mb-6">
            <IoPerson className="inline-block text-[#0871b9] mr-2" size={40} />
            <span className="font-bold">Full Name:</span> {student?.firstName}{" "}
            {student?.lastName}
          </div>

          {/* University Section */}
          <div className="mb-6">
            <FiMapPin className="inline-block text-[#0871b9] mr-2" size={40} />
            <span className="font-bold">University:</span>{" "}
            {student?.Major?.School?.schoolName}
          </div>

          {/* Major Section */}
          <div className="mb-6">
            <IoBookOutline
              className="inline-block text-[#0871b9] mr-2"
              size={40}
            />
            <span className="font-bold">Major:</span>{" "}
            {student?.Major?.majorName}
          </div>

          {/* Student ID Section */}
          <div className="mb-6">
            <span className="inline-block text-[#0871b9] mr-2" size={40}>
              <FaRegAddressCard
                className="inline-block text-[#0871b9] mr-2"
                size={40}
              />
            </span>
            <span className="font-bold">Student ID:</span> {student?.id}
          </div>

          {/* Room Section */}
          <div className="mb-6">
            <span className="inline-block text-[#0871b9] mr-2" size={40}>
              <FaRegAddressCard
                className="inline-block text-[#0871b9] mr-2"
                size={40}
              />
            </span>
            <span className="font-bold">Room Number:</span>{" "}
            {student?.Room?.roomNumber}
          </div>

          {/* Major Description Section */}
          <div className="mb-6">
            <IoBookOutline
              className="inline-block text-[#0871b9] mr-2"
              size={40}
            />
            <span className="font-bold">Major Description:</span>{" "}
            {student?.Major?.majorDescription}
          </div>

          {/* School Section */}
          <div className="mb-6">
            <FiMapPin className="inline-block text-[#0871b9] mr-2" size={40} />
            <span className="font-bold">School Name:</span>{" "}
            {student?.Major?.School?.schoolName}
          </div>

          {/* Phone Number Section */}
          <div className="mb-6">
            <FiPhone className="inline-block text-[#0871b9] mr-2" size={40} />
            <span className="font-bold">Phone Number:</span>{" "}
            {student?.phoneNumber}
          </div>

          {/* Email Section */}
          <div className="mb-6">
            <RiInboxArchiveFill
              className="inline-block text-[#0871b9] mr-2"
              size={40}
            />
            <span className="font-bold">Email:</span> {student?.email}
          </div>

          {/* Facebook Section */}
          <div className="mb-6">
            <FaFacebook
              className="inline-block text-[#0871b9] mr-2"
              size={40}
            />
            <span className="font-bold">Facebook:</span> {student?.facebook}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailStudent;
