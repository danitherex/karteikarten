import image from "./back.jpg"
import React from 'react';
import { Helmet } from 'react-helmet';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, InputGroup, FormControl, Carousel } from 'react-bootstrap';

import axios from 'axios';

const TITLE = 'Karteikarten';
const API = 'https://lernenmitkarteikarten.herokuapp.com/api/items';


const getFetch = () => {
  axios.get(API).then((response) => {
    const data = response.data;
    console.log(data);
  }).catch(error => console.error(`Error: ${error}`));
}
class App extends React.Component {

  render() {

    return (
      <>
        <InputGroup>
          <InputGroup.Text>Vorderseite Karteikarte</InputGroup.Text>
          <FormControl as="textarea" aria-label="vorderseite" />
        </InputGroup>
        <InputGroup>
          <InputGroup.Text>Rückseite Karteikarte</InputGroup.Text>
          <FormControl as="textarea" aria-label="rueckseite" />
        </InputGroup>
        <div className="mb-2">
          <Button variant="primary" size="lg">
            Nächste Karte
          </Button>{' '}
          <Button variant="secondary" size="lg">
            Lernen
          </Button>
        </div>
        <Carousel interval={null}>
          <Carousel.Item >
            <img
              className="d-block w-100"
              src={image}
              alt="First slide"
            />
            <Carousel.Caption>
              <h3>Vorderseite</h3>
              <p>Warum ist die Banane krumm?</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item >
            <img
              className="d-block w-100"
              src={image}
              alt="Second slide"
            />

            <Carousel.Caption>
              <h3>Rückseite</h3>
              <p>Die Bananenblüte, die aus der Staude wächst, ist so schwer, dass sie sie einfach nach unten kippt</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>

      </>
    );
  }
}




export default App;
