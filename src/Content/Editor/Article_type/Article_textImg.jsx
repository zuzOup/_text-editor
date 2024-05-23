import PropTypes from "prop-types";
import { useEffect, useState } from "react";

import TextEditor from "./TextEditor/TextEditor";
import ModalButton_img from "../ModalButton/ModalButton_img";

import { src, setInitialHeight } from "../../../helpers/helpers-articles";

function Article_textImg({ id, modifyArticle, articleData, path }) {
  const [height, setHeight] = useState(0);

  useEffect(() => {
    setInitialHeight(articleData(id).img.url, setHeight, 150);
  }, []);

  const style = {
    height: `${height}px`,
    backgroundImage: `url('${src(articleData(id).img.url, 150)}')`,
  };

  return (
    <div className="article article_textImg">
      <div
        className={`float-div float-div-${articleData(id).img.float}`}
        style={style}
      ></div>
      <div
        className={`txtImg_modalButtonContainer txtImg_modalButtonContainer-${
          articleData(id).img.float
        }`}
      >
        <ModalButton_img
          id={id}
          articleData={articleData}
          path={path}
          modifyArticle={modifyArticle}
        />
      </div>
      <TextEditor
        modifyArticle={modifyArticle}
        id={id}
        articleData={articleData}
        path={path}
      />
    </div>
  );
}

export default Article_textImg;

Article_textImg.propTypes = {
  id: PropTypes.number,
  modifyArticle: PropTypes.func,
  articleData: PropTypes.func,
  path: PropTypes.string,
};
