
import React from 'react';
import { Helmet } from 'react-helmet';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form } from 'react-bootstrap';

import axios from 'axios';

const TITLE = 'Karteikarten';
const API = 'https://lernenmitkarteikarten.herokuapp.com/api/items';


const getFetch = () => {
  axios.get(API).then((response) => {
    const data = response.data
    console.l
  }).catch(error => console.error(`Error: ${error}`));
}
class App extends React.Component {

  render() {

    return (
      <>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Vorderseite</Form.Label>
            <Form.Control type="vorderseite" placeholder="Vorderseite" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Rückseite</Form.Label>
            <Form.Control type="rueckseite" placeholder="Rückseite Karteikarte" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Nächste Karte
          </Button>
          <Button variant="primary" type="submit">
            Lernen
          </Button>
        </Form>

      </>
    );
  }
}




export default App;
