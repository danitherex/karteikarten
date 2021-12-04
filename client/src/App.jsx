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
          <InputGroup.Text>Rückseite Karteikarte &zwnj;  &zwnj; &zwnj;  </InputGroup.Text>
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
              width={720} height={380}
              className="d-block w-100"
              src={image}
              alt="First slide"
            />
            <Carousel.Caption>
              <h2>Warum ist die Banane krumm?</h2>
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
              <h2>Die Bananenblüte, die aus der Staude wächst, ist so schwer, dass sie sie einfach nach unten kippt</h2>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>

      </>
    );
  }
}




export default App;
