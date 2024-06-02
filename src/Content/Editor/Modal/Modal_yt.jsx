import PropTypes from "prop-types";

import Input_yt_url from "./Inputs/Input_yt_url";
import Input_yt_start from "./Inputs/Input_yt_start";
import Input_hotovo from "./Inputs/Input_hotovo";

import { clear } from "../../../helpers/helpers-modifiers";
import { firebase_clear } from "../../../firebase/firebaseHelpers";

function Modal_link({ urlID, start, modifyArticle, id, path, toggleModal, setTitle }) {
  const clearHandle = () => {
    modifyArticle(id, clear.link);
    firebase_clear.yt(path, id);
  };
  return (
    <>
      <div className="modal_img modal_inner">
        <div>
          <Input_yt_url
            urlID={urlID}
            modifyArticle={modifyArticle}
            id={id}
            path={path}
            setTitle={setTitle}
          />
          <Input_yt_start
            start={start}
            modifyArticle={modifyArticle}
            id={id}
            path={path}
          />
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
  start: PropTypes.number,
  urlID: PropTypes.string,
  id: PropTypes.number,
  modifyArticle: PropTypes.func,
  path: PropTypes.string,
  toggleModal: PropTypes.func,
  setTitle: PropTypes.func,
};
