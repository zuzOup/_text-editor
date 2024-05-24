import PropTypes from "prop-types";

import { modifier_float } from "../../../../helpers/helpers-modifiers";
import { firebase_modify } from "../../../../firebase/firebaseHelpers";
import { useEffect } from "react";

function Input_txtImg_float({ float, modifyArticle, id, path }) {
  const switchFloat = (value) => {
    modifyArticle(id, modifier_float, value);
    firebase_modify.float(path, id, value);

    if (value === "left") {
      document.getElementById("checkbox_txtImg").checked = true;
    } else {
      document.getElementById("checkbox_txtImg").checked = false;
    }
  };

  useEffect(() => {
    if (float === "left") document.getElementById("checkbox_txtImg").checked = true;
  }, []); // eslint-disable-line

  const checkBoxFloat = (e) => {
    if (e.target.checked === true) {
      modifyArticle(id, modifier_float, "left");
      firebase_modify.float(path, id, "left");
    } else {
      modifyArticle(id, modifier_float, "right");
      firebase_modify.float(path, id, "right");
    }
  };

  return (
    <span className={`switchSpan float_${float}`}>
      <button onClick={() => switchFloat("left")}>Float Left</button>
      <div>
        <input
          type="checkbox"
          className={float}
          onClick={checkBoxFloat}
          id="checkbox_txtImg"
        />
      </div>
      <button onClick={() => switchFloat("right")}>Float Right</button>
    </span>
  );
}

export default Input_txtImg_float;

Input_txtImg_float.propTypes = {
  float: PropTypes.string,
  id: PropTypes.number,
  modifyArticle: PropTypes.func,
  path: PropTypes.string,
};
