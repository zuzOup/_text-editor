import PropTypes from "prop-types";
import { useRef, useState } from "react";

import Nav_button from "./Nav_button";

import Nav_button_publihs from "./nav_buttons.jsx/Nav_button_publihs";
import Nav_button_load from "./nav_buttons.jsx/Nav_button_load";
import Nav_button_new from "./nav_buttons.jsx/Nav_button_new";
import Nav_button_json from "./nav_buttons.jsx/Nav_button_json";
import Nav_button_delete from "./nav_buttons.jsx/Nav_button_delete";

import "./Nav.css";
import "./Nav_modal.css";

function Nav({ articleID, date, articleData, setArticleData, setLastDecos }) {
  const [menu, setMenu] = useState(false);
  const [hoverMain, setHoverMain] = useState(false);

  const firstUseRef = useRef("before-");

  const menuHandle = () => {
    if (firstUseRef.current === "before-") firstUseRef.current = "";
    setMenu((menu) => !menu);
  };

  return (
    <>
      <div className={`nav_inner1 nav_inner1_${firstUseRef.current}${menu}`}></div>
      <div className="nav_inner2">
        <Nav_button_publihs
          bool={menu}
          firstUseRef={firstUseRef}
          articleID={articleID}
          date={date}
          articleData={articleData}
          setArticleData={setArticleData}
          setMenu={setMenu}
          setLastDecos={setLastDecos}
        />
        <Nav_button_load
          bool={menu}
          firstUseRef={firstUseRef}
          setMenu={setMenu}
          setArticleData={setArticleData}
          articleID={articleID}
        />
        <Nav_button_new
          bool={menu}
          firstUseRef={firstUseRef}
          setArticleData={setArticleData}
          articleID={articleID}
          setMenu={setMenu}
        />
        <Nav_button_json bool={menu} firstUseRef={firstUseRef} data={articleData} />
        <Nav_button_delete
          bool={menu}
          firstUseRef={firstUseRef}
          articleID={articleID}
          date={date}
          articleData={articleData}
          setArticleData={setArticleData}
          setMenu={setMenu}
        />
      </div>
      <button
        onClick={menuHandle}
        className="nav_inner3"
        onMouseEnter={() => {
          setHoverMain(true);
        }}
        onMouseLeave={() => {
          setHoverMain(false);
        }}
      >
        <Nav_button bool={menu} hover={hoverMain} />
      </button>
    </>
  );
}

export default Nav;

Nav.propTypes = {
  articleID: PropTypes.object,
  date: PropTypes.string,
  articleData: PropTypes.object,
  setArticleData: PropTypes.func,
  setLastDecos: PropTypes.func,
};
