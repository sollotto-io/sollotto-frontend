import ReactDOM from "react-dom";
import { BrowserRouter as Router} from "react-router-dom"
import React from "react";
import "./index.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
/* eslint-disable @typescript-eslint/no-var-requires */
import * as dotenv from "dotenv";

dotenv.config();

ReactDOM.render(
  <Router>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </Router>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
