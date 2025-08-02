import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyD-lE4kxfGkv4w-uIaa-OIsB2uiWUBcwSM",
  authDomain: "stuenttracking.firebaseapp.com",
  databaseURL: "https://stuenttracking-default-rtdb.firebaseio.com",
  projectId: "stuenttracking",
  storageBucket: "stuenttracking.firebasestorage.app",
  messagingSenderId: "881710574391",
  appId: "1:881710574391:web:d680b944b1818d945348b2",
  measurementId: "G-ENWK0TS4CN"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };