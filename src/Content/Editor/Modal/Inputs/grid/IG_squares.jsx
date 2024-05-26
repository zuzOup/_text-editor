import PropTypes from "prop-types";

import { colors } from "../../../../../helpers/helpers-articles";

function IG_squares({ row, col, mouseUp, squares }) {
  let style = { backgroundColor: "white" };
  if (squares[row * 6 - 6 + col]) {
    style = { backgroundColor: `${colors(squares[row * 6 - 6 + col])}` };
  }

  return (
    <div
      id={row * 6 - 6 + col}
      data-row={row}
      data-column={col}
      className="square"
      onMouseUp={mouseUp}
      style={style}
    ></div>
  );
}

export default IG_squares;

IG_squares.propTypes = {
  row: PropTypes.number,
  col: PropTypes.number,
  mouseDown: PropTypes.func,
  mouseUp: PropTypes.func,
  squares: PropTypes.object,
};
