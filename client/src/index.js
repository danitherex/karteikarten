import { render } from "react-dom";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import App from "./App";
import Lernen from "./seiten/lernen";


const rootElement = document.getElementById("root");
render(
  <BrowserRouter>
  <Routes>
    <Route path="/" element={<App />}>
      <Route path ="lernen" element={<Lernen />}/>

    </Route>
  </Routes>
  </BrowserRouter>,

  rootElement
);
