import { render } from "react-dom";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import App from "./App";
import Hallo from "./seiten/hallo";
import Hi from "./seiten/hallo";

const rootElement = document.getElementById("root");
render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="hallo" element={<Hi />} />
        <Route path="hi" element={<Hallo />} />
      </Route>
    </Routes>
  </BrowserRouter>,
  rootElement
);