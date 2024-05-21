import { useEffect, useState, useRef } from "react";
import { initialData } from "../firebase/firebaseHelpers";

import Preview from "./Header/Preview/Preview";
import Day from "./Header/Day";
import Weather from "./Header/Weather/Weather";
import Title from "./Header/Title/Title";
import Date from "./Header/Date/Date";

import { article } from "../helpers/helpers";

import "./Header/Header.css";
import AddPart from "./AddPart/AddPart";

function Content() {
  const [articleData, setArticleData] = useState(article);
  const articleID = useRef("");

  useEffect(() => {
    initialData(setArticleData, articleID);
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

      {/* <Editor />  */}

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
