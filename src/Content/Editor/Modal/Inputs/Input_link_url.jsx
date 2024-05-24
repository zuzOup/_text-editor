import PropTypes from "prop-types";
import { useState } from "react";

import { tryUrl } from "../../../../helpers/helpers-articles";
import { modifier_link_url } from "../../../../helpers/helpers-modifiers";
import { firebase_modify } from "../../../../firebase/firebaseHelpers";

function Input_link_url({ url, modifyArticle, id, path }) {
  const [alert, showAlert] = useState(tryUrl(url));

  const onChangeHandle = (e) => {
    modifyArticle(id, modifier_link_url, e.target.value);
    firebase_modify.link_url(path, id, e.target.value);

    tryUrl(e.target.value) ? showAlert(true) : showAlert(false);
  };

  return (
    <>
      <span>
        <label htmlFor="url_input_link">URL: </label>
        <input
          type="text"
          id="url_input_link"
          name="url_input_link"
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

export default Input_link_url;

Input_link_url.propTypes = {
  url: PropTypes.string,
  id: PropTypes.number,
  modifyArticle: PropTypes.func,
  path: PropTypes.string,
};
