import React, { useState } from "react";
import Modal from "react-modal";
import { publicRequest } from "../../RequestMethod/Request";
import { useParams } from "react-router-dom";
import { FaTimesCircle } from "react-icons/fa";

const ModalCreateProductEvent = ({
  isModalOpenCreate,
  setIsModalOpenCreate,
  programId,
  fetchProduct,
}) => {
  const [productName, setProductName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [date, setDate] = useState("");
  const [note, setNote] = useState("");
  const handleProductNameChange = (e) => {
    setProductName(e.target.value);
  };

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const handleNoteChange = (e) => {
    setNote(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const eventData = {
      productName,
      quantity,
      price,
      date,
      note,
    };
    const res = await publicRequest.post(`/productevents/v10/create`, {
      productName: eventData.productName,
      productQuantity: eventData.quantity,
      productPriceUnit: eventData.price,
      dateBuy: eventData.date,
      note: eventData.note,
      eventId: programId,
    });
    console.log(res.data);
    fetchProduct();
    setPrice("");
    setNote("");
    setProductName("");
    setQuantity("");
    setIsModalOpenCreate(false);
  };

  return (
    <Modal
      ariaHideApp={false}
      isOpen={isModalOpenCreate}
      onRequestClose={() => setIsModalOpenCreate(false)}
      style={{
        overlay: {
          zIndex: 1000,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        },
        content: {
          maxWidth: "600px",
          width: "100%",
          maxHeight: "80vh",
          margin: "auto",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
          background: "white",
          borderRadius: "8px",
          overflow: "auto",
          padding: "20px",
        },
      }}
    >
      <div className="modal-header flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Create New Product Event</h2>{" "}
        <button
          onClick={() => setIsModalOpenCreate(false)}
          className="text-blue-500 hover:text-blue-700"
        >
          <FaTimesCircle className="mr-1" size={20} color="red" />
        </button>
      </div>
      <div className="modal-content">
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Product Name:
            </label>
            <input
              type="text"
              id="name"
              required
              value={productName}
              onChange={handleProductNameChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="form-group mb-4">
            <label
              htmlFor="quantity"
              className="block text-sm font-medium text-gray-700"
            >
              Quantity:
            </label>
            <input
              type="text"
              id="quantity"
              value={quantity}
              required
              onChange={handleQuantityChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="form-group mb-4">
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-700"
            >
              Price (per unit):
            </label>
            <input
              type="text"
              id="price"
              value={price}
              required
              onChange={handlePriceChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="form-group mb-4">
            <label
              htmlFor="date"
              className="block text-sm font-medium text-gray-700"
            >
              Purchase Date:
            </label>
            <input
              type="date"
              id="date"
              required
              value={date}
              onChange={handleDateChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="form-group mb-4">
            <label
              htmlFor="note"
              className="block text-sm font-medium text-gray-700"
            >
              Note:
            </label>
            <input
              type="text"
              id="note"
              value={note}
              onChange={handleNoteChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            Create Product
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default ModalCreateProductEvent;
