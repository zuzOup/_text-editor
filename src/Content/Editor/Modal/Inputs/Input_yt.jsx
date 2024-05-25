import PropTypes from "prop-types";

import { useState } from "react";

const videoValue = [
  "https://www.youtube.com/watch?v=",
  "https://studio.youtube.com/video/",
  "https://youtu.be/",
];

const isYT = (urlID) => {
  if (urlID !== "") return "https://youtu.be/" + urlID;
  return "";
};

function Input_yt_url({ urlID, modifyArticle, id, path }) {
  const [url, setUrl] = useState(isYT(urlID));
  const [showUrlID, setShowURL] = useState(false);
  const [alert, showAlert] = useState(false);
  /*
  const onChangeHandle = (e) => {
    try{}


    // const value = e.target.value;
    // inputHandle(value, "url");

    // try {
    //   videoValue.some((x) => value.includes(x) && value.split(x)[0] === "");

    //   const id = value.split("https://www.youtube.com/watch?v=")[1].split("&")[0];
    //   inputHandle(id, "urlID");
    //   showAlert(false);
    // } catch (error) {
    //   showAlert(true);
    //   if (value === "") inputHandle("", "urlID");
    }
  };*/

  const onFocus = () => {
    setShowURL(true);
  };

  const onBlur = () => {
    setShowURL(false);
  };

  return (
    <>
      <span>
        <label htmlFor="url_input">URL: </label>
        <input
          type="text"
          id="url_input"
          name="url_input"
          placeholder="..."
          value={url}
          // onChange={onChangeHandle}
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

Input_yt_url.propTypes = { prop: PropTypes.any };
