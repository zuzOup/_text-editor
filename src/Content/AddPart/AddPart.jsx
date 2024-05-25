import PropTypes from "prop-types";
import { useState } from "react";

import { idStamp, buttons } from "../../helpers/helpers-addPart";
import { firebase_addArticle } from "../../firebase/firebaseHelpers";

import "./AddPart.css";

function AddPart({ addArticle, path }) {
  const [showButtons, setShowButtons] = useState(false);

  const buttonHandle = (button) => {
    
    const id = idStamp();
    addArticle(id, button);
    firebase_addArticle(path, id, button);
  };

  return (
    <div
      id="addPart"
      onMouseEnter={() => {
        setShowButtons(true);
      }}
      onMouseLeave={() => {
        setShowButtons(false);
      }}
    >
      {showButtons &&
        buttons.map((button) => {
          return (
            <button
              className="buttons"
              key={button.name}
              onMouseDown={() => {
                buttonHandle(button.obj);
              }}
            >
              {button.name}
            </button>
          );
        })}
    </div>
  );
}

export default AddPart;

AddPart.propTypes = {
  addArticle: PropTypes.func,
  path: PropTypes.string,
};
