import PropTypes from "prop-types";

const preset = {
  0: {
    squares: {
      1: 1,
      2: 1,
      3: 1,
      4: 2,
      5: 2,
      6: 2,
      7: 1,
      8: 1,
      9: 1,
      10: 2,
      11: 2,
      12: 2,
    },
    rows: 2,
    counter: 2,
  },
  1: {
    squares: {
      1: 1,
      2: 1,
      3: 2,
      4: 2,
      5: 3,
      6: 3,
      7: 1,
      8: 1,
      9: 2,
      10: 2,
      11: 3,
      12: 3,
      13: 1,
      14: 1,
      15: 2,
      16: 2,
      17: 3,
      18: 3,
    },
    rows: 3,
    counter: 3,
  },
  2: {
    squares: {
      1: 1,
      2: 1,
      3: 1,
      4: 1,
      5: 2,
      6: 2,
      7: 1,
      8: 1,
      9: 1,
      10: 1,
      11: 2,
      12: 2,
      13: 1,
      14: 1,
      15: 1,
      16: 1,
      17: 2,
      18: 2,
    },
    rows: 3,
    counter: 2,
  },
  3: {
    squares: {
      1: 1,
      2: 1,
      3: 2,
      4: 2,
      5: 2,
      6: 2,
      7: 1,
      8: 1,
      9: 2,
      10: 2,
      11: 2,
      12: 2,
      13: 1,
      14: 1,
      15: 2,
      16: 2,
      17: 2,
      18: 2,
    },
    rows: 3,
    counter: 2,
  },
  4: {
    squares: {
      1: 1,
      2: 1,
      3: 1,
      4: 2,
      5: 2,
      6: 2,
      7: 1,
      8: 1,
      9: 1,
      10: 2,
      11: 2,
      12: 2,
      13: 1,
      14: 1,
      15: 1,
      16: 2,
      17: 2,
      18: 2,
      19: 1,
      20: 1,
      21: 1,
      22: 2,
      23: 2,
      24: 2,
    },
    rows: 4,
    counter: 2,
  },
  5: {
    squares: {
      2: 1,
      3: 1,
      4: 2,
      5: 2,
      8: 1,
      9: 1,
      10: 2,
      11: 2,
      14: 1,
      15: 1,
      16: 2,
      17: 2,
    },
    rows: 3,
    counter: 2,
  },
};

import {
  modifier_grid_rows,
  modifier_grid_divsRC,
} from "../../../../../helpers/helpers-modifiers";
import { firebase_modify } from "../../../../../firebase/firebaseHelpers";
import { gridValues } from "../../../../../helpers/helpers-articles";

function Input_grid_preset({ setSquares, id, modifyArticle, path, counter }) {
  const onChangeHandle = (i) => {
    firebase_modify.grid_rows(path, id, preset[i].rows);
    firebase_modify.grid_RS(path, id, gridValues(preset[i].squares));

    modifyArticle(id, modifier_grid_rows, preset[i].rows);
    modifyArticle(id, modifier_grid_divsRC, gridValues(preset[i].squares));

    counter.current = preset[i].counter;
    setSquares(preset[i].squares);
  };
  return (
    <div className="grid_preset">
      {[...Array(6).keys()].map((i) => (
        <button
          key={i}
          className={`grid_preset_button${i}`}
          onClick={() => {
            onChangeHandle(i);
          }}
        ></button>
      ))}
    </div>
  );
}

export default Input_grid_preset;

Input_grid_preset.propTypes = {
  setSquares: PropTypes.func,
  id: PropTypes.number,
  modifyArticle: PropTypes.func,
  path: PropTypes.string,
  counter: PropTypes.object,
};
