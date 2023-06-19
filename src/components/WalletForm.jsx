import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { actionFetchCurrencies } from '../redux/actions';
import { actionAddExpenses } from '../redux/actions/addExpenses';

class WalletForm extends Component {
  state = {
    id: 0,
    tag: 'Alimentação',
    currency: 'USD',
    description: '',
    method: 'Dinheiro',
    value: 0,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(actionFetchCurrencies());
  }

  handleAddExpense = (event) => {
    event.preventDefault();
    const { dispatch } = this.props;
    dispatch(actionAddExpenses(this.state));
    this.setState((prev) => ({
      tag: 'Alimentação',
      currency: 'USD',
      description: '',
      method: 'Dinheiro',
      value: '',
      id: prev.id + 1,
    }));
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState(() => ({ [name]: value }));
  };

  render() {
    const { wallet: { currencies } } = this.props;
    const { tag,
      currency,
      description,
      method,
      value } = this.state;
    return (
      <>
        <label htmlFor="value">
          <input
            type="number"
            name="value"
            data-testid="value-input"
            value={ value }
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="descriptionInput">
          <input
            type="text"
            name="description"
            data-testid="description-input"
            value={ description }
            onChange={ this.handleChange }
          />
        </label>
        <select
          name="currency"
          data-testid="currency-input"
          value={ currency }
          onChange={ this.handleChange }
        >
          {
            currencies.map((dataCurrency) => (
              <option
                key={ dataCurrency }
                value={ dataCurrency }
              >
                {dataCurrency}
              </option>
            ))
          }
        </select>
        <br />
        <label htmlFor="method">
          Método de Pagamento
          <select
            data-testid="method-input"
            name="method"
            value={ method }
            onChange={ this.handleChange }
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
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
        <button
          onClick={ this.handleAddExpense }
        >
          Adicionar despesas
        </button>
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
