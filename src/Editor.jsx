import { useEffect, useState } from "react";
import { initialData } from "./firebase/firebaseHelpers";

function Editor() {
  const [articleData, setArticleData] = useState({});
  const [articleID, setArticleID] = useState("");

  useEffect(() => {
    initialData(setArticleData, setArticleID);
  }, []);

  return <div>Editor</div>;
}

export default Editor;

Editor.propTypes = {};
