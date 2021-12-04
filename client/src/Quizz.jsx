import { Outlet } from 'react-router-dom';
import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import axios from 'axios';

const TITLE = 'Karteikarten';
const API = 'https://lernenmitkarteikarten.herokuapp.com/api/items';

const getFetch = () => {
  axios.get(API).then((response) => {
    const data = response.data
  }).catch(error => console.error(`Error: ${error}`));
}
function Quizz() {

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
        <Outlet />
      </div>
    </>
  );
}




export default Quizz;
