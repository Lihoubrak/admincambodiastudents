import { DataGrid } from "@mui/x-data-grid";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { FaDownload, FaFileImport, FaPlus, FaSave } from "react-icons/fa";
import { GiSoccerBall } from "react-icons/gi";
import { ModalCreateTeamPlayer, TableTeamPlayer } from "../../components";
import { useParams } from "react-router-dom";
import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../firebase/firebase";

const DetailTeam = () => {
  const [loading, setLoading] = useState(false);
  const [isModalCreateTeamPlayer, setIsModalCreateTeamPlayer] = useState(false);
  const [player, setPlayer] = useState([]);
  const { teamId } = useParams();
  useEffect(() => {
    const fetchTeamPlayer = () => {
      setLoading(true);
      try {
        const q = query(
          collection(db, "sportPlayers"),
          where("TeamSportId", "==", teamId),
          orderBy("createdAt", "asc")
        );
        const unsubscribe = onSnapshot(q, (snapshot) => {
          const promises = [];
          snapshot.forEach((docs) => {
            const playerDoc = docs.data();
            const userPromise = getDoc(doc(db, "users", playerDoc.UserId)).then(
              (userSnapshot) => {
                if (userSnapshot.exists()) {
                  const userData = userSnapshot.data();
                  return { id: docs.id, ...docs.data(), userData };
                }
                return null;
              }
            );
            promises.push(userPromise);
          });

          Promise.all(promises)
            .then((playerData) => {
              setPlayer(playerData);
              setLoading(false);
            })
            .catch((error) => {
              console.error("Error fetching player data:", error);
              setLoading(false);
            });
        });

        return () => {
          unsubscribe();
        };
      } catch (error) {
        console.error("Error fetching team player data:", error);
        setLoading(false);
      }
    };

    fetchTeamPlayer();
  }, [teamId]);
  const formatPlayer = player.map((item, index) => ({
    id: item.id,
    no: index + 1,
    firstName: item.userData?.firstName,
    lastName: item.userData?.lastName,
    nationality: item.userData?.nationality,
    phoneNumber: item.userData?.phoneNumber,
    degree: item.userData?.degree,
    avatar: item.userData?.avatar,
    playerPosition: item.playerPosition,
    playerDescription: item.playerDescription,
    rank: item.rank,
  }));
  return (
    <div>
      <div className="flex justify-center items-center">
        <h1 className="text-4xl gap-3 flex items-center font-bold mb-8 text-center text-blue-600">
          <GiSoccerBall size={70} />
          <span>TEAM </span>
        </h1>
      </div>
      <TableTeamPlayer
        formatPlayer={formatPlayer}
        teamId={teamId}
        loading={loading}
        setIsModalCreateTeamPlayer={setIsModalCreateTeamPlayer}
        setPlayer={setPlayer}
      />
      <ModalCreateTeamPlayer
        isModalCreateTeamPlayer={isModalCreateTeamPlayer}
        setIsModalCreateTeamPlayer={setIsModalCreateTeamPlayer}
        teamId={teamId}
      />
    </div>
  );
};

export default DetailTeam;
