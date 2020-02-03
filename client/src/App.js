import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Axios from 'axios';

import {Landing} from './Components/Landing';
import {CitiesShowList} from './Components/Cities';
import './App.css';


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Cities:[]     
    };
  }
  
  componentDidMount() {
    Axios.get('/cities/all')
      .then(res => {this.setState({Cities: res.data})})
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route 
              exact path='/' 
              component= {() => <Landing Cities= {this.state.Cities} /> } 
            />
            <Route 
              path='/Cities' 
              component= {() => <CitiesShowList cities= {this.state.Cities} /> } 
            />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

