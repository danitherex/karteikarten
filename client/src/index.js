import { render } from "react-dom";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import App from "./App";
import hallo from "./seiten/hallo";
import hi from "./seiten/hallo";

const rootElement = document.getElementById("root");
render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="hallo" element={<hi />} />
        <Route path="hi" element={<hallo />} />
      </Route>
    </Routes>
  </BrowserRouter>,
  rootElement
);