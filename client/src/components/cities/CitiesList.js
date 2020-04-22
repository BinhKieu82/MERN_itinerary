import React, { Component } from 'react';
import { DebounceInput } from "react-debounce-input";
import PropTypes from 'prop-types';

import City from './City';



export default class CitiesList extends Component {
  constructor(props){
    super(props);
    this.state = { search: '' };    
 }

  handleChange = (event) =>{            
    this.setState ({ search: event.target.value });
  }         

  filterCities = () => { 
    let filteredCities = this.props.cities.cities.filter(city => {       
      return city.name.toLowerCase().includes (this.state.search.toLowerCase())
    }); 
    console.log('cityFilter', filteredCities);
    return filteredCities.map((city, index) =>           
      <City city={city} key={index} />               
    );
  }; 

  render() {
    return (      
      <div>
        <div className="row">
          <div className="col s8 offset-s2">
            <div className="input-field col s12">
              <label htmlFor="first_name">Search</label>
              <DebounceInput
                minLength={2}
                debounceTimeout={300}
                placeholder='enter your city'
                id="first_name"
                type="text"
                className="validate"
                value={this.state.search}
                onChange={this.handleChange}
              />              
            </div>
          </div>
        </div>        
        { this.props.cities && this.filterCities() };    
      </div>
    );
  }
}

CitiesList.propTypes = {
  filteredCities: PropTypes.func
}