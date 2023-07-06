import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginState } from '../redux/actions';
import '../pages/Login.css';

class Form extends Component {
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

  handleSubmit = () => {
    const { history, dispatch } = this.props;
    const { email } = this.state;
    dispatch(loginState(email));
    history.push('/Wallet/carteira');
  };

  render() {
    const { button } = this.state;
    return (
      <div className="input-container">
        <label
          htmlFor="email"
          className="label email-label"
        >
          <input
            id="email"
            className="form-input email-input"
            type="text"
            name="email"
            data-testid="email-input"
            onChange={ this.handleChange }
            placeholder="Email"
          />
        </label>

        <label
          htmlFor="password"
          className="label password-label"
        >
          <input
            className="form-input password-input"
            type="password"
            name="password"
            data-testid="password-input"
            onChange={ this.handleChange }
            placeholder="Senha"
          />
        </label>
        <button
          disabled={ button }
          onClick={ () => this.handleSubmit() }
          className="form-button"
        >
          Entrar
        </button>
      </div>
    );
  }
}

export default connect()(Form);

Form.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};
