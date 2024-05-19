import React, { useEffect, useState } from "react";
import { IoPerson, IoBookOutline, IoCalendarOutline } from "react-icons/io5";
import { FaGraduationCap, FaFacebook, FaRegAddressCard } from "react-icons/fa";
import { RiInboxArchiveFill } from "react-icons/ri";
import { FiMapPin, FiPhone } from "react-icons/fi";
import { TokenRequest } from "../../RequestMethod/Request";

const DetailStudent = () => {
  const [student, setStudent] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await TokenRequest.get("/users/v1/profile");
      setStudent(res.data);
    };
    fetchUser();
  }, []);
  const studentImage = "/src/assets/Student.jpg";

  return (
    <div>
      {/* Student Information */}
      <div className="flex flex-col items-center">
        <div className="flex gap-5 justify-center items-center">
          {/* Student Details */}
          <div className="space-y-2">
            <h1 className="text-3xl font-extralight text-gray-800">
              {student?.sex === "M" ? "MR." : "MS."}
            </h1>
            <div className="w-10 border-b-2 border-black"></div>
            <h1 className="text-5xl text-[#0067b4] font-bold text-center">
              {student?.username}
            </h1>
            <div className="flex items-center justify-center">
              <div className="w-10 border-b-2 border-black"></div>
              <div className="mx-2 text-black">*</div>
              <div className="w-10 border-b-2 border-black"></div>
            </div>
            <h1 className="text-3xl font-extralight text-gray-800 text-center">
              Major: {student?.major}
            </h1>
          </div>

          {/* Student Image */}
          <div className="w-[200px] h-[200px] rounded-full overflow-hidden">
            <img
              src={studentImage}
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
            <span className="font-bold">Full Name:</span> {student?.username}
          </div>

          {/* University Section */}
          <div className="mb-6">
            <FiMapPin className="inline-block text-[#0871b9] mr-2" size={40} />
            <span className="font-bold">University:</span> {student?.university}
          </div>

          {/* Major Section */}
          <div className="mb-6">
            <IoBookOutline
              className="inline-block text-[#0871b9] mr-2"
              size={40}
            />
            <span className="font-bold">Major:</span> {student?.major}
          </div>

          {/* Student ID Section */}
          <div className="mb-6">
            <span className="inline-block text-[#0871b9] mr-2" size={40}>
              <FaRegAddressCard
                className="inline-block text-[#0871b9] mr-2"
                size={40}
              />
            </span>
            <span className="font-bold">Student ID:</span> {student?.studentId}
          </div>

          {/* Date of Birth Section */}
          <div className="mb-6">
            <IoCalendarOutline
              className="inline-block text-[#0871b9] mr-2"
              size={40}
            />
            <span className="font-bold">Date of Birth:</span>{" "}
            {student?.dateOfBirth}
          </div>

          {/* Address Section */}
          <div className="mb-6">
            <FaRegAddressCard
              className="inline-block text-[#0871b9] mr-2"
              size={40}
            />
            <span className="font-bold">Address:</span> {student?.address}
          </div>

          {/* Phone Number Section */}
          <div className="mb-6">
            <FiPhone className="inline-block text-[#0871b9] mr-2" size={40} />
            <span className="font-bold">Phone Number:</span>{" "}
            {student?.phoneNumber}
          </div>

          {/* Contact Section */}
          <div className="flex justify-between">
            {/* Email */}
            <div>
              <RiInboxArchiveFill
                className="inline-block text-[#0871b9] mr-2"
                size={40}
              />
              <span className="font-bold">Email:</span> {student?.email}
            </div>

            {/* Facebook */}
            <div>
              <FaFacebook
                className="inline-block text-[#0871b9] mr-2"
                size={40}
              />
              <span className="font-bold">Facebook:</span> {student?.facebookId}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailStudent;
