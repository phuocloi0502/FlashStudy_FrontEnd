// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
// const firebaseConfig = {
//   apiKey: "AIzaSyALjxD2UJ7a2iU-v2o4xM23afp50s-edZg",
//   authDomain: "flashstudy-4d59e.firebaseapp.com",
//   databaseURL: "https://flashstudy-4d59e-default-rtdb.firebaseio.com",
//   projectId: "flashstudy-4d59e",
//   storageBucket: "flashstudy-4d59e.firebasestorage.app",
//   messagingSenderId: "167683491033",
//   appId: "1:167683491033:web:c37f321065c09757966ac8",
//   measurementId: "G-M2ZQRCYS7C",
// };
const firebaseConfig = {
  apiKey: "AIzaSyALjxD2UJ7a2iU-v2o4xM23afp50s-edZg",
  authDomain: "flashstudy-4d59e.firebaseapp.com",
  projectId: "flashstudy-4d59e",
  storageBucket: "flashstudy-4d59e.firebasestorage.app",
  messagingSenderId: "167683491033",
  appId: "1:167683491033:web:c37f321065c09757966ac8",
  measurementId: "G-M2ZQRCYS7C",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);
export { auth, database };
