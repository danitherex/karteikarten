import { render } from "react-dom";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import App from "./App";
import Hallo from "./seiten/hallo";
import Hi from "./seiten/hi";


const rootElement = document.getElementById("root");
render(
  <App/>,
  rootElement
);
