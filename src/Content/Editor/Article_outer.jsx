import PropTypes from "prop-types";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import Article_switch from "./Article_switch";
import { firebase_deleteArticle } from "../../firebase/firebaseHelpers";

function Article_outer({ id, deleteArticle, path }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id,
  });

  const style = { transition, transform: CSS.Translate.toString({ ...transform, x: 0 }) };

  const buttonCancel = () => {
    deleteArticle(id);
    firebase_deleteArticle(path, id);
  };

  return (
    <div className="article_outer" ref={setNodeRef} style={style}>
      <Article_switch id={id} />
      <button className="drag" {...listeners} {...attributes}></button>
      <button className="cancel" onClick={buttonCancel}>
        X
      </button>
    </div>
  );
}

export default Article_outer;

Article_outer.propTypes = {
  id: PropTypes.number,
  deleteArticle: PropTypes.func,
  path: PropTypes.string,
};
