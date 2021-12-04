import { Outlet, Link } from "react-router-dom";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Helmet } from 'react-helmet';
import axios from 'axios';

const TITLE = 'Karteikarten';
const API = 'https://lernenmitkarteikarten.herokuapp.com/api/items';

class Quizz extends React.PureComponent {
  state = {
    karten: []
  }

  componentDidMount() {
    axios.get(API)
      .then(res => {
        const karten = res.data;
        this.setState({ karten });
      })
  }
 
  render() {
    return (
      <>
        <Helmet>
          <title>{TITLE}</title>
        </Helmet>
        <div>

          <ul>
            {this.state.karten.map(k => <li>{k.name}</li>)}
          </ul>
          <Outlet />
        </div>
      </>
    );
  }
}



export default Quizz;
