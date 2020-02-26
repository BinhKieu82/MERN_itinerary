import React, { Component } from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';

import CitiesList from './CitiesList';
import Footer from '../Footer';
import { readCities } from '../../store/actions/cityActions';



class Cities extends Component {
  constructor(props){
    super(props);
    this.state = { };
 }

  async componentWillMount() {
    await this.props.readCities();    
    console.log('cities',  this.props.cities);
  }

  
  render() {
    localStorage.setItem("url", this.props.match.url);
    console.log(this.props.cities);   
    
    return (
      <div>
        <CitiesList cities={this.props.cities} /> 
        <Footer />  
      </div>
    )
  }
}

const mapStateToProps = state => {
  console.log(state.cities);
  return {
    //get states from store
    cities: state.cities
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    readCities: () => dispatch(readCities())
  }
};


export default connect(mapStateToProps, mapDispatchToProps)(Cities);



