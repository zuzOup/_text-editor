import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, child, get } from "firebase/database";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { firebaseConfig } from "./config";

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);

export function logIn(setter, email, password) {
  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      setter(true);
    })
    .catch((error) => {
      console.log(error);
    });
}

const article = {
  published: false,
  dateInTitle: true,
  articles: {},
  article_order: [],
  header: {
    date: "",
    place: { latitude: "", longitude: "", place: "Toronto" },
    title: "",
    preview: { url: "", alt: "" },
  },
};

export function newArticle() {
  const dbRef = ref(database);
  const dateID = Date.now();
  get(child(dbRef, `unfinished`))
    .then((snapshot) => {
      set(ref(database, "unfinished"), {
        ...snapshot.val(),
        [dateID]: article,
      });
    })
    .catch((error) => {
      console.error(error);
    });
}

export function initialData(setter, setterID) {
  const dbRef = ref(database);

  get(child(dbRef, `unfinished`))
    .then((snapshot) => {
      if (snapshot.val() === null) {
        const dateID = `${Date.now()}`;
        set(ref(database, "unfinished"), {
          ...snapshot.val(),
          [dateID]: article,
        });
        setter(article);
        setterID(dateID);
      } else {
        const latest = Math.max(...Object.keys(snapshot.val()).map((x) => parseInt(x)));
        setter(snapshot.val()[latest]);
        setterID(`${latest}`);
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

export function loadInitialData() {
  const dbRef = ref(database);
  return get(child(dbRef, `unfinished`))
    .then((snapshot) => {
      return snapshot.val();
    })
    .catch((error) => {
      console.error(error);
    });
}
