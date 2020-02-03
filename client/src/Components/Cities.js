import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Card, CardDeck, Button}  from 'react-bootstrap'

import {Header} from './Landing';

class CityShow extends Component {
  render() {    
    let {city} = this.props;
    return (     
      <Card bg="primary" style={{ width: '20rem', height: '20rem' }}>
        <Card.Img variant="top" src={city.image} style={{ width: '10rem', height: '10rem' }} />
        <Card.Body>
          <Card.Title>{city.name}</Card.Title>
          <Card.Text>{city.description}</Card.Text>
          <Button variant="primary">Get Detail</Button>
        </Card.Body>
        <Card.Footer>
          <small className="text-muted">Last updated 3 mins ago</small>
        </Card.Footer>
      </Card>
    )
  }
}

export class CitiesShowList extends Component {
  constructor(props){
    super(props);
    this.state = {
      search: '',
      Cities: this.props.cities
    };
 }

  handleChange = (event) =>{            
    this.setState ({search: event.target.value});
  }

  filterCities = () => {            
    let filteredCities = this.state.Cities.filter(city => {       
      return city.name.toLowerCase().includes (this.state.search.toLowerCase())
    }) 
    return filteredCities.map((city, index) =>           
      <CityShow city={city} key={index} />               
    );
  }; 
  
  render() {
    return (      
      <CardDeck className="Card-Deck col-xs-6 col-sm-6 col-lg-4 col-xl-3" >
        <Header />
        <label htmlFor="filter">Filter by City: </label>
        <input type="text" id='filter'
          placeholder='enter your city'
          value={this.state.search}      
          onChange={this.handleChange}/>
        {this.filterCities()};        
      </CardDeck>
    );
  }
}