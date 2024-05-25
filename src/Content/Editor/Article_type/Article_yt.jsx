import PropTypes from "prop-types";
import { useState } from "react";

import ModalButton from "../Modal/ModalButton";
import Modal_yt from "../Modal/Modal_yt";

import { isStyle } from "../../../helpers/helpers-articles";
import { text } from "../../../helpers/helpers-modifiers";

function Article_yt({ id, modifyArticle, articleData, path }) {
  const [style, setStyle] = useState(isStyle(articleData(id).yt.urlID));

  return (
    <div className="article article_yt" style={style}>
      <ModalButton
        text={text.yt(articleData(id).yt)}
        type={articleData(id).article_type}
        height={`100%`}
        width={"1000px"}
      >
        <Modal_yt
          setStyle={setStyle}
          modifyArticle={modifyArticle}
          id={id}
          urlID={articleData(id).yt.urlID}
          path={path}
        />
      </ModalButton>
    </div>
  );
}

export default Article_yt;

Article_yt.propTypes = { prop: PropTypes.any };
