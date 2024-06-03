import { useEffect, useState, useRef } from "react";

import Nav from "./Nav/Nav";

import Preview from "./Header/Preview/Preview";
import Day from "./Header/Day";
import Weather from "./Header/Weather/Weather";
import Title from "./Header/Title/Title";
import Date from "./Header/Date/Date";

import Editor from "./Editor/Editor";

import AddPart from "./AddPart/AddPart";

import { article } from "../helpers/helpers";
import { firebase_initialData, firebase_lastDeco } from "../firebase/firebaseHelpers";

import "./Header/Header.css";

function Content() {
  const [articleData, setArticleData] = useState({ ...article });
  const articleID = useRef("");
  const [lastDecos, setLastDecos] = useState({ vol: "", star: "" });

  useEffect(() => {
    firebase_initialData(setArticleData, articleID);
    firebase_lastDeco(setLastDecos);
  }, []);
  return (
    <div>
      <Nav
        articleID={articleID}
        date={articleData.header.date}
        articleData={articleData}
        setArticleData={setArticleData}
        setLastDecos={setLastDecos}
      />
      {/*-------------------------------------------  Header  ------------------------------------------- */}
      <Preview
        previewData={articleData.header.preview}
        modifyPreview={{
          url: function (value) {
            setArticleData((prevData) => {
              const obj = {
                ...prevData,
              };
              const header = { ...obj.header };
              const preview = { ...header.preview, url: value };
              header.preview = preview;
              obj.header = header;
              return obj;
            });
          },
          alt: function (value) {
            setArticleData((prevData) => {
              const obj = {
                ...prevData,
              };
              const header = { ...obj.header };
              const preview = { ...header.preview, alt: value };
              header.preview = preview;
              obj.header = header;
              return obj;
            });
          },
        }}
        path={`/${articleID.current}/header`}
        deco={articleData.header.deco}
      />
      <Day date={articleData.header.date} />
      <Weather
        weather={articleData.header.place}
        setWeather={(updatedWeather) =>
          setArticleData((prevData) => {
            const obj = {
              ...prevData,
            };
            obj.header.place = updatedWeather;
            return obj;
          })
        }
        path={`/${articleID.current}/header/place`}
      />
      <div className="header">
        <Title
          title={articleData.header.title}
          setTitle={(updatedTitle) =>
            setArticleData((prevData) => {
              const obj = {
                ...prevData,
              };
              obj.header.title = updatedTitle;
              return obj;
            })
          }
          lastDecos={lastDecos}
          deco={articleData.header.deco}
          setDeco={(updatedDeco) =>
            setArticleData((prevData) => {
              const obj = {
                ...prevData,
              };
              obj.header.deco = updatedDeco;
              return obj;
            })
          }
          path={`/${articleID.current}/header`}
        />
        <hr />
        <Date
          date={articleData.header.date}
          setDate={(updatedDate) =>
            setArticleData((prevData) => {
              const obj = {
                ...prevData,
              };
              obj.header.date = updatedDate;
              return obj;
            })
          }
          path={`/${articleID.current}/header`}
        />
      </div>
      {/*---------------------------------------------------------------------------------------------- */}

      <Editor
        articleOrder={articleData.article_order}
        setArticleOrder={(newOrder) => {
          setArticleData((prevData) => {
            const obj = {
              ...prevData,
            };
            obj.article_order = newOrder;
            return obj;
          });
        }}
        deleteArticle={(articleID) => {
          setArticleData((prevData) => {
            const obj = {
              ...prevData,
            };
            const order = [...obj.article_order];
            obj.article_order = order.filter((a) => a !== articleID);

            const articles = { ...obj.articles };
            delete articles[articleID];
            obj.articles = articles;

            return obj;
          });
        }}
        articleType={(id) => {
          return articleData.articles[id].article_type;
        }}
        articleData={(id) => {
          return articleData.articles[id];
        }}
        modifyArticle={(id, func, value) => {
          setArticleData((prevData) => {
            const obj = {
              ...prevData,
            };

            const modifiedData = func({ ...obj.articles[id] }, value);
            obj.articles[id] = modifiedData;

            return obj;
          });
        }}
        path={`/${articleID.current}`}
      />

      {/*---------------------------------------------------------------------------------------------- */}
      <AddPart
        addArticle={(id, button) =>
          setArticleData((prevData) => {
            const obj = {
              ...prevData,
            };
            if (obj.article_order[0] === 0) obj.article_order.pop();

            if (obj.article_order.includes(id)) return obj;

            obj.article_order.push(id);
            obj.articles[id] = button;
            return obj;
          })
        }
        path={`/${articleID.current}`}
      />
    </div>
  );
}

export default Content;

Content.propTypes = {};
