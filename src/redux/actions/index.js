import fetchData from '../../services/dataAPI';

export const LOGIN_STATE = 'LOGIN_STATE';
export const REQUEST_CURRENCY = 'REQUEST_CURRENCY';
export const REQUEST_CURRENCY_FAILURE = 'REQUEST_CURRENCY_FAILURE';
export const REQUEST_CURRENCY_SUCCESS = 'REQUEST_CURRENCY_SUCCESS';

export const loginState = (email) => ({
  type: LOGIN_STATE,
  payload: email,
});

export const requestCurrency = () => ({
  type: REQUEST_CURRENCY,
});

export const requestCurrencyFailure = () => ({
  type: REQUEST_CURRENCY_FAILURE,
});

export const requestCurrencySuccess = (currencies) => ({
  type: REQUEST_CURRENCY_SUCCESS,
  payload: currencies,
});

export const actionFetchCurrencies = () => async (dispatch) => {
  dispatch(requestCurrency());
  try {
    const obj = await (fetchData());
    const keys = Object.keys(obj);
    const toRemove = keys.indexOf('USDT');
    keys.splice(toRemove, 1);
    dispatch(requestCurrencySuccess(keys));
  } catch (error) {
    dispatch(requestCurrencyFailure());
  }
};
