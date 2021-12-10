import React from 'react';
import { Outlet } from "react-router-dom";
import { Helmet } from 'react-helmet';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, InputGroup, FormControl, Nav } from 'react-bootstrap';

import axios from 'axios';

const TITLE = 'Karteikarten';
const API = 'https://lernenmitkarteikarten.herokuapp.com/api/items';



class App extends React.Component {
  constructor(props) {
    super(props);
    this.postkarte = this.postkarte.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.translate = this.translate.bind(this);
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(function (position) {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      const URL = `https://lernenmitkarteikarten.herokuapp.com/wetter?lat=${lat}&lon=${lon}`;
      axios.get(URL)
        .then(res => {
          const weatherdata = res.data;
          var date = new Date(weatherdata.sys.sunset * 1000);
          var hours = date.getHours();
          var minutes = "0" + date.getMinutes();
          var seconds = "0" + date.getSeconds();
          var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
          document.getElementById("sunset").innerHTML = "Sonnenuntergang um " + formattedTime;
          document.getElementById("temperature").innerHTML = "Temperatur: " + (weatherdata.main.temp - 273.15).toFixed(2) + "°C";
          //document.getElementById("weather").innerHTML = "Weather: " + weatherdata.weather[0].description;
          axios.get(`https://lernenmitkarteikarten.herokuapp.com/translate/${weatherdata.weather[0].description}`)
            .then(rest => {
              document.getElementById("weather").innerHTML = "Wetter: " + rest.data;
              console.log("Wetter: " + rest.data);
            });
          //console.log("Weather: " + weatherdata.weather[0].description);
          console.log("Sonnenuntergang um " + formattedTime);
          console.log("Temperatur: " + (weatherdata.main.temp - 273.15).toFixed(2) + "°C");
        })
      setInterval(() => axios.get(URL)
        .then(res => {
          const weatherdata = res.data;
          var date = new Date(weatherdata.sys.sunset * 1000);
          var hours = date.getHours();
          var minutes = "0" + date.getMinutes();
          var seconds = "0" + date.getSeconds();
          var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
          document.getElementById("sunset").innerHTML = "Sonnenuntergang um " + formattedTime;
          document.getElementById("temperature").innerHTML = "Temperatur: " + (weatherdata.main.temp - 273.15).toFixed(2) + "°C";
          //document.getElementById("weather").innerHTML = "Weather: " + weatherdata.weather[0].description;
          //console.log("Weather: " + weatherdata.weather[0].description);
          axios.get(`https://lernenmitkarteikarten.herokuapp.com/translate/${weatherdata.weather[0].description}`)
            .then(rest => {
              document.getElementById("weather").innerHTML = "Wetter: " + rest.data;
              console.log("Wetter: " + rest.data);
            });
          console.log("Sonnenuntergang um " + formattedTime);
          console.log("Temperatur: " + (weatherdata.main.temp - 273.15).toFixed(2) + "°C");
        }), 10000);
    });
  }
  postkarte() {
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
  translate() {
    var inpt = document.getElementById("translate");
    var outp = document.getElementById("outp");
    var inptvalue = inpt.value;
    if (!(inptvalue.includes("<!doctype html><html lang"))) {
      axios.get(`https://lernenmitkarteikarten.herokuapp.com/translate/${inptvalue}`)
        .then(rest => {
          outp.innerHTML = rest.data;
          console.log("Übersetzung: " + rest.data);
        });
    }
  }
  render() {
    function lernen() {
      window.location.replace("/lernen");
    }



    return (
      <>

        <div>
          <Helmet>
            <title>{TITLE}</title>
          </Helmet>
          <Nav defaultActiveKey="/home" className="flex-column">
            <Nav.Link id="sunset" disabled></Nav.Link>
            <Nav.Link id="temperature" disabled></Nav.Link>
            <Nav.Link id="weather" disabled></Nav.Link>
          </Nav>
          <InputGroup>
            <InputGroup.Text >Vorderseite Karteikarte </InputGroup.Text>
            <FormControl as="textarea" aria-label="vorderseite" id="vs" />
          </InputGroup>
          <InputGroup>
            <InputGroup.Text >Rückseite Karteikarte &zwnj;  &zwnj; &zwnj;  </InputGroup.Text>
            <FormControl as="textarea" aria-label="rueckseite" id="rs" />
          </InputGroup>
          <div className="mb-2">
            <Button variant="primary" size="lg" onClick={this.postkarte}>
              Nächste Karte
            </Button>
            <Button variant="secondary" size="lg" onClick={lernen}>
              Lernen
            </Button>
          </div>
          <InputGroup>
            <InputGroup.Text >Übersetzen ins Deutsche </InputGroup.Text>
            <FormControl as="textarea" aria-label="translating" id="translate" onKeyUp={this.translate} />
          </InputGroup>
          <InputGroup>
            <FormControl as="textarea" aria-label="outp" id="outp" readonly="readonly" />
          </InputGroup>
          {/* <div className="mb-2">
            <Button variant="secondary" size="lg" onClick={this.translate}>
              Übersetzten
            </Button>
          </div> */}
          <Outlet />
        </div>

      </>
    );
  }
}









export default App;
