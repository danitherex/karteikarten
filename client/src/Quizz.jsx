import { Outlet, Link } from "react-router-dom";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Helmet } from 'react-helmet';
import axios from 'axios';

const TITLE = 'Karteikarten';
const API = 'https://lernenmitkarteikarten.herokuapp.com/api/items';

class Quizz extends React.PureComponent {
  state = {
    data: null
  }
  componentDidMount() {
    axios.get('/api/items').then(res => this.setState({ data: res }));
  }
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
          
        </div>
      </>
    );
  }
}



export default Quizz;
