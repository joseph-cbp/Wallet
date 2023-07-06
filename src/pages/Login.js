import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Form from '../components/Form';
import './Login.css';

class Login extends React.Component {
  render() {
    const { history } = this.props;
    return (
      <div className="login-container">
        <h2 className="login-text">Login</h2>
        <Form history={ history } />
      </div>
    );
  }
}

export default connect()(Login);
Login.propTypes = {
  history: PropTypes.shape().isRequired,
};
