import PropTypes from "prop-types";

import { firebase_modify } from "../../../../../firebase/firebaseHelpers";

function Input_preview_alt({ alt, path, modifyPreview }) {
  const onChangeHandle = (e) => {
    modifyPreview.alt(e.target.value);
    firebase_modify.preview_alt(path, e.target.value);
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

export default Input_preview_alt;

Input_preview_alt.propTypes = {
  alt: PropTypes.string,
  modifyPreview: PropTypes.func,
  path: PropTypes.string,
};
