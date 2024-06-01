import PropTypes from "prop-types";
import { useEffect, useState } from "react";

import {
  firebase_getUnfinished,
  firebase_load_unfinished,
  firebase_load_published,
} from "../../../../firebase/firebaseHelpers";
import { normDate } from "../../../../helpers/helpers";

function Nav_modal_load({ setModal, setArticleData, articleID }) {
  const [finished, setFinieshed] = useState(true);
  const [data, setData] = useState({ unfinished: [], published: [] });

  useEffect(() => {
    firebase_getUnfinished(setData);
  }, []);

  const unfinished = () => {
    setFinieshed(true);
  };
  const published = () => {
    setFinieshed(false);
  };

  const button_unfinished = (e) => {
    firebase_load_unfinished(e.target.dataset.id, setArticleData, articleID);
    setModal(false);
  };

  const button_published = (e) => {
    firebase_load_published(e.target.dataset.id, setArticleData, articleID);
    setModal(false);
  };

  return (
    <div className="modal_load modal_inner">
      <h4>Načíst článek z databáze</h4>
      <div className="load_inner">
        <div>
          <button className={`load_finished-${finished}`} onClick={unfinished}>
            unfinished {`${finished}`}
          </button>
          <button className={`load_finished-${!finished}`} onClick={published}>
            finished {`${!finished}`}
          </button>
        </div>
        <div>
          {finished === true &&
            data.unfinished.map((x) => {
              return (
                <button
                  key={x[2]}
                  data-id={x[2]}
                  onClick={button_unfinished}
                >{`${normDate(x[0])} ⭒ ${x[1]}`}</button>
              );
            })}
          {finished === false &&
            data.published.map((x) => {
              return (
                <button key={x[2]} data-id={x[2]} onClick={button_published}>{`${normDate(
                  x[0]
                )} ⭒ ${x[1]}`}</button>
              );
            })}
        </div>
      </div>
      <button onClick={() => setModal(false)}>X</button>
    </div>
  );
}

export default Nav_modal_load;

Nav_modal_load.propTypes = {
  setModal: PropTypes.func,
  setArticleData: PropTypes.func,
  articleID: PropTypes.object,
};
