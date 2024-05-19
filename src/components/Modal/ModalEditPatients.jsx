import React, { useState } from "react";
import Modal from "react-modal";
import { publicRequest } from "../../RequestMethod/Request";
import { FaTimesCircle } from "react-icons/fa";

const ModalEditPatients = ({
  isModalEdit,
  setIsModalEdit,
  fetchPatients,
  healthcareId,
  setPatients,
  patients,
}) => {
  const [formData, setFormData] = useState({
    note: "",
    discount: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await publicRequest.put(
        `/heathcares/v12/update/${healthcareId}`,
        {
          note: formData.note,
          discount: formData.discount,
        }
      );
      setPatients(
        patients.map((patient) => {
          if (patient.id === healthcareId) {
            return {
              ...patient,
              note: formData.note,
              discount: formData.discount,
            };
          } else {
            return patient;
          }
        })
      );
      setIsModalEdit(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal
      isOpen={isModalEdit}
      ariaHideApp={false}
      onRequestClose={() => setIsModalEdit(false)}
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
        <h2 className="text-xl font-bold">Edit Patient</h2>
        <button
          onClick={() => setIsModalEdit(false)}
          className="text-blue-500 hover:text-blue-700"
        >
          <FaTimesCircle className="mr-1" size={20} color="red" />
        </button>
      </div>
      <div className="modal-content">
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-4">
            <label
              htmlFor="discount"
              className="block text-sm font-medium text-gray-700"
            >
              Discount:
            </label>
            <input
              type="text"
              id="discount"
              name="discount"
              value={formData.discount}
              onChange={handleChange}
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
              name="note"
              value={formData.note}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            Update Patient
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default ModalEditPatients;
