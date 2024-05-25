import PropTypes from "prop-types";

import ModalButton from "../Modal/ModalButton";
import Modal_yt from "../Modal/Modal_yt";

import { text } from "../../../helpers/helpers-modifiers";

function Article_yt({ id, modifyArticle, articleData, path }) {
  const style = () => {
    if (articleData(id).yt.urlID === "")
      return {
        height: "30px",
        backgroundImage: "none",
      };
    try {
      new URL(`https://img.youtube.com/vi/${articleData(id).yt.urlID}/maxresdefault.jpg`);
      return {
        height: "450px",
        backgroundImage: `url("https://img.youtube.com/vi/${
          articleData(id).yt.urlID
        }/maxresdefault.jpg")`,
        boxShadow: "1px 1px 5px #bfbfbfbf",
      };
    } catch (err) {
      return {
        height: "30px",
        backgroundImage: "none",
      };
    }
  };

  return (
    <div className={`article article_yt article_yt${style.height}`} style={style()}>
      <ModalButton
        text={text.yt(articleData(id).yt)}
        type={articleData(id).article_type}
        height={`100%`}
        width={"1000px"}
      >
        <Modal_yt
          modifyArticle={modifyArticle}
          id={id}
          start={articleData(id).yt.start}
          urlID={articleData(id).yt.urlID}
          path={path}
        />
      </ModalButton>
    </div>
  );
}

export default Article_yt;

Article_yt.propTypes = {
  id: PropTypes.number,
  modifyArticle: PropTypes.func,
  articleData: PropTypes.func,
  path: PropTypes.string,
};
