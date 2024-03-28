import React, { useState } from "react";
import { GiSoccerBall } from "react-icons/gi"; // Change icon to a sports-related one
import { Link } from "react-router-dom";
import { ModalCreateSport } from "../../components";

const Sport = () => {
  const [sportsEvents, setSportsEvents] = useState([
    {
      id: 1,
      eventName: "Football Match",
      eventDate: "2024-03-25",
      eventLocation: "Stadium ABC",
      eventDescription: "Exciting football match between Team A and Team B",
      eventImage: "https://example.com/football-match-image.jpg",
    },
    {
      id: 2,
      eventName: "Basketball Tournament",
      eventDate: "2024-04-10",
      eventLocation: "Indoor Arena XYZ",
      eventDescription:
        "Basketball tournament featuring top teams from the region",
      eventImage: "https://example.com/basketball-tournament-image.jpg",
    },
    // Add more sample events as needed
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedYear, setSelectedYear] = useState("");

  // Function to handle filtering by year
  const handleFilterByYear = (year) => {
    setSelectedYear(year);
  };

  // Function to handle searching
  const handleSearch = () => {
    // Implement search logic here
    // For now, let's just log the search term
    console.log("Searching for:", searchTerm);
  };

  // Filter sports events based on selected year
  const filteredEvents = selectedYear
    ? sportsEvents.filter((event) => event.eventDate.startsWith(selectedYear))
    : sportsEvents;
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-4xl gap-3 flex justify-center items-center font-bold mb-8 text-center text-blue-600">
          <GiSoccerBall size={50} />
          <span>SPORT EVENTS</span>
        </h1>
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 border border-gray-300 rounded outline-none"
          />
          <button
            onClick={handleSearch}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Search
          </button>
        </div>
      </div>
      <div className="flex justify-between items-center mb-4">
        <div>
          Filter by Year:
          <select
            value={selectedYear}
            onChange={(e) => handleFilterByYear(e.target.value)}
            className="p-2 border border-gray-300 rounded ml-2 outline-none"
          >
            <option value="">All</option>
            <option value="2024">2024</option>
          </select>
        </div>
        <button
          onClick={openModal}
          className="min-w-[200px] font-bold text-white py-2 cursor-pointer rounded overflow-hidden shadow-md border-2 border-blue-600 flex items-center justify-center bg-blue-600 hover:bg-blue-700 transition duration-300"
        >
          Create New Sport Event
        </button>
      </div>
      <div className="flex flex-wrap gap-8 justify-center">
        {filteredEvents.map((event) => (
          <Link
            to={`/detailSportEvent/${event.id}`}
            key={event.id}
            className="w-full max-w-[300px]"
          >
            <div className="cursor-pointer rounded-lg overflow-hidden shadow-lg bg-white hover:shadow-xl transition duration-300">
              <img
                className="w-full h-48 object-cover"
                src={event.eventImage}
                alt={event.eventName}
              />
              <div className="px-6 py-4">
                <div className="text-center">
                  <h1 className="font-bold text-xl mb-2 text-blue-500">
                    {event.eventName}
                  </h1>
                  <p className="text-gray-700">{event.eventDate}</p>
                  <p className="text-gray-700">{event.eventLocation}</p>
                  <p className="text-sm text-gray-500 mb-2">
                    {event.eventDescription}
                  </p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <ModalCreateSport isOpen={isModalOpen} closeModal={closeModal} />
    </div>
  );
};

export default Sport;
