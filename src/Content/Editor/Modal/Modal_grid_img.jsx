import PropTypes from "prop-types";

import Input_grid_img_alt from "./Inputs/grid/Input_grid_img_alt";
import Input_grid_img_url from "./Inputs/grid/Input_grid_img_url";
import Input_hotovo from "./Inputs/Input_hotovo";

import { clear } from "../../../helpers/helpers-modifiers";
import { firebase_clear } from "../../../firebase/firebaseHelpers";

function Modal_grid_img({ id, modifyArticle, articleData, path, toggleModal, item }) {
  const clearHandle = () => {
    console.log("4us");
    modifyArticle(id, clear.grid_img, item);
    firebase_clear.grid_img(path, id, item);
  };

  return (
    <>
      <div className="modal_img modal_inner">
        <div>
          <Input_grid_img_url
            modifyArticle={modifyArticle}
            articleData={articleData}
            id={id}
            path={path}
            item={item}
          />
          <Input_grid_img_alt
            modifyArticle={modifyArticle}
            articleData={articleData}
            id={id}
            path={path}
            item={item}
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

export default Modal_grid_img;

Modal_grid_img.propTypes = {
  id: PropTypes.number,
  modifyArticle: PropTypes.func,
  articleData: PropTypes.func,
  path: PropTypes.string,
  item: PropTypes.string,
  toggleModal: PropTypes.func,
};
