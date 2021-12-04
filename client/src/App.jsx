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
class App extends React.Component {

  render() {

  return (
    <>
      <Helmet>
        <title>{TITLE}</title>
      </Helmet>
        <h1>Test</h1>
    </>
  );
}}




export default App;
