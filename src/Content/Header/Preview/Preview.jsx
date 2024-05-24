import PropTypes from "prop-types";

import ModalButton from "../../Editor/Modal/ModalButton";
import Modal_preview from "../../Editor/Modal/Modal_preview";

import { src } from "../../../helpers/helpers-articles";
import { text } from "../../../helpers/helpers-modifiers";

import "./Preview.css";

function Preview({ previewData, modifyPreview, path }) {
  const style = {
    backgroundImage: `url('${src(previewData.url, 70)}')`,
  };

  return (
    <div id="preview">
      <div style={style}>
        <ModalButton
          text={text.img(previewData)}
          type={"preview"}
          height={52.5}
          width={"70px"}
        >
          <Modal_preview
            modifyPreview={modifyPreview}
            url={previewData.url}
            alt={previewData.alt}
            path={path}
          />
        </ModalButton>
      </div>
    </div>
  );
}

export default Preview;

Preview.propTypes = {
  previewData: PropTypes.shape({ alt: PropTypes.string, url: PropTypes.string }),
  modifyPreview: PropTypes.func,
  path: PropTypes.string,
};
