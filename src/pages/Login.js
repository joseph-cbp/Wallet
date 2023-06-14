import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import WalletForm from '../components/WalletForm';

class Login extends React.Component {
  render() {
    const { history } = this.props;
    return (
      <div>
        Login
        <WalletForm history={ history } />
      </div>
    );
  }
}

export default connect()(Login);
Login.propTypes = {
  history: PropTypes.shape().isRequired,
};
