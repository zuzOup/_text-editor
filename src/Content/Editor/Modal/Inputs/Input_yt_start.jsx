import PropTypes from "prop-types";

import { modifier_yt_start } from "../../../../helpers/helpers-modifiers";
import { firebase_modify } from "../../../../firebase/firebaseHelpers";

function Input_yt_start({ start, modifyArticle, id, path }) {
  const onChangeHandle = (e) => {
    modifyArticle(id, modifier_yt_start, parseInt(e.target.value));
    firebase_modify.yt_start(path, id, parseInt(e.target.value));
  };

  return (
    <span>
      <label htmlFor="start_input">Start: </label>
      <input
        type="number"
        min="0"
        id="start_input"
        name="start_input"
        placeholder="..."
        value={start}
        onChange={onChangeHandle}
      ></input>
    </span>
  );
}

export default Input_yt_start;

Input_yt_start.propTypes = {
  start: PropTypes.number,
  id: PropTypes.number,
  modifyArticle: PropTypes.func,
  path: PropTypes.string,
};
