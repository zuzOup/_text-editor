import { useEffect, useState, useRef } from "react";

import Preview from "./Header/Preview/Preview";
import Day from "./Header/Day";
import Weather from "./Header/Weather/Weather";
import Title from "./Header/Title/Title";
import Date from "./Header/Date/Date";

import Editor from "./Editor/Editor";

import AddPart from "./AddPart/AddPart";

import { article } from "../helpers/helpers";
import { firebase_initialData } from "../firebase/firebaseHelpers";

import "./Header/Header.css";

function Content() {
  const [articleData, setArticleData] = useState(article);
  const articleID = useRef("");

  useEffect(() => {
    firebase_initialData(setArticleData, articleID);
  }, []);

  return (
    <>
      {/*-------------------------------------------  Header  ------------------------------------------- */}
      <Preview preview={articleData.header.preview} articleID={articleID.current} />
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
          //TODO: whenPublishing => add deco to title; remove deco
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
        path={`/${articleID.current}`}
      />

      {/*---------------------------------------------------------------------------------------------- */}
      <AddPart
        addToOrder={(newArticle) =>
          setArticleData((prevData) => {
            const obj = {
              ...prevData,
            };
            obj.article_order.push(newArticle);
            return obj;
          })
        }
        addToArticles={(newArticle, button) => {
          setArticleData((prevData) => {
            const obj = {
              ...prevData,
              [newArticle]: [button],
            };
            return obj;
          });
        }}
        path={`/${articleID.current}`}
      />
    </>
  );
}

export default Content;

Content.propTypes = {};

// removeFromOrder={(removedArticle) => {
//   setArticleData((prevData) => {
//     const obj = {
//       ...prevData,
//     };
//     obj.article_order = obj.article_order.filter(
//       (item) => item !== removedArticle
//     );
//     return obj;
//   });
// }}
