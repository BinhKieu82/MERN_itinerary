import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { loadUser } from './store/actions/authActions';
import Routing from "./route/route";
import AppNavbar from "./components/awt/AppNavbar";
import "./styles/materialize.css";
import "./styles/App.css";
import store from './store/store';

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());  
  }
  render() {
    return (
      <Router>
        <div id="outer-container" className="App">
          <AppNavbar />
          <Routing />
        </div>
      </Router>
    );
  }
}

export default App;

