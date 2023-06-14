import React, { Component } from 'react';

class WalletForm extends Component {
  state = {
    email: '',
    password: '',
    button: 'disabled',
  };

  handleChange = ({ target: { name, value, type } }) => {
    const valueField = type === 'checkbox' ? checked : value;
    this.setState((prev) => ({
      ...prev,
      [name]: valueField,
    }));
  };

  render() {
    const { button } = this.state;
    return (
      <div>
        <label htmlFor="email">
          <input
            type="text"
            name="email"
            data-testid="email-input"
            onChange={ this.handleChange }
          />
        </label>
        ;
        <label htmlFor="password">
          <input
            type="password"
            name="password"
            data-testid="password-input"
            onChange={ this.handleChange }
          />
        </label>
        <input type="button" value="Entrar" disabled={ button } />
        ;
      </div>
    );
  }
}

export default WalletForm;
