import logo from "./logo.svg";
import Splash from "./pages/Splash.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import apiClient from "./apiClient";
import { createSignal } from "solid-js";
//import styles from './App.module.css';

function App() {
  const [greet, setGreet] = createSignal(null);

  apiClient.get("/greet").then((response) => {
    setGreet(response.data);
  });

  apiClient.post("/hello");

  return <h1>{greet()}</h1>;
}

export default App;
