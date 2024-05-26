import PropTypes from "prop-types";
import { useState,useRef } from "react";

import { clear } from "../../../helpers/helpers-modifiers";
import { firebase_clear } from "../../../firebase/firebaseHelpers";

import Input_grid_preset from "./Inputs/grid/Input_grid_preset";
import Input_grid_rowsInput from "./Inputs/grid/Input_grid_rowsInput";
import Input_hotovo_grid from "./Inputs/grid/Input_hotovo_grid";
import Input_grid_selection from "./Inputs/grid/Input_grid_selection";

function Modal_grid({
  id,
  modifyArticle,
  articleData,
  path,
  toggleModal,
  setModalButton,
}) {
  const [squares, setSquares] = useState({});
  const counter = useRef(0);

  const clearHandle = () => {
    modifyArticle(id, clear.grid);
    firebase_clear.grid(path, id);
    setSquares({});
  };

  const deleteRowOfSquares = (value) => {
    setSquares((squares) => {
      const newSquares = { ...squares };
      Object.keys(newSquares)
        .map((x) => {
          return parseInt(x);
        })
        .filter((x) => x > parseInt(value) * 6)
        .forEach((x) => delete newSquares[x]);

      return newSquares;
    });
  };

  return (
    <>
      <div className="modal_grid modal_inner">
        <Input_grid_preset
          setSquares={setSquares}
          modifyArticle={modifyArticle}
          id={id}
          path={path}
          counter={counter}
        />
        <div className="modal_grid_main">
          <div>
            <Input_grid_rowsInput
              deleteRowOfSquares={deleteRowOfSquares}
              modifyArticle={modifyArticle}
              articleData={articleData}
              id={id}
              path={path}
            />
            <Input_grid_selection
              setSquares={setSquares}
              squares={squares}
              modifyArticle={modifyArticle}
              articleData={articleData}
              id={id}
              path={path}
              counter={counter}
            />
          </div>
          <div> inputs</div>
        </div>
        <Input_hotovo_grid
          toggleModal={toggleModal}
          setModalButton={setModalButton}
          articleData={articleData}
          id={id}
          squares={squares}
          path={path}
          modifyArticle={modifyArticle}
        />
      </div>
      <button className="clear clear_grid" onClick={clearHandle}>
        <div></div>
      </button>
    </>
  );
}

export default Modal_grid;

Modal_grid.propTypes = {
  setModalButton: PropTypes.func,
  id: PropTypes.number,
  modifyArticle: PropTypes.func,
  articleData: PropTypes.func,
  path: PropTypes.string,
  toggleModal: PropTypes.func,
};
