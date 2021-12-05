import React from 'react';
import { Outlet } from "react-router-dom";
import { Helmet } from 'react-helmet';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, InputGroup, FormControl, Carousel } from 'react-bootstrap';

import axios from 'axios';

const TITLE = 'Karteikarten';
const API = 'https://lernenmitkarteikarten.herokuapp.com/api/items';



class App extends React.Component {
  state = {
    persons: []
  }

  componentDidMount() {
    axios.get(`https://jsonplaceholder.typicode.com/users`)
      .then(res => {
        const persons = res.data;
        this.setState({ persons });
      });
  }






  render() {
    function lernen() {
      window.location.replace("/lernen");
    }
    return (
      <>

        <div>
          <Helmet>
            <title>{TITLE}</title>
          </Helmet>
          <InputGroup>
            <InputGroup.Text>Vorderseite Karteikarte </InputGroup.Text>
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
            <Button variant="secondary" size="lg" onClick={lernen}>
              Lernen
            </Button>


          </div>

          <ul>
            {this.state.persons.map(person => <li>{person.name}</li>)}
          </ul>
          <Outlet />
        </div>

      </>
    );
  }
}










export default App;
