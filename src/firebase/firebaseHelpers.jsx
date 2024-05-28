import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, child, get, update } from "firebase/database";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { firebaseConfig } from "./config";

import { article_fb, chopOffEnds } from "../helpers/helpers";

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
    })
    .catch(() => {
      const dateID = `${Date.now()}`;
      const newData = { unfinished: { [dateID]: article_fb } };

      update(dbRef, newData);

      ref.current = dateID;
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

      if (article_order.length === 1 && article_order[0] === 0) {
        set(ref(database, `unfinished${path}/articles`), {
          [newArticleID]: data,
        });

        set(ref(database, `unfinished${path}/article_order`), [newArticleID]);
      } else {
        set(ref(database, `unfinished${path}/articles`), {
          ...articles,
          [newArticleID]: data,
        });

        set(ref(database, `unfinished${path}/article_order`), [
          ...article_order,
          newArticleID,
        ]);
      }
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

      if (order.length !== 0) {
        set(ref(database, `unfinished${path}/article_order`), [...order]);
        set(ref(database, `unfinished${path}/articles`), { ...articles });
      } else {
        set(ref(database, `unfinished${path}/article_order`), [0]);
        set(ref(database, `unfinished${path}/articles`), { 0: false });
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

export const firebase_modify = {
  text: function (path, id, value) {
    update(child(dbRef, `unfinished${path}/articles/${id}`), { text: value });
  },
  img_url: function (path, id, value) {
    update(child(dbRef, `unfinished${path}/articles/${id}/img`), { url: value });
  },
  img_alt: function (path, id, value) {
    update(child(dbRef, `unfinished${path}/articles/${id}/img`), { alt: value });
  },
  float: function (path, id, value) {
    update(child(dbRef, `unfinished${path}/articles/${id}/img`), { float: value });
  },
  preview_url: function (path, value) {
    update(child(dbRef, `unfinished${path}/preview`), {
      url: value,
    });
  },
  preview_alt: function (path, value) {
    update(child(dbRef, `unfinished${path}/preview`), {
      alt: value,
    });
  },
  link_url: function (path, id, value) {
    update(child(dbRef, `unfinished${path}/articles/${id}/link`), { url: value });
  },
  link_text: function (path, id, value) {
    update(child(dbRef, `unfinished${path}/articles/${id}/link`), { text: value });
  },
  yt_start: function (path, id, value) {
    update(child(dbRef, `unfinished${path}/articles/${id}/yt`), { start: value });
  },
  yt_url: function (path, id, value) {
    update(child(dbRef, `unfinished${path}/articles/${id}/yt`), { urlID: value });
  },
  grid_rows: function (path, id, value) {
    update(child(dbRef, `unfinished${path}/articles/${id}`), { rows: value });
  },
  grid_RS: function (path, id, value) {
    get(child(dbRef, `unfinished${path}/articles/${id}/divs`))
      .then((data) => {
        if (data.val() === 0) {
          const divs = {};
          value.forEach((value_obj, i) => {
            const newDivs = { ...value_obj, alt: "", url: "" };
            divs[i + 1] = newDivs;
          });
          set(ref(database, `unfinished${path}/articles/${id}/divs`), divs);
        } else {
          const divs = { ...data.val() };

          let newDivs = {};

          for (let i = 0; i < Object.keys(divs).length; i++) {
            if (value[i] !== undefined) {
              const key = Object.keys(divs)[i];
              newDivs[i + 1] = divs[key];
            }
          }

        

          value.forEach((value_obj, i) => {
            const curDiv = { ...newDivs[i + 1] };
            curDiv.alt = curDiv.alt || "";
            curDiv.url = curDiv.url || "";
            curDiv.rowStart = value_obj.rowStart;
            curDiv.rowEnd = value_obj.rowEnd;
            curDiv.columnStart = value_obj.columnStart;
            curDiv.columnEnd = value_obj.columnEnd;

            newDivs[i + 1] = curDiv;
          });

          update(child(dbRef, `unfinished${path}/articles/${id}`), { divs: newDivs });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  },
  grid_url: function (path, id, value, item) {
    update(child(dbRef, `unfinished${path}/articles/${id}/divs/${item}`), { url: value });
  },
  grid_alt: function (path, id, value, item) {
    update(child(dbRef, `unfinished${path}/articles/${id}/divs/${item}`), { alt: value });
  },
};

export const firebase_clear = {
  txtImg: function (path, id) {
    update(child(dbRef, `unfinished${path}/articles/${id}`), {
      img: { alt: "", url: "", float: "right" },
    });
  },
  img: function (path, id) {
    update(child(dbRef, `unfinished${path}/articles/${id}`), {
      img: { alt: "", url: "" },
    });
  },
  preview: function (path) {
    update(child(dbRef, `unfinished${path}`), {
      preview: { alt: "", url: "" },
    });
  },
  link: function (path, id) {
    update(child(dbRef, `unfinished${path}/articles/${id}`), {
      link: { text: "", url: "" },
    });
  },
  yt: function (path, id) {
    update(child(dbRef, `unfinished${path}/articles/${id}`), {
      yt: { urlID: "", start: 0 },
    });
  },
  grid: function (path, id) {
    update(child(dbRef, `unfinished${path}/articles/${id}`), {
      divs: 0,
      rows: "1",
    });
  },
};
