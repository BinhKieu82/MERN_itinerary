import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  NavLink,
  Alert
} from 'reactstrap';
import { connect } from 'react-redux';
import { login } from '../../store/actions/authActions';
import { clearErrors } from '../../store/actions/errorActions';
import PropTypes from 'prop-types';


class LoginModal extends Component {
  state = {
    modal: false,
    email: '',
    password: '',
    msg: null
  };

  static propTypes = {
    auth: PropTypes.bool,
    error: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired
  }

  componentDidUpdate(prevProps) {
    const { error } = this.props;
    const { isAuthenticated } = this.props.auth;
    if (error !== prevProps.error) {
      // Check for register error
      if (error.id === 'LOGIN_FAIL') {
        this.setState({ msg: error.msg.msg });
      } else {
        this.setState({ msg: null });
      }
    }

    if (this.state.modal) { //if authenticated, close modal
      if (isAuthenticated) {
        this.toggle();
      }
    }
    //console.log('login auth Update:', this.props.auth);
  }

  toggle = () => {    
    this.props.clearErrors(); // Clear errors
    this.setState({
      modal: !this.state.modal
    });
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value }) //assign value from user's input to state
  }

  onSubmit = e => {
    e.preventDefault();    

    const { email, password } = this.state;

    const user = {
      email,
      password
    };

    // Attempt to login
    this.props.login(user);
  }

  render() {
    return (
      <div>
        <NavLink onClick={this.toggle} to='#'>
          Login
        </NavLink>

        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Login</ModalHeader>
          <ModalBody>
            {this.state.msg ? (
              <Alert color='danger'>{this.state.msg}</Alert>
            ) : null}
            <Form onSubmit={this.onSubmit}>
              <FormGroup>                
                <Label for='email'>Email</Label>
                <Input
                  type='email'
                  name='email'
                  id='email'
                  placeholder='input you email'
                  className='mb-3'
                  onChange={this.onChange}
                  />
                <Label for='password'>Password</Label>
                <Input
                  type='password'
                  name='password'
                  id='password'
                  placeholder='input you password'
                  className='mb-3'
                  onChange={this.onChange}
                  />
                <Button color='dark' style={{ marginTop: '2rem'}} block>
                  Login
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
        {/* <div>
          <img
            className="google-login-btn"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7NABN7FsJQ8rVSl_iRB5zO8vnOzf6Vck1XPNozMxQ7xkBcEjU"
            alt="google login logo"
            // onClick={() =>
            //   (window.location = "http://localhost:5000/auth/google")
            // }
          />
        </div> */}
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log('login auth:', state.auth);
  return {
    auth: state.auth,
    error: state.error
  }
};


export default connect(
  mapStateToProps,
  { login, clearErrors  }
)(LoginModal)