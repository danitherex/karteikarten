import 'bootstrap/dist/css/bootstrap.min.css';
import { Helmet } from 'react-helmet';
import React from 'react';
import image from "./back.jpg"
import { Button, Carousel, Nav } from 'react-bootstrap';
import axios from 'axios';

const TITLE = 'Karteikarten';
const API = 'https://lernenmitkarteikarten.herokuapp.com/api/items';

class Lernen extends React.Component {
  constructor(props) {
    super(props);
    this.karten = [];
    this.vorderseite = null;
    this.rueckseite = null;
    this.count_karten = 0;
    this.naechstekarte = this.naechstekarte.bind(this);
    this.karteloeschen = this.karteloeschen.bind(this);
  }




  componentDidMount() {
    axios.get(API)
      .then(res => {
        const karteng = res.data;
        this.karten = karteng;
        console.log(this.count_karten);
        console.log(this.karten[this.count_karten]);
        document.getElementById("voderseiteid").innerHTML = this.karten[this.count_karten].vorderseite;
        document.getElementById("rueckseiteid").innerHTML = this.karten[this.count_karten].ruekseite;
      });
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
  naechstekarte() {
    this.count_karten++;
    if (this.count_karten > this.karten.length - 1) {
      this.count_karten = 0;
    }
    document.getElementById("voderseiteid").innerHTML = this.karten[this.count_karten].vorderseite;
    document.getElementById("rueckseiteid").innerHTML = this.karten[this.count_karten].ruekseite;


  }

  karteloeschen() {
    axios.delete("/api/items/" + this.karten[this.count_karten]._id)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    this.karten.splice(this.count_karten, 1);
    this.naechstekarte();
  }
  render() {
    function home() {
      window.location.href = "https://lernenmitkarteikarten.herokuapp.com/";
    }
    return (
      <>

        <Helmet>
          <title>{TITLE}</title>
        </Helmet>
        <Nav defaultActiveKey="/home" className="flex-column">
          <Nav.Link id="sunset" disabled></Nav.Link>
          <Nav.Link id="temperature" disabled></Nav.Link>
          <Nav.Link id="weather" disabled></Nav.Link>
        </Nav>
        <Carousel interval={null} >
          <Carousel.Item >
            <img
              width={720} height={380}
              className="d-block w-100"
              src={image}
              alt="First slide"
            />
            <Carousel.Caption>
              <h2 id="voderseiteid"></h2>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item >
            <img
              width={720} height={380}
              className="d-block w-100"
              src={image}
              alt="Second slide"
            />

            <Carousel.Caption>
              <h2 id="rueckseiteid"></h2>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
        <div className="mb-2">
          <Button variant="primary" size="lg" onClick={this.naechstekarte}>
            Nächste Karte Zeigen
          </Button>
          <Button variant="secondary" size="lg" onClick={this.karteloeschen}>
            aktuelle Karte löschen
          </Button>
          <Button variant="secondary" size="lg" onClick={home}>
            Neue Karten Hinzufügen
          </Button>
        </div>
      </>
    );
  }
}




export default Lernen;
