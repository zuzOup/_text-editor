import PropTypes from "prop-types";

import { useEditor, EditorContent, BubbleMenu } from "@tiptap/react";
import Placeholder from "@tiptap/extension-placeholder";
import StarterKit from "@tiptap/starter-kit";

import { modifier_text } from "../../../../helpers/helpers-modifiers";
import { firebase_modify } from "../../../../firebase/firebaseHelpers";

import "./TextEditor.css";

const toBeReplaced = ["<p>", "</p>"];

function TextEditor({ id, modifyArticle, articleData, path }) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "...Sem Piš!",
      }),
    ],

    content: articleData(id).text,
    onUpdate({ editor }) {
      let string = editor.getHTML();
      toBeReplaced.forEach((item) => (string = string.replace(item, "")));
      firebase_modify.text(path, id, string);
      modifyArticle(id, modifier_text, string);
    },
  });

  if (!editor) {
    return null;
  }

  const undoRedoClassname = () => {
    if (articleData(id).article_type === "textImg") {
      return editor.isFocused
        ? `undoRedo URtxt_img UR-${articleData(id).img.float}`
        : `undoRedo URfocused URtxt_img UR-${articleData(id).img.float}`;
    }
    return editor.isFocused ? "undoRedo" : "undoRedo URfocused";
  };

  return (
    <>
      {
        <div className={undoRedoClassname()}>
          <button onClick={() => editor.chain().focus().undo().run()}></button>
          <button onClick={() => editor.chain().focus().redo().run()}></button>
        </div>
      }
      <EditorContent editor={editor} />
      {editor && (
        <BubbleMenu
          className="bubble-menu"
          tippyOptions={{ duration: 100 }}
          editor={editor}
        >
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={editor.isActive("bold") ? "is-active" : ""}
          ></button>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={editor.isActive("italic") ? "is-active" : ""}
          ></button>
          <button
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={editor.isActive("strike") ? "is-active" : ""}
          ></button>
          <button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={editor.isActive("bulletList") ? "is-active" : ""}
          ></button>
          <button onClick={() => editor.chain().focus().unsetAllMarks().run()}></button>
        </BubbleMenu>
      )}
    </>
  );
}

export default TextEditor;

TextEditor.propTypes = {
  id: PropTypes.number,
  modifyArticle: PropTypes.func,
  articleData: PropTypes.func,
  path: PropTypes.string,
};
