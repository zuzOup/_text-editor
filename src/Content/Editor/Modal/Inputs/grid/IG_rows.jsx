import PropTypes from "prop-types";

import IG_squares from "./IG_squares";
import IG_setSquares from "./IG_setSquares";

const sorted = (x, y) => {
  return [x, y].sort((a, b) => a - b);
};

const newId = (rs, re, cs, ce) => {
  let ids = [];
  for (let i = rs; i <= re; i++) {
    for (let j = cs; j <= ce; j++) {
      ids.push((i - 1) * 6 + j);
    }
  }
  return ids;
};

const rowValue = (value) => {
  return (value - ((value - 1) % 6) - 1) / 6 + 1;
};

const rowColValues = (value1, value2) => {
  const origin = sorted(parseInt(value1), parseInt(value2))[0];
  const target = sorted(parseInt(value1), parseInt(value2))[1];

  return {
    RS: rowValue(origin),
    RE: rowValue(target),
    CS: sorted(
      origin - (rowValue(origin) - 1) * 6,
      target - (rowValue(target) - 1) * 6
    )[0],
    CE: sorted(
      origin - (rowValue(origin) - 1) * 6,
      target - (rowValue(target) - 1) * 6
    )[1],
  };
};

import { modifier_grid_divsRC } from "../../../../../helpers/helpers-modifiers";
import { firebase_modify } from "../../../../../firebase/firebaseHelpers";
import { gridValues } from "../../../../../helpers/helpers-articles";

function IG_rows({
  row,
  counter,
  ids,
  setIds,
  squares,
  setSquares,
  id,
  modifyArticle,
  path,
}) {
  const mouseUp = (e) => {
    e.preventDefault();

    if (!e.shiftKey) counter.current++;

    let newArea;

    if (ids.checked) {
      newArea = rowColValues(ids.originID, ids.targetID);

      setIds((state) => {
        return { ...state, checked: false };
      });
    } else {
      newArea = rowColValues(parseInt(e.target.id), parseInt(e.target.id));
    }

    // const squaresBefore = { ...squares };

    const squaresNew = newId(newArea.RS, newArea.RE, newArea.CS, newArea.CE);

    // const squaresAfter = IG_setSquares(squaresBefore, squaresNew, counter.current);

    setSquares((square) => {
      const newSquares = IG_setSquares(
        { ...square },
        squaresNew,
        counter.current,
        e.shiftKey
      );

      firebase_modify.grid_RS(path, id, gridValues(newSquares));

      modifyArticle(id, modifier_grid_divsRC, gridValues(newSquares));

      return newSquares;
    });
  };

  return (
    <div className="row">
      {[...Array(6).keys()].map((x) => (
        <IG_squares
          key={x}
          row={row + 1}
          col={x + 1}
          mouseUp={mouseUp}
          squares={squares}
        />
      ))}
    </div>
  );
}

export default IG_rows;

IG_rows.propTypes = {
  row: PropTypes.number,
  counter: PropTypes.object,
  ids: PropTypes.object,
  setIds: PropTypes.func,
  squares: PropTypes.object,
  setSquares: PropTypes.func,
  id: PropTypes.number,
  modifyArticle: PropTypes.func,
  articleData: PropTypes.func,
  path: PropTypes.string,
};
