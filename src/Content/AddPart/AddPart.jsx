import PropTypes from "prop-types";
import { useState } from "react";

import { idStamp, buttons } from "../../helpers/helpers-addPart";
import { firebase_addArticle } from "../../firebase/firebaseHelpers";

import "./AddPart.css";

function AddPart({ addToOrder, addToArticles, path }) {
  const [showButtons, setShowButtons] = useState(false);

  const buttonShow = () => {
    setShowButtons((state) => {
      return !state;
    });
  };

  const buttonHandle = (button) => {
    const id = idStamp();
    addToOrder(id);
    addToArticles(id, button);
    firebase_addArticle(path, id, button);
  };

  return (
    <div id="addPart" onMouseEnter={buttonShow} onMouseLeave={buttonShow}>
      {showButtons &&
        buttons.map((button) => {
          return (
            <button
              className="buttons"
              key={button.name}
              onClick={() => {
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
  addToOrder: PropTypes.func,
  addToArticles: PropTypes.func,
  path: PropTypes.string,
};
