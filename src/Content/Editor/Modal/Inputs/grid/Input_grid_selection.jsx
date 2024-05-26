import PropTypes from "prop-types";
import { useState } from "react";

import ReactangleSelection from "./ReactangleSelection";
import IG_rows from "./IG_rows";

function Input_grid_selection({
  id,
  modifyArticle,
  articleData,
  path,
  squares,
  setSquares,
  counter,
}) {
  const [ids, setIds] = useState({ originID: 0, targetID: 0, checked: false });

  return (
    <div id="squares">
      <ReactangleSelection
        onSelect={(e, num) => {
          setIds({
            originID: num.originID,
            targetID: num.targetID,
            checked: true,
          });
        }}
        style={{
          backgroundColor: "rgba(0,0,255,0.4)",
          border: "hidden",
        }}
      >
        {[...Array(parseInt(articleData(id).rows)).keys()].map((x) => (
          <IG_rows
            key={x}
            row={x}
            counter={counter}
            ids={ids}
            setIds={setIds}
            setSquares={setSquares}
            squares={squares}
            modifyArticle={modifyArticle}
            path={path}
            id={id}
          />
        ))}
      </ReactangleSelection>
    </div>
  );
}

export default Input_grid_selection;

Input_grid_selection.propTypes = {
  setSquares: PropTypes.func,
  squares: PropTypes.object,
  id: PropTypes.number,
  modifyArticle: PropTypes.func,
  articleData: PropTypes.func,
  path: PropTypes.string,
  counter: PropTypes.object,
};
