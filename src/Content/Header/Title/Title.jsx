import PropTypes from "prop-types";
import { useEffect, useRef } from "react";

import "./Title.css";

import { lastDeco, updateData } from "../../../firebase/firebaseHelpers";

function Title({ title, setTitle, deco, setDeco, path }) {
  const lastDecos = useRef({ vol: "", star: "" });

  useEffect(() => {
    lastDeco(lastDecos);
  }, []);

  const uncheck = (e) => {
    if (e.target.id === deco) {
      e.target.checked = false;
      setDeco(false);
      updateData(path, { deco: false });
    } else {
      setDeco(e.target.id);
      updateData(path, { deco: e.target.id });

      deco === "star"
        ? setTitle("Volejbalové Kousky Vojtíka ")
        : setTitle("Internetové hvězdičky ");
    }
  };

  const decorations = (first) => {
    if (deco === "vol") {
      return "🏐";
    } else if (deco === "star") {
      return first ? "⋆｡° ✮" : "✮ °｡⋆";
    }
  };

  const label = (input) => {
    return deco === input ? "active" : "";
  };

  const lastText = () => {
    if (deco === "vol") {
      return lastDecos.current.vol;
    } else if (deco === "star") {
      return lastDecos.current.star;
    }
  };

  return (
    <div className="title">
      <span>
        <h1>{deco && decorations(true)}</h1>
        <input
          type="text"
          id="title"
          placeholder={"Title"}
          className="articleTitle"
          onChange={(e) => {
            setTitle(e.target.value);
            updateData(path, { title: e.target.value });
          }}
          value={title}
        />
        <h1>{deco && decorations(false)}</h1>
      </span>
      <span className="decos">
        <label htmlFor="vol" className={label("vol")}>
          🏐
          <input type="radio" id="vol" name="deco" onClick={uncheck} />
        </label>
        <label htmlFor="star" className={label("star")}>
          ✮<input type="radio" id="star" name="deco" onClick={uncheck} />
        </label>
        {deco && (
          <div className="lastPublished">
            <p>
              Last Published: <span>{lastText()}</span>
            </p>
          </div>
        )}
      </span>
    </div>
  );
}

export default Title;

Title.propTypes = {
  title: PropTypes.string,
  setTitle: PropTypes.func,
  deco: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  setDeco: PropTypes.func,
  path: PropTypes.string,
};