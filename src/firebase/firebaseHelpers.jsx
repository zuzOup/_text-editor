import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, child, get } from "firebase/database";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { firebaseConfig } from "./config";

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);
const dbRef = ref(database);

export function logIn(setter, email, password, setterError) {
  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      setter(true);
    })
    .catch((error) => {
      setterError(true);
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
