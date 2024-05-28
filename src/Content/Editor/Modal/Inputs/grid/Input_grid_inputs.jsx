import PropTypes from "prop-types";

import Input_grid_line_img from "./Input_grid_line_url";
import Input_grid_line_alt from "./Input_grid_line_alt";

import { colors } from "../../../../../helpers/helpers-articles";

const getquares = (obj) => {
  const flipped = Object.keys(obj).reduce((acc, cur) => {
    acc[obj[cur]]
      ? (acc[obj[cur]] = [...acc[obj[cur]], parseInt(cur)])
      : (acc[obj[cur]] = [parseInt(cur)]);
    return acc;
  }, {});

  return Object.keys(flipped);
};

const hexToRgb = (hex, opacity) => {
  return (
    hex
      .replace(
        /^#?([a-f\d])([a-f\d])([a-f\d])$/i,
        (m, r, g, b) => "#" + r + r + g + g + b + b
      )
      .substring(1)
      .match(/.{2}/g)
      .map((x) => parseInt(x, 16)) +
    ", " +
    opacity
  );
};

function Input_grid_inputs({ articleData, id, squares, modifyArticle, path }) {
  return (
    <div className="items">
      {articleData(id).divs !== 0 &&
        Object.keys(articleData(id).divs)
          .sort((a, b) => a - b)
          .map((item, i) => {
            return (
              <div key={item} className="grid_inputs_line">
                <div>
                  <hr
                    className="hr1"
                    style={{
                      backgroundImage: `linear-gradient(to left,rgba(${hexToRgb(
                        colors(getquares(squares)[i]),
                        0.75
                      )}), rgba(${hexToRgb(
                        colors(getquares(squares)[i]),
                        0.75
                      )}), rgba(${hexToRgb(colors(getquares(squares)[i]), 0)}))`,
                    }}
                  ></hr>
                  <div
                    style={{ color: `${colors(getquares(squares)[i])}` }}
                    className="grid_inputs_square"
                  >
                    {getquares(squares)[i]}
                  </div>
                  <hr
                    className="hr2"
                    style={{
                      backgroundImage: `linear-gradient(to right,rgba(${hexToRgb(
                        colors(getquares(squares)[i]),
                        0.75
                      )}), rgba(${hexToRgb(
                        colors(getquares(squares)[i]),
                        0.75
                      )}), rgba(${hexToRgb(colors(getquares(squares)[i]), 0)}))`,
                    }}
                  ></hr>
                </div>
                <div>
                  <Input_grid_line_img
                    modifyArticle={modifyArticle}
                    articleData={articleData}
                    id={id}
                    path={path}
                    item={item}
                  />
                  <Input_grid_line_alt
                    modifyArticle={modifyArticle}
                    articleData={articleData}
                    id={id}
                    path={path}
                    item={item}
                  />
                </div>
              </div>
            );
          })}
    </div>
  );
}

export default Input_grid_inputs;

Input_grid_inputs.propTypes = {
  id: PropTypes.number,
  squares: PropTypes.object,
  modifyArticle: PropTypes.func,
  articleData: PropTypes.func,
  path: PropTypes.string,
  toggleModal: PropTypes.func,
};
