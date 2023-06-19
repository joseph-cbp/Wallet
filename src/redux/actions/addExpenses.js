import fetchData from '../../services/dataAPI';

export const REQUEST_EXPENSES_SUCCESS = 'REQUEST_EXPENSES_SUCCESS';
export const ADD_EXPENSES = 'ADD_EXPENSES';
export const SUM_TOTAL = 'SUM_TOTAL';

export const requestCurrencySuccess = (currencies) => ({
  type: REQUEST_EXPENSES_SUCCESS,
  payload: currencies,
});
export const addExpenses = (expenses) => ({
  type: ADD_EXPENSES,
  payload: expenses,
});

export const sumTotal = () => ({ type: SUM_TOTAL });

export const actionAddExpenses = (state) => async (dispatch) => {
  const info = await fetchData();
  const exchangeRates = {};
  Object.entries(info).forEach(([key, value]) => {
    exchangeRates[key] = value;
    // const { name, code, ask } = value;
    // if (key !== 'USDT') {
    //   exchangeRates[key] = {
    //     code,
    //     name,
    //     ask,
    //   };
    // }
  });
  dispatch(addExpenses({
    ...state,
    exchangeRates,
  }));
  dispatch(sumTotal());
};
