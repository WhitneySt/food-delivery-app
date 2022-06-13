import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDxu8CRYwvExDyj4qSlWoYTi1FjEI0m35s",
    authDomain: "food-delivery-app-b2e08.firebaseapp.com",
    projectId: "food-delivery-app-b2e08",
    storageBucket: "food-delivery-app-b2e08.appspot.com",
    messagingSenderId: "957710499895",
    appId: "1:957710499895:web:c12eb620d9729eed62bfb2",
    measurementId: "G-5B63VBQZE8"
  };

  const app = initializeApp(firebaseConfig);
  export const authentication = getAuth(app);