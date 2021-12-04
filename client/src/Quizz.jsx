import { Outlet } from 'react-router-dom';
import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import axios from 'axios';

const TITLE = 'Karteikarten';
const API = 'https://lernenmitkarteikarten.herokuapp.com/api/items';

getFetch = () => {
  axios.get(API).then((respond) =>
  {
    const data = response.data
  }).catch(error => console.error(`Error: ${error}`));
}
class Quizz extends React.PureComponent {
  /*state = {
    data: null
  }*/
  
  
  render() {
    return (
      <>
        <Helmet>
          <title>{TITLE}</title>
        </Helmet>
        <div>
          <Form.Control type="text" placeholder="Vorderseite Karteikarte" />
          <br />
          <Form.Control type="text" placeholder="Rückseite Karteikarte" />
          <br />
          <Button variant="secondary" size="lg">
            Karteikarte hinzufügen
          </Button>
          <br />
          <Button variant="secondary" size="lg">
            Lernen
          </Button>
          <Outlet/>
        </div>
      </>
    );
  }
}



export default Quizz;
