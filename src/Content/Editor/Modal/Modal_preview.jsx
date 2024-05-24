import PropTypes from "prop-types";

import Input_preview_url from "./Inputs/preview/Input_preview_url";
import Input_preview_alt from "./Inputs/preview/Input_preview_alt";
import Input_hotovo from "./Inputs/Input_hotovo";

import { firebase_clear } from "../../../firebase/firebaseHelpers";

function Modal_preview({ url, alt, path, toggleModal, modifyPreview }) {
  const clearHandle = () => {
    modifyPreview.url("");
    modifyPreview.alt("");
    firebase_clear.preview(path);
  };

  return (
    <>
      <div className="modal_img modal_inner">
        <div>
          <Input_preview_url url={url} path={path} modifyPreview={modifyPreview} />
          <Input_preview_alt path={path} alt={alt} modifyPreview={modifyPreview} />
          <Input_hotovo toggleModal={toggleModal} />
        </div>
      </div>
      <button className="clear clear_img" onClick={clearHandle}>
        <div></div>
      </button>
    </>
  );
}

export default Modal_preview;

Modal_preview.propTypes = {
  url: PropTypes.string,
  alt: PropTypes.string,
  modifyPreview: PropTypes.obj,
  path: PropTypes.string,
  toggleModal: PropTypes.func,
};
