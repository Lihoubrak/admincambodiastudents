import React, { useState } from "react";
import Modal from "react-modal";
import { FaTimesCircle } from "react-icons/fa";
import { TokenRequest } from "../../RequestMethod/Request";

const ModalResetPassword = ({ isOpen, closeModal }) => {
  const [email, setEmail] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [step, setStep] = useState(0); // 0: Email, 1: OTP, 2: New Password
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmitEmail = async () => {
    setLoading(true);
    try {
      await TokenRequest.post("/users/v1/send-verification-code", {
        userEmailAddress: email,
      });
      setStep(1); // Move to the next step (OTP)
      setError("");
    } catch (error) {
      setError(error.response.data.error);
    }
    setLoading(false);
  };

  const handleSubmitOtp = async () => {
    setLoading(true);
    try {
      await TokenRequest.post("/users/v1/verify-code", {
        code: otpCode,
        userEmailAddress: email,
      });
      setStep(2); // Move to the next step (New Password)
      setError("");
    } catch (error) {
      setError(error.response.data.error);
    }
    setLoading(false);
  };

  const handleSubmitNewPassword = async () => {
    setLoading(true);
    try {
      await TokenRequest.post("/users/v1/reset-otp", {
        userEmailAddress: email,
      });
      closeModal();
      setError("");
    } catch (error) {
      setError(error.response.data.error);
    }
    setLoading(false);
  };

  return (
    <Modal
      ariaHideApp={false}
      isOpen={isOpen}
      onRequestClose={closeModal}
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
          maxHeight: "50vh",
          margin: "auto",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
          background: "white",
          borderRadius: "8px",
          overflow: "auto",
          padding: "20px",
        },
      }}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Reset Password</h2>
        <button
          onClick={closeModal}
          className="text-red-500 hover:text-red-700"
        >
          <FaTimesCircle className="mr-1" size={20} />
        </button>
      </div>
      <div className="modal-content">
        {error && <div className="text-red-500">{error}</div>}
        {step === 0 && (
          <div className="mb-4">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
            <button
              onClick={handleSubmitEmail}
              className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              disabled={loading}
            >
              {loading ? "Sending..." : "Request OTP"}
            </button>
          </div>
        )}
        {step === 1 && (
          <div className="mb-4">
            <input
              type="text"
              placeholder="Enter OTP code"
              value={otpCode}
              onChange={(e) => setOtpCode(e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
            <button
              onClick={handleSubmitOtp}
              className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              disabled={loading}
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
          </div>
        )}
        {step === 2 && (
          <div className="mb-4">
            <input
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
            <button
              onClick={handleSubmitNewPassword}
              className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              disabled={loading}
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default ModalResetPassword;
