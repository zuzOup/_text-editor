import PropTypes from "prop-types";

import Article_text from "./Article_type/Article_text";
import Article_textImg from "./Article_type/Article_textImg";
import Article_img from "./Article_type/Article_img";
import Article_grid from "./Article_type/Article_grid";
import Article_yt from "./Article_type/Article_yt";
import Article_link from "./Article_type/Article_link";

function Article_switch({ id, articleType, modifyArticle, articleData, path }) {
  switch (articleType(id)) {
    case "text":
      return (
        <Article_text
          modifyArticle={modifyArticle}
          id={id}
          articleData={articleData}
          path={path}
        />
      );
    case "textImg":
      return <Article_textImg modifyArticle={modifyArticle} />;
    case "img":
      return <Article_img modifyArticle={modifyArticle} />;
    case "grid":
      return <Article_grid modifyArticle={modifyArticle} />;
    case "yt":
      return <Article_yt modifyArticle={modifyArticle} />;
    case "link":
      return <Article_link modifyArticle={modifyArticle} />;
    default:
      return null;
  }
}

export default Article_switch;

Article_switch.propTypes = {
  id: PropTypes.number,
  articleType: PropTypes.func,
  modifyArticle: PropTypes.func,
  articleData: PropTypes.func,
  path: PropTypes.string,
};
