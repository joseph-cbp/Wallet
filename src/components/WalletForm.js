import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

class WalletForm extends Component {
  state = {
    email: '',
    password: '',
    button: true,
  };

  handleChange = ({ target: { name, value, type } }) => {
    const valueField = type === 'checkbox' ? checked : value;
    this.setState((prev) => ({
      ...prev,
      [name]: valueField,
    }), () => this.handleEnableButton());
  };

  handleEnableButton = () => {
    const { email, password } = this.state;
    const regexEmail = /^[\w.-]+@\w+.\w+$/ig;
    const requiredLength = 5;
    const validateEmail = regexEmail.test(email);
    const validatePassword = password.length > requiredLength;
    this.setState((prev) => ({
      ...prev,
      button: !(validateEmail && validatePassword),
    }));
  };

  render() {
    const { button } = this.state;
    return (
      <div>
        <label htmlFor="email">
          Email
          <input
            type="text"
            name="email"
            data-testid="email-input"
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="password">
          Password
          <input
            type="password"
            name="password"
            data-testid="password-input"
            onChange={ this.handleChange }
          />
        </label>
        <input
          type="button"
          value="Entrar"
          disabled={ button }
          onClick={ () => history.push('/carteira') }
        />
      </div>
    );
  }
}

export default WalletForm;

WalletForm.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
