import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { actionFetchCurrencies } from '../redux/actions';

class WalletForm extends Component {
  state = {
    tag: 'Alimentação',
    currencyInput: 'USD',
    desdescriptionInput: '',
    paymentMethod: 'Dinheiro',
    valueInput: 0,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(actionFetchCurrencies());
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState(() => ({ [name]: value }));
  };

  render() {
    const { wallet: { currencies } } = this.props;
    const { tag,
      currencyInput,
      desdescriptionInput,
      paymentMethod,
      valueInput } = this.state;
    return (
      <>
        <label htmlFor="valueInput">
          <input
            type="number"
            name="valueInput"
            data-testid="value-input"
            value={ valueInput }
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="descriptionInput">
          <input
            type="text"
            name="desdescriptionInput"
            data-testid="description-input"
            value={ desdescriptionInput }
            onChange={ this.handleChange }
          />
        </label>
        <select
          name="currencyInput"
          data-testid="currency-input"
          value={ currencyInput }
          onChange={ this.handleChange }
        >
          {
            currencies.map((currency) => (
              <option
                key={ currency }
                value={ currency }
              >
                {currency}
              </option>
            ))
          }
        </select>
        <br />
        <label htmlFor="paymentMethod">
          Método de Pagamento
          <select
            data-testid="method-input"
            name="paymentMethod"
            value={ paymentMethod }
            onChange={ this.handleChange }
          >
            <option value="cash">Dinheiro</option>
            <option value="credit">Cartão de crédito</option>
            <option value="debit">Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag">
          Categoria da despesa
          <select
            data-testid="tag-input"
            name="tag"
            onChange={ this.handleChange }
            value={ tag }
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  user: state.user,
  wallet: state.wallet,
});

export default connect(mapStateToProps)(WalletForm);

WalletForm.propTypes = {
  wallet: PropTypes.shape({
    currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};
