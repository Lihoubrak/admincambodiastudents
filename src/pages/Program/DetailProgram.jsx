import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  FaCalendarAlt,
  FaCheck,
  FaDownload,
  FaFileImport,
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
  ModalCreateProductEvent,
  ModalCreateSupport,
  ModalEditProgram,
  TableJoinProgram,
  TableProductProgram,
  TableSupportProgram,
} from "../../components";
import { LoopCircleLoading } from "react-loadingg";
const DetailProgram = () => {
  const { detailProgramId } = useParams();
  const [selectedYear, setSelectedYear] = useState(
    new Date().getFullYear().toString()
  );
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [support, setSupport] = useState([]);
  const [participantEvents, setParticipantEvents] = useState([]);
  const [event, setEvent] = useState(null);
  const [productError, setProductError] = useState(null);
  const [supportError, setSupportError] = useState(null);
  const [participantEventError, setParticipantEventError] = useState(null);
  const [isModalOpenCreate, setIsModalOpenCreate] = useState(false);
  const [isModalOpenEdit, setIsModalOpenEdit] = useState(false);
  const [isModalOpenCreateSupport, setIsModalOpenCreateSupport] =
    useState(false);
  const [isModalOpenCreateJoinProgram, setIsModalOpenCreateJoinProgram] =
    useState(false);

  // Handle year change
  const handleYearChange = (selectedOption) => {
    setSelectedYear(selectedOption.value);
  };

  // Options for year selection
  const yearOptions = [
    {
      value: new Date().getFullYear().toString(),
      label: new Date().getFullYear().toString(),
    },
    { value: "2023", label: "2023" },
  ];
  const fetchProduct = async () => {
    try {
      // Fetch product data
      const resProduct = await publicRequest.get(
        `/productevents/v10/all/${detailProgramId}?year=${selectedYear}`
      );
      setProducts(resProduct.data);
    } catch (error) {
      setProductError(error.response.data.error);
      setProducts([]);
    }
  };
  const fetchSupport = async () => {
    try {
      // Fetch support data
      const resSupport = await publicRequest.get(
        `/supportevents/v14/all/${detailProgramId}?year=${selectedYear}`
      );
      setSupport(resSupport.data);
    } catch (error) {
      setSupportError(error.response.data.error);
      setSupport([]);
    }
  };
  const fetchParticipant = async () => {
    try {
      // Fetch participant event data
      const resParticipantEvents = await publicRequest.get(
        `/participantevents/v11/all/${detailProgramId}?year=${selectedYear}`
      );
      setParticipantEvents(resParticipantEvents.data);
    } catch (error) {
      setParticipantEventError(error.response.data.error);
      setParticipantEvents([]);
    }
  };
  const fetchEvent = async () => {
    try {
      // Fetch event data
      const resEvent = await publicRequest.get(
        `/events/v9/${detailProgramId}/detail?year=${selectedYear}`
      );
      setEvent(resEvent.data);
    } catch (error) {
      setEvent(null);
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
      ]);
      setLoading(false);
    };

    fetchData();
  }, [detailProgramId, selectedYear]);

  const formatProduct = products.map((item, index) => ({
    id: index + 1,
    productName: item.productName,
    productQuantity: item.productQuantity,
    productPriceUnit: item.productPriceUnit,
    total: item.total,
    dateBuy: item.dateBuy,
    note: item.note,
  }));

  const formatSupport = support.map((item, index) => ({
    id: index + 1,
    supportName: item.supportName,
    supportSpecific: item.supportSpecific,
    typePay: item.typePay,
    date: item.date,
  }));

  const formatParticipant = participantEvents.map((item, index) => ({
    id: index + 1,
    avatar: item.User?.avatar,
    firstName: item.User?.firstName,
    lastName: item.User?.lastName,
    gender: item.User?.gender,
    age: item.User?.age,
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
  return (
    <div>
      {loading ? (
        <div className="flex items-center justify-center translate-y-52 -translate-x-10">
          <LoopCircleLoading color="#007bff" />
        </div>
      ) : (
        <div>
          <h1 className="text-4xl gap-3 flex justify-center items-center font-bold mb-8 text-center text-blue-600">
            <GiGlassCelebration size={70} />
            <span>PROGRAM</span>
          </h1>
          <div className="flex flex-col w-full bg-gray-200 p-6 rounded-md shadow-md mb-8">
            <div className="flex justify-around  mb-6">
              <div className="flex">
                <h2 className="text-xl font-bold text-red-600">
                  <FaUtensilSpoon className="inline-block mr-2" />
                  Food Menu
                </h2>
                <ul className="pl-6 space-y-2">
                  <li>{event?.foodMenu}</li>
                  <li>{event?.foodMenu}</li>
                  <li>{event?.foodMenu}</li>
                </ul>
              </div>
              <div className="flex">
                <h2 className="text-xl font-bold text-red-600">
                  <FaCalendar className="inline-block mr-2" />
                  Events in Program
                </h2>
                <ul className="pl-6 space-y-2">
                  <li>{event?.eventsInProgram}</li>
                  <li>{event?.eventsInProgram}</li>
                  <li>{event?.eventsInProgram}</li>
                </ul>
              </div>
            </div>
            <div className="flex justify-around">
              <div className="flex flex-col space-y-2">
                <div className="flex items-center">
                  <FaDollarSign className="text-red-600 mr-2" />
                  <span className="font-bold">Ticket Price:</span>
                  <span className="pl-2">{event?.ticketPrice}</span>
                </div>
                <div className="flex items-center">
                  <FaDollarSign className="text-red-600 mr-2" />
                  <span className="font-bold">Payment Per Student:</span>
                  <span className="pl-2">{event?.paymentPerStudent}</span>
                </div>
                <div className="flex items-center">
                  <FaDollarSign className="text-red-600 mr-2" />
                  <span className="font-bold">Number of Tickets:</span>
                  <span className="pl-2">{event?.numberOfTicket}</span>
                </div>
                <div className="flex items-center">
                  <FaCalendarAlt className="text-red-600 mr-2" />
                  <span className="font-bold">Event Date:</span>
                  <span className="pl-2">{event?.eventDate}</span>
                </div>
              </div>
              <div className="flex flex-col space-y-2">
                <div className="flex items-center">
                  <FaMapMarkerAlt className="text-red-600 mr-2" />
                  <span className="font-bold">Event Name:</span>
                  <span className="pl-2">{event?.eventName}</span>
                </div>
                <div className="flex items-center">
                  <FaMapMarkerAlt className="text-red-600 mr-2" />
                  <span className="font-bold">Event Location:</span>
                  <span className="pl-2">{event?.eventLocation}</span>
                </div>
                <div className="flex items-center">
                  <FaMapMarkerAlt className="text-red-600 mr-2" />
                  <span className="font-bold">Event Description:</span>
                  <span className="pl-2">{event?.eventDescription}</span>
                </div>
                <div className="flex items-center">
                  <FaCalendarAlt className="text-red-600 mr-2" />
                  <span className="font-bold">Event Expiry:</span>
                  <span className="pl-2">{event?.eventExpiry}</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsModalOpenEdit(true)}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              <FaEdit className="inline-block mr-2" />
              Edit
            </button>
          </div>
          <div className="flex">
            <Select
              value={yearOptions.find(
                (option) => option.value === selectedYear
              )}
              onChange={handleYearChange}
              options={yearOptions}
              defaultValue={yearOptions[0]}
              placeholder="Select Year"
              className="w-40"
            />
          </div>
          <TableProductProgram
            formatProduct={formatProduct}
            setIsModalOpenCreate={setIsModalOpenCreate}
            loading={loading}
            setProducts={setProducts}
            programId={detailProgramId}
            productError={productError}
          />
          <TableSupportProgram
            formatSupport={formatSupport}
            setIsModalOpenCreateSupport={setIsModalOpenCreateSupport}
            loading={loading}
            programId={detailProgramId}
            setSupport={setSupport}
            supportError={supportError}
          />
          <TableJoinProgram
            formatParticipant={formatParticipant}
            setIsModalOpenCreateJoinProgram={setIsModalOpenCreateJoinProgram}
            loading={loading}
            participantEventError={participantEventError}
          />

          <ModalCreateProductEvent
            isModalOpenCreate={isModalOpenCreate}
            setIsModalOpenCreate={setIsModalOpenCreate}
            programId={detailProgramId}
            fetchProduct={fetchProduct}
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
            fetchSupport={fetchSupport}
          />
          <ModalCreateJoinProgram
            programId={detailProgramId}
            isModalOpenCreateJoinProgram={isModalOpenCreateJoinProgram}
            setIsModalOpenCreateJoinProgram={setIsModalOpenCreateJoinProgram}
            fetchParticipant={fetchParticipant}
          />
        </div>
      )}
    </div>
  );
};

export default DetailProgram;
