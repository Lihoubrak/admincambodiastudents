import React from "react";

const PassportInformation = () => {
  return (
    <div className="flex gap-10">
      <ul>
        <li className="mb-4  flex gap-3">
          <p className="font-bold text-gray-800">Full name:</p>
          <p className="text-gray-600">Brak Lihou</p>
        </li>
        <li className="mb-4 flex gap-3">
          <p className="font-bold text-gray-800">Passport Number:</p>
          <p className="text-gray-600">ABC123456</p>
        </li>
        <li className="mb-4 flex gap-3">
          <p className="font-bold text-gray-800">Date of Birth:</p>
          <p className="text-gray-600">January 1, 1990</p>
        </li>
        <li className="mb-4 flex gap-3">
          <p className="font-bold text-gray-800">Sex:</p>
          <p className="text-gray-600">Male</p>
        </li>
        <li className="mb-4 flex gap-3">
          <p className="font-bold text-gray-800">Type:</p>
          <p className="text-gray-600">Regular</p>
        </li>
        <li className="mb-4 flex gap-3">
          <p className="font-bold text-gray-800">Code:</p>
          <p className="text-gray-600">123456</p>
        </li>
      </ul>
      <ul>
        <li className="mb-4 flex gap-3">
          <p className="font-bold text-gray-800">Nationality:</p>
          <p className="text-gray-600">Country</p>
        </li>
        <li className="mb-4 flex gap-3">
          <p className="font-bold text-gray-800">Place of birth:</p>
          <p className="text-gray-600">City, Country</p>
        </li>
        <li className="mb-4 flex gap-3">
          <p className="font-bold text-gray-800">Place of issue:</p>
          <p className="text-gray-600">City, Country</p>
        </li>
        <li className="mb-4 flex gap-3">
          <p className="font-bold text-gray-800">Date of expiry:</p>
          <p className="text-gray-600">December 31, 2025</p>
        </li>
        <li className="mb-4 flex gap-3">
          <p className="font-bold text-gray-800">Date of issue:</p>
          <p className="text-gray-600">January 1, 2020</p>
        </li>
      </ul>
    </div>
  );
};

export default PassportInformation;
