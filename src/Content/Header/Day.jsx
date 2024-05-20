import PropTypes from "prop-types";

import { day } from "../../helpers/helpers";

function Day({ date }) {
  return (
    <div className="day">
      <p>{day(date)}</p>
    </div>
  );
}
export default Day;

Day.propTypes = {
  date: PropTypes.string,
};
