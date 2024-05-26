import PropTypes from "prop-types";

import { modifier_grid_rows } from "../../../../../helpers/helpers-modifiers";
import { firebase_modify } from "../../../../../firebase/firebaseHelpers";

function Input_grid_rowsInput({
  deleteRowOfSquares,
  id,
  modifyArticle,
  articleData,
  path,
}) {
  const onChangeHandle = (e) => {
    deleteRowOfSquares(e.target.value);

    modifyArticle(id, modifier_grid_rows, e.target.value);
    firebase_modify.grid_rows(path, id, e.target.value);
  };

  return (
    <input
      id="input"
      name="input"
      type="number"
      min="1"
      max="9"
      value={articleData(id).rows}
      onChange={onChangeHandle}
    ></input>
  );
}

export default Input_grid_rowsInput;

Input_grid_rowsInput.propTypes = {
  deleteRowOfSquares: PropTypes.func,
  id: PropTypes.number,
  modifyArticle: PropTypes.func,
  articleData: PropTypes.func,
  path: PropTypes.string,
};
