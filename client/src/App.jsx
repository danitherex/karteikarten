import React from 'react';
import { Outlet } from "react-router-dom";
import { Helmet } from 'react-helmet';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, InputGroup, FormControl, Carousel } from 'react-bootstrap';

import axios from 'axios';

const TITLE = 'Karteikarten';
const API = 'https://lernenmitkarteikarten.herokuapp.com/api/items';



class App extends React.Component {
  constructor(props) {
    super(props);
    var vorderseite;
    var rueckseite;
    this.state = {

    };
  }


  componentDidMount() {
    navigator.geolocation.getCurrentPosition(function (position) {
      console.log("Latitude is :", position.coords.latitude);
      console.log("Longitude is :", position.coords.longitude);
    });
  }
  render() {
    function lernen() {
      window.location.replace("/lernen");
    }

    function postkarte() {
      var vorder = document.getElementById("vs");
      var rueck = document.getElementById("rs");
      var vordervalue = vorder.value;
      var rueckvalue = rueck.value;
      vorder.value = "";
      rueck.value = "";
      const inhalt = { "vorderseite": vordervalue, "ruekseite": rueckvalue }
      axios.post('/api/items', inhalt)
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    }

    return (
      <>

        <div>
          <Helmet>
            <title>{TITLE}</title>
          </Helmet>
          <InputGroup>
            <InputGroup.Text >Vorderseite Karteikarte </InputGroup.Text>
            <FormControl as="textarea" aria-label="vorderseite" id="vs" />
          </InputGroup>
          <InputGroup>
            <InputGroup.Text >Rückseite Karteikarte &zwnj;  &zwnj; &zwnj;  </InputGroup.Text>
            <FormControl as="textarea" aria-label="rueckseite" id="rs" />
          </InputGroup>
          <div className="mb-2">
            <Button variant="primary" size="lg" onClick={postkarte}>
              Nächste Karte
            </Button>
            <Button variant="secondary" size="lg" onClick={lernen}>
              Lernen
            </Button>


          </div>


          <Outlet />
        </div>

      </>
    );
  }
}









export default App;
