import Firebase from "firebase/compat/app";
import firebaseAuthServices from "firebase/auth";
import "firebase/compat/firestore";
import "firebase/compat/auth"
import "firebase/compat/storage";

const config = {
  apiKey: "AIzaSyBkA4Yxx8NHpw1V0GOAxbG7YIXXojAqvVo",
  authDomain: "insta-react12-bfd52.firebaseapp.com",
  databaseURL: "https://insta-react12-bfd52-default-rtdb.firebaseio.com",
  projectId: "insta-react12-bfd52",
  storageBucket: "insta-react12-bfd52.appspot.com",
  messagingSenderId: "343474713138",
  appId: "1:343474713138:web:37af4cdc8a06f9906f422b",
  measurementId: "G-ZTZPES47Q2"
}

const firebase = Firebase.initializeApp(config);

const { FieldValue } = Firebase.firestore;

export const storage = firebase.storage();
export { firebase, FieldValue };
