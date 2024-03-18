import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { FaTasks } from "react-icons/fa";
import { TokenRequest, publicRequest } from "../../RequestMethod/Request";
import Select from "react-select";
const StudentTasks = () => {
  const [taskContent, setTaskContent] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [files, setFiles] = useState([]);
  const [selectedDormUniversity, setSelectedDormUniversity] = useState();
  const [selectType, setSelectType] = useState();
  const [dorm, setDorm] = useState([]);
  const [university, setUniveresity] = useState([]);
  const optionsDorm = dorm.map((item) => ({
    label: item.dormName,
    value: item.id,
  }));
  const optionsUniversity = university.map((item) => ({
    label: item.schoolName,
    value: item.id,
  }));
  const handleChangeDormUniversity = (selectedOption) => {
    setSelectedDormUniversity(selectedOption);
  };
  const handleType = (TypeOption) => {
    setSelectType(TypeOption);
  };
  const handleTaskContentChange = (content) => {
    setTaskContent(content);
  };

  const handleTaskDescriptionChange = (e) => {
    setTaskDescription(e.target.value);
  };

  const handleFileUpload = (event) => {
    const uploadedFiles = Array.from(event.target.files);
    setFiles(uploadedFiles);
  };

  const handleSubmit = async () => {
    const sendNotification = await TokenRequest.post(
      "/notifications/v15/send",
      {
        description: taskDescription,
        content: taskContent,
        file: "",
        type: selectType.value,
        notificationTo: selectedDormUniversity
          ? selectedDormUniversity.value
          : null,
      }
    );
    setTaskContent("");
    setTaskDescription("");
    setIsSubmitted(true);
  };
  useEffect(() => {
    const fetchDorm = async () => {
      const res = await TokenRequest.get("/dorms/v2/all");
      setDorm(res.data);
    };
    fetchDorm();
    const fetchAllUniversity = async () => {
      const res = await TokenRequest.get("/schools/v4/all");
      setUniveresity(res.data);
    };
    fetchAllUniversity();
  }, []);
  return (
    <div>
      <h1 className="text-4xl gap-3 flex justify-center items-center font-bold mb-8 text-center text-blue-600">
        <FaTasks size={70} />
        <span>STUDENT TASK</span>
      </h1>
      <div className="flex items-center gap-4">
        <p className="font-bold text-red-600">Notification To:</p>
        <Select
          value={selectedDormUniversity}
          onChange={handleChangeDormUniversity}
          options={optionsDorm.length > 0 ? optionsDorm : optionsUniversity}
          defaultValue={
            optionsDorm.length > 0 ? optionsDorm[0] : optionsUniversity[0]
          }
          placeholder="Select"
          className="w-60"
        />
        <Select
          value={selectType}
          onChange={handleType}
          options={[
            { label: "Dormitory", value: "Dorms" },
            { label: "University", value: "Univ" },
            { label: "All", value: "All" },
          ]}
          defaultValue={{ label: "Dorms", value: "Dorms" }}
          placeholder="Select Type"
          className="w-60"
        />
      </div>

      <div className="mb-8">
        <div className="mb-4">
          <h3 className="text-lg font-bold mb-2 text-blue-700">
            Task Description
          </h3>

          <textarea
            value={taskDescription}
            onChange={handleTaskDescriptionChange}
            placeholder="Enter task description..."
            rows={4}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-14">
          <h3 className="text-lg font-bold mb-2 text-blue-700">Task Content</h3>
          <ReactQuill
            theme="snow"
            value={taskContent}
            onChange={handleTaskContentChange}
            modules={{
              toolbar: [
                [{ header: "1" }, { header: "2" }, { font: [] }],
                [{ size: [] }],
                ["bold", "italic", "underline", "strike", "blockquote"],
                [
                  { list: "ordered" },
                  { list: "bullet" },
                  { indent: "-1" },
                  { indent: "+1" },
                ],
                ["link", "image", "video"],
                ["clean"],
              ],
            }}
            className="rounded-md focus:outline-none h-[400px]"
          />
        </div>
      </div>
      <div className="mb-4">
        <h3 className="text-lg font-bold mb-2 text-blue-700">Upload Files</h3>
        <input
          type="file"
          multiple
          onChange={handleFileUpload}
          className="p-2 border border-gray-300 rounded-md focus:outline-none"
        />
      </div>
      <button
        onClick={handleSubmit}
        className="bg-green-500 text-white px-4 py-2 rounded-md focus:outline-none hover:bg-green-600"
      >
        Submit Task
      </button>
      {isSubmitted && (
        <p className="text-green-500 mt-4">Task submitted successfully!</p>
      )}
    </div>
  );
};

export default StudentTasks;
