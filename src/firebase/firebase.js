// import { initializeApp } from "firebase/app";
// import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
// const firebaseConfig = {
//   apiKey: "AIzaSyAuj9kpi8G4wAaRkhaIbtFSRHnoaY4DfGY",
//   authDomain: "studentapp-556ec.firebaseapp.com",
//   databaseURL:
//     "https://studentapp-556ec-default-rtdb.asia-southeast1.firebasedatabase.app",
//   projectId: "studentapp-556ec",
//   storageBucket: "studentapp-556ec.appspot.com",
//   messagingSenderId: "970661658170",
//   appId: "1:970661658170:web:0fea1414bea00645cb7f03",
//   measurementId: "G-9XX7S5Z1J1",
// };
// const isDevelopment = process.env.NODE_ENV === "development";
// // Initialize Firebase app
// const app = initializeApp(firebaseConfig);
// // Get Firestore instance
// const db = getFirestore(app);
// // Connect to Firestore emulator if in development environment
// if (isDevelopment) {
//   const firestoreEmulatorHost = "localhost";
//   const firestoreEmulatorPort = 8080;
//   connectFirestoreEmulator(db, firestoreEmulatorHost, firestoreEmulatorPort);
// }

// export { db };
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAuj9kpi8G4wAaRkhaIbtFSRHnoaY4DfGY",
  authDomain: "studentapp-556ec.firebaseapp.com",
  databaseURL:
    "https://studentapp-556ec-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "studentapp-556ec",
  storageBucket: "studentapp-556ec.appspot.com",
  messagingSenderId: "970661658170",
  appId: "1:970661658170:web:0fea1414bea00645cb7f03",
  measurementId: "G-9XX7S5Z1J1",
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Get Firestore instance
const db = getFirestore(app);

export { db };
