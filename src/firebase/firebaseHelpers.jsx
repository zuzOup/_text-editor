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

export function firebase_lastDeco(setter) {
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

      setter({
        vol: chopOffEnds(snapshot.val()[lastVolDate].header.title, "Vojtíka ", " 🏐"),
        star: chopOffEnds(snapshot.val()[lastStarDate].header.title, "hvězdičky ", " ✮"),
      });
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
  grid_img: function (path, id, item) {
    update(child(dbRef, `unfinished${path}/articles/${id}/divs/${item}`), {
      url: "",
      alt: "",
    });
  },
};

import { dayBefore, dayAfter } from "../helpers/helpers";

export function firebase_publish(data, date, id, setter, decoSetter) {
  get(dbRef)
    .then((value) => {
      const published = value.val().published;
      const duplicates = Object.keys(published).filter((d) => d === date).length;

      const unfinished = value.val().unfinished;

  
      const dataDeco = { ...data };
      if (data.header.deco !== false) {
        dataDeco.dateInTitle = false;
        if (data.header.deco === "vol") {
          dataDeco.header.title = `🏐 ` + data.header.title + ` 🏐`;
        } else if (data.header.deco === "star") {
          dataDeco.header.title = `⋆｡° ✮ ` + data.header.title + ` ✮ ° ｡⋆`;
        }
      }

      if (duplicates === 0 || (duplicates > 0 && unfinished[id].published === true)) {
        const updated = { ...dataDeco, published: true };

        update(child(dbRef, `published`), { [date]: updated }).then(() => {
          firebase_lastDeco(decoSetter);
        });

        const articlesLeft = Object.keys(unfinished).filter((d) => d !== id);

        if (articlesLeft.length === 0) {
          set(ref(database, `unfinished`), 0);
        } else if (articlesLeft.length > 0) {
          delete unfinished[id];
          set(ref(database, `unfinished`), { ...unfinished });
        }
        setter("good");
      } else if (duplicates > 0 && unfinished[id].published === false) {
        const publishedDates = Object.keys(published);

        let before = dayBefore(date);
        let after = dayAfter(date);

        if (publishedDates.find((day) => day === before)) {
          while (publishedDates.find((day) => day === before)) {
            before = dayBefore(before);
          }
        }

        if (publishedDates.find((day) => day === after)) {
          while (publishedDates.find((day) => day === after)) {
            after = dayAfter(after);
          }
        }

        setter(["everythingWrong", after, before]);
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

export function firebase_newArticle(ref) {
  const dateID = `${Date.now()}`;
  update(child(dbRef, `unfinished`), { [dateID]: article_fb });

  ref.current = dateID;
}

export function firebase_delete(id) {
  get(child(dbRef, `unfinished`))
    .then((value) => {
      const unfinished = value.val();

      if (Object.keys(unfinished).length === 1) {
        set(ref(database, `unfinished`), 0);
      } else {
        delete unfinished[id];
        update(dbRef, { unfinished: unfinished });
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

export function firebase_getUnfinished(setter) {
  get(dbRef)
    .then((data) => {
      const unfinished = data.val().unfinished;
      const published = data.val().published;
      const unfinishedData = Object.entries(unfinished).reduce((acc, cur) => {
        return [...acc, [cur[1].header.date, cur[1].header.title, cur[0]]];
      }, []);
      const publishedData = Object.entries(published).reduce((acc, cur) => {
        return [...acc, [cur[1].header.date, cur[1].header.title, cur[0]]];
      }, []);
      setter({ unfinished: unfinishedData, published: publishedData });
    })
    .catch((error) => {
      console.error(error);
    });
}

export function firebase_load_unfinished(id, setter, idRef) {
  get(child(dbRef, `unfinished/${id}`))
    .then((value) => {
      const data = value.val();

      const header = { ...data.header };
      if (
        header.deco !== false &&
        (header.title.includes("🏐") || header.title.includes("✮"))
      ) {
        if (header.deco === "vol") {
          header.title = chopOffEnds(data.header.title, "🏐 ", " 🏐");
        } else if (header.deco === "star") {
          header.title = chopOffEnds(data.header.title, "✮ ", " ✮");
        }
        data.header = header;
      }

      setter(data);

      const dateID = `${Date.now()}`;

      update(child(dbRef, `unfinished`), {
        [dateID]: data,
      }).then(() =>
        get(child(dbRef, `unfinished`)).then((val) => {
          const updated = val.val();
          delete updated[id];
          update(dbRef, { unfinished: updated });
        })
      );

      idRef.current = dateID;
    })
    .catch((error) => {
      console.error(error);
    });
}

export function firebase_load_published(id, setter, idRef) {
  get(child(dbRef, `published/${id}`))
    .then((value) => {
      const articleData = value.val();

      const header = { ...articleData.header };
      if (header.deco !== false) {
        if (header.deco === "vol") {
          header.title = chopOffEnds(articleData.header.title, "🏐 ", " 🏐");
        } else if (header.deco === "star") {
          header.title = chopOffEnds(articleData.header.title, "✮ ", " ✮");
        }
        articleData.header = header;
      }

      const dateID = `${Date.now()}`;
      update(child(dbRef, `unfinished`), {
        [dateID]: articleData,
      });

      setter(articleData);
      idRef.current = dateID;
    })
    .catch((error) => {
      console.error(error);
    });
}
