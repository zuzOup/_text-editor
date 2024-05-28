import PropTypes from "prop-types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import Article_switch from "./Article_switch";

import { firebase_deleteArticle } from "../../firebase/firebaseHelpers";
import { firebase_changeArticleOrder } from "../../firebase/firebaseHelpers";

function move(array, oldIndex, newIndex) {
  if (newIndex >= array.length) {
    newIndex = array.length - 1;
  }
  array.splice(newIndex, 0, array.splice(oldIndex, 1)[0]);
  return array;
}

function Article_outer({
  id,
  deleteArticle,
  path,
  articleType,
  modifyArticle,
  articleData,
  setArticleOrder,
  articleOrder,
}) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id,
  });

  const style = { transition, transform: CSS.Translate.toString({ ...transform, x: 0 }) };

  const buttonCancel = () => {
    deleteArticle(id);
    firebase_deleteArticle(path, id);
  };

  const upDown = (isUp) => {
    const from = articleOrder.indexOf(id);
    let to = articleOrder.indexOf(id);
    if (isUp) {
      from !== 0 ? to-- : (to = from);
    } else {
      from !== articleOrder.length - 1 ? to++ : (to = from);
    }

    if (to === from) return;

    const newOrder = move(articleOrder, from, to);
    setArticleOrder(newOrder);
    firebase_changeArticleOrder(path, newOrder);
  };

  return (
    <div
      className="article_outer"
      id={`article_outer-${id}`}
      ref={setNodeRef}
      style={style}
    >
      <div className="buttons">
        <div className="move">
          <button
            onClick={() => {
              upDown(true);
            }}
          ></button>
          <button
            onClick={() => {
              upDown(false);
            }}
          ></button>
        </div>
      </div>
      <div className="article_container">
        <Article_switch
          id={id}
          articleType={articleType}
          modifyArticle={modifyArticle}
          articleData={articleData}
          path={path}
        />
      </div>
      <button className="drag" {...listeners} {...attributes}></button>
      <div className="buttons">
        <button className="cancel" onClick={buttonCancel}></button>
      </div>
    </div>
  );
}

export default Article_outer;

Article_outer.propTypes = {
  id: PropTypes.number,
  articleType: PropTypes.func,
  modifyArticle: PropTypes.func,
  articleData: PropTypes.func,
  path: PropTypes.string,
  deleteArticle: PropTypes.func,
  setArticleOrder: PropTypes.func,
  articleOrder: PropTypes.array,
};
