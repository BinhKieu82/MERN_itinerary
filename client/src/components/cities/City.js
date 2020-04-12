import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

export default class City extends Component {
  static propTypes = {
    city: PropTypes.shape({
      name: PropTypes.string,
      country: PropTypes.string
    })
  }

  render() {    
    const route = `cities/${this.props.city._id}/itineraries`;
    const { city } = this.props;
    return (
      <NavLink to={route}>  
        <div className="city">
          <span>{city.name}, </span>
          <small>{city.country}</small>
        </div>
     </NavLink>      
    )
  }
}
