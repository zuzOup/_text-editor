import PropTypes from "prop-types";
import { useState } from "react";

import "./Preview.css";

function Preview({ preview, articleID }) {
  const [hovered, setHovered] = useState(false);

  const onClickHandle = () => {
    console.log(preview);
    console.log(articleID);
  };

  return (
    <div
      id="preview"
      onMouseEnter={() => {
        setHovered(true);
      }}
      onMouseLeave={() => {
        setHovered(false);
      }}
      onClick={onClickHandle}
    >
      <div className={hovered ? "hovered" : undefined}></div>
    </div>
  );
}

export default Preview;

Preview.propTypes = {
  preview: PropTypes.shape({ alt: PropTypes.string, url: PropTypes.string }),
  articleID: PropTypes.string,
};
