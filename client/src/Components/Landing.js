import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Image, Card, CardDeck, Container, Row, Col, Button}  from 'react-bootstrap'

import Arrow from '../images/CircledArrowRight.svg';
import Home from '../images/Home.svg';
import Login from '../images/Login.svg';
import Logo from '../images/MYtineraryLogo.png';
import './Landing.css';

class City extends Component {
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
      // <div>
      //   <img key={city.id} src={city.image} alt='city'></img>
      //   <h1>{city.name}</h1>
      //   <p>{city.description}</p>        
      // </div>
    )
  }
}

class CitiesList extends Component {
  render() {
    let {Cities} = this.props;
    return (
      <CardDeck className="Card-Deck col-xs-6 col-sm-6 col-lg-4 col-xl-3" >
        {Cities.length && Cities.map((city, index) => {
          return index < 4 ? <City city={city} key={index} /> : false 
          }               
        )};        
      </CardDeck>
    )
  }
}

export class Landing extends Component {
  render() {
    let {Cities} = this.props;
    return (
      <div>
        <Header />
        <LogoIcon />
        <ArrowIcon />        
        <CitiesList Cities= {Cities} />
      </div>
    )
  }
}

export class ArrowIcon extends Component {
  render() {
    return (
      <div>
        <img src={Arrow} width={160} height={160} alt="#"/>       
      </div>
    )
  }
}

export class LogoIcon extends Component {
  render() {
    return (
      <Container>
        <Row>
          <Col md={6} xs={12}>
            <Image src={Logo} rounded alt="#" />
          </Col>          
        </Row>
      </Container>      
    )
  }
}

export class Header extends Component {
  render() {
    return (
      <div>
         <img src={Login}  className="float-left mx-auto" alt="#" style={{ width: 80, height: 80 }}/>
         <img src={Home}  className="float-right mx-auto" style={{ width: 80, height: 80 }} alt="#"/>
      </div>
    )
  }
}






