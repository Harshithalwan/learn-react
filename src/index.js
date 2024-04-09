import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import Homepage from "./components/Homepage/Homepage";
import App from "./App";
import Snake from "./components/Snake/Snake"

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "/homepage",
    element: (
      <Homepage />
    ),
  },
  {
    path: "/snake",
    element: (
      <Snake />
    )
  }
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router} />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
