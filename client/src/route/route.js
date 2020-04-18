import React, { Component } from "react";
import Home from "../components/Home";
import Cities from "../components/cities/Cities";
import Itineraries from "../components/itineraries/itineraries";
import Favorites from "../components/itineraries/Favorites.js";
import { Route, Switch } from "react-router-dom";

class Routing extends Component {
  render() {
    return (
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/cities" component={Cities} exact />
        <Route path="/cities/:id/itineraries" component={Itineraries} />
        <Route path="/favorites" component={Favorites} />
      </Switch>
    );
  }
}

export default Routing;
