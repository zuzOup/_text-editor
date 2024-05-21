import PropTypes from "prop-types";

import "./Weather.css";

import { weatherData, findMatch } from "../../helpers/helpers-weather";
import { updateData } from "../../firebase/firebaseHelpers";
import { useState } from "react";

function Weather({ weather, setWeather, path }) {
  const [whisper, setWhisper] = useState([]);
  const [focus, setFocus] = useState(false);

  const weatherConditions = () => {
    const doc = document.getElementById("weather").value;

    return (
      !weatherData.find((x) => x.place === doc) &&
      (document.activeElement === document.getElementById("weather") ||
        document.activeElement.classList.contains("whisper-button"))
    );
  };

  const blurHandle = (e) => {
    if (
      e.relatedTarget === null ||
      !(
        (e.relatedTarget.classList &&
          e.relatedTarget.classList.contains("whisper-button")) ||
        e.relatedTarget.id === "whisper"
      )
    )
      setFocus(false);
  };

  const weatherChange = (e) => {
    const data = weatherData.find((x) => x.place === e.target.value);
    let latitude = "---";
    let longitude = "---";

    if (data) {
      latitude = data.latitude;
      longitude = data.longitude;
    }

    setWhisper(findMatch(e.target.value));

    setWeather({ place: e.target.value, latitude: latitude, longitude: longitude });
    updateData(path, { place: e.target.value, latitude: latitude, longitude: longitude });

    setFocus(weatherConditions());
  };

  const buttonHandle = (e) => {
    document.getElementById("weather").value = e.target.id;

    const data = weatherData.find((x) => x.place === e.target.id);
    setWeather({
      place: e.target.id,
      latitude: data.latitude,
      longitude: data.longitude,
    });
    updateData(path, {
      place: e.target.id,
      latitude: data.latitude,
      longitude: data.longitude,
    });

    setWhisper([]);
    setFocus(false);
  };

  return (
    <>
      <div className="weather">
        <input
          id="weather"
          name="weather"
          placeholder="add place"
          value={weather.place}
          onChange={weatherChange}
          onFocus={() => {
            setFocus(weatherConditions());
          }}
          onBlur={blurHandle}
        ></input>

        <p>Latitude:</p>
        <p>{weather.latitude}</p>
        <p>Longitude:</p>
        <p>{weather.longitude}</p>
      </div>
      {focus && (
        <div className="whisper-container">
          <div className="whisper">
            {whisper.length > 0 &&
              whisper.map((place) => (
                <button
                  key={place}
                  onClick={buttonHandle}
                  id={place}
                  className="whisper-button"
                  onBlur={blurHandle}
                >
                  {place}
                </button>
              ))}
            {whisper.length === 0 && <p>{`---`}</p>}
          </div>
        </div>
      )}
    </>
  );
}

export default Weather;

Weather.propTypes = {
  weather: PropTypes.object,
  setWeather: PropTypes.func,
  path: PropTypes.string,
};
