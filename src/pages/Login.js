import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Form from '../components/Form';

class Login extends React.Component {
  render() {
    const { history } = this.props;
    return (
      <div>
        Login
        <Form history={ history } />
      </div>
    );
  }
}

export default connect()(Login);
Login.propTypes = {
  history: PropTypes.shape().isRequired,
};
