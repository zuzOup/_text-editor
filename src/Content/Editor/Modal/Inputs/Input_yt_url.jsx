import PropTypes from "prop-types";

import { useState } from "react";

import { modifier_yt_urlID } from "../../../../helpers/helpers-modifiers";
import { firebase_modify } from "../../../../firebase/firebaseHelpers";
import { fetchTitle_yt } from "../../../../helpers/helpers-articles";

const videoValue = [
  "https://www.youtube.com/watch?v=",
  "https://studio.youtube.com/video/",
  "https://youtu.be/",
];

const isYT = (urlID) => {
  if (urlID !== "") return "https://youtu.be/" + urlID;
  return "";
};

function Input_yt_url({ urlID, modifyArticle, id, path, setTitle }) {
  const [url, setUrl] = useState(isYT(urlID));
  const [showUrlID, setShowURL] = useState(false);
  const [alert, showAlert] = useState(false);

  const onChangeHandle = (e) => {
    const value = e.target.value;
    setUrl(value);

    if (videoValue.some((x) => value.includes(x) && value.split(x)[0] === "")) {
      const urlID = videoValue.reduce((acc, cur) => {
        if (value.includes(cur) && value.split(cur)[0] === "") {
          const id = acc.split(cur)[1].split("&")[0];
          return id;
        } else return acc;
      }, value);

      modifyArticle(id, modifier_yt_urlID, urlID);
      firebase_modify.yt_url(path, id, urlID);
      fetchTitle_yt(urlID, setTitle);
    } else if (value === "") {
      modifyArticle(id, modifier_yt_urlID, "");
      firebase_modify.yt_url(path, id, "");
      setTitle("");
    } else {
      showAlert(true);
    }
  };

  const onFocus = () => {
    setShowURL(true);
  };

  const onBlur = () => {
    setShowURL(false);
  };

  return (
    <>
      <span>
        <label htmlFor="url_input_yt">URL: </label>
        <input
          type="text"
          id="url_input_yt"
          name="url_input_yt"
          placeholder="..."
          value={url}
          onChange={onChangeHandle}
          onFocus={onFocus}
          onBlur={onBlur}
        ></input>
        <div className={`alert alert_${alert}`}>
          <div>❗</div>
        </div>
      </span>
      {showUrlID && <div id="input_url_ID">ID: {urlID}</div>}
    </>
  );
}

export default Input_yt_url;

Input_yt_url.propTypes = {
  urlID: PropTypes.string,
  id: PropTypes.number,
  modifyArticle: PropTypes.func,
  path: PropTypes.string,
  setTitle: PropTypes.func,
};
