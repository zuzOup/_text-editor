import PropTypes from "prop-types";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

function ArticleCase({ id }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id,
  });

  const style = { transition, transform: CSS.Translate.toString({ ...transform, x: 0 }) };

  return (
    <div className="article_case" ref={setNodeRef} style={style}>
      <button className="drag" {...listeners} {...attributes}></button>
      <button className="cancel">X</button>
    </div>
  );
}

export default ArticleCase;

ArticleCase.propTypes = {};
