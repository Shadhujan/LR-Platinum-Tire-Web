import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import firebase from "firebase/compat/app";
import { initializeApp } from "firebase/app";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAzHYCaevRMaprXy4zoHUC97clUg-54yfA",
  authDomain: "bikeapp-29de9.firebaseapp.com",
  projectId: "bikeapp-29de9",
  storageBucket: "bikeapp-29de9.appspot.com",
  messagingSenderId: "659327529762",
  appId: "1:659327529762:web:bc8d42bc070b2dafc26b7b",
  measurementId: "G-L4NL8VWV85",
};

console.log(firebaseConfig);

firebase.initializeApp(firebaseConfig);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
