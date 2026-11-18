import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD2V9duQSjQlFutrRC6_511fegHEm7TKSU",
  authDomain: "app-proyecto-react-cuenca.firebaseapp.com",
  projectId: "app-proyecto-react-cuenca",
  storageBucket: "app-proyecto-react-cuenca.firebasestorage.app",
  messagingSenderId: "597216331423",
  appId: "1:597216331423:web:63f3b460b87d348603c4aa"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);

export default app;