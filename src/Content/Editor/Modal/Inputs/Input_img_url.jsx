import PropTypes from "prop-types";
import { useState } from "react";

import { validUrl, setInitialHeight } from "../../../../helpers/helpers-articles";
import { modifier_url } from "../../../../helpers/helpers-modifiers";
import { firebase_modify_img_url } from "../../../../firebase/firebaseHelpers";

function Input_img_url({ url, setHeight, modifyArticle, id, path }) {
  const [alert, showAlert] = useState(url !== "" && !validUrl(url));

  const onChangeHandle = (e) => {
    modifyArticle(id, modifier_url, e.target.value);
    firebase_modify_img_url(path, id, e.target.value);
    setInitialHeight(e.target.value, setHeight, 150);

    validUrl(e.target.value) ? showAlert(false) : showAlert(true);
  };

  return (
    <>
      <span>
        <label htmlFor="url_input">URL: </label>
        <input
          type="text"
          id="url_input"
          name="url_input"
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

export default Input_img_url;

Input_img_url.propTypes = {
  url: PropTypes.string,
  setHeight: PropTypes.func,
  id: PropTypes.number,
  modifyArticle: PropTypes.func,
  articleData: PropTypes.func,
  path: PropTypes.string,
};
