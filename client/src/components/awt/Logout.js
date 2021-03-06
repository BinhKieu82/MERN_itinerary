import React, { Component, Fragment } from 'react';
import { NavLink } from 'reactstrap';
import { connect } from 'react-redux';
import { logout } from '../../store/actions/authActions';
import PropTypes from 'prop-types';


export class Logout extends Component {
  static propTypes = {
    logout: PropTypes.func.isRequired
  };

  render() {    
    return (
      <Fragment>        
        <NavLink href='/favorites'>Favorites</NavLink>
        <NavLink onClick={this.props.logout} href='/'>
          Logout
        </NavLink>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logout }
)(Logout);