import React, { Component, Fragment } from "react";
import { NavLink } from "react-router-dom";
import {
  Navbar,
  Collapse,
  NavbarToggler,
  Nav,
  NavItem,
  Container
} from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
//import { loadUser } from '../../store/actions/authActions';
import RegisterModal from './RegisterModal';
import LoginModal from './LoginModal';
import Logout from './Logout';

const divStyle = {
  paddingright: "30px",
  display: "flex",
  justifyContent: "center",
  alignitems: "center"
};

const iStyle = {  
  padding: "0px 5px 0px 0px",
  fontSize: "3rem"
};


class AppNavbar extends Component {
  state = {
    isOpen: false
  };

  static propTypes = {
    auth: PropTypes.object.isRequired
  };

  // componentDidMount() {
  //   this.props.loadUser();  
  // }

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  render() {
    const { isAuthenticated, user } = this.props.auth; //got from authReducer initial state

    const authLinks = (
      <Fragment>        
        <NavItem>
          <Logout />
        </NavItem>
      </Fragment>
    );

    const guestLinks = (
      <Fragment>
        <NavItem>
          <RegisterModal />
        </NavItem>
        <NavItem>
          <LoginModal />
        </NavItem> 
    </Fragment>
    );   

    return (
      <div>
        <Navbar color='dark' dark expand='sm' className='mb-5'>
          <Container>
            <div style={divStyle}>
              <i style={iStyle} className="material-icons">
                account_circle
              </i>
              <NavLink to="/favorites">
                <span className='navbar-text mr-3'>
                  <strong>{user ? `Welcome ${user.name}` : ''}</strong>
                </span>
              </NavLink>
            </div>           
            {console.log('isAuthenticated:', isAuthenticated)}
            <NavbarToggler onClick={this.toggle} />
            <Collapse className='outerWrapper' isOpen={this.state.isOpen} navbar >
              <Nav className='ml-auto navbar innerWrapper'>
                {isAuthenticated ? authLinks : guestLinks}
              </Nav>
            </Collapse>
          </Container>
        </Navbar>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, null)(AppNavbar);