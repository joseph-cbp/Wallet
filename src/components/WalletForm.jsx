import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { actionFetchCurrencies, loginState } from '../redux/actions';
import getCurrentCurrency from '../services/currencyAPI';

class WalletForm extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(actionFetchCurrencies());
  }

  createOptions = () => {
    const { wallet: { currencies } } = this.props;
    return (
      <>
        {currencies.forEach((value) => <option value={ value }>{value}</option>)}
      </>
    );
  };

  render() {
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
          {createOptions}
        </select>
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  user: state.user,
  wallet: state.wallet,
});
export default connect()(WalletForm);
