import React from "react";
import "./App.css";

function App() {
  // Step 1: Get user coordinates
  function getCoordintes() {
    var options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };

    function success(pos) {
      var crd = pos.coords;
      var lat = crd.latitude.toString();
      var lng = crd.longitude.toString();
      var coordinates = [lat, lng];
      console.log(`Latitude: ${lat}, Longitude: ${lng}`);
      return;
    }

    function error(err) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }

    navigator.geolocation.getCurrentPosition(success, error, options);
  }

  getCoordintes();

  return (
    <div className="app">
      <h2>Lagos</h2>
      {/* <p>{coords.latitude}</p>
<p>{coords.longitude}</p> */}
      <p>Time right now: 12:30pm</p>
      <h1>30°C</h1>
      {/* {<p>Humidity:{data.main.humidity}</p>} */}
      <p>Wind speed: 12MPH</p>
      <h3>It will rain! Use an umbrella!!</h3>
    </div>
  );
}

export default App;
