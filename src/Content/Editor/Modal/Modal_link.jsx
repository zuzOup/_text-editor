import PropTypes from "prop-types";
import Input_link_text from "./Inputs/Input_link_text";
import Input_link_url from "./Inputs/Input_link_url";
import Input_hotovo from "./Inputs/Input_hotovo";

import { clear } from "../../../helpers/helpers-modifiers";
import { firebase_clear } from "../../../firebase/firebaseHelpers";

function Modal_link({ url, text, modifyArticle, id, path, toggleModal }) {
  const clearHandle = () => {
    modifyArticle(id, clear.link, "");
    firebase_clear.link(path, id);
  };
  return (
    <>
      <div className="modal_img modal_inner">
        <div>
          <Input_link_text
            text={text}
            modifyArticle={modifyArticle}
            id={id}
            path={path}
          />
          <Input_link_url modifyArticle={modifyArticle} id={id} path={path} url={url} />
          <Input_hotovo toggleModal={toggleModal} />
        </div>
      </div>
      <button className="clear clear_img" onClick={clearHandle}>
        <div></div>
      </button>
    </>
  );
}

export default Modal_link;

Modal_link.propTypes = {
  url: PropTypes.string,
  text: PropTypes.string,
  id: PropTypes.number,
  modifyArticle: PropTypes.func,
  path: PropTypes.string,
  toggleModal: PropTypes.func,
};
