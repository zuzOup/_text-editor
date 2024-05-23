import PropTypes from "prop-types";
import { useEffect, useState } from "react";

import TextEditor from "./TextEditor/TextEditor";
import ModalButton from "../Modal/ModalButton";
import Modal_textImg from "../Modal/Modal_txtImg/Modal_textImg";

import { src, setInitialHeight } from "../../../helpers/helpers-articles";
import { text } from "../../../helpers/helpers-modifiers";

function Article_textImg({ id, modifyArticle, articleData, path }) {
  const [height, setHeight] = useState(30);

  useEffect(() => {
    setInitialHeight(articleData(id).img.url, setHeight, 150);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const style = {
    minHeight: `30px`,
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
        <ModalButton
          text={text.img(articleData(id).img)}
          type={articleData(id).article_type}
          height={height}
          width={"150px"}
        >
          <Modal_textImg
            modifyArticle={modifyArticle}
            id={id}
            url={articleData(id).img.url}
            alt={articleData(id).img.alt}
            float={articleData(id).img.float}
            setHeight={setHeight}
            path={path}
          />
        </ModalButton>
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
