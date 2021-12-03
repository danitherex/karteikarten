import React from "react";
import {Outlet, Link} from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css";


function App() {
  const [data, setData] = React.useState(null);

  

  return (
    <div>
      <h1>Bookkeeper</h1>
      <nav
        style={{
          borderBottom: "solid 1px",
          paddingBottom: "1rem"
        }}
      >
        <Link to="/invoices">Invoices</Link> |{" "}
        <Link to="/expenses">Expenses</Link>
      </nav>
      <Outlet />
    </div>
  );
}

export default App;
