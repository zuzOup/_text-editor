import PropTypes from "prop-types";

import TextEditor from "./TextEditor/TextEditor";

function Article_textImg({ id, modifyArticle, articleData, path }) {
  return (
    <div className="article">
      txt Img
      <TextEditor
        modifyArticle={modifyArticle}
        id={id}
        articleData={articleData}
        path={path}
      />
    </div>
  );
}

export default Article_textImg;

Article_textImg.propTypes = {
  id: PropTypes.number,
  modifyArticle: PropTypes.func,
  articleData: PropTypes.func,
  path: PropTypes.string,
};
