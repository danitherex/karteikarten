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
  }

  state = {
    karten: []
  }
  componentDidMount() {
    axios.get(API)
      .then(res => {
        const karten = res.data;
        this.setState({ karten });
      });
  }






  render() {
    function lernen() {
      window.location.replace("/lernen");
    }
    function returnkarte() {
      this.state.karten.map(karte => {
        this.vorderseite = karte.vorderseite;
        this.rueckseite = karte.ruekseite;
        return <ul><li>this.vorderseite</li><li>this.rueckseite</li></ul>
      })
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



          {myFunction()}

          <Outlet />
        </div>

      </>
    );
  }
}









export default App;
