import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { actionFetchCurrencies } from '../redux/actions';

class WalletForm extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(actionFetchCurrencies());
  }

  render() {
    const { wallet: { currencies } } = this.props;
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
