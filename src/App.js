import "./App.css";
import { useGeolocated } from "react-geolocated";
import { useState, useEffect, useLayoutEffect } from "react";
import axios from "axios";

function App() {
  const [location, setLocation] = useState();
  const [weatherDetails, setWeatherDetails] = useState();

  //Geolocation for long and lat
  const { coords, isGeolocationAvailable, isGeolocationEnabled } =
    useGeolocated({
      positionOptions: {
        enableHighAccuracy: false,
      },
      userDecisionTimeout: 5000,
    });
  useEffect(() => {
    setLocation(coords);
  }, [coords]);

  //Axios for weather data
  const url =
    "https://api.openweathermap.org/data/2.5/weather?lat=" +
    coords?.latitude +
    "&lon=" +
    coords?.longitude +
    "&appid=767d2e2632f689823f360e3db45f90de";
  useLayoutEffect(() => {
    if (coords) {
      axios.get(url).then((response) => {
        setWeatherDetails(response.data);
      });
    }
  }, [coords]);

  //Convert current time to 12 hour clock
  const current = new Date();
  const time = current.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return !isGeolocationAvailable ? (
    <div>
      Your browser does not support Geolocation. Please try a different browser.
    </div>
  ) : !isGeolocationEnabled ? (
    <div>
      Geolocation is not enabled. Please enable geolocation to access weather
      info.
    </div>
  ) : coords ? (
    <div className="app">
      <h2>Lagos</h2>
      <p>
        {weatherDetails?.coord.lat.toFixed(2)}°N,{" "}
        {weatherDetails?.coord.lon.toFixed(2)}°E
      </p>
      <p>{time}</p>
      <h1>{Math.round(weatherDetails?.main.temp - 273.15)}°C</h1>
      <p>Humidity: {weatherDetails?.main.humidity}%</p>
      <p>Wind speed: 12MPH</p>
      <h3>It will rain! Use an umbrella!!</h3>
    </div>
  ) : (
    <div>Getting the location data&hellip; </div>
  );
}

export default App;
