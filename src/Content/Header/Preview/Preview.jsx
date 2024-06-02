import PropTypes from "prop-types";

import ModalButton from "../../Editor/Modal/ModalButton";
import Modal_preview from "../../Editor/Modal/Modal_preview";

import { src } from "../../../helpers/helpers-articles";
import { text } from "../../../helpers/helpers-modifiers";

import "./Preview.css";

function Preview({ previewData, modifyPreview, path, deco }) {
  const style = {
    backgroundImage: `url('${src(previewData.url, 70)}')`,
  };

  return (
    <div id="preview">
      <div style={style}>
        <ModalButton
          Button
          text={text.img(previewData)}
          type={"preview"}
          width={"70px"}
          height={"100%"}
        >
          <Modal_preview
            modifyPreview={modifyPreview}
            url={previewData.url}
            alt={previewData.alt}
            path={path}
            deco={deco}
          />
        </ModalButton>
      </div>
    </div>
  );
}

export default Preview;

Preview.propTypes = {
  previewData: PropTypes.shape({ alt: PropTypes.string, url: PropTypes.string }),
  modifyPreview: PropTypes.shape({ alt: PropTypes.func, url: PropTypes.func }),
  path: PropTypes.string,
  deco: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
};
