import PropTypes from "prop-types";
import { useState } from "react";

import { validUrl } from "../../../../../helpers/helpers-articles";
import { modifier_grid_url } from "../../../../../helpers/helpers-modifiers";
import { firebase_modify } from "../../../../../firebase/firebaseHelpers";

function Input_grid_line_img({ articleData, id, modifyArticle, path, item }) {
  const [alert, showAlert] = useState(
    articleData(id).divs[item].url !== "" && !validUrl(articleData(id).divs[item].url)
  );

  const onChangeHandle = (e) => {
    modifyArticle(id, modifier_grid_url, [e.target.value, item]);
    firebase_modify.grid_url(path, id, e.target.value, item);

    validUrl(e.target.value) ? showAlert(false) : showAlert(true);
  };

  return (
    <div>
      <label htmlFor={`url_input_grid_line${item}`}>URL: </label>
      <input
        type="text"
        id={`url_input_grid_line${item}`}
        name={`url_input_grid_line${item}`}
        className="grid_line_inputs"
        placeholder="..."
        value={articleData(id).divs[item].url}
        onChange={onChangeHandle}
      ></input>
      <div className={`alert alert_${alert}`}>
        <div>❗</div>
      </div>
    </div>
  );
}

export default Input_grid_line_img;

Input_grid_line_img.propTypes = {
  id: PropTypes.number,
  modifyArticle: PropTypes.func,
  articleData: PropTypes.func,
  path: PropTypes.string,
  item: PropTypes.string,
};
