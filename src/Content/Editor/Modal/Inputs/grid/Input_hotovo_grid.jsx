import PropTypes from "prop-types";

import { state } from "../../../../../helpers/helpers-articles";

const rowValue = (value) => {
  return (value - ((value - 1) % 6) - 1) / 6 + 1;
};

import { modifier_grid_rows } from "../../../../../helpers/helpers-modifiers";
import { firebase_modify } from "../../../../../firebase/firebaseHelpers";

function Input_hotovo_grid({
  toggleModal,
  setModalButton,
  articleData,
  id,
  squares,
  modifyArticle,
  path,
}) {
  const onChangeHandle = () => {
    toggleModal();
    setModalButton(state(articleData(id).divs));

    const data =
      rowValue(Math.max(...Object.keys({ ...squares }).map((x) => parseInt(x)))) || "1";

    firebase_modify.grid_rows(path, id, `${data}`);
    modifyArticle(id, modifier_grid_rows, `${data}`);
  };

  return (
    <button onClick={onChangeHandle} className="done">
      Hotovo
    </button>
  );
}

export default Input_hotovo_grid;

Input_hotovo_grid.propTypes = {
  setModalButton: PropTypes.func,
  id: PropTypes.number,
  modifyArticle: PropTypes.func,
  articleData: PropTypes.func,
  path: PropTypes.string,
  toggleModal: PropTypes.func,
  squares: PropTypes.object,
};
