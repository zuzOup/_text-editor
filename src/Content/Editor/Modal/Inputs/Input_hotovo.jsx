import PropTypes from "prop-types";

function Input_hotovo({ toggleModal }) {
  return (
    <button onClick={toggleModal} className="done">
      Hotovo
    </button>
  );
}

export default Input_hotovo;

Input_hotovo.propTypes = { toggleModal: PropTypes.func };
