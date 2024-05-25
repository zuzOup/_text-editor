import PropTypes from "prop-types";

import Input_yt from "./Inputs/Input_yt";
import Input_hotovo from "./Inputs/Input_hotovo";

import { clear } from "../../../helpers/helpers-modifiers";
import { firebase_clear } from "../../../firebase/firebaseHelpers";

function Modal_link({ urlID, modifyArticle, id, path, toggleModal }) {
  const clearHandle = () => {
    modifyArticle(id, clear.link, "");
    firebase_clear.link(path, id);
  };
  return (
    <>
      <div className="modal_img modal_inner">
        <div>
          <Input_yt urlID={urlID} modifyArticle={modifyArticle} id={id} path={path} />
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
  urlID: PropTypes.string,
  text: PropTypes.string,
  id: PropTypes.number,
  modifyArticle: PropTypes.func,
  path: PropTypes.string,
  toggleModal: PropTypes.func,
};
