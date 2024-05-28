import PropTypes from "prop-types";

import { modifier_grid_alt } from "../../../../../helpers/helpers-modifiers";
import { firebase_modify } from "../../../../../firebase/firebaseHelpers";

function Input_grid_img_alt({ articleData, id, modifyArticle, path, item }) {
  const onChangeHandle = (e) => {
    modifyArticle(id, modifier_grid_alt, [e.target.value, item]);
    firebase_modify.grid_alt(path, id, e.target.value, item);
  };

  return (
    <span>
      <label htmlFor={`alt_input_grid${item}`}>alt: </label>
      <input
        type="text"
        id={`alt_input_grid${item}`}
        name={`alt_input_grid${item}`}
        className="grid_img_alt"
        placeholder="..."
        value={articleData(id).divs[item].alt}
        onChange={onChangeHandle}
      ></input>
    </span>
  );
}

export default Input_grid_img_alt;

Input_grid_img_alt.propTypes = {
  id: PropTypes.number,
  modifyArticle: PropTypes.func,
  articleData: PropTypes.func,
  path: PropTypes.string,
  item: PropTypes.string,
};
