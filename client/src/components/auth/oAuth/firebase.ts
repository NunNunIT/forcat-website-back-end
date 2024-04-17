// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAT3O3KKLJeoZzhnAwCCt9kFGPt7HHw5Nc",
  authDomain: "for-cat-shop.firebaseapp.com",
  projectId: "for-cat-shop",
  storageBucket: "for-cat-shop.appspot.com",
  messagingSenderId: "410983676433",
  appId: "1:410983676433:web:52ef8e6c4a3c3a97998fb0",
  measurementId: "G-YKX9DMYKZ3",
};

// Initialize Firebase
let app;
if (typeof window !== "undefined") {
  app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
}

export { app };
