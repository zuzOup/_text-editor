import PropTypes from "prop-types";
import { useState } from "react";

import Article_grid_multiple from "./Article_grid_multiple";

import ModalButton from "../Modal/ModalButton";
import Modal_grid from "../Modal/Modal_grid";

import { text } from "../../../helpers/helpers-modifiers";
import { state } from "../../../helpers/helpers-articles";

function Article_grid({ id, modifyArticle, articleData, path }) {
  const [modalButton, setModalButton] = useState(state(articleData(id).divs));

  return (
    <div className={`article article_grid `}>
      {modalButton && (
        <ModalButton
          text={text.grid()}
          type={articleData(id).article_type}
          width={"1000px"}
          height={"100%"}
        >
          <Modal_grid
            modifyArticle={modifyArticle}
            id={id}
            articleData={articleData}
            path={path}
            setModalButton={setModalButton}
          />
        </ModalButton>
      )}
      {!modalButton && (
        <Article_grid_multiple
          modifyArticle={modifyArticle}
          id={id}
          articleData={articleData}
          path={path}
          setModalButton={setModalButton}
        />
      )}
    </div>
  );
}

export default Article_grid;

Article_grid.propTypes = {
  id: PropTypes.number,
  modifyArticle: PropTypes.func,
  articleData: PropTypes.func,
  path: PropTypes.string,
};
