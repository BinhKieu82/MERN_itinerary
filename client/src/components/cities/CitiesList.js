import React, { Component } from 'react';
import PropTypes from 'prop-types';
//import { connect } from 'react-redux';

import City from './City';
//import { readCities } from '../../store/actions/cityActions';
//import Footer from '../Footer';



export default class CitiesList extends Component {
  constructor(props){
    super(props);
    this.state = { search: '' };    
 }

  // componentDidMount() {
  //   this.props.readCities(); 
  //   console.log('cities',  this.props.cities);
  // }

  handleChange = (event) =>{            
    this.setState ({ search: event.target.value });
  }         

  filterCities = () => { 
    let filteredCities = this.props.cities.cities.filter(city => {       
      return city.name.toLowerCase().includes (this.state.search.toLowerCase())
    }); 
    console.log('Test', filteredCities);
    return filteredCities.map((city, index) =>           
      <City city={city} key={index} />               
    );
  }; 

  render() {
    return (      
      <div>
        <label htmlFor="filter">Filter by City: </label>
        <input type="text" id='first_name'
          className="validate"
          placeholder='enter your city'
          value={ this.state.search }      
          onChange={ this.handleChange }/>
        { this.props.cities && this.filterCities() };     
        {/* <Footer />    */}
      </div>
    );
  }
}

CitiesList.propTypes = {
  filteredCities: PropTypes.func
}

// const mapStateToProps = (state) => {
//   console.log(state.cities.cities);
//   return {
//     //get states from store
//     cities: state.cities
//   };
// };

// const mapDispatchToProps = dispatch => {
//   return ({
//     readCities: () => dispatch(readCities())
//   });
// };

// export default connect(mapStateToProps, mapDispatchToProps)(CitiesList);