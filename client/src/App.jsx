import { Outlet, Link } from "react-router-dom";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";


function App() {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  return (
    <div>
      <h1>Bookkeeper</h1>
      <nav
        style={{
          borderBottom: "solid 1px",
          paddingBottom: "1rem"
        }}
      >
        <Link to="/hi">hi</Link> |{" "}
        <Link to="/hallo">hallo</Link>
      </nav>
      <Outlet />
    </div>
  );
}

export default App;
