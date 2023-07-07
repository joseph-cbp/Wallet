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
      <div className="wallet-form">
        <div className="container">

          <label
            htmlFor="descriptionInput"
            className="label-input"
          >
            Descrição
            <input
              type="text"
              name="descriptionInput"
              id="descriptionInput"
              data-testid="description-input"
              value={ descriptionInput }
              onChange={ this.handleChange }
              className="input-form description-input"
            />
          </label>
          <label
            htmlFor="tagInput"
            className="label-input category"
          >
            Categoria da despesa
            <select
              data-testid="tag-input"
              name="tagInput"
              id="tagInput"
              onChange={ this.handleChange }
              value={ tagInput }
              className="input-form category-input"
            >
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>
        </div>
        <div className="container">
          <label
            htmlFor="valueInput"
            className="label-input"
          >
            Valor
            <input
              className="input-form value-input"
              type="number"
              name="valueInput"
              id="valueInput"
              data-testid="value-input"
              value={ valueInput }
              onChange={ this.handleChange }
            />
          </label>
          <label
            htmlFor="methodInput"
            className="label-input"
          >
            Método de Pagamento
            <select
              id="methodInput"
              data-testid="method-input"
              name="methodInput"
              className="input-form method-input"
              value={ methodInput }
              onChange={ this.handleChange }
            >
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>
          <label
            htmlFor="currencyInput"
            className="label-input"
          >
            Moeda
            <select
              name="currencyInput"
              id="currencyInput"
              data-testid="currency-input"
              value={ currencyInput }
              onChange={ this.handleChange }
              className="input-form currency-input"
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
          </label>
        </div>
        <button
          className="wallet-form-button"
          onClick={ this.handleAddExpense }
        >
          Adicionar despesas
        </button>
      </div>
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
