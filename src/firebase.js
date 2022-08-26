import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA7OZbw-Zk0j50qlz1l3K3GtkgQx2BNFgs",
  authDomain: "messproject2022.firebaseapp.com",
  projectId: "messproject2022",
  storageBucket: "messproject2022.appspot.com",
  messagingSenderId: "606779420878",
  appId: "1:606779420878:web:3409bb2e7ac884b68be09f"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const db = firebaseApp.firestore();

export { auth, provider };
export default db;