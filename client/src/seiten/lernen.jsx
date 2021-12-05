import 'bootstrap/dist/css/bootstrap.min.css';
import { Helmet } from 'react-helmet';
import React from 'react';
import image from "./back.jpg"
import { Button, Carousel } from 'react-bootstrap';
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
        this.count_karten++;
        if (this.count_karten > this.karten.length - 1) {
          this.count_karten = 0;
        }
      });
  }
  naechstekarte() {
    document.getElementById("voderseiteid").innerHTML = this.karten[this.count_karten].vorderseite;
    document.getElementById("rueckseiteid").innerHTML = this.karten[this.count_karten].ruekseite;
    this.count_karten++;
    if (this.count_karten > this.karten.length - 1) {
      this.count_karten = 0;
    }

  }

  karteloeschen() {
    axios.delete("/api/items/" + this.karten._id)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    this.naechstekarte()
  }
  render() {

    return (
      <>

        <Helmet>
          <title>{TITLE}</title>
        </Helmet>
        <Carousel interval={null} activeIndex="1">
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
          <Button variant="primary" size="lg" onClick={this.karteloeschen}>
            aktuelle Karte löschen
          </Button>
          <Button variant="primary" size="lg" onClick={window.location.href("https://lernenmitkarteikarten.herokuapp.com")}>
            Neue Karten Hinzufügen
          </Button>
        </div>
      </>
    );
  }
}




export default Lernen;
