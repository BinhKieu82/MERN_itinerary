import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import { loadUser } from './store/actions/authActions';
import Routing from "./route/route";
import AppNavbar from "./components/awt/AppNavbar";
import "./styles/materialize.css";
import "./styles/App.css";
import store from './store/store';

class App extends Component {
  componentDidMount() {
    
  }
  render() {
    return (
      <BrowserRouter>
        <div id="outer-container" className="App">
          <AppNavbar />
          <Routing />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;

