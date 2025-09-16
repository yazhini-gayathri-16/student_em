import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAUi7MiR6EVwqx1FYYmUGlxndra83_N-0w",
  authDomain: "event-management-inc.firebaseapp.com",
  projectId: "event-management-inc",
  storageBucket: "event-management-inc.appspot.com",
  messagingSenderId: "29138221775",
  appId: "1:29138221775:web:ba5d1d9bbdc3a3ad05d5ba",
  measurementId: "G-P52KQLW8RT"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);