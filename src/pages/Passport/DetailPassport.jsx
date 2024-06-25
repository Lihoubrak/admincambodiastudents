import React, { useEffect, useState } from "react";
import { FaPassport } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { TokenRequest } from "../../RequestMethod/Request";
import { LoopCircleLoading } from "react-loadingg";

const DetailPassport = () => {
  const { year } = useParams();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [lastVisible, setLastVisible] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  const stopCronJob = async () => {
    try {
      await TokenRequest.post("/stop-cron-job");
      window.alert("Stop reminder visa expires successfully");
    } catch (error) {
      window.alert("Stop reminder visa expires error");
    }
  };

  const startCronJob = async () => {
    try {
      await TokenRequest.post("/start-cron-job");
      window.alert("Start reminder visa expires successfully");
      console.log("Cron job started successfully");
    } catch (error) {
      window.alert("Start reminder visa expires error");
    }
  };

  const fetchStudents = async (append = false) => {
    if (append) {
      setLoadingMore(true);
    } else {
      setLoading(true);
    }

    try {
      const res = await TokenRequest.get(`/passports/v6/list`, {
        params: {
          year,
          lastVisible: lastVisible?.id, // Send the ID of the last visible document
          name: searchQuery,
        },
      });
      const fetchedStudents = res.data.users;
      setStudents((prev) =>
        append ? [...prev, ...fetchedStudents] : fetchedStudents
      );
      setLastVisible(res.data.lastVisible);
      setHasMore(fetchedStudents.length === 6); // Assuming your limit is 10
    } catch (error) {
      console.error("Error fetching students:", error);
      setStudents([]); // Reset students array on error
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, [year]);

  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = () => {
    fetchStudents();
  };

  const handleApproveEdit = async (studentId) => {
    try {
      const updatedStudents = students.map((student) => {
        if (student.id === studentId) {
          return { ...student, requestEdit: false };
        }
        return student;
      });
      setStudents(updatedStudents);
      await TokenRequest.put(`/passports/v6/approve/${studentId}`);
    } catch (error) {
      console.error("Error approving edit:", error);
      const revertedStudents = students.map((student) => {
        if (student.id === studentId) {
          return { ...student, requestEdit: true };
        }
        return student;
      });
      setStudents(revertedStudents);
    }
  };

  const loadMore = () => {
    if (hasMore) {
      fetchStudents(true);
    }
  };

  return (
    <div className="container mx-auto px-4">
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
          <div className="flex items-center justify-between ">
            <div className=" mb-4">
              <div className="flex items-center">
                <input
                  type="text"
                  placeholder="Search..."
                  onChange={handleChange}
                  className="border border-blue-500 rounded-md px-4 py-2 mr-2 outline-none"
                />
                <button
                  onClick={handleSearch}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                  Search
                </button>
              </div>
            </div>
            <div className=" mb-4 space-x-4">
              <button
                onClick={startCronJob}
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
              >
                Start Reminder(VISA)
              </button>
              <button
                onClick={stopCronJob}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
              >
                Stop Reminder(VISA)
              </button>
            </div>
          </div>
          {students.length === 0 ? (
            <div className="flex items-center justify-center text-red-500 text-lg font-semibold">
              No students found.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {students.map((student) => (
                <div
                  key={student.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden relative"
                >
                  <img
                    src={student.passportImage}
                    alt="Passport"
                    className="w-full h-56 object-cover"
                  />
                  <div className="p-4">
                    <h2 className="text-xl text-center font-bold mb-2">
                      {student.firstName} {student.lastName}
                    </h2>
                    <div className="flex justify-center">
                      {student.passportEntered ? (
                        <Link
                          to={`/passport/detailpassport/${student.id}`}
                          className="mx-2"
                        >
                          <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                            Passport
                          </button>
                        </Link>
                      ) : (
                        <p className="text-red-500 font-semibold ">
                          User has not entered passport information
                        </p>
                      )}
                      {student.requestEdit ? (
                        <button
                          onClick={() => handleApproveEdit(student.id)}
                          className="bg-yellow-500  hover:bg-yellow-600  text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50 mx-2"
                        >
                          Approve
                        </button>
                      ) : (
                        <p className="text-gray-500 font-semibold text-sm">
                          Not Request to Edit
                        </p>
                      )}
                    </div>
                    {/* Conditional rendering for visa expiration */}
                    {student.isVisaExpired && (
                      <p className="absolute  bg-red-500 p-1 rounded top-0 right-0  text-white font-bold  text-sm">
                        Visa Expire Soon
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
          {hasMore && students.length > 0 && (
            <div className="flex justify-center mt-4">
              {loadingMore ? (
                <LoopCircleLoading color="#007bff" />
              ) : (
                <button
                  onClick={loadMore}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                  Load More
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DetailPassport;
