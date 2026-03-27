import 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyAfopWt6hZoYnIQtKh6pyYsJLISvUszoPA",
    authDomain: "sistemfinanca.firebaseapp.com",
    projectId: "sistemfinanca",
    storageBucket: "sistemfinanca.appspot.com",
    messagingSenderId: "884380726073",
    appId: "1:884380726073:web:c269eac750acdac5292ee8",
    measurementId: "G-BFPSZXHE5G"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };
