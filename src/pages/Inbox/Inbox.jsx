import React, { useState, useEffect, useRef } from "react";
import { MdForwardToInbox } from "react-icons/md";
import { TokenRequest } from "../../RequestMethod/Request";
import { formatDateFromTimestamp } from "../../utils/formatDateFromTimestamp";
import {
  getDoc,
  collection,
  doc,
  query,
  where,
  orderBy,
  onSnapshot,
  getDocs,
} from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { ModalAddChat } from "../../components";
import { getDecodeToken } from "../../utils/getDecodeToken";

// const Inbox = () => {
//   const [selectedSender, setSelectedSender] = useState(null);
//   const [messageInput, setMessageInput] = useState("");
//   const [searchQuery, setSearchQuery] = useState("");
//   const [messages, setMessages] = useState([]);
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [addChat, setAddChat] = useState(false);
//   const messagesEndRef = useRef(null);
//   const userId = getDecodeToken().id;

//   const handleSelectSender = (id) => {
//     const messagesQuery = query(
//       collection(db, "messages"),
//       where("senderId", "in", [userId, id]),
//       where("receiverId", "in", [userId, id]),
//       orderBy("timestamp", "asc")
//     );

//     // Listen for real-time updates
//     const unsubscribe = onSnapshot(messagesQuery, (querySnapshot) => {
//       const messages = querySnapshot.docs.map((doc) => doc.data());
//       setMessages(messages);
//       setSelectedSender(id); // This line sets the selected sender
//       // Mark messages as seen when a sender is selected
//       markMessagesAsSeen(id);
//     });

//     return unsubscribe; // Return the unsubscribe function to clean up the listener
//   };

//   const markMessagesAsSeen = async (senderId) => {
//     try {
//       await TokenRequest.put(`/messages/v16/seen-from/${senderId}`);
//     } catch (error) {
//       console.error("Error marking messages as seen:", error);
//     }
//   };
//   const handleInputChange = (event) => {
//     setMessageInput(event.target.value);
//   };

//   const handleSearchInputChange = (event) => {
//     setSearchQuery(event.target.value);
//   };

//   const handleSendMessage = async () => {
//     try {
//       await TokenRequest.post("/messages/v16/create", {
//         content: messageInput,
//         receiverId: selectedSender,
//       });
//       setMessageInput("");
//     } catch (error) {
//       console.error("Error sending message:", error);
//     }
//   };

//   useEffect(() => {
//     const fetchChats = async () => {
//       try {
//         const sentMessagesQuery = query(
//           collection(db, "messages"),
//           where("senderId", "==", userId),
//           orderBy("timestamp", "desc")
//         );
//         const receivedMessagesQuery = query(
//           collection(db, "messages"),
//           where("receiverId", "==", userId),
//           orderBy("timestamp", "desc")
//         );

//         const [sentMessagesSnapshot, receivedMessagesSnapshot] =
//           await Promise.all([
//             getDocs(sentMessagesQuery),
//             getDocs(receivedMessagesQuery),
//           ]);

//         const lastMessages = {};

//         sentMessagesSnapshot.forEach((doc) => {
//           const message = doc.data();
//           const receiverId = message.receiverId;

//           if (
//             !lastMessages[receiverId] ||
//             message.timestamp > lastMessages[receiverId].timestamp
//           ) {
//             lastMessages[receiverId] = message;
//           }
//         });

//         receivedMessagesSnapshot.forEach((doc) => {
//           const message = doc.data();
//           const senderId = message.senderId;

//           if (
//             !lastMessages[senderId] ||
//             message.timestamp > lastMessages[senderId].timestamp
//           ) {
//             lastMessages[senderId] = message;
//           }
//         });

//         const chatDetailsPromises = Object.keys(lastMessages).map(
//           async (userId) => {
//             const userDoc = await getDoc(doc(db, "users", userId));
//             const userData = userDoc.data();

//             const {
//               MajorId,
//               RoleId,
//               RoomId,
//               password,
//               expo_push_token,
//               ...filteredUserData
//             } = userData;

//             return {
//               userId,
//               user: filteredUserData,
//               lastMessage: lastMessages[userId],
//             };
//           }
//         );

//         const chatDetails = await Promise.all(chatDetailsPromises);
//         setUsers(chatDetails);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching chats:", error);
//         setLoading(false);
//       }
//     };

//     // Fetch chats initially
//     fetchChats();

//     // Set up real-time listener for messages collection
//     const unsubscribe = onSnapshot(collection(db, "messages"), (snapshot) => {
//       // Re-fetch chats when there are changes in the messages collection
//       fetchChats();
//     });

//     // Clean up the listener when component unmounts
//     return () => {
//       unsubscribe();
//     };
//   }, [userId]);

//   useEffect(() => {
//     if (messagesEndRef.current) {
//       messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
//     }
//   }, [messages]);

//   useEffect(() => {
//     let unsubscribe;

//     if (selectedSender) {
//       unsubscribe = handleSelectSender(selectedSender);
//     }

//     return () => {
//       if (unsubscribe) {
//         unsubscribe();
//       }
//     };
//   }, [selectedSender]);

//   return (
//     <div className="container mx-auto">
//       <h1 className="text-4xl flex items-center justify-center font-bold mb-8 text-blue-600">
//         <MdForwardToInbox size={70} className="mr-3" />
//         <span>INBOX</span>
//       </h1>
//       <div className="flex justify-end items-center">
//         <button
//           onClick={() => setAddChat(true)}
//           className="min-w-[200px] font-bold text-white py-2 cursor-pointer rounded overflow-hidden shadow-md border-2 border-blue-600 mb-4 flex items-center justify-center bg-blue-600 hover:bg-blue-700 transition duration-300"
//         >
//           Add Chat
//         </button>
//       </div>

//       <div className="flex">
//         <div className="w-1/4 bg-gray-100 overflow-y-auto">
//           <input
//             type="text"
//             placeholder="Search users"
//             value={searchQuery}
//             onChange={handleSearchInputChange}
//             className="w-full mb-4 px-3 py-2 border border-gray-300 rounded focus:outline-none"
//           />

//           <ul>
//             {loading ? (
//               <li className="flex items-center justify-center" title="Loading">
//                 Loading ...
//               </li>
//             ) : (
//               users
//                 .filter((user) =>
//                   `${user.user.firstName} ${user.user.lastName}`
//                     .toLowerCase()
//                     .includes(searchQuery.toLowerCase())
//                 )
//                 .map((user) => (
//                   <li
//                     key={user.userId}
//                     className={`py-2 cursor-pointer pl-2 transition-colors ${
//                       selectedSender === user.userId ? "bg-gray-300" : ""
//                     }`}
//                     onClick={() => handleSelectSender(user.userId)}
//                   >
//                     <div className="flex items-center w-full">
//                       <img
//                         src={user.user.avatar}
//                         alt={`${user.user.firstName} ${user.user.lastName}`}
//                         className="w-8 h-8 rounded-full mr-2"
//                       />
//                       <div>
//                         <span
//                           className={`${
//                             selectedSender === user.userId
//                               ? "text-blue-600 font-bold"
//                               : ""
//                           }`}
//                         >
//                           {user.user.firstName} {user.user.lastName}
//                         </span>
//                         <div className="flex items-center gap-3 justify-between">
//                           <p
//                             className={`text-xs ${
//                               user.lastMessage.seenBy[userId]
//                                 ? "text-gray-500"
//                                 : "text-black-600 font-bold"
//                             }`}
//                           >
//                             {user.lastMessage.content}
//                           </p>
//                           <p
//                             className={`text-xs ${
//                               user.lastMessage.seenBy[userId]
//                                 ? "text-gray-500"
//                                 : "text-black-600 font-bold"
//                             }`}
//                           >
//                             {formatDateFromTimestamp(
//                               user.lastMessage.timestamp
//                             )}
//                           </p>
//                         </div>
//                       </div>
//                     </div>
//                   </li>
//                 ))
//             )}
//           </ul>
//         </div>
//         <div className="flex-1 bg-gray-200 p-4 overflow-y-auto">
//           <div className="mb-4 h-64">
//             {selectedSender === null ? (
//               <p className="text-gray-500 text-center">
//                 Select a user to start chatting.
//               </p>
//             ) : (
//               <div className="flex flex-col gap-2">
//                 {messages.map((message, index) => (
//                   <div
//                     key={index}
//                     className={`p-2 rounded-lg ${
//                       message.senderId === userId
//                         ? "bg-blue-500 text-white self-end"
//                         : "bg-gray-300 self-start"
//                     }`}
//                   >
//                     <span
//                       className={`text-xs text-gray-500 mb-1 self-center ${
//                         message.senderId === userId
//                           ? "bg-blue-500 text-white self-end"
//                           : "bg-gray-300 self-start"
//                       }`}
//                     >
//                       {formatDateFromTimestamp(message.timestamp)}
//                     </span>
//                     <p>{message.content}</p>
//                   </div>
//                 ))}
//                 <div ref={messagesEndRef} />
//               </div>
//             )}
//           </div>
//         </div>
//         <div className="">
//           <input
//             type="text"
//             placeholder="Message"
//             value={messageInput}
//             onChange={handleInputChange}
//             className="flex-1 bg-white border border-gray-300 rounded py-2 px-4 mr-2 focus:outline-none"
//           />
//           <button
//             onClick={handleSendMessage}
//             className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//           >
//             Send
//           </button>
//         </div>
//       </div>

//       <ModalAddChat
//         isOpen={addChat}
//         closeModal={() => setAddChat(false)}
//         messageInput={messageInput}
//         setMessageInput={setMessageInput}
//         setSelectedSender={setSelectedSender}
//       />
//     </div>
//   );
// };
const Inbox = () => {};
export default Inbox;
