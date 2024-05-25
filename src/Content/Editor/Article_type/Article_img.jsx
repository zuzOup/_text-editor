import PropTypes from "prop-types";
import { useEffect, useState } from "react";

import ModalButton from "../Modal/ModalButton";
import Modal_img from "../Modal/Modal_img";

import { src, setInitialHeight } from "../../../helpers/helpers-articles";
import { text } from "../../../helpers/helpers-modifiers";

function Article_img({ id, modifyArticle, articleData, path }) {
  const [height, setHeight] = useState(30);

  useEffect(() => {
    setInitialHeight(articleData(id).img.url, setHeight, 1000);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const style = {
    height: `${height}px`,
    backgroundImage: `url('${src(articleData(id).img.url, 1000)}')`,
  };

  return (
    <div className={`article article_img article_img${height}`} style={style}>
      <ModalButton
        text={text.img(articleData(id).img)}
        type={articleData(id).article_type}
        width={"1000px"}
        height={"100%"}
      >
        <Modal_img
          modifyArticle={modifyArticle}
          id={id}
          url={articleData(id).img.url}
          alt={articleData(id).img.alt}
          setHeight={setHeight}
          path={path}
        />
      </ModalButton>
    </div>
  );
}

export default Article_img;

Article_img.propTypes = {
  id: PropTypes.number,
  modifyArticle: PropTypes.func,
  articleData: PropTypes.func,
  path: PropTypes.string,
};
