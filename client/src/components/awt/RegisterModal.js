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
import { register } from '../../store/actions/authActions';
import { clearErrors } from '../../store/actions/errorActions';
import PropTypes from 'prop-types';


class RegisterModal extends Component {
  state = {
    modal: false,
    name: '',
    email: '',
    password: '',
    msg: null
  };

  static propTypes = {
    auth: PropTypes.bool,
    error: PropTypes.object.isRequired,
    register: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired
  }

  componentDidUpdate(prevProps) {
    const { error } = this.props;
    const { isAuthenticated } = this.props.auth;
    if (error !== prevProps.error) {
      // Check for register error
      if (error.id === 'REGISTER_FAIL') {
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
  }

  toggle = () => {    
    this.props.clearErrors(); // Clear errors
    this.setState({
      modal: !this.state.modal
    });
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  onSubmit = e => {
    e.preventDefault();

    const { name, email, password } = this.state;

    const newUser = { //create user object
      name,
      email,
      password
    };

    this.props.register(newUser); //attemp to register
  }

  render() {
    return (
      <div>
        <NavLink onClick={this.toggle} href='#'>
          Register
        </NavLink>

        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Register</ModalHeader>
          <ModalBody>
            {this.state.msg ? (
              <Alert color='danger'>{this.state.msg}</Alert>
            ) : null}
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for='name'>Name</Label>
                <Input
                  type='text'
                  name='name'
                  id='name'
                  placeholder='input you name'
                  className='mb-3'
                  onChange={this.onChange}
                  />
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
                  Register
                </Button>                
                <div className='googlelogin'>
                  <img
                    className="google-login-btn"
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7NABN7FsJQ8rVSl_iRB5zO8vnOzf6Vck1XPNozMxQ7xkBcEjU"
                    alt="google login logo"
                    // onClick={() =>
                    //   (window.location = "http://localhost:5000/auth/google")
                    // }
                  />
                </div>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => {
  //console.log('Register auth:', state.auth);
  return {
    auth: state.auth,
    error: state.error
  }
};

export default connect(
  mapStateToProps,
  { register, clearErrors  }
)(RegisterModal)