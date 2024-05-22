import PropTypes from "prop-types";

import { useEditor, EditorContent, BubbleMenu } from "@tiptap/react";
import Placeholder from "@tiptap/extension-placeholder";
import StarterKit from "@tiptap/starter-kit";

import { modifier_text } from "../../../../helpers/helpers-modifiers";
import { firebase_modify_text } from "../../../../firebase/firebaseHelpers";

import "./TextEditor.css";
import { article } from "../../../../helpers/helpers";

const toBeReplaced = ["<p>", "</p>"];

function TextEditor({ id, modifyArticle, articleData, path }) {
  console.log(articleData(id));

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "...Sem Piš!",
      }),
    ],

    content: "ahoj",
    onUpdate({ editor }) {
      console.log();

      /*
     if(articleData.)

      modifyArticle(id, modifier_text, e.target.value);
      setArticles((articles) => {
        let string = editor.getHTML();
        toBeReplaced.forEach((item) => {
          string = string.replace(item, "");
        });

        const obj = { ...articles };
        obj[article] = { ...obj[article], text: string };

        return obj;
      });*/
    },
  });

  if (!editor) {
    return null;
  }
  /*
  const undoRedoClassname = () => {
    if (txt_img) {
      return editor.isFocused
        ? `undoRedo URtxt_img UR-${articles[article].img.float}`
        : `undoRedo URfocused URtxt_img UR-${articles[article].img.float}`;
    }
    return editor.isFocused ? "undoRedo" : "undoRedo URfocused";
  };*/

  return (
    <>
      {
        <div className="undoRedo">
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

TextEditor.propTypes = { prop: PropTypes.any };
