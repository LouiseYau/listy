/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDLVdvoqrPsCF2EUbUI9hWVnggX4tlhKUo",
  authDomain: "realtime-database-ed918.firebaseapp.com",
  databaseURL: "https://realtime-database-ed918-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "realtime-database-ed918",
  storageBucket: "realtime-database-ed918.appspot.com",
  messagingSenderId: "174783196849",
  appId: "1:174783196849:web:0922bfedd44bc0767efc90"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);