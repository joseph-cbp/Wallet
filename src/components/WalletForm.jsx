import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { actionFetchCurrencies } from '../redux/actions';

class WalletForm extends Component {
  state = {
    tag: '',
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
    const { tag } = this.state;
    return (
      <>
        <label htmlFor="valueInput">
          <input
            type="number"
            name="valueInput"
            data-testid="value-input"
          />
        </label>
        <label htmlFor="descriptionInput">
          <input
            type="text"
            name="desdescriptionInput"
            id=""
            data-testid="description-input"
          />
        </label>
        <select
          name="currencyInput"
          id=""
          data-testid="currency-input"
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
          <select data-testid="method-input" name="paymentMethod">
            <option value="cash">Dinheiro</option>
            <option value="credit">Cartão de crédito</option>
            <option value="debit">Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="category">
          Categoria da despesa
          <select
            data-testid="tag-input"
            name="category"
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
