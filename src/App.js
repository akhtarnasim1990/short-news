import React, { Component } from "react";
import "./App.css";

import Home from "./Layouts/Pages/Home/Home";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <ToastContainer position="top-center" autoClose={2000} />
        <Home />
      </div>
    );
  }
}

export default App;
