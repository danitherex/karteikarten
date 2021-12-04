import { Outlet, Link } from "react-router-dom";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Helmet } from 'react-helmet';

const TITLE = 'Karteikarten';
const API = 'https://lernenmitkarteikarten.herokuapp.com/api/items';

class Quizz extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }

  componentDidMount() {
    fetch(API)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result.items
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  render() {
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <>
          <Helmet>
            <title>{TITLE}</title>
          </Helmet>
          <div>
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
              <Link class="navbar-brand" to="/">Quiz</Link>
              <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">
                  <li class="nav-item">
                    <Link class="nav-link" to="/hi">hi</Link>
                  </li>
                  <li class="nav-item">
                    <Link class="nav-link" to="/hallo">hallo</Link>
                  </li>
                </ul>
              </div>
            </nav>
            <form>
              <div class="form-group">
                <label for="exampleInputEmail1">Email </label>
                <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
              </div>
              <div class="form-group">
                <label for="exampleInputPassword1">Password</label>
                <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" />
              </div>
              <div class="form-check">
                <input type="checkbox" class="form-check-input" id="exampleCheck1" />
                <label class="form-check-label" for="exampleCheck1">Check me out</label>
              </div>
              <button type="submit" class="btn btn-primary">Login</button>
            </form>
            <ul>
              {hits.map(hit =>
                <li key={hit.objectID}>
                  <a href={hit.url}>{hit.title}</a>
                </li>
              )}
            </ul>

            <Outlet />
          </div>
        </>
      );
    }
  }
}


export default Quizz;
