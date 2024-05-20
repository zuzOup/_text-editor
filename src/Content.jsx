import { useEffect, useState, useRef } from "react";
import { initialData } from "./firebase/firebaseHelpers";

import Preview from "./Content/Header/Preview";
// import Day from "./Content/Header/Day";
import Title from "./Content/Header/Title";
import Date from "./Content/Header/Date";

import { article } from "./helpers/helpers";

function Content() {
  const [articleData, setArticleData] = useState(article);
  const articleID = useRef("");

  useEffect(() => {
    initialData(setArticleData, articleID);
  }, []);

  return (
    <>
      <Preview preview={articleData.header.preview} articleID={articleID.current} />
      {/*
      <Day />
      
      <Weather weather={weather} setWeather={setWeather} />*/}

      <div className="header">
        <Title
          title={articleData.header.title}
          setTitle={(updatedTitle) =>
            setArticleData((prevData) => {
              const obj = {
                ...prevData,
              };

              obj.header.title = updatedTitle;

              // localStorage.setItem("articles", JSON.stringify(obj));

              return obj;
            })
          }
          //TODO: whenPublishing => remove add deco to title
          deco={articleData.header.deco}
          setDeco={(updatedDeco) =>
            setArticleData((prevData) => {
              const obj = {
                ...prevData,
              };

              obj.header.deco = updatedDeco;

              // localStorage.setItem("articles", JSON.stringify(obj));

              return obj;
            })
          }
          path={`/${articleID.current}/header`}
        />
        <hr />
        <Date />
      </div>

      {/* <Editor />  */}
    </>
  );
}

export default Content;

Content.propTypes = {};
