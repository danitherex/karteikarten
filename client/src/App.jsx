import React from 'react';
import {Outlet } from "react-router-dom";
import { Helmet } from 'react-helmet';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, InputGroup, FormControl, Carousel } from 'react-bootstrap';

import axios from 'axios';

const TITLE = 'Karteikarten';
const API = 'https://lernenmitkarteikarten.herokuapp.com/api/items';



class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hits: [], 
      isLoading: false,
      error: null,
    };
  }

  componentDidMount() {
    this.setState({ isLoading: true });

    fetch(API)
    .then(response => response.json())
    .then(data => this.setState({ hits: data.hits, isLoading: false }))
    .then(consoe.log(data.hits))
      .catch(error => this.setState({
        error,
        isLoading: false
      }));
  }
  render() {
    const { hits, isLoading, error } = this.state;
    if (error) {
      return <p>{error.message}</p>;
    }function lernen() {
      window.location.replace("/lernen");
    }

    if (isLoading) {
      return <p>Loading ...</p>;
    }
    if(hits!==undefined){
      return (
      <>
      
      <ul>
        {hits.map(hit =>
          <li key={hit._id}>
            {hit.inhaber}
          </li>
        )}
      </ul>
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
          <Outlet />
        </div>

      </>
    );
    }else{
      return( <p>Loading ...</p>);
     
    }
      
    }
    
  }





export default App;
