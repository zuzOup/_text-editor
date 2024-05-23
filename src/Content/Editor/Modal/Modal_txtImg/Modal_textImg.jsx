import PropTypes from "prop-types";

import "./Modal_txtImg.css";
import Input_img_url from "../Inputs/Input_img_url";

function Modal_textImg({ setHeight, url, modifyArticle, id, path }) {
  const clearHandle = (e) => {
    console.log(e.target);
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
          <input value="alt"></input>
          <input value="float"></input>
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
  setHeight: PropTypes.func,
  id: PropTypes.number,
  modifyArticle: PropTypes.func,
  path: PropTypes.string,
};
