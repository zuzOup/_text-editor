import PropTypes from "prop-types";

import Input_img_url from "../Inputs/Input_img_url";
import Input_img_alt from "../Inputs/Input_img_alt";

import { clear } from "../../../../helpers/helpers-modifiers";
import { firebase_clear } from "../../../../firebase/firebaseHelpers";

import "./Modal_txtImg.css";
import Input_txtImg_float from "../Inputs/Input_txtImg_float";

function Modal_textImg({ setHeight, url, alt, float, modifyArticle, id, path }) {
  const clearHandle = () => {
    modifyArticle(id, clear.txtImg, "");
    firebase_clear.txtImg(path, id);
  };

  return (
    <>
      <div className="modal_txtImg modal_inner">
        <div>
          <Input_img_url
            setHeight={setHeight}
            url={url}
            modifyArticle={modifyArticle}
            id={id}
            path={path}
          />
          <Input_img_alt modifyArticle={modifyArticle} id={id} path={path} alt={alt} />
          <Input_txtImg_float
            modifyArticle={modifyArticle}
            id={id}
            path={path}
            float={float}
          />
          <input value="hotovo"></input>
        </div>
      </div>
      <button className="clear clear_txtImg" onClick={clearHandle}>
        O
      </button>
    </>
  );
}

export default Modal_textImg;

Modal_textImg.propTypes = {
  url: PropTypes.string,
  alt: PropTypes.string,
  float: PropTypes.string,
  setHeight: PropTypes.func,
  id: PropTypes.number,
  modifyArticle: PropTypes.func,
  path: PropTypes.string,
};
