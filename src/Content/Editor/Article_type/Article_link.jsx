import PropTypes from "prop-types";
import parse from "html-react-parser";

import ModalButton from "../Modal/ModalButton";
import Modal_link from "../Modal/Modal_link";

import { text } from "../../../helpers/helpers-modifiers";

function Article_link({ id, modifyArticle, articleData, path }) {
  const style = {
    minHeight: `30px`,
    height: `fit-content`,
  };

  return (
    <div className="article article_link" style={style}>
      <ModalButton
        text={parse(text.link(articleData(id).link))}
        type={articleData(id).article_type}
        height={`100%`}
        width={"1000px"}
      >
        <Modal_link
          modifyArticle={modifyArticle}
          id={id}
          text={articleData(id).link.text}
          url={articleData(id).link.url}
          path={path}
        />
      </ModalButton>
    </div>
  );
}

export default Article_link;

Article_link.propTypes = {
  id: PropTypes.number,
  modifyArticle: PropTypes.func,
  articleData: PropTypes.func,
  path: PropTypes.string,
};
