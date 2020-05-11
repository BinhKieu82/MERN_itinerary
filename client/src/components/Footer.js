import React, { Component } from "react";
import { NavLink } from "react-router-dom";

export class Footer extends Component {
  render() {
    if (this.props.back) {
      const route = `${this.props.back}`;
      return (
        <div className="footer">
          <NavLink className="home-icon" to={route}>
            <i className="material-icons">chevron_left</i>
          </NavLink>
          <NavLink className="home-icon" to="/">
            <i className="material-icons">home</i>
          </NavLink>
          <div className="home-icon hidden-icon">
            <i className="material-icons">chevron_right</i>
          </div>
        </div>
      );
    } else {
      return (
        <div className="footer">
          <NavLink className="home-icon" to="/">
            <i className="material-icons">home</i>
          </NavLink>
        </div>
      );
    }
  }
}

export default Footer;
