import PropTypes from "prop-types";

import Input_img_url from "../Inputs/Input_img_url";
import Input_img_alt from "../Inputs/Input_img_alt";
import Input_hotovo from "../Inputs/Input_hotovo";

import { clear } from "../../../../helpers/helpers-modifiers";
import { firebase_clear } from "../../../../firebase/firebaseHelpers";

import "./Modal_img.css";

function Modal_img({ setHeight, url, alt, modifyArticle, id, path, toggleModal }) {
  const clearHandle = () => {
    modifyArticle(id, clear.img, "");
    firebase_clear.img(path, id);
  };

  return (
    <>
      <div className="modal_img modal_inner">
        <div>
          <Input_img_url
            setHeight={setHeight}
            url={url}
            modifyArticle={modifyArticle}
            id={id}
            path={path}
            width={1000}
          />
          <Input_img_alt modifyArticle={modifyArticle} id={id} path={path} alt={alt} />
          <Input_hotovo toggleModal={toggleModal} />
        </div>
      </div>
      <button className="clear clear_img" onClick={clearHandle}>
        <div></div>
      </button>
    </>
  );
}

export default Modal_img;

Modal_img.propTypes = {
  url: PropTypes.string,
  alt: PropTypes.string,
  setHeight: PropTypes.func,
  id: PropTypes.number,
  modifyArticle: PropTypes.func,
  path: PropTypes.string,
  toggleModal: PropTypes.func,
};
