import PropTypes from "prop-types";

import { modifier_text } from "../../../helpers/helpers-modifiers";
import { firebase_modify_text } from "../../../firebase/firebaseHelpers";
import TextEditor from "./TextEditor/TextEditor";

function Article_text({ id, modifyArticle, articleData, path }) {
  const textHandle = (e) => {
    modifyArticle(id, modifier_text, e.target.value);
    firebase_modify_text(path, id, e.target.value);
  };

  return (
    <div className="article">
      <input value={articleData(id).text} onChange={textHandle}></input>
      <TextEditor
        modifyArticle={modifyArticle}
        id={id}
        articleData={articleData}
        path={path}
      />
    </div>
  );
}

export default Article_text;

Article_text.propTypes = {
  id: PropTypes.number,
  modifyArticle: PropTypes.func,
  articleData: PropTypes.func,
  path: PropTypes.string,
};
