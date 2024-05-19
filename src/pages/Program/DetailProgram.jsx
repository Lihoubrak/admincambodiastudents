import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  FaAudioDescription,
  FaCalendarAlt,
  FaCheck,
  FaDownload,
  FaFileImport,
  FaPeopleArrows,
  FaPeopleCarry,
  FaPlus,
} from "react-icons/fa";
import Select from "react-select";
import { GiGlassCelebration } from "react-icons/gi";
import { publicRequest } from "../../RequestMethod/Request";
import { useParams } from "react-router-dom";
import {
  FaUtensilSpoon,
  FaCalendar,
  FaDollarSign,
  FaMapMarkerAlt,
  FaEdit,
} from "react-icons/fa";
import {
  ModalCreateJoinProgram,
  ModalCreateManagerProgram,
  ModalCreateProductEvent,
  ModalCreateSupport,
  ModalCreateTicket,
  ModalEditProgram,
  TableBuyTicketEvent,
  TableJoinProgram,
  TableProductProgram,
  TableSupportProgram,
} from "../../components";
import { LoopCircleLoading } from "react-loadingg";
import { formatDateFromTimestamp } from "../../utils/formatDateFromTimestamp";
import {
  MdEvent,
  MdOutlineAdminPanelSettings,
  MdOutlineNumbers,
} from "react-icons/md";
import { db } from "../../firebase/firebase";
import {
  onSnapshot,
  collection,
  query,
  where,
  getDoc,
  doc,
} from "firebase/firestore";

