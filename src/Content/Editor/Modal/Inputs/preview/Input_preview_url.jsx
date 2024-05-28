import PropTypes from "prop-types";
import { useState } from "react";

import { validUrl } from "../../../../../helpers/helpers-articles";
import { firebase_modify } from "../../../../../firebase/firebaseHelpers";

function Input_preview_url({ url, path, modifyPreview }) {
  const [alert, showAlert] = useState(url !== "" && !validUrl(url));

  const onChangeHandle = (e) => {
    modifyPreview.url(e.target.value);
    firebase_modify.preview_url(path, e.target.value);
    validUrl(e.target.value) ? showAlert(false) : showAlert(true);
  };

  return (
    <>
      <span>
        <label htmlFor="url_input_prew">URL: </label>
        <input
          type="text"
          id="url_input_prew"
          name="url_input_prew"
          placeholder="..."
          value={url}
          onChange={onChangeHandle}
        ></input>
        <div className={`alert alert_${alert}`}>
          <div>❗</div>
        </div>
      </span>
    </>
  );
}

export default Input_preview_url;

Input_preview_url.propTypes = {
  url: PropTypes.string,
  modifyPreview: PropTypes.shape({ alt: PropTypes.func, url: PropTypes.func }),
  path: PropTypes.string,
};
