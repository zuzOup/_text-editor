import PropTypes from "prop-types";
import { createPortal } from "react-dom";
import { useState, cloneElement } from "react";

import "./ModalButton.css";
import "./Modal.css";

function ModalButton({ children, text, type, width, height }) {
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <>
      <button
        onClick={toggleModal}
        className={`modalButton modalButton_${type}`}
        style={{ height: height, width: width }}
      >
        {text}
      </button>
      {isModalVisible &&
        createPortal(
          <div className="modal">
            {cloneElement(children, { toggleModal: toggleModal })}
          </div>,
          document.body
        )}
    </>
  );
}

export default ModalButton;

ModalButton.propTypes = {
  children: PropTypes.object,
  text: PropTypes.string,
  type: PropTypes.string,
  height: PropTypes.number,
  width: PropTypes.string,
};
