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
    </div>
  );
}

export default App;
