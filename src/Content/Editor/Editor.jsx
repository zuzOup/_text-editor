import PropTypes from "prop-types";

import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  closestCenter,
} from "@dnd-kit/core";

import {
  arrayMove,
  sortableKeyboardCoordinates,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { firebase_changeArticleOrder } from "../../firebase/firebaseHelpers";

import "./Editor.css";
import "./Article_type/Article.css";

import Article_outer from "./Article_outer";

function Editor({
  articleOrder,
  setArticleOrder,
  path,
  deleteArticle,
  articleType,
  modifyArticle,
  articleData,
}) {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const getOrder = (id) => articleOrder.findIndex((article) => article === id);

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id === over.id) return;

    const originalPos = getOrder(active.id);
    const newPos = getOrder(over.id);

    setArticleOrder(arrayMove(articleOrder, originalPos, newPos));
    firebase_changeArticleOrder(path, arrayMove(articleOrder, originalPos, newPos));
  };

  return (
    <div id="editor">
      {articleOrder.length >= 1 && articleOrder[0] !== 0 && (
        <DndContext
          autoScroll={{
            threshold: {
              x: 0,
              y: 0.1,
            },
          }}
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={articleOrder} strategy={verticalListSortingStrategy}>
            {articleOrder.map((article) => (
              <Article_outer
                handle={true}
                key={article}
                id={article}
                deleteArticle={deleteArticle}
                modifyArticle={modifyArticle}
                articleType={articleType}
                articleData={articleData}
                path={path}
              />
            ))}
          </SortableContext>
        </DndContext>
      )}
    </div>
  );
}

export default Editor;

Editor.propTypes = {
  articleOrder: PropTypes.array,
  setArticleOrder: PropTypes.func,
  deleteArticle: PropTypes.func,
  articleType: PropTypes.func,
  modifyArticle: PropTypes.func,
  articleData: PropTypes.func,
  path: PropTypes.string,
};
