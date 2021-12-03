import { Outlet, Link } from "react-router-dom";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Helmet } from 'react-helmet';

const TITLE = 'Karteikarten';

class MyComponent extends React.PureComponent {

  render() {
    return (
      <>
      <Helmet>
        <title>{TITLE}</title>
      </Helmet>
      <div>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
          <a class="navbar-brand" href="/">Quiz</a>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
              <li class="nav-item">
                <a class="nav-link" href="/hi">hi</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/hallo">hallo</a>
              </li>
            </ul>
          </div>
        </nav>
        <Outlet />
      </div>
      </>
    );
  }
}
export default MyComponent;
