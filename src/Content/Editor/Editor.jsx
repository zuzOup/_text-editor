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

import ArticleCase from "./ArticleCase";

function Editor({ articleOrder, setArticleOrder, path }) {
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
          <ArticleCase handle={true} key={article} id={article}></ArticleCase>
        ))}
      </SortableContext>
    </DndContext>
  );
}

export default Editor;

Editor.propTypes = {
  articleOrder: PropTypes.array,
  setArticleOrder: PropTypes.func,
  path: PropTypes.string,
};
