import React from "react";

const PassportInformation = ({ studentInfo }) => {
  return (
    <div className="flex gap-10">
      <ul>
        <li className="mb-4  flex gap-3">
          <p className="font-bold text-gray-800">Full name:</p>
          <p className="text-gray-600">{`${studentInfo?.firstName} ${studentInfo?.lastName}`}</p>
        </li>
        <li className="mb-4 flex gap-3">
          <p className="font-bold text-gray-800">Passport Number:</p>
          <p className="text-gray-600">{studentInfo?.passportNumber}</p>
        </li>
        <li className="mb-4 flex gap-3">
          <p className="font-bold text-gray-800">Date of Birth:</p>
          <p className="text-gray-600">{studentInfo?.dateofbirth}</p>
        </li>
        <li className="mb-4 flex gap-3">
          <p className="font-bold text-gray-800">Sex:</p>
          <p className="text-gray-600">{studentInfo?.gender}</p>
        </li>
        <li className="mb-4 flex gap-3">
          <p className="font-bold text-gray-800">Type:</p>
          <p className="text-gray-600">{studentInfo?.type}</p>
        </li>
        <li className="mb-4 flex gap-3">
          <p className="font-bold text-gray-800">Code:</p>
          <p className="text-gray-600">{studentInfo?.code}</p>
        </li>
      </ul>
      <ul>
        <li className="mb-4 flex gap-3">
          <p className="font-bold text-gray-800">Nationality:</p>
          <p className="text-gray-600">{studentInfo?.nationality}</p>
        </li>
        <li className="mb-4 flex gap-3">
          <p className="font-bold text-gray-800">Place of birth:</p>
          <p className="text-gray-600">{studentInfo?.placeofbirth}</p>
        </li>
        <li className="mb-4 flex gap-3">
          <p className="font-bold text-gray-800">Place of issue:</p>
          <p className="text-gray-600">{studentInfo?.placeofissue}</p>
        </li>
        <li className="mb-4 flex gap-3">
          <p className="font-bold text-gray-800">Date of expiry:</p>
          <p className="text-gray-600">{studentInfo?.dateofexpiry}</p>
        </li>
        <li className="mb-4 flex gap-3">
          <p className="font-bold text-gray-800">Date of issue:</p>
          <p className="text-gray-600">{studentInfo?.dateofissue}</p>
        </li>
      </ul>
    </div>
  );
};

export default PassportInformation;
