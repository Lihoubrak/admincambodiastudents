import React from "react";

const VisaInformation = () => {
  return (
    <div className="flex gap-10">
      <ul>
        <li className="mb-4  flex gap-3">
          <p className="font-bold text-gray-800">No:</p>
          <p className="text-gray-600">Brak Lihou</p>
        </li>
        <li className="mb-4 flex gap-3">
          <p className="font-bold text-gray-800">
            Good for single/ multiple entries:
          </p>
          <p className="text-gray-600">ABC123456</p>
        </li>
        <li className="mb-4 flex gap-3">
          <p className="font-bold text-gray-800">Issued at:</p>
          <p className="text-gray-600">January 1, 1990</p>
        </li>
        <li className="mb-4 flex gap-3">
          <p className="font-bold text-gray-800">Ngày nhập cảnh:</p>
          <p className="text-gray-600">Male</p>
        </li>
        <li className="mb-4 flex gap-3">
          <p className="font-bold text-gray-800">Category:</p>
          <p className="text-gray-600">Country</p>
        </li>
      </ul>
      <ul>
        <li className="mb-4 flex gap-3">
          <p className="font-bold text-gray-800">Valid from:</p>
          <p className="text-gray-600">City, Country</p>
        </li>
        <li className="mb-4 flex gap-3">
          <p className="font-bold text-gray-800">Until:</p>
          <p className="text-gray-600">City, Country</p>
        </li>
        <li className="mb-4 flex gap-3">
          <p className="font-bold text-gray-800">On:</p>
          <p className="text-gray-600">December 31, 2025</p>
        </li>
        <li className="mb-4 flex gap-3">
          <p className="font-bold text-gray-800">Cửa khẩu:</p>
          <p className="text-gray-600">January 1, 2020</p>
        </li>
      </ul>
    </div>
  );
};

export default VisaInformation;
