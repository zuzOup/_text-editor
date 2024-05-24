import PropTypes from "prop-types";

import { modifier_alt } from "../../../../helpers/helpers-modifiers";
import { firebase_modify } from "../../../../firebase/firebaseHelpers";

function Input_img_alt({ alt, modifyArticle, id, path }) {
  const onChangeHandle = (e) => {
    modifyArticle(id, modifier_alt, e.target.value);
    firebase_modify.img_alt(path, id, e.target.value);
  };

  return (
    <span>
      <label htmlFor="alt_input">alt: </label>
      <input
        type="text"
        id="alt_input"
        name="alt_input"
        placeholder="..."
        value={alt}
        onChange={onChangeHandle}
      ></input>
    </span>
  );
}

export default Input_img_alt;

Input_img_alt.propTypes = {
  alt: PropTypes.string,
  id: PropTypes.number,
  modifyArticle: PropTypes.func,
  path: PropTypes.string,
};
