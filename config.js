import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { getDatabase } from 'firebase/compat/database';


const firebaseConfig = {
  apiKey: "AIzaSyDjyb0mzxbDVau-lbZfHzojzrILGJLC_O0",
  authDomain: "mealplanner-fbabd.firebaseapp.com",
  databaseURL: "https://mealplanner-fbabd-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "mealplanner-fbabd",
  storageBucket: "mealplanner-fbabd.appspot.com",
  messagingSenderId: "549970119050",
  appId: "1:549970119050:web:3301b7863e6a51e8d76073",
  measurementId: "G-DNQRTZXV07"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const db = firebase.database();

export { firebase, db };