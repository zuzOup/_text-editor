import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, child, get, update } from "firebase/database";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { firebaseConfig } from "./config";

import { article, chopOffEnds } from "../helpers/helpers";

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);
const dbRef = ref(database);

export function firebase_logIn(setter, email, password, setterError) {
  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      setter(true);
    })
    .catch(() => {
      setterError(true);
    });
}

export function firebase_initialData(setter, ref) {
  get(child(dbRef, `unfinished`))
    .then((snapshot) => {
      if (snapshot.val() === null) {
        const dateID = `${Date.now()}`;
        set(ref(database, "unfinished"), {
          ...snapshot.val(),
          [dateID]: article,
        });
        ref.current = dateID;
      } else {
        const latest = Math.max(...Object.keys(snapshot.val()).map((x) => parseInt(x)));

        const articleData = snapshot.val()[latest];

        if (articleData.header.title.includes("🏐")) {
          articleData.header.deco = "vol";
          articleData.header.title = chopOffEnds(articleData.header.title, "🏐 ", " 🏐");
        } else if (articleData.header.title.includes("✮")) {
          articleData.header.deco = "star";
          articleData.header.title = chopOffEnds(articleData.header.title, "✮ ", " ✮");
        }

        setter(articleData);
        ref.current = `${latest}`;
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

export function firebase_lastDeco(ref) {
  get(child(dbRef, `published`))
    .then((snapshot) => {
      const sorted = Object.keys(snapshot.val()).sort(
        (a, b) => new Date(b) - new Date(a)
      );

      const lastVolDate = sorted.find((article) =>
        snapshot.val()[article].header.title.includes("🏐")
      );
      const lastStarDate = sorted.find((article) =>
        snapshot.val()[article].header.title.includes("✮")
      );

      ref.current = {
        vol: chopOffEnds(snapshot.val()[lastVolDate].header.title, "Vojtíka ", " 🏐"),
        star: chopOffEnds(snapshot.val()[lastStarDate].header.title, "hvězdičky ", " ✮"),
      };
    })
    .catch((error) => {
      console.error(error);
    });
}

export function firebase_updateData(path, newData) {
  update(child(dbRef, `unfinished${path}`), newData);
}

export function firebase_addArticle(path, newArticleID, data) {
  get(child(dbRef, `unfinished${path}`))
    .then((snapshot) => {
      const articles = snapshot.val().articles;
      const article_order = snapshot.val().article_order;

      set(ref(database, `unfinished${path}/articles`), {
        ...articles,
        [newArticleID]: data,
      });

      set(ref(database, `unfinished${path}/article_order`), [
        ...article_order,
        newArticleID,
      ]);
    })
    .catch((error) => {
      console.error(error);
    });
}

export function firebase_changeArticleOrder(path, newData) {
  get(child(dbRef, `unfinished${path}`))
    .then(() => {
      set(ref(database, `unfinished${path}/article_order`), [...newData]);
    })
    .catch((error) => {
      console.error(error);
    });
}

export function firebase_deleteArticle(path, id) {
  get(child(dbRef, `unfinished${path}`))
    .then((data) => {
      const order = [...data.val().article_order].filter((a) => a !== id);

      const articles = { ...data.val().articles };
      delete articles[id];

      set(ref(database, `unfinished${path}/article_order`), [...order]);
      set(ref(database, `unfinished${path}/articles`), { ...articles });
    })
    .catch((error) => {
      console.error(error);
    });
}

export function firebase_modify_text(path, id, newData) {
  get(child(dbRef, `unfinished${path}`))
    .then(() => {
      set(ref(database, `unfinished${path}/articles/${id}/text`), newData);
    })
    .catch((error) => {
      console.error(error);
    });
}
