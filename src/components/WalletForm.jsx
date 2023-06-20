import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { actionFetchCurrencies } from '../redux/actions';
import { actionAddExpenses } from '../redux/actions/addExpenses';

class WalletForm extends Component {
  state = {
    id: 0,
    tagInput: 'Alimentação',
    currencyInput: 'USD',
    descriptionInput: '',
    methodInput: 'Dinheiro',
    valueInput: 0,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(actionFetchCurrencies());
  }

  componentWillUnmount() {
    const { wallet: { editor } } = this.props;
    if (editor === true) {
      this.handleEdit();
      return editor;
    }
  }

  handleAddExpense = (event) => {
    event.preventDefault();
    const { dispatch } = this.props;
    dispatch(actionAddExpenses(this.state));
    this.setState((prev) => ({
      tagInput: 'Alimentação',
      currencyInput: 'USD',
      descriptionInput: '',
      methodInput: 'Dinheiro',
      valueInput: '',
      id: prev.id + 1,
    }));
  };

  handleEdit = () => {
    const { wallet: editExpense } = this.props;
    const { tag, currency, description, method, value } = editExpense;
    this.setState(() => ({
      tagInput: tag,
      currencyInput: currency,
      descriptionInput: description,
      methodInput: method,
      valueInput: value,
    }));
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState(() => ({ [name]: value }));
  };

  render() {
    const { wallet: { currencies } } = this.props;
    const { tagInput,
      currencyInput,
      descriptionInput,
      methodInput,
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
        <label htmlFor="descriptionInpu">
          <input
            type="text"
            name="descriptionInput"
            data-testid="description-input"
            value={ descriptionInput }
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
        <label htmlFor="methodInput">
          Método de Pagamento
          <select
            data-testid="method-input"
            name="methodInput"
            value={ methodInput }
            onChange={ this.handleChange }
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tagInput">
          Categoria da despesa
          <select
            data-testid="tag-input"
            name="tagInput"
            onChange={ this.handleChange }
            value={ tagInput }
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
