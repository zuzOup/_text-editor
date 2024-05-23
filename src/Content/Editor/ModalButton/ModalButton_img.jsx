import PropTypes from "prop-types";

function ModalButton_img({ id, modifyArticle, articleData, path }) {
  console.log(articleData(id).img);

  return <div>ModalButton_img</div>;
}

export default ModalButton_img;

ModalButton_img.propTypes = {
  id: PropTypes.number,
  modifyArticle: PropTypes.func,
  articleData: PropTypes.func,
  path: PropTypes.string,
};
