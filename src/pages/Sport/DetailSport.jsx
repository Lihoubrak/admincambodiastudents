import React, { useEffect, useState } from "react";
import { GiSoccerBall, GiTrophyCup } from "react-icons/gi";
import { Link, useParams } from "react-router-dom";
import { ModalCreateTeamSport, TableTeamSport } from "../../components";
import { db } from "../../firebase/firebase";
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { TokenRequest } from "../../RequestMethod/Request";
import { formatDateFromTimestamp } from "../../utils/formatDateFromTimestamp";

const DetailSport = () => {
  const [sportEvent, setSportEvent] = useState(null);
  const { sportId } = useParams();
  const [isModalCreateTeam, setIsModalCreateTeam] = useState(false);
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchSport = async () => {
      setLoading(true);
      try {
        const q = query(
          collection(db, "teamSports"),
          where("SportId", "==", sportId),
          orderBy("createdAt", "asc")
        );
        const unsubscribe = onSnapshot(q, (snapshot) => {
          const teamData = [];
          snapshot.forEach((doc) => {
            teamData.push({ id: doc.id, ...doc.data() });
          });
          setTeam(teamData);
          setLoading(false);
        });
        return () => {
          unsubscribe();
        };
      } catch (error) {
        setTeam([]);
        setLoading(false);
        console.error(error);
      }
    };

    const fetchSportDetail = async () => {
      try {
        const res = await TokenRequest.get(`/sports/v18/all/detail/${sportId}`);
        setSportEvent(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchSport();
    fetchSportDetail();
  }, [sportId]);

  const formatTeam = team.map((item, index) => ({
    no: index + 1,
    id: item.id,
    teamName: item.teamName,
    representative: item.representative,
    location: item.location,
    numberOfMember: item.numberOfMember,
    logo: item.logo,
    phoneNumber: item.phoneNumber,
    rank: item.rank,
  }));

  return (
    <div>
      <h1 className="text-4xl flex justify-center items-center font-bold mb-8 text-center text-blue-600">
        <GiSoccerBall size={70} className="mr-3" />
        SPORT
      </h1>
      <div>
        {sportEvent && (
          <ul>
            <li className="mb-4">
              <span className="text-gray-700 font-bold mr-2">Sport Name:</span>
              <span className="text-gray-900">{sportEvent.sportName}</span>
            </li>
            <li className="mb-4">
              <span className="text-gray-700 font-bold mr-2">Sport Date:</span>
              <span className="text-gray-900">
                {formatDateFromTimestamp(sportEvent.sportDate)}
              </span>
            </li>
            <li className="mb-4">
              <span className="text-gray-700 font-bold mr-2">
                Sport Location:
              </span>
              <span className="text-gray-900">{sportEvent.sportLocation}</span>
            </li>
            <li className="mb-4">
              <span className="text-gray-700 font-bold mr-2">
                Sport Description:
              </span>
              <span className="text-gray-900">
                {sportEvent.sportDescription}
              </span>
            </li>
            <li className="mb-4">
              <span className="text-gray-700 font-bold mr-2">Created By:</span>
              <span className="text-gray-900">
                {sportEvent.User.firstName} - {sportEvent.User.lastName}
              </span>
            </li>
          </ul>
        )}
      </div>
      <div className="flex justify-center items-center border-t mb-4">
        <div className="mt-4">
          <div className="text-center">
            <GiTrophyCup
              className="w-16 h-16 mx-auto text-gold"
              color="#FFD700"
            />
            <p className="text-red-600 font-bold ">
              Gift Top 1 : {sportEvent && sportEvent.top1}
            </p>
          </div>
          <div className="flex justify-center space-x-96">
            <div className="text-center">
              <GiTrophyCup
                className="w-16 h-16 mx-auto text-gold"
                color="#FFD700"
              />
              <p className="text-green-600 font-bold">
                Gift Top 2 : {sportEvent && sportEvent.top2}
              </p>
            </div>
            <div className="text-center">
              <GiTrophyCup
                className="w-16 h-16 mx-auto text-gold"
                color="#FFD700"
              />
              <p className="text-blue-600 font-bold">
                Gift Top 3 : {sportEvent && sportEvent.top3}
              </p>
            </div>
          </div>
        </div>
      </div>
      <TableTeamSport
        setIsModalCreateTeam={setIsModalCreateTeam}
        formatTeam={formatTeam}
        setTeam={setTeam}
        sportId={sportId}
        loading={loading}
      />
      <ModalCreateTeamSport
        isModalCreateTeam={isModalCreateTeam}
        setIsModalCreateTeam={setIsModalCreateTeam}
        sportId={sportId}
      />
    </div>
  );
};

export default DetailSport;
