import React, { Component } from 'react';
import { NavLink } from "react-router-dom";

import Arrow from '../images/CircledArrowRight.svg';
import Logo from '../images/MYtineraryLogo.png';

export class Home extends Component {
  render() {
    //localStorage.setItem("url", this.props.match.url);
    console.log("Welcome to MyTinerary!");
    return (
      <div id="page-wrap">
        <img
          src={ Logo }
          alt="MyTineraryLogo"
          className="logo"
        />
        <h3>
          Find your perfect trip, designed by insiders who know and love their
          cities.
        </h3>
        <h2>Start Browsing</h2>
        <NavLink to="/cities">
          <img
            src={ Arrow }
            alt="arrow-right"
            className="arrow-right"
          />
        </NavLink>
      </div>
    );
  }
}

export default Home;

