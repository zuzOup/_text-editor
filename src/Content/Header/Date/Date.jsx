import PropTypes from "prop-types";

import "./Date.css";

import { firebase_updateData } from "../../../firebase/firebaseHelpers";

function Date({ date, setDate, path }) {
  const dateChange = (e) => {
    setDate(e.target.value);
    firebase_updateData(path, { date: e.target.value });
  };

  return <input type="date" id="date" name="date" onChange={dateChange} value={date} />;
}

export default Date;

Date.propTypes = {
  date: PropTypes.string,
  setDate: PropTypes.func,
  path: PropTypes.string,
};
