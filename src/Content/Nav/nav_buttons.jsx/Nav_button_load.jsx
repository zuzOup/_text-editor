import PropTypes from "prop-types";
import { useState } from "react";

import { color } from "../../../helpers/helpers";

function Nav_button_load({ firstUseRef, bool }) {
  const [hover, setHover] = useState(false);
  const size = "25px";

  return (
    <button
      className={`nav-button1 nav-button_${firstUseRef.current}${bool} nav-button-animate-${hover}`}
      onMouseEnter={() => {
        setHover(true);
      }}
      onMouseLeave={() => {
        setHover(false);
      }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M6.28571 19C3.91878 19 2 17.1038 2 14.7647C2 12.4256 3.91878 10.5294 6.28571 10.5294C6.56983 10.5294 6.8475 10.5567 7.11616 10.6089M14.381 8.02721C14.9767 7.81911 15.6178 7.70588 16.2857 7.70588C16.9404 7.70588 17.5693 7.81468 18.1551 8.01498M7.11616 10.6089C6.88706 9.9978 6.7619 9.33687 6.7619 8.64706C6.7619 5.52827 9.32028 3 12.4762 3C15.4159 3 17.8371 5.19371 18.1551 8.01498M7.11616 10.6089C7.68059 10.7184 8.20528 10.9374 8.66667 11.2426M18.1551 8.01498C20.393 8.78024 22 10.8811 22 13.3529C22 16.0599 20.0726 18.3221 17.5 18.8722"
          stroke={color(hover)}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M12 22V16M12 22L14 20M12 22L10 20"
          stroke={color(hover)}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}

export default Nav_button_load;

Nav_button_load.propTypes = {
  bool: PropTypes.bool,
  firstUseRef: PropTypes.any,
};
