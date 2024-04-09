import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes
} from "react-router-dom";
import Homepage from "./components/Homepage/Homepage";
import "./App.css";

function App() {
  return (
    <div className="container">
      <Link to="/homepage">Homepage</Link>
      <Link to="/snake">Snake</Link>
    </div>
  );
}

export default App;