const DetailProgram = () => {
  const { detailProgramId } = useParams();
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [support, setSupport] = useState([]);
  const [ticket, setTicket] = useState([]);
  const [participantEvents, setParticipantEvents] = useState([]);
  const [event, setEvent] = useState(null);
  const [productError, setProductError] = useState(null);
  const [supportError, setSupportError] = useState(null);
  const [participantEventError, setParticipantEventError] = useState(null);
  const [ticketError, setTicketError] = useState(null);
  const [isModalOpenCreate, setIsModalOpenCreate] = useState(false);
  const [isModalOpenEdit, setIsModalOpenEdit] = useState(false);
  const [isModalOpenCreateSupport, setIsModalOpenCreateSupport] =
    useState(false);
  const [isModalOpenCreateJoinProgram, setIsModalOpenCreateJoinProgram] =
    useState(false);
  const [isModalCreateTicket, setIsModalOpenBuyTicket] = useState(false);
  const [addManager, setAddManager] = useState(false);

  const openModal = () => {
    setAddManager(true);
  };

  const closeModal = () => {
    setAddManager(false);
  };

  const fetchProduct = async () => {
    try {
      const q = query(
        collection(db, "productEvents"),
        where("EventId", "==", detailProgramId)
      );
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const products = [];
        snapshot.forEach((doc) => {
          products.push({ id: doc.id, ...doc.data() });
        });
        setProducts(products);
      });
      return unsubscribe;
    } catch (error) {
      setProductError(error.message);
      setProducts([]);
    }
  };

  const fetchSupport = async () => {
    try {
      const q = query(
        collection(db, "supportEvents"),
        where("EventId", "==", detailProgramId)
      );
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const supportData = [];
        snapshot.forEach((doc) => {
          supportData.push({ id: doc.id, ...doc.data() });
        });
        setSupport(supportData);
      });
      return unsubscribe;
    } catch (error) {
      setSupportError(error.message);
      setSupport([]);
    }
  };

  const fetchParticipant = async () => {
    try {
      const resParticipantEvents = await publicRequest.get(
        `/participantevents/v11/all/${detailProgramId}`
      );
      setParticipantEvents(resParticipantEvents.data);
    } catch (error) {
      setParticipantEventError(error.message);
      setParticipantEvents([]);
    }
  };

  const fetchEvent = async () => {
    try {
      const resEvent = await publicRequest.get(
        `/events/v9/${detailProgramId}/detail`
      );
      setEvent(resEvent.data);
    } catch (error) {
      console.error("Error fetching event:", error);
      setEvent(null);
    }
  };

  const fetchTicket = async () => {
    try {
      const q = query(
        collection(db, "ticketEvents"),
        where("EventId", "==", detailProgramId)
      );
      const unsubscribe = onSnapshot(q, async (snapshot) => {
        const formattedTickets = [];
        for (const docs of snapshot.docs) {
          const ticketDoc = docs.data();
          try {
            const userDocSnapshot = await getDoc(
              doc(db, "users", ticketDoc.UserId)
            );
            const userData = userDocSnapshot.data();
            const userRoomDoc = await getDoc(doc(db, "rooms", userData.RoomId));
            const roomData = userRoomDoc.data();
            const userDormDoc = await getDoc(
              doc(db, "dormitories", roomData.DormitoryId)
            );
            const dormData = userDormDoc.data();

            const formattedTicket = {
              id: docs.id,
              ...ticketDoc,
              User: {
                avatar: userData?.avatar,
                firstName: userData?.firstName,
                lastName: userData?.lastName,
                phoneNumber: userData?.phoneNumber,
                zalo: userData?.zalo,
                Room: {
                  roomNumber: roomData?.roomNumber,
                  Dormitory: { dormName: dormData?.dormName },
                },
              },
            };
            formattedTickets.push(formattedTicket);
          } catch (error) {
            console.error("Error fetching ticket related information:", error);
          }
        }
        setTicket(formattedTickets);
      });

      return unsubscribe;
    } catch (error) {
      setTicket([]);
      setTicketError(error.message);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await Promise.all([
        fetchProduct(),
        fetchSupport(),
        fetchParticipant(),
        fetchEvent(),
        fetchTicket(),
      ]);
      setLoading(false);
    };
    fetchData();
  }, [detailProgramId]);

  const formatProduct = products.map((item, index) => ({
    id: item.id,
    no: index + 1,
    productName: item.productName,
    productQuantity: item.productQuantity,
    productPriceUnit: item.productPriceUnit,
    total: item.total,
    dateBuy: item.dateBuy,
    note: item.note,
  }));

  const formatSupport = support.map((item, index) => ({
    id: item.id,
    no: index + 1,
    supportName: item.supportName,
    supportSpecific: item.supportSpecific,
    typePay: item.typePay,
    date: item.date,
  }));

  const formatParticipant = participantEvents.map((item, index) => ({
    id: item.id,
    no: index + 1,
    avatar: item.User?.avatar,
    firstName: item.User?.firstName,
    lastName: item.User?.lastName,
    gender: item.User?.gender,
    birthday: item.User?.birthday,
    nationality: item.User?.nationality,
    email: item.User?.email,
    phoneNumber: item.User?.phoneNumber,
    facebook: item.User?.facebook,
    zalo: item.User?.zalo,
    room: item.User?.Room ? item.User?.Room.roomNumber : "",
    dormitory: item.User?.Room ? item.User.Room?.Dormitory.dormName : "",
    typePayMoney: item?.typePayMoney,
    payMoney: item?.payMoney,
    date: item?.date,
  }));

  const formatTicket = ticket.map((item, index) => ({
    id: item.id,
    no: index + 1,
    avatar: item.User?.avatar,
    firstName: item.User?.firstName,
    lastName: item.User?.lastName,
    phoneNumber: item.User?.phoneNumber,
    zalo: item.User?.zalo,
    room: item.User?.Room ? item.User?.Room.roomNumber : "",
    dormitory: item.User?.Room ? item.User.Room?.Dormitory.dormName : "",
    typePayMoney: item?.typePayMoney,
    payMoney: item?.payMoney,
    date: item?.date,
    price: item?.price,
    number: item?.numberOfTicket,
  }));
  return (
    <div>
      {loading ? (
        <div className="flex items-center justify-center translate-y-52 -translate-x-3">
          <LoopCircleLoading color="#007bff" />
        </div>
      ) : (
        <div>
          <h1 className="text-4xl gap-3 flex justify-center items-center font-bold mb-8 text-center text-blue-600">
            <GiGlassCelebration size={70} />
            <span>PROGRAM</span>
          </h1>
          <div className="rounded-md">
            <div className="grid grid-cols-2 gap-4">
              <div className="border p-4 rounded-md">
                <h2 className="text-xl flex items-center justify-center mb-6 font-bold text-gray-700">
                  <FaUtensilSpoon className="h-6 w-6 mr-2 text-yellow-700" />
                  Food Menu
                </h2>
                <ul>
                  <ul className="flex gap-5 justify-around">
                    {event?.foodMenu &&
                      Array.isArray(event.foodMenu) &&
                      event.foodMenu.map((item, index) => (
                        <li key={index}>{item.name}</li>
                      ))}
                  </ul>
                </ul>
              </div>
              <div className="border p-4 rounded-md">
                <h2 className="text-xl flex items-center justify-center mb-6 font-bold text-gray-700">
                  <FaCalendar className="h-6 w-6 mr-2 text-yellow-700" />
                  Events in Program
                </h2>
                <ul className="flex gap-5 justify-around">
                  {event?.eventsInProgram &&
                    Array.isArray(event.eventsInProgram) &&
                    event.eventsInProgram.map((item, index) => (
                      <li key={index}>{item.eventName}</li>
                    ))}
                </ul>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="border p-4 rounded-md space-y-3">
                <div className="flex items-center">
                  <FaDollarSign className="h-6 w-6 text-red-600 mr-2" />
                  <span className="font-bold text-gray-700">Ticket Price:</span>
                  <span className="pl-2">{event?.ticketPrice}</span>
                </div>
                <div className="flex items-center">
                  <FaDollarSign className="h-6 w-6 text-red-600 mr-2" />
                  <span className="font-bold text-gray-700">
                    Payment Per Student:
                  </span>
                  <span className="pl-2">{event?.paymentPerStudent}</span>
                </div>
                <div className="flex items-center">
                  <MdOutlineNumbers className="h-6 w-6 text-red-600 mr-2" />
                  <span className="font-bold text-gray-700">
                    Number of Tickets:
                  </span>
                  <span className="pl-2">{event?.numberOfTicket}</span>
                </div>
                <div className="flex items-center">
                  <FaCalendarAlt className="h-6 w-6 text-red-600 mr-2" />
                  <span className="font-bold text-gray-700">Event Date:</span>
                  <span className="pl-2">
                    {formatDateFromTimestamp(event?.eventDate)}
                  </span>
                </div>
                <div className="flex items-center">
                  <FaPeopleCarry className="h-6 w-6 text-red-600 mr-2" />
                  <span className="font-bold text-gray-700">Create By:</span>
                  <span className="pl-2">
                    {event?.user.firstName} - {event?.user.lastName}
                  </span>
                </div>
              </div>
              <div className="border p-4 rounded-md space-y-3">
                <div className="flex items-center">
                  <MdEvent className="h-6 w-6 text-red-600 mr-2" />
                  <span className="font-bold text-gray-700">Event Name:</span>
                  <span className="pl-2">{event?.eventName}</span>
                </div>
                <div className="flex items-center">
                  <FaMapMarkerAlt className="h-6 w-6 text-red-600 mr-2" />
                  <span className="font-bold text-gray-700">
                    Event Location:
                  </span>
                  <span className="pl-2">{event?.eventLocation}</span>
                </div>
                <div className="flex items-center">
                  <FaAudioDescription className="h-6 w-6 text-red-600 mr-2" />
                  <span className="font-bold text-gray-700">
                    Event Description:
                  </span>
                  <span className="pl-2">{event?.eventDescription}</span>
                </div>
                <div className="flex items-center">
                  <FaCalendarAlt className="h-6 w-6 text-red-600 mr-2" />
                  <span className="font-bold text-gray-700">Event Expiry:</span>
                  <span className="pl-2">
                    {formatDateFromTimestamp(event?.eventExpiry)}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4 mt-4">
              <button
                onClick={() => setIsModalOpenEdit(true)}
                className=" px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                <FaEdit className="h-6 w-6 inline-block mr-2" />
                Edit
              </button>
              <button
                onClick={openModal}
                className="p-2 rounded-md overflow-hidden shadow-md border border-green-600 flex items-center justify-center bg-green-600 hover:bg-green-700 transition duration-300"
              >
                <MdOutlineAdminPanelSettings className="text-white text-2xl" />
              </button>
            </div>
          </div>

          <TableBuyTicketEvent
            setIsModalOpenBuyTicket={setIsModalOpenBuyTicket}
            formatTicket={formatTicket}
            loading={loading}
            ticketError={ticketError}
            setTicket={setTicket}
            ticket={ticket}
          />
          <TableProductProgram
            formatProduct={formatProduct}
            setIsModalOpenCreate={setIsModalOpenCreate}
            loading={loading}
            setProducts={setProducts}
            programId={detailProgramId}
            productError={productError}
            products={products}
          />
          <TableSupportProgram
            formatSupport={formatSupport}
            setIsModalOpenCreateSupport={setIsModalOpenCreateSupport}
            loading={loading}
            programId={detailProgramId}
            setSupport={setSupport}
            supportError={supportError}
            support={support}
          />
          <TableJoinProgram
            formatParticipant={formatParticipant}
            setIsModalOpenCreateJoinProgram={setIsModalOpenCreateJoinProgram}
            loading={loading}
            participantEventError={participantEventError}
            setParticipantEvents={setParticipantEvents}
            participantEvents={participantEvents}
          />

          <ModalCreateProductEvent
            isModalOpenCreate={isModalOpenCreate}
            setIsModalOpenCreate={setIsModalOpenCreate}
            programId={detailProgramId}
          />
          <ModalEditProgram
            programId={detailProgramId}
            isModalOpenEdit={isModalOpenEdit}
            setIsModalOpenEdit={setIsModalOpenEdit}
            fetchEvent={fetchEvent}
          />
          <ModalCreateSupport
            programId={detailProgramId}
            isModalOpenCreateSupport={isModalOpenCreateSupport}
            setIsModalOpenCreateSupport={setIsModalOpenCreateSupport}
          />
          <ModalCreateJoinProgram
            programId={detailProgramId}
            isModalOpenCreateJoinProgram={isModalOpenCreateJoinProgram}
            setIsModalOpenCreateJoinProgram={setIsModalOpenCreateJoinProgram}
            fetchParticipant={fetchParticipant}
          />
          <ModalCreateTicket
            programId={detailProgramId}
            setIsModalOpenBuyTicket={setIsModalOpenBuyTicket}
            isModalCreateTicket={isModalCreateTicket}
          />
          <ModalCreateManagerProgram
            isOpen={addManager}
            closeModal={closeModal}
            eventId={detailProgramId}
          />
        </div>
      )}
    </div>
  );
};

export default DetailProgram;
