import { render } from "react-dom";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Quizz from "./Quizz";
import Hallo from "./seiten/hallo";
import Hi from "./seiten/hi";

const rootElement = document.getElementById("root");
render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Quizz />}/>
      <Route path="hi" element={<Hallo />}/>
      <Route path="hallo" element={<Hi />}/>
      
    </Routes>
  </BrowserRouter>,
  rootElement
);
