import PropTypes from "prop-types";

import { modifier_link_text } from "../../../../helpers/helpers-modifiers";
import { firebase_modify } from "../../../../firebase/firebaseHelpers";

function Input_link_text({ text, modifyArticle, id, path }) {
  const onChangeHandle = (e) => {
    const text = e.target.value.toUpperCase();
    modifyArticle(id, modifier_link_text, text);
    firebase_modify.link_text(path, id, text);
  };

  return (
    <span>
      <label htmlFor="text_input_link">Text: </label>
      <input
        type="text"
        id="text_input_link"
        name="text_input_link"
        placeholder="..."
        value={text}
        onChange={onChangeHandle}
      ></input>
    </span>
  );
}

export default Input_link_text;

Input_link_text.propTypes = {
  text: PropTypes.string,
  id: PropTypes.number,
  modifyArticle: PropTypes.func,
  path: PropTypes.string,
};
