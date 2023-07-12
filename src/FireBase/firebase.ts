import 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyCPcfc6EA9EFuELZLxPiNpR6Lc9U1psEkA",
  authDomain: "rentsystem-pdi.firebaseapp.com",
  projectId: "rentsystem-pdi",
  storageBucket: "rentsystem-pdi.appspot.com",
  messagingSenderId: "851280386241",
  appId: "1:851280386241:web:82bf2640f4823a318d1c40",
  measurementId: "G-893NZD49EL"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };
