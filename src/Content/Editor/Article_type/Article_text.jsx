import PropTypes from "prop-types";

import TextEditor from "./TextEditor/TextEditor";

function Article_text({ id, modifyArticle, articleData, path }) {
  return (
    <div className="article">
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
