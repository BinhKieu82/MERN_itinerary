import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";
// import { connect } from "react-redux";
// import { fetchUser } from "./store/actions/userActions";
import Routing from "./route/route";
//import Header from "./components/Header";
import "./styles/materialize.css";
import "./styles/App.css";

export default class App extends Component {
   render() {
    return (
      <Router>
        <div id="outer-container" className="App">
          {/* <Header /> */}
          <Routing />
        </div>
      </Router>
    );
  }
}


