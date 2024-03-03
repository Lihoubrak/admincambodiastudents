import React, { useState } from "react";
import { MdForwardToInbox } from "react-icons/md";

const Inbox = () => {
  // State for selected sender
  const [selectedSender, setSelectedSender] = useState(null);

  // Handler function for selecting sender
  const handleSelectSender = (index) => {
    setSelectedSender(index);
  };

  // Handler function to send the reply (you can implement this according to your needs)
  const handleSendReply = () => {
    // Implement send functionality here
    console.log("Reply sent to sender:", selectedSender + 1);
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-4xl flex items-center justify-center font-bold mb-8 text-blue-600">
        <MdForwardToInbox size={70} className="mr-3" />
        <span>INBOX</span>
      </h1>
      <div className="flex">
        <div className="w-1/4 bg-gray-100 p-4">
          <ul>
            {[...Array(7)].map((_, index) => (
              <li
                key={index}
                className={`py-2 cursor-pointer ${
                  selectedSender === index ? "bg-blue-200" : ""
                }`}
                onClick={() => handleSelectSender(index)}
              >
                Sender {index + 1}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex-1 bg-gray-200 p-4">
          <div className="flex items-center mb-4">
            <img
              src="src/assets/profile.jpg"
              alt=""
              className="w-12 h-12 rounded-full mr-4"
            />
            <p className="text-lg font-bold">Sender Name</p>
          </div>
          <div className="mb-4 h-64 overflow-y-auto">
            Message content goes here
          </div>
          <div className="flex mt-4">
            <input
              type="text"
              placeholder="Reply"
              className="flex-1 bg-white border border-gray-300 rounded py-2 px-4 mr-2 focus:outline-none"
            />
            <button
              onClick={handleSendReply}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inbox;
