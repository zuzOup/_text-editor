import PropTypes from "prop-types";

import { newA } from "../../../helpers/helpers";
import { firebase_newArticle } from "../../../firebase/firebaseHelpers";

function Nav_modal_New_Load({ txt, setModal, setArticleData, articleID }) {
  const newArticle = () => {
    setModal(false);
    firebase_newArticle(articleID);
    setArticleData(newA());
  };

  const loadArticle = () => {
    console.log("load");
  };

  return (
    <div className="publish_ok">
      <h4>{txt}</h4>
      <span>
        <button onClick={newArticle}>New Article</button>
        <button onClick={loadArticle}>Load Article</button>
      </span>
    </div>
  );
}

export default Nav_modal_New_Load;

Nav_modal_New_Load.propTypes = { prop: PropTypes.any };
