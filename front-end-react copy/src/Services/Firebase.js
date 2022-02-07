import firebase from "firebase/compat/app";
import "firebase/auth";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBL6HOcOvesfaa9m1z3el2kDjm_TlxN6rk",
  authDomain: "glossy-protocol-314323.firebaseapp.com",
  projectId: "glossy-protocol-314323",
  storageBucket: "glossy-protocol-314323.appspot.com",
  messagingSenderId: "611745384469",
  appId: "1:611745384469:web:c14d18c75480b72199261c",
  measurementId: "G-956DMRN27M"
};


const app = firebase.initializeApp(firebaseConfig);
export const auth = app.auth();

const googleProvider = new firebase.auth.GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    await auth.signInWithPopup(googleProvider);
  } catch (err) {
    console.log(err.message);
    return err;
  }
};
export const signup = async (email, password) => {
    await auth.createUserWithEmailAndPassword(email, password);
};
export const login = async (email, password) => {
    await auth.signInWithEmailAndPassword(email, password);
};
export const signOut = async () => {
  try {
    await auth.signOut();
  } catch (err) {
    console.log(err.message);
    return <div>Help</div>;
  }
};