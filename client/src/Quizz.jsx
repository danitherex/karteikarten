import { Outlet, Link } from "react-router-dom";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Helmet } from 'react-helmet';
import axios from 'axios';

const TITLE = 'Karteikarten';
const API = 'https://lernenmitkarteikarten.herokuapp.com/api/items';

class Quizz extends React.PureComponent {
  state = {
    persons: []
  }
  componentDidMount() {
    axios.get(`https://lernenmitkarteikarten.herokuapp.com/api/items`)
      .then(res => {
        const persons = res.data;
        this.setState({ persons });
      })
  }
  render() {
    return (
      <>
        <Helmet>
          <title>{TITLE}</title>
        </Helmet>
        <ul>
          {this.state.persons.map(person => <li>{person.name}</li>)}
        </ul>
      </>
    );
  }
}



export default Quizz;
