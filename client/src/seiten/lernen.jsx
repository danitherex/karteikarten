import 'bootstrap/dist/css/bootstrap.min.css';
import { Helmet } from 'react-helmet';
import React from 'react';
import image from "./back.jpg"
import { Button, Carousel } from 'react-bootstrap';
import axios from 'axios';

const TITLE = 'Karteikarten';
const API = 'https://lernenmitkarteikarten.herokuapp.com/api/items';
var karten=[];

class Lernen extends React.Component {
  constructor(props) {
    super(props);
    this.vorderseite = null;
    this.rueckseite = null;
    this.count_karten = 0;
  }


  componentDidMount() {
    axios.get(API)
      .then(res => {
        const karteng = res.data;
        karten = karteng;
        console.log(this.count_karten);
        console.log(karten[this.count_karten]);
        this.count_karten++;
        if (this.count_karten > karten.length - 1) {
          this.count_karten = 0;
        }
      });
  }
  render() {
    function naechstekarte() {
      document.getElementById("voderseiteid").innerHTML = karten[this.count_karten].vorderseite;
      document.getElementById("rueckseiteid").innerHTML = karten[this.count_karten].ruekseite;
      this.count_karten++;
      if (this.count_karten > karten.length - 1) {
        this.count_karten = 0;
      }

    }

    return (
      <>

        <Helmet>
          <title>{TITLE}</title>
        </Helmet>
        <Carousel interval={null}>
          <Carousel.Item >
            <img
              width={720} height={380}
              className="d-block w-100"
              src={image}
              alt="First slide"
            />
            <Carousel.Caption>
              <h2 id="voderseiteid"></h2>
              <h2 id="voderseiteid">{karten[this.count_karten].vorderseite}</h2>
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
              <h2 id="rueckseiteid">{karten[this.count_karten].ruekseite}</h2>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
        <div className="mb-2">
          <Button variant="primary" size="lg" onClick={naechstekarte}>
            Nächste Karte Zeigen
          </Button>
        </div>
      </>
    );
  }
}




export default Lernen;
