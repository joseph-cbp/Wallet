import fetchData from '../../services/dataAPI';

export const REQUEST_EXPENSES_SUCCESS = 'REQUEST_EXPENSES_SUCCESS';
export const ADD_EXPENSES = 'ADD_EXPENSES';

export const requestCurrencySuccess = (currencies) => ({
  type: REQUEST_EXPENSES_SUCCESS,
  payload: currencies,
});
export const addExpenses = (expenses) => ({
  type: ADD_EXPENSES,
  payload: expenses,
});

// export const actionFetchCurrencies = () => async (dispatch) => {
//   dispatch(requestCurrency());
//   try {
//     const obj = await (fetchCurrency());
//     const keys = Object.keys(obj);
//     const toRemove = keys.indexOf('USDT');
//     keys.splice(toRemove, 1);
//     dispatch(requestCurrencySuccess(keys));
//   } catch (error) {
//     dispatch(requestCurrencyFailure());
//   }
// };
export const actionAddExpenses = (state) => async (dispatch) => {
  const info = await fetchData();
  const currentExchange = {};
  Object.entries(info).forEach(([key, value]) => {
    currentExchange[key] = value;
  });
  dispatch(addExpenses({
    ...state,
    currentExchange,
  }));
};
