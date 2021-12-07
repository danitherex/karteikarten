import React from 'react';
import { Outlet } from "react-router-dom";
import { Helmet } from 'react-helmet';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, InputGroup, FormControl, Carousel } from 'react-bootstrap';

import axios from 'axios';

const TITLE = 'Karteikarten';
const API = 'https://lernenmitkarteikarten.herokuapp.com/api/items';



class App extends React.Component {
  constructor(props) {
    super(props);
    var vorderseite;
    var rueckseite;
  }


  componentDidMount() {
    navigator.geolocation.getCurrentPosition(function (position) {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=15c46e32275c804eef0433e4af545129`
      axios.get(URL)
        .then(res => {
          const weatherdata = res.data;
          var date = new Date(weatherdata.sys.sunset * 1000);
          var hours = date.getHours();
          var minutes = "0" + date.getMinutes();
          var seconds = "0" + date.getSeconds();
          var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
          console.log("Weather: " + weatherdata.weather[0].description);
          console.log("Sunset at "+formattedTime);
          console.log("Temperature: " + (weatherdata.main.temp - 273.15).toFixed(2)+ "°C");
        });
    });
  }
  render() {
    function lernen() {
      window.location.replace("/lernen");
    }

    function postkarte() {
      var vorder = document.getElementById("vs");
      var rueck = document.getElementById("rs");
      var vordervalue = vorder.value;
      var rueckvalue = rueck.value;
      vorder.value = "";
      rueck.value = "";
      const inhalt = { "vorderseite": vordervalue, "ruekseite": rueckvalue }
      axios.post('/api/items', inhalt)
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    }

    return (
      <>

        <div>
          <Helmet>
            <title>{TITLE}</title>
          </Helmet>
          <InputGroup>
            <InputGroup.Text >Vorderseite Karteikarte </InputGroup.Text>
            <FormControl as="textarea" aria-label="vorderseite" id="vs" />
          </InputGroup>
          <InputGroup>
            <InputGroup.Text >Rückseite Karteikarte &zwnj;  &zwnj; &zwnj;  </InputGroup.Text>
            <FormControl as="textarea" aria-label="rueckseite" id="rs" />
          </InputGroup>
          <div className="mb-2">
            <Button variant="primary" size="lg" onClick={postkarte}>
              Nächste Karte
            </Button>
            <Button variant="secondary" size="lg" onClick={lernen}>
              Lernen
            </Button>


          </div>


          <Outlet />
        </div>

      </>
    );
  }
}









export default App;
