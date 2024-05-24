import PropTypes from "prop-types";

import Input_img_url from "./Inputs/Input_img_url";
import Input_img_alt from "./Inputs/Input_img_alt";
import Input_txtImg_float from "./Inputs/Input_txtImg_float";
import Input_hotovo from "./Inputs/Input_hotovo";

import { clear } from "../../../helpers/helpers-modifiers";
import { firebase_clear } from "../../../firebase/firebaseHelpers";

function Modal_textImg({
  setHeight,
  url,
  alt,
  float,
  modifyArticle,
  id,
  path,
  toggleModal,
}) {
  const clearHandle = () => {
    modifyArticle(id, clear.txtImg, "");
    firebase_clear.txtImg(path, id);
    setHeight(30);
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
            width={150}
          />
          <Input_img_alt modifyArticle={modifyArticle} id={id} path={path} alt={alt} />
          <Input_txtImg_float
            modifyArticle={modifyArticle}
            id={id}
            path={path}
            float={float}
          />
          <Input_hotovo toggleModal={toggleModal} />
        </div>
      </div>
      <button className="clear clear_txtImg" onClick={clearHandle}>
        <div></div>
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
  toggleModal: PropTypes.func,
};
