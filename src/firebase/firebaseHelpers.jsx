import { initializeApp } from "firebase/app";
// import { getDatabase, ref, set, child, get } from "firebase/database";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { firebaseConfig } from "./config";

const app = initializeApp(firebaseConfig);
// const database = getDatabase(app);
const auth = getAuth(app);

export function logIn(setter, email, password) {
  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      setter(true);
      console.log(auth);
      // ...
    })
    .catch((error) => {
      console.log(error);
    });
}

/*
export function writeUserData(zadek) {
  const db = getDatabase();
  set(ref(db, "unfinished"), {
    zadek,
  });
}

export function loadInitialData(func) {
  const dbRef = ref(getDatabase());
  get(child(dbRef, `published`))
    .then((snapshot) => {
      func(snapshot.val());
    })
    .catch((error) => {
      console.error(error);
    });
}
*/
