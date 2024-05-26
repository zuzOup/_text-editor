import PropTypes from "prop-types";


function Article_grid_multiple({ id, modifyArticle, articleData, path }) {
  return (
    <>
      {Object.keys(Object.assign({}, articleData(id).divs)).map((div) => {
        return <div key={div}>{div}</div>;
      })}
    </>
  );
}

export default Article_grid_multiple;

Article_grid_multiple.propTypes = {
  id: PropTypes.number,
  modifyArticle: PropTypes.func,
  articleData: PropTypes.func,
  path: PropTypes.string,
};
