import { render } from "react-dom";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import MyComponent from "./App";
import Hallo from "./seiten/hallo";
import Hi from "./seiten/hi";

const rootElement = document.getElementById("root");
render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<MyComponent />}>
        <Route path="hallo" element={<Hallo />} />
        <Route path="hi" element={<Hi />} />
      </Route>
    </Routes>
  </BrowserRouter>,
  rootElement
);