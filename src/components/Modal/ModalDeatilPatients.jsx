import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { FaTimesCircle } from "react-icons/fa";
import { publicRequest } from "../../RequestMethod/Request";
import { LoopCircleLoading } from "react-loadingg";

const ModalDeatilPatients = ({
  healthcareId,
  isModalDetail,
  setIsModalDetail,
}) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        setLoading(true);
        const response = await publicRequest.get(
          `/heathcares/v12/images/${healthcareId}`
        );
        setImages(response.data);
      } catch (error) {
        console.error("Error fetching images:", error);
      } finally {
        setLoading(false);
      }
    };
    if (healthcareId) {
      fetchImages();
    }
  }, [healthcareId]);

  return (
    <Modal
      ariaHideApp={false}
      isOpen={isModalDetail}
      onRequestClose={() => setIsModalDetail(false)}
      style={{
        overlay: {
          zIndex: 1100,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        },
        content: {
          maxWidth: "90%",
          maxHeight: "90%",
          margin: "auto",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
          background: "white",
          borderRadius: "8px",
          overflow: "hidden",
          padding: 0,
          overflowY: "auto", // Add overflowY to enable vertical scrolling
        },
      }}
    >
      <div className="flex justify-end">
        <button
          onClick={() => setIsModalDetail(false)}
          className="text-red-500 hover:text-red-700 mr-4 mt-4"
        >
          <FaTimesCircle size={20} />
        </button>
      </div>
      {loading ? (
        <div className="flex items-center justify-center translate-y-52 -translate-x-3">
          <LoopCircleLoading color="#007bff" />
        </div>
      ) : (
        images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Full-size Image ${index + 1}`}
            className="w-full h-full object-contain"
          />
        ))
      )}
    </Modal>
  );
};

export default ModalDeatilPatients;
