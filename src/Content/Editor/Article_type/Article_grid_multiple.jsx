import PropTypes from "prop-types";
import { createPortal } from "react-dom";
import { useState } from "react";

import Modal_grid from "../Modal/Modal_grid";
import { src } from "../../../helpers/helpers-articles";
import { text } from "../../../helpers/helpers-modifiers";

const style = (obj) => {
  console.log(obj);

  return {
    backgroundImage: `url('${src(obj.url, 1000)}')`,
    gridArea: `${obj.rowStart}/${obj.columnStart}/${obj.rowEnd}/${obj.columnEnd}`,
  };
};

function Article_grid_multiple({ id, modifyArticle, articleData, path, setModalButton }) {
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const clickHandle = (e) => {
    if (e.shiftKey || e.ctrlKey) {
      setModalVisible(true);
    } else {
      console.log(e.target.id);
    }
  };

  return (
    <div
      className="grid"
      style={{ gridTemplateRows: `repeat(${articleData(id).rows}, 150px)` }}
    >
      {Object.keys(Object.assign({}, articleData(id).divs)).map((div) => {
        return (
          <div key={div} id={div} style={style(articleData(id).divs[div])}>
            <button onClick={clickHandle} className={`modalButton modalButton_grid`}>
              {text.gridImg(articleData(id).divs[div])}
            </button>
          </div>
        );
      })}

      {isModalVisible &&
        createPortal(
          <div className="modal">
            <Modal_grid
              modifyArticle={modifyArticle}
              id={id}
              articleData={articleData}
              path={path}
              setModalButton={setModalButton}
              toggleModal={toggleModal}
            />
          </div>,
          document.body
        )}
    </div>
  );
}

export default Article_grid_multiple;

Article_grid_multiple.propTypes = {
  id: PropTypes.number,
  modifyArticle: PropTypes.func,
  articleData: PropTypes.func,
  path: PropTypes.string,
  setModalButton: PropTypes.func,
};
