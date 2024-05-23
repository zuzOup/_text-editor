import PropTypes from "prop-types";
import { createPortal } from "react-dom";
import { useState } from "react";

import "./ModalButton.css";

function ModalButton({ children, text, type, height, width }) {
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <div>
      <button
        onClick={toggleModal}
        className={`modalButton modalButton_${type}`}
        style={{ height: `${height}px`, width: width }}
      >
        {text}
      </button>
      {isModalVisible &&
        createPortal(
          <div className="modal">
            <button onClick={toggleModal} className="modal-cancel-btn">
              X
            </button>
            {children}
          </div>,
          document.body
        )}
    </div>
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
