import PropTypes from "prop-types";

import { newA } from "../../../../helpers/helpers";
import { firebase_newArticle } from "../../../../firebase/firebaseHelpers";

function Nav_modal_New_Load({ txt, setModal, setArticleData, articleID }) {
  const newArticle = () => {
    setModal(false);
    firebase_newArticle(articleID);
    setArticleData(newA());
  };

  const loadArticle = () => {
    setModal("load");
  };

  return (
    <div className="modal_nav modal_inner">
      <div className="publish_ok">
        <h4>{txt}</h4>
        <span>
          <button onClick={newArticle}>New Article</button>
          <button onClick={loadArticle}>Load Article</button>
        </span>
      </div>
    </div>
  );
}

export default Nav_modal_New_Load;

Nav_modal_New_Load.propTypes = {
  txt: PropTypes.string,
  setModal: PropTypes.func,
  setArticleData: PropTypes.func,
  articleID: PropTypes.object,
};
