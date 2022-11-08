import Firebase from "firebase/compat/app";
import firebaseAuthServices from "firebase/auth";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import "firebase/compat/storage";

const config = {
  apiKey: "AIzaSyBLhN6kTo0SuOExFFI3EENQUZd7RXpMgs0",
  authDomain: "instagram-edf9d.firebaseapp.com",
  projectId: "instagram-edf9d",
  storageBucket: "instagram-edf9d.appspot.com",
  messagingSenderId: "152212036520",
  appId: "1:152212036520:web:682e320f3d16de11009b9d",
};

const firebase = Firebase.initializeApp(config);

const { FieldValue } = Firebase.firestore;

export const storage = firebase.storage();
export { firebase, FieldValue };
