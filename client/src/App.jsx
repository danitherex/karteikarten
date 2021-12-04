
import React from 'react';
import { Helmet } from 'react-helmet';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button,Form } from 'react-bootstrap';

import axios from 'axios';

const TITLE = 'Karteikarten';
const API = 'https://lernenmitkarteikarten.herokuapp.com/api/items';

const getFetch = () => {
  axios.get(API).then((response) => {
    const data = response.data
  }).catch(error => console.error(`Error: ${error}`));
}
class App extends React.Component {

  render() {

    return (
      <>
        <Helmet>
          <title>{TITLE}</title>
        </Helmet>
        <Form>
          <Form.Group className="mb-3" controlId="vorderseite">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="vorderseite" placeholder="Vorderseite Karteikarten" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="rückseite">
            <Form.Label>Password</Form.Label>
            <Form.Control type="rückseite" placeholder="Rückseite Karteikarten" />
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
