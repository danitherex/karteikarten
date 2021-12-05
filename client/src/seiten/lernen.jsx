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
    var vorderseite;
    var rueckseite;
    var count_karten = 0;
  }
  state = {
    karten: []
  }
  componentDidMount() {
    axios.get(API)
      .then(res => {
        const karten = res.data;
        this.setState({ karten });
        this.vorderseite = karten[count_karten].vorderseite;
        this.rueckseite = karten[count_karten].ruekseite;
        count_karten++;
      });
  }
  render() {

    function naechstekarte() {
      this.vorderseite = karten[count_karten].vorderseite;
      this.rueckseite = karten[count_karten].ruekseite;
      count_karten++;
      document.getElementById("voderseiteid").innerHTML=this.vorderseite;
      document.getElementById("rueckseiteid").innerHTML=this.rueckseite;

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
              <h2 id="voderseiteid">{this.state.karten[0].vorderseite}</h2>
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
              <h2 id="rueckseiteid">{this.state.karten[0].ruekseite}</h2>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
        <div className="mb-2">
          <Button variant="primary" size="lg" onClick={"naechstekarte"}>
            Nächste Karte Zeigen
          </Button>
        </div>
      </>
    );
  }
}




export default Lernen;
